const mongoose=require("mongoose")
mongoose.connect("mongodb://localhost:27017/findyourclubsDB")
.then(()=>{
    console.log("mongodb connected");
})
.catch((e)=>{
    console.log(e);
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
    clubimg:{
        data: Buffer, 
        contentType: String
    }
})

const student_collection = mongoose.model("students",studentSchema)
const club_collection = mongoose.model("clubs",clubsSchema)

exports.club_collection=club_collection
exports.student_collection=student_collection