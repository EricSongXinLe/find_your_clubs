const express = require("express")
const methods = require("./mongo")
const student_collection = methods.student_collection
const club_collection = methods.club_collection
const application_collection = methods.application_collection
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get("/login",cors(),(req,res)=>{
})



app.post("/login",async(req,res)=>{
    const{username,password}=req.body

    try{
        const checkExist=await student_collection.findOne({username:username})
        const checkMatch=await student_collection.findOne({username:username, password:password})
        const userIsClubLeader = await student_collection.findOne({username:username, userIsClubLeader: true})
        if(!checkExist){
            res.json("notexist")
        }
        else if (!checkMatch){
            res.json("notmatch")
        }
        else{
            if (userIsClubLeader){
                res.json("successLeader")
            }
            else{
                res.json("successStudent")
            }
        }

    }
    catch(e){
        res.json("fail")
    }

})


app.post("/signup",async(req,res)=>{
    const{username, email,password,userIsClubLeader}=req.body

    const data={
        username: username,
        email:email,
        password:password,
        userIsClubLeader:userIsClubLeader
    }

    try{
        const check=await student_collection.findOne({username:username})

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

app.post("/clubs",async(req,res)=>{
    const {clubname} = req.body
    try{
        const check = await club_collection.findOne({clubname:clubname})

        if(check){
            res.json("exist") 
        }
        else{
            res.json()
        }

    }
    catch(e){
        res.json()
    }
})

app.get("/addclub", (req, res)=>{
    
}) 

app.post("/application", async(req, res)=>{
    const answerList = req.body.answer_list
    // const questionList = ["Name", "Email", "Gender", "YearOfGraduation", "Birthday"]
    // for (const i = 0; i < answerList.length; i++){
    //     questionList[i] = answerList[i]


    // }
    const name = answerList[0]
    const email = answerList[1]
    const gender = answerList[2]
    const yearOfGraduation = answerList[3]
    const birthday = answerList[4]
    console.log("This is backend")
    console.log(answerList)
    const data = {
        name: name,
        email: email,
        gender: gender,
        yearOfGraduation: yearOfGraduation,
        birthday: birthday,
    }
    console.log(name)
    try{
        const check=await application_collection.findOne({name:name})

        if(check){
            res.json("exist")
            
        }
        else{
            await application_collection.insertMany([data])
            console.log("YES!")
            res.json("added")

        }

    
    }
    catch(e){
        res.json("fail") }
})

app.post("/addclub",async(req,res)=>{
    const{clubname, foundingTime, tagsList, clubdescription, requirement, cs, math, physics, economics, ds, me} = req.body

    const data={
        clubname: clubname,
        foundingTime : foundingTime, 
        // tagsList : tagsList, 
        clubdescription : clubdescription, 
        requirement : requirement,
        cs:cs,
        math:math, physics:physics, economics:economics, ds:ds, me:me
        
    }

    try{
        const check=await club_collection.findOne({clubname:clubname})

        if(check){
            res.json("exist")
            
        }
        else{
            await club_collection.insertMany([data])
            res.json("added")
        }
        
    }
    catch(e){
        res.json("fail")
    }

})

app.get("/clubs", async (req, res) => {
    try {
        const clubs = await club_collection.find({});
        //const payload = JSON.stringify(clubs)
        console.log(clubs)
        res.json(clubs)
    } catch (e) {
        console.log("Error!")
        console.log(e)
        res.json(e)
    }
})

app.listen(8000,()=>{
    console.log("port connected");
})

