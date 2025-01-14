import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

const generateToken = (username) => {
    return jwt.sign(
        username,
        process.env.jwt_secret_key,
        {expiresIn : process.env.jwt_expire_time}
    )
}

export default generateToken;