import mongoose from 'mongoose'
import { timeStamp } from 'console'


const notesSchema = new mongoose.Schema({
   nameNote:{
       type:String,
       required:true
   },
   items:[
     {
       id:{type:Number},
       name: { type:String},
       done: {type:Boolean} 
     }
   ],
   created_at:{
     type:Date
   },
   updated_at:{
     type:Date
   }
}
,{
  timestamps:true  
}
)


export default  mongoose.models.Note || mongoose.model('Note',notesSchema)