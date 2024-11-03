import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Register } from '../common/register';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
errormsg:string = '';
successmsg:string = '';
constructor(private formBuilder:FormBuilder,
  private register:RegisterService
){}
registerFormGroup!:FormGroup;

ngOnInit(): void {
    this.registerFormGroup = this.formBuilder.group({
      register: this.formBuilder.group({
        name:[''],
        pwd:[''],
        email:[''],
        phno:['']
      })
    });
}

onSubmit()
{
  let register = new Register();
  register= this.registerFormGroup.get('register')?.value;
  this.register.register(register).subscribe(
    respone => {
      this.successmsg = respone;
    },
    error => {
      this.successmsg = error;
    }
  )
}
}
