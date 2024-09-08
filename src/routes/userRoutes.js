import { Router } from "express";
import generateToken from "../util/generate_token.js";
import pool from "../db/db_connect.js";
const userRouter = Router();

userRouter.post('/signup' , (request,response) => {
    const { username , email , password } = request.body;

    if(!username && !email && !password){
        response.status(400).json({
            message : 'Invalid Data'
        })
    }
    pool.query(`INSERT INTO tb_users (username,email,password) VALUES(?,?,?)`,[username,email,password] ,(error,result) =>{
        if(error) return response.status(500).json({
            message : "Something went wrong"
        })
        response.status(200).json({
            message : "Sign Up Success",
            token : generateToken({username})
        })
    })
})



export default userRouter;