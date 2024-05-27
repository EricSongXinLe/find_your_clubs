const express = require("express")
const methods = require("./mongo")
const student_collection = methods.student_collection
const club_collection = methods.club_collection
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

app.post("/addclub",async(req,res)=>{
    const{clubname} = req.body

    const data={
        clubname: clubname,
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
//Potential Bugs here!!!!
app.post('/favorite/:id', async (req, res) => {
    const { id } = req.params;
    const { userId, favorite } = req.body; 
  
    try {
      const user = await student_collection.findById(userId);
  
      if (favorite) {
        // Add club to favorites
        if (!user.favClubs.includes(id)) {
          user.favClubs.push(id);
        }
      } else {
        // Remove club from favorites
        user.favClubs = user.favClubs.filter(favId => favId.toString() !== id);
      }
  
      await user.save();
      res.status(200).json({ message: 'Favorites updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });
//added end
app.listen(8000,()=>{
    console.log("port connected");
})

