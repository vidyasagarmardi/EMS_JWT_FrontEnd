import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmpServiceService } from 'src/app/services/employee/emp-service.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit{

  constructor(
    private fb : FormBuilder,
    private empService : EmpServiceService,
    private router : Router
  ){}

  loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    })
  }

  submitForm(){
    console.log(this.loginForm.value);
    this.empService.login(this.loginForm.value).subscribe(
      data => {
        console.log(data.token);
        localStorage.setItem('token',data.token);
        this.router.navigateByUrl("/dashboard");
      }
    )
  }

}
