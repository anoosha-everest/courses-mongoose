import mongoose from "mongoose";
import { Courses } from "./schema";
// import { Prerequisite } from "./schema";
import nconf from 'nconf';
import * as fs from 'fs';
import csvParser from 'csv-parser';
import path from 'path';
import express from 'express';
const app = express();
import courseRoutes from './routes/crud';
// Load configuration
nconf.file('config', { file: path.resolve(__dirname, 'config.json') });

app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded requests
app.use(express.json()); // Middleware to parse JSON requests


const readCSV = <T>(filePath: string): Promise<T[]> => {
  return new Promise((resolve, reject) => {
    const results: T[] = [];
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results as T[]))
      .on('error', (error) => reject(error));
  });
};

const insertCourses=async()=>{
  try{
    const courseDataPath = nconf.get('courseDataPath');
    if (!courseDataPath) {
      throw new Error('courseDataPath must be specified in the config file');
    }
  const csvData = await readCSV(courseDataPath);
  console.log(csvData);
  let item:any;
  for(item of csvData){
    let course = await Courses.findOne({ name:item.name, level:item.level });
    if (!course) {
      course = await Courses.create({ name:item.name, level:item.level });
      console.log(`Inserted course: ${item.name} (${item.level})`);
      await course.save();
    }
    if (item.prelevel && item.prename) {
      let preCourse = await Courses.findOne({ name: item.prename, level: item.prelevel });
      if (preCourse) {
          course.preId.push(preCourse._id);
          await course.save();
          console.log(`Inserted course: ${item.name} (${item.level}) with prerequisite: ${item.prename} (${item.prelevel})`);
      } else {
          console.error(`Failed to find or create prerequisite course: ${item.prename} (${item.prelevel})`);
      }
  } else {
      console.log(`Inserted course without prerequisites: ${item.name} (${item.level})`);
  }
  }
}
catch(error){
  console.log(error);
}
}


const connectToDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect('mongodb://localhost:27017/courses');
    console.log('MongoDB connected successfully!');
    // await insertCourses();
    // console.log("Inserted courses");


    // const course=await Courses.find();
    // console.log(course);
    // const prereq=await Prerequisite.find();
    // console.log(prereq);
    app.use('/api/ping', ((req, res) => {  
      res.json({ message: 'pong' });
    }));
    app.use('/api/courses',courseRoutes);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
};

// Connect to database when the application starts
connectToDatabase();

//66a082faae68d0441aef345b