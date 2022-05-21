const mysql = require('mysql2');
const dotevn = require('dotenv')

dotevn.config({path:'./.env'})


db =   mysql.createConnection({
        
    host:process.env.HOST,
    user:process.env.USER,
    password:"",
    database:process.env.DATABASE,
    port:process.env.DATABASE_PORT
})
   
db.connect(err=>{

        if(err){console.log(err,'err.......,');
            return (err);}
            console.log("hey wow")
            return db
    })