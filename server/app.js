const express = require("express")
const methods = require("./mongo")
const { MongoClient, GridFSBucket } = require('mongodb');
const multer = require('multer');
const upload = multer({ dest: '../upload/' });
const student_collection = methods.student_collection
const club_collection = methods.club_collection
const application_collection = methods.application_collection
const answer_collection = methods.answer_collection
const cors = require("cors")
const fs = require('fs');
const path = require('path');
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get("/login", cors(), (req, res) => {
})

app.post("/login", async (req, res) => {
    const { username, password } = req.body

    try {
        const checkExist = await student_collection.findOne({ username: username })
        const checkMatch = await student_collection.findOne({ username: username, password: password })
        const userIsClubLeader = await student_collection.findOne({ username: username, userIsClubLeader: true })
        if (!checkExist) {
            res.json("notexist")
        }
        else if (!checkMatch) {
            res.json("notmatch")
        }
        else {
            if (userIsClubLeader) {
                res.json("successLeader")
            }
            else {
                res.json("successStudent")
            }
        }

    }
    catch (e) {
        res.json("fail")
    }

})


app.post("/signup", async (req, res) => {
    const { username, email, password, userIsClubLeader } = req.body

    const data = {
        username: username,
        email: email,
        password: password,
        userIsClubLeader: userIsClubLeader
    }

    try {
        const check = await student_collection.findOne({ username: username })

        if (check) {
            res.json("exist")
        }
        else {
            res.json("notexist")
            await student_collection.insertMany([data])
        }

    }
    catch (e) {
        res.json("fail")
    }

})

app.post("/clubs", async (req, res) => {
    const { clubname } = req.body
    try {
        const check = await club_collection.findOne({ clubname: clubname })

        if (check) {
            res.json("exist")
        }
        else {
            res.json()
        }

    }
    catch (e) {
        res.json()
    }
})

app.post("/club_search", async (req, res) => {
    const { clubname } = req.body
    try {
        const check = await club_collection.findOne({ clubname: clubname })

        if (check) {
            res.json(check)
        }
        else {
            res.json()
        }

    }
    catch (e) {
        res.json()
    }
})

app.get("/addclub", (req, res) => {

})

app.post("/create",async(req,res)=>{
    const {clubName, supplementary_questions} = req.body
    
    const data={
        clubName: clubName,
        supplementaryQuestion: supplementary_questions
    }
    console.log("haha! Add!")
    //console.log(req.body)
    console.log(data)

    try{
        const check=await application_collection.findOne({clubName:clubName})

        if(check){
            res.json("exist")
        }
        else{
            console.log("haha! Add! 222")
            await application_collection.insertMany([data])
            
            console.log("haha! Add! 333")
            res.json("notexist")
        }

    }
    catch(e){
        console.log(e);
        console.log("zhale")
        res.json("fail")
    }

})

app.get("/fetch_question",async(req,res)=>{
    const clubName = req.query.clubName
    try{
        const check = await application_collection.findOne({clubName:clubName})

        if(check){
            res.json(check)
            // console.log(check)
        }
        else{
            res.json()
        }

    }
    catch(e){
        res.json()
    }
})

app.post("/application", async(req, res)=>{
    const {clubName, username, answers} = req.body;
    // const questionList = ["Name", "Email", "Gender", "YearOfGraduation", "Birthday"]
    // for (const i = 0; i < answerList.length; i++){
    //     questionList[i] = answerList[i]
    // }
    const data = {
        clubName: clubName,
        username: username,
        answers: answers
    }
    console.log(data)
    try{
        const check1=await answer_collection.findOne({clubName:clubName});
        const check2=await answer_collection.findOne({username:username});

        if(check1 && check2){
            res.json("exist")
            
        }
        else{
            await answer_collection.insertMany([data])
            console.log("YES!")
            res.json("added")

        }

    
    }
    catch(e){
        console.log(e);
        res.json("fail") }
})

app.get('/fetch_answer', async(req, res)=>{
    const clubName = req.query.clubName;
    try{
        const answers = await answer_collection.find({clubName:clubName}, {clubName:0});
        if(answers){
            res.json(answers);
            console.log(answers)
        }
        else{
            console.log("Not Found");
            res.json("Not Found");
        }    
    }
    catch(e){
        console.log(e);
        res.json("fail")
    }
})

app.get('/search', async (req, res) => {
    const clubname = req.query.clubname;
    // console.log(clubname)
    try {
        const clubdata = await club_collection.findOne({ clubname: clubname })
        // await club_collection.findOne({clubname:clubname})
        if (clubdata) {
            res.json(clubdata)
        }
        else {
            res.json("fail")
        }
    }
    catch (e) {
        res.json("fail")
    }
})

