const express = require("express")
const student_collection = require("./mongo")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())



app.get("/login",cors(),(req,res)=>{

})


app.post("/login",async(req,res)=>{
    const{email,password}=req.body

    try{
        const checkExist=await student_collection.findOne({email:email})
        const checkMatch=await student_collection.findOne({email:email, password:password})


        if(!checkExist){
            res.json("notexist")
        }
        else if (!checkMatch){
            res.json("notmatch")
        }
        else{
            res.json("exist")
        }

    }
    catch(e){
        res.json("fail")
    }

})



app.post("/signup",async(req,res)=>{
    const{username, email,password}=req.body

    const data={
        username: username,
        email:email,
        password:password
    }

    try{
        const check=await student_collection.findOne({email:email})

        if(check){
            res.json("exist")
        }
        else{
            res.json("notexist")
            await student_collection.insertMany([data])
        }

    }
    catch(e){
        res.json("fail")
    }

})

app.listen(8000,()=>{
    console.log("port connected");
})

