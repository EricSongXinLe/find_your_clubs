const mongoose=require("mongoose")
mongoose.connect("mongodb://admin:CS35L@110.40.138.15:27017/admin")
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
    },
    userIsClubLeader:{
        type:Boolean,
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
    },
    foundingTime:{
        type:Date,
        required:true
    },
    // tagsList:{
    //     type:String,
    //     required:true
    // },
    clubdescription:{
        type:String,
        required:true
    },
    requirement:{
        type:String,
        required:true
    }
})

const student_collection = mongoose.model("students",studentSchema)
const club_collection = mongoose.model("clubs",clubsSchema)

exports.club_collection=club_collection
exports.student_collection=student_collection