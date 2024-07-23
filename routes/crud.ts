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
        const updated:any = await Courses.updateOne({ _id: courseId }, { $set: updateFields });
        if (updated.nModified > 0) {
            const updatedCourse = await Courses.findOne({ _id: courseId });
            if (updatedCourse) {
                res.json(updatedCourse);
            } else {
                res.status(404).json({ message: "Course Not Found" });
            }
        } else {
            res.status(404).json({ message: "Coursse Not Found" });
        }
    } catch (err:any) {
        res.status(500).json({ message: err.message });
    }
});
// Delete a course
// router.delete('/:id', async (req:any, res:any) => {
//     try {
//         const deleted = await Courses.destroy({where: {_id: req.params.id}});
//         if (deleted) {
//             res.json({ message: "authors Deleted" });
//         } else {
//             res.status(404).json({ message: "authors Not Found" });
//         }
//     } catch (err) {
//         res.status(500).json({message: err.message});
//     }
// });


// Route to get book titles by author ID
// router.get('/:authorId/books', async (req, res) => {
//     try {
//         const authorId = parseInt(req.params.authorId);
//         if (isNaN(authorId)) {
//           return res.status(400).json({ error: 'Invalid author ID' });
//         }
    
//         const bookTitles = await query(authorId);
//         res.json({ bookTitles });
//       } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'An error occurred while fetching book titles' });
//       }
// });

//get all authors group by nationality and order by name
// router.get('/grouping/ordering',async(req,res)=>{
//     try {
//         const auth = await findAuthors();
//         res.json({ auth });
//       } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'An error occurred while fetching authors' });
//       }
// })


export default router;