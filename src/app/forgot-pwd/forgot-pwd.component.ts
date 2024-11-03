import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ForgotPwdService } from '../services/forgot-pwd.service';

@Component({
  selector: 'app-forgot-pwd',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgot-pwd.component.html',
  styleUrl: './forgot-pwd.component.css'
})
export class ForgotPwdComponent implements OnInit {
  errormsg: string = '';
  successmsg: string = '';
  forgotpwdFormGroup!: FormGroup
  constructor(private formbuilder: FormBuilder, private forgotpwd: ForgotPwdService) { }
  ngOnInit(): void {
    this.forgotpwdFormGroup = this.formbuilder.group({
      forgot: this.formbuilder.group({
        email: ['']
      })
    });
  }
  onSubmit() {
    const email = this.forgotpwdFormGroup.get('forgot')?.get('email')?.value;
    this.forgotpwd.sendMail(email).subscribe(response => {
      if (response) {
        this.successmsg = "Email Sent Successfully";
        this.errormsg = '';
      } else {
        this.successmsg = "";
        this.errormsg = "Please enter a valid email";
      }
    },
      error => {
        this.successmsg = "";
        this.errormsg = "Some exception occured";
      }
    );
    this.forgotpwdFormGroup.reset();
  }
}
