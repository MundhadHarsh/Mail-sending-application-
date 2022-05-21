const express= require( 'express') ;
const bodyparser =require('body-parser');
const cors =require('cors') ;
const app= express();
const mysql = require('mysql2');
const nodemailer = require('nodemailer' );
var http = require('http');
const request = require("request");
var bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport'); 
const bcrypt = require('bcrypt');
const localStrategy= require('passport-local').Strategy;
const hbs = require('nodemailer-express-handlebars')
const dotevn = require('dotenv')
const express1 = require('./express');
const authentication = require('./userAuth')
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
var mysql2 = require('mysql2/promise');
const MySQLStore = require('express-mysql-session')(session);



dotevn.config({path:'./.env'})

app.use(cors ()) ;
app.use(bodyparser.json());



app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());


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

const oneDay = 1000 * 60 * 60 * 24;

// app.use(session({
//     secret:"secretkey",
//     saveUninitialized:true,
//     resave: false,
//     cookie: { httpOnly: false,maxAge: oneDay },
//     saveUninitialized:true

// })
// );

var options = {
    host:process.env.HOST,
	port: process.env.DATABASE_PORT,
	user:process.env.USER,
    password:"",
	database: 'session_test',
 }
 var connection = mysql2.createPool(options);

 var sessionStore =  new MySQLStore({},connection)
//---- database details ---------------
//const db = express1.createDatabsePool(mysql)


//---- database connection ---------------
//express1.connectDb(db);

function setUser(req,res,next){
    const userID = req.body.userID
    if(userID)
    {req.uesr=users.find(user=> user.id === userId)}
    next( )
}
//--------------------------------------------------------------------
app.get('/', function(req, res){

 });
//--------------------------------------------------------------------

// express1.homepage(app,db);
express1.readAllCust(app,db);
express1.readCust(app,db);
express1.createCust(app,db);
express1.updateCust(app,db);
express1.deleteCust(app,db);
express1.mailRequest(app,);
express1.listenAt(app,process.env.SERVER_PORT);


