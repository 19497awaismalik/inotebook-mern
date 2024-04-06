const express=require('express');
const Notes=require('../models/Notes');
const router=express.Router();
const fatchuser= require('../middleware/fatchuser');
const { body, validationResult } = require('express-validator');
//ROUTE !:FATCHING ALL NOTES THAT IS ALREAD STORED

router.get('/fatchallnotes',fatchuser,async (req,res)=>{
const notes=await Notes.find({user:req.user.id});
res.json(notes);
})


//ROUTE :2 ADD  A NEW NOTES 
router.post('/addnotes/',[
  body('title',"Enter  A VALID TITLE").isLength({min:3}),
    body('description','DESCRIPTIOn Must be Atlast 5 Characters').isLength({min:5}),
   
  ],fatchuser ,async (req,res)=>{



      
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      
      return res.status(400).json({ errors: errors.array() });
    }  
const {title,description,tag}=req.body;

const notes=new Notes({
title,description,tag,user:req.user.id
})
notes.save();
res.json(notes)




})

//ROUTE 3:UPADTE NOTES THAI IS ALREADY STORED
router.post('/update/:id',async (req,res)=>{

const {title,description,tag}=req.body;
const NewNotes={};
if(title){ NewNotes.title=title}
if(description){ NewNotes.description=description}
if(tag){ NewNotes.tag=tag}

let notes= await  Notes.findById(req.params.id);
if(!notes)
{return res.status(404).send("NOT FOUND")}
if(!notes.user.toString()){
  return res.status(401).send("NOT ALLOWED")
}

notes=await Notes.findByIdAndUpdate(req.params.id,{$set:NewNotes},{new:true})
res.json({notes})



})
//ROUTE 4:DElETE THE NOTES

router.delete('/deletenote/:id',async(req,res)=>{
  let  notes=await Notes.findById(req.params.id);
if(!notes){return res.status(404).send("NOT FOUND")}
if(!notes.user.toString()){
  
  return res.status(401).send("NOT ALLOWED")
}
notes=await Notes.findByIdAndDelete(req.params.id)
res.json({"Success":"Note Has Been deleted Success"} )



})


module.exports=router;