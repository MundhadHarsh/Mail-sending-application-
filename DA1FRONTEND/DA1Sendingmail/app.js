const nodemailer = require('nodemailer' );

const mailOptions ={
from: 'harshmundhada@gmaail.com',
to:'harshmundhada@gmaail.com',
subject: "Email from Node_App : A Test Message" ,
text: "Hello from node"
};

const transporter = nodemailer.createTransport ({
    service:'gmail',
    auth:{
    user: 'harshmundhada@gmail.com',
    pass:'harsh5gmail'
    }    
});
transporter.sendMail(mailOptions, (error, info)=> {
    if (error){
    console.log(error);
    }else{
    console.log('Email send, '+info.response) ;
    }
});