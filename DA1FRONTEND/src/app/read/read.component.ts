import { Component, OnInit } from '@angular/core';
import {ApiserviceService} from '../apiservice.service';
 
@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {

  constructor(private service:ApiserviceService) { }

  readData:any;
  successmsg:any;
  cautionmsg:any;

  ngOnInit() {
    this.getAllData();
  }

  deleteID(id:any)
  {
    console.log(id,'mail send id==>',id)
    
    this.service.deleteData(id).subscribe((res)=>
    {console.log(res,'delete res==>');
    this.successmsg = res.message;
    this.getAllData();
    });
}

sendMailID(id:any)
  {

    const input = document.getElementById('receviers-email') as HTMLInputElement | null;
  const receviers_email = input?.value;
  const input2 = document.getElementById('senders-email') as HTMLInputElement | null;
  const senders_email = input?.value;
  
  if(receviers_email=='')

    console.log(id,'sendMail id==>',id)
    
    this.service.sendMail(id).subscribe((res)=>
    {console.log(res,'send mail res==>',);
    this.successmsg = res.message;
    this.getAllData();
    });
  }
  

getAllData()
{
  this.service.getAllData().subscribe((res)=>{
    console.log(res,"res==>");
    this.readData=res.data;
  })
}

}
