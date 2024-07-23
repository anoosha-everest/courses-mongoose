import mongoose,{Schema} from "mongoose";

const courseNames={
    ssc:['MATHS','SCIENCE'],
    inter:['MPC', 'BiPC','CEC'],
    diploma:['IT', 'ECE','EEE'],
    eng:['CSE', 'ECE','CIVIL','EEE','MECH','MME','CHEM'],
    medical:['DENTAL','PHARMACY','HOMEOPATHY'],
    degree:['B.com','B.pharm','B.sc']
}

enum courseLevel {
    ssc = 'ssc',
    inter = 'inter',
    diploma = 'diploma',
    eng = 'eng',  
    medical = 'medical',
    degree = 'degree',
  }

const courseSchema = new Schema({
    // id:Number,
    level: {
        type:String,
        required:true,
        enum: Object.values(courseLevel),  
    },
    name: {
        type:String,
        required: true,
        validate: {
            validator: function(value: string) {
                const courselevel = (this as any).level as courseLevel;
                return courseNames[courselevel] ? courseNames[courselevel].includes(value) : false;
            },
            message: 'Invalid course name for the selected level.',
        }
    },
    preId:[{
        type: Schema.Types.ObjectId,
        ref: 'Course', // Reference to the Course model itself for prerequisites
        default:[]
    }]
   
  });

// const prereqSchema=new mongoose.Schema({
//     preId:{
//         type:[mongoose.SchemaTypes.ObjectId],
//         ref:"Courses", 
//     } 
// })

export const Courses = mongoose.model('Courses', courseSchema);
// export const Prerequisite=mongoose.model('Prerequisite',prereqSchema)