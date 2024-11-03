import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ResetPwdService } from '../services/reset-pwd.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Resetpwd } from '../common/resetpwd';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-pwd',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './reset-pwd.component.html',
  styleUrl: './reset-pwd.component.css'
})
export class ResetPwdComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private resetpwd: ResetPwdService, private route: ActivatedRoute) { }
  resetFormGroup!: FormGroup;
  successmsg: string = "";
  emailpresent: boolean = false;

  ngOnInit(): void {
    console.log("ResetPwdComponent initialized");
    
    this.resetFormGroup = this.formBuilder.group({
      reset: this.formBuilder.group({
        newPwd: [''],
        confirmNewPwd: ['']
      })
    });
    this.emailpresent = this.route.snapshot.paramMap.has('email');
  }
  onSubmit() {
    const email = this.route.snapshot.paramMap.get('email')!;
    let rp = new Resetpwd();
    rp = this.resetFormGroup.get('reset')?.value;
    this.resetpwd.resetPwd(rp, email).subscribe(response=>{
      this.successmsg = response
    }, error => {
      this.successmsg = error;
    }
    );
    this.resetFormGroup.reset();
  }
}
