const mongoose=require("mongoose")
mongoose.connect("mongodb://0.0.0.0:27017/findyourclubsDB")
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log('failed');
})


const studentSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const clubsSchema=new mongoose.Schema({
    clubname:{
        type:String,
        required:true
    },
})

const student_collection = mongoose.model("students",studentSchema)
const club_collection = mongoose.model("clubs",clubsSchema)

module.exports=club_collection
module.exports=student_collection