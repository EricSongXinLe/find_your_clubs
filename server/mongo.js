const mongoose=require("mongoose")
mongoose.connect("mongodb://sb:Eggert@110.40.138.15:27017/studentDB?authSource=admin")
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
})

const student_collection = mongoose.model("students",studentSchema)
const club_collection = mongoose.model("clubs",clubsSchema)

module.exports=club_collection
module.exports=student_collection