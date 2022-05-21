import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-sign-up',
  templateUrl: './login-sign-up.component.html',
  styleUrls: ['./login-sign-up.component.css']
})
export class LoginSignUpComponent implements OnInit {

  constructor() {

    const input = document.getElementById('forms-section') as HTMLInputElement | null;
    input?.addEventListener('click', (clickEvent: MouseEvent) => {
      console.log('Click Event Details: ', clickEvent)

     
    // document.getElementById("forms")!.addEventListener('click', (clickEvent: MouseEvent) => {
    // console.log('Click Event Details: ', clickEvent)
  
})

  
  // switchers.forEach(item =>;w {
  //     item.addEventListener('click', function() {
  //       switchers.forEach(item => item.parentElement.classList.remove('is-active'))
  //       this.`parentElement`.classList.add('is-active')
  //     })
  //   })
    
  
  
  }

  ngOnInit(): void {  } 

  toggle(){

  }
}


