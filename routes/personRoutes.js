const express = require('express');
const router = express.Router();
const Person = require('./../models/person');

router.post('/', async (req, res) => {
    try{
        const data = req.body // Assuming the request body contains the person data

        //Create a new Person document usning mongoose model
        const newPerson = new Person(data);

        //Save the new person to the database
        const response = await newPerson.save();
        console.log('data saved')
        res.status(200).json(response)
    }
    catch(err){
        console.error(err);
        res.status(500).json({error: 'Internal server error'});
    }
});

//GET method to get person data

router.get('/',async(req,res)=>{
    try{
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    }catch(err){
        console.error(err);
        res.status(500).json({error: 'Internal server error'});
    }
});

router.get('/:workType',async (req,res)=>{
    try{
        const workType = req.params.workType; // Extract the work type from the URL parameter
        if(workType === 'chef' || workType === 'manager' || workType === 'waiter'){  
            const response = await Person.find({work:workType});
            console.log('Request fetched');
            res.status(200).json(response);
        }
        else{
            res.status(404).json({error:'Invalid work type'});
        }
    }catch(err){
        console.error(err);
        res.status(500).json({error:'Internal server error'});
    }
});

const mongoose = require('mongoose');

router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const updatedPersonData = req.body;

        // Check if the provided ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(personId)) {
            return res.status(400).json({ error: "Invalid ID format" }); // Return 400 for invalid ID format
        }

        // Try to find and update the person document by ID
        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true, // Return the updated document
            runValidators: true, // Run Mongoose validation
        });

        // If no document is found, return a 404 error
        if (!response) {
            return res.status(404).json({ error: "Person data not found" });
        }

        console.log("Data updated");
        res.status(200).json(response); // Return the updated person data

    } catch (err) {
        // Log detailed error message for debugging
        console.error("Error during update operation: ", err);

        // Return a generic 500 error message to the user
        res.status(500).json({ error: "Internal server problem", details: err.message });
    }
});

router.delete('/:id',async(req,res)=>{
    try{
        const personId = req.params.id;
        const response = await Person.findByIdAndDelete(personId);
        if (!response) {
            return res.status(404).json({ error: "Person data not found" });
        }
        console.log("Data deleated");
        res.status(200).json({message:"person deleted successfully"});
    }catch(err){
        console.error("Error during delete operation: ", err);
        res.status(500).json({ error: "Internal server problem", details: err.message });
    }
})

module.exports = router;