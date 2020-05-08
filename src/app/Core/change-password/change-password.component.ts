import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  errorOccured: boolean = false
  errorMessage: string = 'Your new password and conformed password do not match'
  constructor() { }

  ngOnInit(): void {
  }
  changePassword(form: NgForm){
    console.log(form.value)
    // write a custom validator to check if new password and conform password match
  }

}
