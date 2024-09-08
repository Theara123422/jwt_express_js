import express from 'express';
import userRouter from './src/routes/userRoutes.js';
import pool from './src/db/db_connect.js';
import validateToken from './src/util/jwt_validate.js';
const app = express();

app.use(express.json());
//database initialize
pool.getConnection((error,connection) => {
    if(error) return console.log("Failed Connection");
    console.log("Success");
    connection.release();
})
//route
app.use('/user', userRouter);


//required token to use
app.get('/' , validateToken , (request,response) => {
    response.status(200).json({
        message : "Hello"
    })
})


app.listen(3000 , () => {
    console.log(`Server is running on http://localhost:3000`);
    
})