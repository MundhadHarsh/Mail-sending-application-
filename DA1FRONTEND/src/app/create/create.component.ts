import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {ApiserviceService} from '../apiservice.service'
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private service: ApiserviceService,private router:ActivatedRoute) { }

  errormsg:any;
successmsg:any;
getparamid:any;
inlineRadioOptions: string = ''


  ngOnInit() {
    //console.log(this.router.snapshot.paramMap.get('id'),'getid')
  }

  userForm = new FormGroup({

    'NAME':new FormControl('', Validators.required),
    'EMAIL':new FormControl('', Validators.required),
    'DESCRIPTION':new FormControl('', Validators.required),
    'PHONENUMBER':new FormControl('', Validators.required),
    'INVOICENUMBER':new FormControl('', Validators.required),

    'DAYNMONTH':new FormControl('', Validators.required),
  
    'FREQUENCY':new FormControl('', Validators.required)
  });


  

userSubmit()
{console.log((<HTMLInputElement>document.getElementById('DAYNMONTH')).value, this.userForm.get.toString())
  console.log(this.userForm.value,'-----value before-----')
  if(this.userForm.valid)
{console.log('-----value after-----')


  this.service.createData(this.userForm.value).subscribe((res)=>
  {
    console.log('inside create data ')
    this.successmsg=res.message;
    console.log(res,'-----resume after submission-----');
   
  });
  this.userForm.reset();
  console.log('outside create data ')
}  

  else {this.errormsg = 'all fileds are required ';
  console.log('error agaya bhai');
}   

};


changeLabelName() {
  const input = document.getElementById('DAYNMONTHdatepicker') as HTMLInputElement | null;
  const value1 = input?.value;
  console.log(value1)

  var concat1 = ','
  if( (<HTMLInputElement>document.getElementById('DAYNMONTH')).value==''){ (<HTMLInputElement>document.getElementById('DAYNMONTH')).value = (<HTMLInputElement>document.getElementById('DAYNMONTH')).value +value1!;}
  else{ (<HTMLInputElement>document.getElementById('DAYNMONTH')).value = (<HTMLInputElement>document.getElementById('DAYNMONTH')).value +concat1+value1!;}

  console.log((<HTMLInputElement>document.getElementById('DAYNMONTH')).value)
}  
 
changeLabelName2() {
  const input = document.getElementById('day') as HTMLInputElement | null;
  const value = input?.value;
 
  var concat1 = ','
  if( (<HTMLInputElement>document.getElementById('FREQUENCY')).value==''){(<HTMLInputElement>document.getElementById('FREQUENCY')).value =(<HTMLInputElement>document.getElementById('FREQUENCY')).value +value!;}
  else{(<HTMLInputElement>document.getElementById('FREQUENCY')).value =(<HTMLInputElement>document.getElementById('FREQUENCY')).value +concat1+value!;}
}  

displayradiooption()
{  console.log(this.inlineRadioOptions) }

}
