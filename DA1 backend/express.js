const { request } = require('express');
const express= require( 'express') ;
const bodyparser =require('body-parser');
const cors =require('cors') ;
const app= express();
const mysql = require('mysql2');
const nodemailer = require('nodemailer' );
var http = require('http');
var bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport'); 
const bcrypt = require('bcrypt');
const localStrategy= require('passport-local').Strategy;
const hbs = require('nodemailer-express-handlebars')
const dotevn = require('dotenv')
const express1 = require('./express');
const { createConnection } = require('net');
const authentication = require('./userAuth');
const MySQLStore = require('express-mysql-session')(session);
var mysql2 = require('mysql2/promise');

//const Connection = require('mysql2/typings/mysql/lib/Connection');
//app = require('express');

const oneDay = 1000 * 60 * 60 * 24;

// app.use(session({
//     secret:"secretkey",
//     saveUninitialized:true,
//     resave: false,
//     cookie: { httpOnly: false,maxAge: oneDay },
//     saveUninitialized:true

// }));


var options = {
    host:process.env.HOST,
	port: process.env.DATABASE_PORT,
	user:process.env.USER,
    password:"",
	database: 'session_test',
 }
 var connection = mysql2.createPool(options);

 var sessionStore =  new MySQLStore({},connection)
    
 function homepage(app = require('express'),db){

    app.get ("/", (req, res) =>{
    req.session.isAuth= true;
res.send ("heyaaaaaa");
})
}

//server listening at port number
function listenAt(   app1 = require('express'),portNummber){
  app1.listen(`${portNummber}`, ()=> {console.log('server running')})
  return app1;
};

dotevn.config({path:'./.env'})

var db =   mysql.createConnection({
        
    host:process.env.HOST,
        user:process.env.USER,
        password:"",
        database:process.env.DATABASE,
        port:process.env.DATABASE_PORT
    })


function mailRequest(app = require('express'), request = require("request"),transporter=nodemailerCreateTransporter( nodemailer )){

    app.get('/customer/customermail/:id',async(req,res)=>{
     
        let gid= req.params.id;
            
            var jsonpass =await  getCustData(gid,request);
        
     
        const mailOptions ={
            from: process.env.FROMEMAIL,
            to:process.env.TOEMAIL,
            subject: "Remainder for filing Return" ,
            text: `Remainder for filing Return\nCustomer ID -${jsonpass.data[0]['CUSTID']} \nName -${jsonpass.data[0]['NAME']}  \nPhone Number-${jsonpass.data[0]['PHONENUMBER']} \n**Invoice Number**-${jsonpass.data[0]['INVOICENUMBER']} \n**Description**${jsonpass.data[0]['DESCRIPTION']} `,
            template:'index'
        };
        
    
    
        transporter.sendMail(mailOptions, (error, info)=> {
            if (error){
            console.log(error);
            }else{res.send('Email send, '+JSON.parse(info.response));
            console.log('Email send, '+JSON.parse(info.response)) ;
            }
        });
    
    
    })
    
    
}

//creating tansporter
function nodemailerCreateTransporter( nodemailer = require('nodemailer' )){

return transporter = nodemailer.createTransport ({
    service:'gmail',
    auth:{
    user: process.env.EMAIL,
    pass : process.env.EMAILPASSWORD
    }    
});
}


//getting particular customer data funtion
async function getCustData(id, request = require("request"))
{  
  
    // transporter.use('complie',hbs({
    //     viewEngine:'express-handlebars',
    //     viewPath:'./views/'
    // }))


    return new Promise((resolve,reject)=>{

        console.log('inside getcustdata')
        let gID= id;
        let url = `http://localhost:3003/customer/${gID}`;
        var jsonpass;
        request.get(url,(error,reponse,body)=>{
            if (error){
                reject( console.log(error));
               
                
                }
                else{
                    resolve( jsonpass =  JSON.parse(body));
                  
             } 
        })
      return (jsonpass);
           
      });

}
//delete from cusotmer table
function deleteCust(app = require('express'),db){

    app.delete('/customer/:id',(req,res)=>{

        let CUSTID= req.params.id;
        let qr = `delete from customer where CUSTID = ${CUSTID}`
  
        db.query(qr,(err,result)=> {
            
            if(err){console.log(err);}
           
            res.send({message:'data deleted'});
        });
    })

}

