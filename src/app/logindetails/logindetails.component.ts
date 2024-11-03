import { Component, OnInit } from '@angular/core';
import { UserRoleService } from '../services/user-role.service';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Login } from '../common/login';
import { LoginserviceService } from '../services/loginservice.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logindetails',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, RouterModule],
  templateUrl: './logindetails.component.html',
  styleUrl: './logindetails.component.css'
})
export class LogindetailsComponent implements OnInit {
  errormsg: string = '';
  isAdmin: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginserviceService,
    private userRoleService: UserRoleService,
    private router: Router
  ) { }
  loginFormGroup!: FormGroup;
  ngOnInit(): void {
    this.loginFormGroup = this.formBuilder.group({
      login: this.formBuilder.group({
        email: [''],
        pwd: ['']
      }),
    });
  }

  onSubmit() {
    let login = new Login();
    login = this.loginFormGroup.get('login')?.value;

    this.isAdmin = this.loginService.checkIfAdmin(login);
    if(this.isAdmin)
    {
      this.userRoleService.setUserRole('adminUser');
      this.loginService.login({token:'dummy-admin-token',user:{role:'adminUser'}});
      this.router.navigateByUrl('/admindashboard');
    } else {
      this.userRoleService.setUserRole('normalUser');
      this.loginService.checkIfValid(login).subscribe(data=>{
        const login = data;
        if(login.email != null)
        {
          this.loginService.login({token:'dummy-user-token',user:{role:'normalUser', email:data.email}});
          this.loginService.session={username:'user'};
          this.userRoleService.setUserRole('normalUser');
          this.router.navigateByUrl(`/order-details/${login.email}`);
        }else{
          this.errormsg = 'Invalid credentials'
        }
      });
    }
    this.loginFormGroup.reset();
  }

}
