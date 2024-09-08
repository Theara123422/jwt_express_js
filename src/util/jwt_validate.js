import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();
const validateToken = (request,response,next) => {
    //1.in header include authorization or not
    //2.check token 
    const authHeader = request.headers['authorization'];
    console.log(authHeader);

    if(authHeader){
        const token = authHeader.split(' ')[1].trim();
        jwt.verify(token,process.env.jwt_secret_key,(error,result)=>{
            if(error) return response.status(500).json({
                message : "Invalid Token"
            })
            next();
        })
    }
    else{
        response.status(401).json({
            message : "Unauthorized"
        })
    }
}

export default validateToken;