//update cusotmer table
function updateCust(app = require('express'),db){
    app.put('/customer/:id',(req,res)=>{

        let NAME=req.body.NAME;
        let EMAIL=req.body.EMAIL;
        let DESCRIPTION=req.body.DESCRIPTION;
        let PHONENUMBER=req.body.PHONENUMBER;
        let FREQUENCY=req.body.FREQUENCY;
        let DAYNMONTH=req.body.DAYNMONTH;
        let INVOICENUMBER=req.body.INVOICENUMBER;
        let DISTINCTDATES=req.body.DISTINCTDATES;
    
    
    
        let qr = `UPDATE customer  SET  NAME = ${NAME }, EMAIL = ${EMAIL }, DESCRIPTION = ${DESCRIPTION },  PHONENUMBER = ${PHONENUMBER },  FREQUENCY = ${FREQUENCY },
        DAYNMONTH = ${DAYNMONTH },INVOICENUMBER = ${INVOICENUMBER } WHERE CUSTID = ${expr}  `
    
        db.query(qr,(err,result)=> {
            
            if(err){console.log(err);}
           
            res.send({message:'data updated'});
        });
        })
    

}

//create in customer tabel
function createCust(app = require('express'),db){
    app.post('/customer',(req,res)=>{

        console.log('postdata');
    
        
        let NAME=req.body.NAME;
        let EMAIL=req.body.EMAIL;
        let DESCRIPTION=req.body.DESCRIPTION;
        let PHONENUMBER=req.body.PHONENUMBER;
        let FREQUENCY=req.body.FREQUENCY;
        let DAYNMONTH=req.body.DAYNMONTH;
        let INVOICENUMBER=req.body.INVOICENUMBER;
        let DISTINCTDATES=req.body.DISTINCTDATES;
    
    
        let qr = `INSERT INTO customer
        ( 
        NAME,
        EMAIL,
        DESCRIPTION,
        PHONENUMBER,
        FREQUENCY,
        DAYNMONTH,
        INVOICENUMBER ) VALUES ( '${NAME }', '${EMAIL }',
            '${DESCRIPTION }', '${PHONENUMBER }', '${FREQUENCY }', '${DAYNMONTH }', '${INVOICENUMBER }')`;
    
   
        db.query(qr,(err,result)=>{
          
            if(err){console.log(err);
          
            console.log(result,'result')
            res.send({message:'in index.js data inserted'});
            }
        });
    
    });
    


}

//reading from customer tabel 
function readAllCust(app = require('express'),db){
 

app.get('/customer',(req,res)=>{

    // req.session.isAuth= true;
    // console.log(req.session)
    // console.log(req.session)
    let qr = 'select * from customer ORDER BY CUSTID desc';
    
    db.query(qr,(err,result)=>{

        if(err)
        {console.log(err,'errs');}

        if(result.length>0)
        {
            console.log(err,'errs well its working');
            res.send({
            message:'all user data',
            data:result
                 })
        }
        else
        {res.send({
            message:'data not found'

        })
        
        ;} 

    })

})

}


//reading particular customer
function readCust(app = require('express'),db){
 
app.get('/customer/:id', (req,res)=>{

let gID= req.params.id;
let qr = `select * from customer where CUSTID= ${gID}`;

db.query(qr,(err,result1)=>{
if(err){console.log(err);}

if(result1.length>0)
{
    res.send({

        message:'get single data',
        data:result1
    });
}
else{
    res.send({
        message:'data not found'
    })
}

});

});

}

//creating database connection
async function createDatabsePool( mysql = require('mysql2')){

//return new Promise((resolve,reject)=>{
 
            
  //          })

           
//            return resolve(a);
    

        
         
    }
//const db =createDatabsePool(mysql)

async function connectDb(db = createDatabsePool(mysql)){
    console.log("whutttttt ",db)
    return new Promise((resolve,reject)=>{
    db.getConnection(err=>{
    
        if(err){console.log(err,'err.......,');
            return reject(err);}
            return resolve(console.log('database connected...'))
    })
      
    
    
    })
}





module.exports ={listenAt,
    mailRequest,
    createCust,
    updateCust,
    readAllCust,
    readCust,
    deleteCust,
    nodemailerCreateTransporter,
    createDatabsePool,
    connectDb,
    homepage} 
    
