const mongoose=require('mongoose');
const {config}=require("dotenv")
config()

const connectToMongo=async()=>{
        await mongoose.connect("mongodb+srv://19497awaismalik:inotebookpassword@cluster0.a006enz.mongodb.net/")

        console.log(" MongoDB Connection... ")



}
 
module.exports=connectToMongo;