app.get('/random-images', async (req, res) => {
    try {
        const randomClubs = await club_collection.aggregate([{ $sample: { size: 3 } }]);
        const images = randomClubs.map(club => `data:image/jpeg;base64,${club.clubimg.toString('base64')}`);
        res.json(images);
    } catch (e) {
        res.json("fail");
        console.log(e);
    }
});


app.post('/addclub', upload.single('clubimage'), async (req, res) => {
    const { clubname, foundingTime, tagsList, clubdescription, requirement, activityTime, optionalLink } = req.body;
    const file = req.file;
    const data = {}
    
    const tagsList1 = JSON.parse(tagsList)
    console.log(clubname, foundingTime, clubdescription, requirement, activityTime, optionalLink, tagsList1)
    try {
        const check = await club_collection.findOne({ clubname: clubname })
        

        if (check) {
            res.json("exist")
        }

        else {
            if (file) {
                fs.readFile(file.path, async (err, readfile_data) => {
                    if (err) console.log(err);
                    // console.log(readfile_data)
                    await club_collection.insertMany([{
                        clubname: clubname,
                        clubimg: readfile_data,
                        foundingTime: foundingTime,
                        clubdescription: clubdescription,
                        requirement: requirement,
                        tagsList : tagsList1,
                        activityTime: activityTime,
                        optionalLink: optionalLink
                        // cs: cs,
                        // math: math, physics: physics, economics: economics, ds: ds, me: me,
                        
                    }])
                    fs.unlink(file.path, (err) => {
                        if (err) console.error('Error deleting file:', err);
                    });
                });
            }
            res.json("added")
        }

    }
    catch (e) {
        res.json("fail")
    }
});



app.post("/addstupref", async (req, res) => {
    const { username, interestArr } = req.body

    const data = {

    }

    try {
        const check = await student_collection.updateOne({ username: username }, { $set: { interestArr: interestArr } })

        if (check) {
            res.json("added")

        }
        else {

            res.json("fail")
        }

    }
    catch (e) {
        res.json("fail")
    }

})

app.get("/recommendClub",async(req,res)=>{
    const username = req.query.username;
    // console.log("backend", username)
    try{
        let studentInterest=await student_collection.findOne({username:username}, {interestArr:1})
    const stuInterest = studentInterest.interestArr
        
        const allclub = await club_collection.find({tagsList:{
            $in:stuInterest
        }}).limit(3)
        // console.log(allclub[0].clubname)
        if(stuInterest){
            res.json(allclub)
        }
        else{
        
            res.json("fail")
        }
        
    }
    catch(e){
        res.json("fail")
    }

})


app.get('/favclub', async(req, res)=>{
    const username = req.query.username;
    try{
        const favclubdata = await student_collection.findOne({username:username})
        // await club_collection.findOne({clubname:clubname})
        if (favclubdata) {
            res.json(favclubdata)
        }
        else{
            res.json("fail")
        }
    }

    catch(e){
        res.json("fail")
    }
})

app.post("/favclubupdate",async(req,res)=>{
    //console.log(req.body)
    const username = req.body.userId
    var favClubArr = req.body.currUserFavClub
    const clubid = req.body.id
    const data={
    
    }
    //favClubArr.push(clubid)
    try{
        const user=await student_collection.findOne({username:username});
        if (!user) {
            console.error('User not found');
            res.json('fail');
            return;
          }
        console.log(user.favClubs)
        var removela = false;
        if (!favClubArr.includes(clubid)) {
            favClubArr.push(clubid);
            console.log('Updated Favorite Clubs:', favClubArr);
          } else {
            console.log('Remove Club');
            const index = favClubArr.indexOf(clubid);
            if (index !== -1) {
                favClubArr.splice(index, 1);
            }
            console.log("Removed Club:",favClubArr);
            res.json('remove'); 
            removela = true;
          }
        let check=await student_collection.updateOne({username:username}, {$set:{favClubs: favClubArr}})
        const newuser=await student_collection.findOne({username:username});
        console.log("HWG",newuser.favClubs)
        if(!removela){
        if(check){
            res.json("added")
            
        }
        else{
            console.log(check)
            res.json("fail")
        }
    }
    
    }
    catch(e){
        console.log(e)
        res.json("fail")
    }
    
})

app.post("/myfavclub", async (req, res) => {
    const { username } = req.body
    try {
        const user = await student_collection.findOne({ username: username })
        if (!user) {
            console.error('User not found');
            res.json('fail');
            return;
          }
          console.log("Info Fetched: ",user.favClubs)
        res.json("Exist")

    }
    catch (e) {
        res.json("fail")
    }
})

app.listen(8000,()=>{

    console.log("port connected");
})

