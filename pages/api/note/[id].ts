import Note from '../../../models/note'
import initDB from '../../../helpers/initDB'

initDB()

export default async (req,res)=>{
    switch(req.method){
        case "GET":
          await getNote(req,res) 
          break;
        case "POST":
            await updateNote(req,res)
            break; 
        case "DELETE":
          await deleteNote(req,res)
          break;
    }
    
}


const getNote = async (req,res)=>{
    const {id } =  req.query
     const note = await Note.findOne({_id:id})
     res.status(200).json(note)
}

const updateNote = async(req,res)=>{
    const {id} = req.query;
    const {nameNote, items } = req.body;
    const result = await Note.updateOne({_id:id},{nameNote, items, updated_at:Date.now()});
    res.status(200).json({result})
}

const deleteNote = async (req,res)=>{
    const {id } =  req.query
    await Note.findByIdAndDelete({_id:id})
    res.status(200).json({})
}