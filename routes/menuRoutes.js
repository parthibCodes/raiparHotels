const express = require('express');
const router = express.Router();
const menuItem = require('./../models/menuItem');

router.post('/',async(req,res)=>{
    try{
        const newItem = new menuItem(req.body);
        const menu = await newItem.save();
        console.log("Item is saved");
        res.status(200).json(menu);
    }catch(err){
        console.error(err);
        res.status(500).json({error:'Internal server error'});
    }
    
});

router.get('/',async(req,res)=>{
    try{
        const items = await menuItem.find();
        res.status(200).json(items);
    }catch(err){
        console.error(err);
        res.status(500).json({error:"Internal server error to fetch items"})
    }
});

router.get('/:tasteType',async(req,res)=>{
    try{
        const tasteType = req.params.tasteType;
        if(tasteType === 'sweet' || tasteType === 'sour' || tasteType === 'spicy'){
            const response = await menuItem.find({taste:tasteType});
            console.log('Items fetched');
            res.status(200).json(response);
        }
        else{
            res.status(404).json({error:'There no taste like that!'});
        }
    }catch(err){
        console.error(err);
        res.status(500).json({error:'Internal server error'});
    }
});
router.patch('/:name',async (req,res)=>{
    try{    
        const menuName = req.params.name.trim();
        const updatedMenu = req.body;

        console.log('Searching for menu name:', menuName);
        console.log('Updated data:', updatedMenu);

        const response = await menuItem.findOneAndUpdate({name:menuName},updatedMenu,{
            new:true,
            runValidators:true
        });
        if(!response){
            return res.status(404).json({error:"This menu name doesn't exist"});
        }
        console.log("Data updated");
        res.status(200).json(response);
    }catch(err){
        console.error("Error during update operation: ", err);
        res.status(500).json({ error: "Internal server problem", details: err.message });
    }
})

module.exports = router;