const router = require('express').Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

//UPDATE
router.put("/:id",async (req,res)=>{
    if(req.params.id=== req.body.userId) 
    {
        if(req.body.password)
        {
            const salt = await bcrypt.genSalt(10);
            console.log(req.body.password);
            req.body.password =await bcrypt.hash(req.body.password,salt);
            try{
                const updatedUser= await User.findByIdAndUpdate(req.params.id,{
                    $set:req.body,
                },{new:true});
                res.status(200).json(updatedUser);
            }
            catch(err){
                res.status(500).json(err);
            }
        }
    }
    else{
        res.status(401).json("you can update only your account");
    }
})

//DELETE
router.delete("/:id",async (req,res)=>{
    if(req.params.id === req.body.userId)
    {
        try{
            const user = await User.findById(req.params.id);
            try{
                await Post.deleteMany({username:req.body.username});
                await User.findByIdAndDelete(req.params.id);

                res.status(200).json('successfully deleted');
            }
            catch(err)
            {
                res.status(500).json(err);
            }
        }
        catch(err)
        {
            res.status(404).json("User not found");
        }
    }
    else
    {
        res.status(404).json("you can delete only your account!");
    }
})

//GET
router.get("/:id",async (req,res)=>{
    if(req.params.id===req.body.userId)
    {
        try{
            const user =await User.findById(req.params.id);
            const {password,...others} =user._doc;
            res.status(200).json(others)
        }
        catch(err){

        }
    }
    else
    {
        res.status(500).json("your not allowed to get other user data")
    }
})

module.exports = router;