import mongoose from 'mongoose'
const {ObjectId} = mongoose.Schema.Types


const itemSchema = new mongoose.Schema({
    noteId:{
        type:ObjectId,
        ref:"Note"
    },
    name:{
       type:String,
       required:true
   },
   done:{
       type: Boolean,
       default:false
   }
})


export default  mongoose.models.Item || mongoose.model('Item',itemSchema)