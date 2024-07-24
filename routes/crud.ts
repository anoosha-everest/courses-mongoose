import mongoose from "mongoose";
import { Courses } from "../schema";
// import { Prerequisite } from "../schema";
const express=require('express');
const router=express.Router();

// Get all courses
router.get('/', async (req:any, res:any) => {
    try {
        // Fetch all courses
        const courses = await Courses.find();
        if (courses.length === 0) return res.status(404).json({ message: "No courses Found" });
        res.json({courses: courses});
    } catch (err:any) {
        res.status(500).json({message: err.message});
    }
});
// Get one course by id
router.get('/:id', async (req:any, res:any) => {
    try {
        const course = await Courses.find({_id:req.params.id});
        if (course === null) {
            return res.status(404).json({ message: "course Not Found" });
        }
        res.json(course);
    } catch (err:any) {
        res.status(500).json({message: err.message});
    }
});

// Create a new course
router.post('/', async (req:any, res:any) => {
    try {
        const course = await Courses.create(req.body);
        res.json(course);
    } catch (err:any) {
        res.status(500).json({message: err.message});
    }
});

// Update a course by given id
router.put('/:id', async (req:any, res:any) => {
    const courseId = req.params.id;
    const updateFields = req.body;
    try {
        let updatedCourse = await Courses.findOne({ _id: courseId });
        if (updatedCourse) {
            const updated:any = await Courses.updateOne({ _id: courseId }, { $set: updateFields });
            updatedCourse = await Courses.findOne({ _id: courseId });
            res.json(updatedCourse);
        } else {
            res.status(404).json({ message: "Course Not Found" });
        }
    } catch (err:any) {
        res.status(500).json({ message: err.message });
    }
});
// Delete a course
router.delete('/:id', async (req:any, res:any) => {
    try {
        const deleted = await Courses.deleteOne({_id: req.params.id});
        if (deleted) {
            res.json({ message: "course Deleted" });
        } else {
            res.status(404).json({ message: "course Not Found" });
        }
    } catch (err:any) {
        res.status(500).json({message: err.message});
    }
});


// Route to get prerequisite courses if we give courseid
router.get('/prereq/:id', async (req:any, res:any) => {
    try {
        const pre = await Courses.findById(req.params.id, 'level name', {
            populate: {
              path: 'preId',
              select: 'level name',
            },
          }).exec();
        if(pre){
            res.json({ pre});
        }
        else{
            res.status(404).json({ message: "No prerequisites" });
        }
        
      } catch (err:any) {
        res.status(500).json({ message: err.message});
      }
});

//get all courses which have to be taken after a given course id
// router.get('/postcour/:id', async (req:any, res:any) => {
//     try {
//         const cour:any = (await Courses.find({}, 'preId').exec());
        
//         if(cour){
//             res.json({ cour});
//         }
//         else{
//             res.status(404).json({ message: "No prerequisites" });
//         }
        
//       } catch (err:any) {
//         res.status(500).json({ message: err.message});
//       }
// });


export default router;