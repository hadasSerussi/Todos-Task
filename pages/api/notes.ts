// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import initDB from '../../helpers/initDB'
import Note from '../../models/note'





initDB()

export default async (req,res)=>{
  switch (req.method)
    {
       case "GET":
         await getallNotes(req,res)
         break
       case "POST":
         await saveNotes(req,res)   
         break
    }  
}


const getallNotes = async (req,res)=>{
  try{
    const notes =  await Note.find()
    res.status(200).json(notes)
  }catch(err){
    console.log(err)
  }
  
}


const saveNotes = async (req,res)=>{
 
  const { nameNote, items} =  req.body
  try{
      if(!nameNote ){
    return res.status(422).json({error:"Please add all the fields"})
  }
   const note = await new Note({
     nameNote,
     items,
     created_at:Date.now(),
     updated_at:Date.now()
   }).save()
   res.status(201).json(note)
  }catch(err){
    res.status(500).json({error:"internal server error"})
    console.log(err)
  }


}