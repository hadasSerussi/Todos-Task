// import { MongoClient } from 'mongodb'

// let uri = process.env.MONGODB_URI
// let dbName = process.env.MONGODB_DB

// let cachedClient = null
// let cachedDb = null

// if (!uri) {
//   throw new Error(
//     'Please define the MONGODB_URI environment variable inside .env.local'
//   )
// }

// if (!dbName) {
//   throw new Error(
//     'Please define the MONGODB_DB environment variable inside .env.local'
//   )
// }

// export async function connectToDatabase() {
//   if (cachedClient && cachedDb) {
//     return { client: cachedClient, db: cachedDb }
//   }

//   const client = await MongoClient.connect(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })

//   const db = await client.db(dbName)

//   cachedClient = client
//   cachedDb = db

//   return { client, db }
// }
// MONGODB_URI= "mongodb+srv://Hadas:hadas22@db-todos.vpywz.gcp.mongodb.net/DB-Todos?retryWrites=true&w=majority"
// MONGODB_DB = "DB-Todo"

const MONGO_URI = "mongodb+srv://Hadas:hadas22@db-todos.vpywz.gcp.mongodb.net/DB-Todos?retryWrites=true&w=majority";
import mongoose from 'mongoose'

function initDB(){
  // console.log("--------------------",process.env)
    if(mongoose.connections[0].readyState){
        console.log("alredy connected")
        return
    }
    // mongoose.connect(process.env.MONGO_URI,{
      mongoose.connect(MONGO_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    mongoose.connection.on('connected',()=>{
        console.log("connected to mongo")
    })
    mongoose.connection.on('error',(err)=>{
        console.log("error connecting",err)
    })
}


export default initDB
