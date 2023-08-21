const express=require("express");
const router=express.Router();

const User=require("../models/User");

const {login, signup}=require("../Controllers/Auth");
const {auth,isStudent,isAdmin}=require("../middlewares/auth");

router.post("/login", login);
router.post("/signup", signup);

//testing protected routes for single middleware
router.get("/test",auth,(req,res)=>{
    res.json({
        success:true,
        message:'Welcome to the Protected route for TESTS',
    });
})

//protected route
router.get("/student",auth,isStudent,(req,res)=>{
    res.json({
        success:true,
        message:'Welcome to the Student route for Students',
    });
})

router.get("/admin",auth,isAdmin,(req,res)=>{
    res.json({
        success:true,
        message:'Welcome to the Admin route for Admin',
    });
})

router.get("/getEmail",auth, async(req,res)=>{

    try{
        const id=req.user.id;
        console.log("id:",id);
        const user=await User.findById(id);

        res.status(200).json({
            success:true,
            user:user,
            message:'welcome to email route'
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            error:error.message,
            message:'something went wrong'
        })
    }

    // const id=req.user.id;
    // console.log("ID:", id);
    // res.json({
    //     success:true,
    //     id:id,
    //     message:'Welcome to Email Route'
    // });
})

module.exports=router;