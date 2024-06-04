const mongoose=require("mongoose")
mongoose.connect("mongodb://admin:CS35L@110.40.138.15:27017/admin")
// mongoose.connect("mongodb://localhost:27017/findyourclubDB")
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
    },
    interestArr:{
        type:Array,
        required: false
    },
    favClubs: {
        type: [String],
        required: false,
        default:[]
    }
})

const clubsSchema = new mongoose.Schema({
    clubname: {
      type: String,
      required: true
    },
  
    clubimg:{
        type:Buffer,
    },

    foundingTime:{
        type:Date,
        required:true
    },

    clubdescription:{
        type:String,
        required:true
    },
    requirement:{
        type:String,
        required:true
    },
    tagsList:{
        type:Array,
        required: true
    },
    activityTime:{
        type:String,
        required:true
    },
    optionalLink:{
        type:String,
        required:true
    },
    likes:{
        type:Number,
        // required:false,
        default : 0
    }

    
})

const appFormSchema=new mongoose.Schema({
    clubName:{
        type:String,
        required:true
    },
    supplementaryQuestion:{
        type:[String],
        required:true
    }
})

const answerSchema=new mongoose.Schema({
    clubName:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    answers:{
        type:[String],
        required:true
    }
})

const student_collection = mongoose.model("students",studentSchema)
const club_collection = mongoose.model("clubs",clubsSchema)
const application_collection = mongoose.model("appForm",appFormSchema)
const answer_collection = mongoose.model("answers", answerSchema)
exports.club_collection=club_collection
exports.student_collection=student_collection
exports.application_collection=application_collection
exports.answer_collection=answer_collection