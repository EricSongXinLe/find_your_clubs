const mongoose=require("mongoose")
const express = require('express');
const app = express();
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
    },
    favClubs:{
        type:Array,
        required:true,
        default:[]
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
    },
    cs:{
        type:Boolean,
        required:true
    }, 
    math:{
        type:Boolean,
        required:true
    }, 
    physics:{
        type:Boolean,
        required:true
    }, 
    economics:{
        type:Boolean,
        required:true
    }, 
    ds:{
        type:Boolean,
        required:true
    }, 
    me:{
        type:Boolean,
        required:true
    }
})

const applicationScehma=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    yearOfGraduation:{
        type: String,
        required:true
    },
    birthday:{
        type: String,
        required : true
    }
})

const student_collection = mongoose.model("students",studentSchema)
const club_collection = mongoose.model("clubs",clubsSchema)

app.get('/api/search', async (req, res) => {
    query = req.query.query;
    console.log(query);
    try{
    const result = await club_collection.findOne({ clubname: query });
    res.json(result);
}
catch(e){
    console.log(e);
}});

exports.club_collection=club_collection
exports.student_collection=student_collection
exports.application_collection=application_collection