import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from 'src/app/services/user/user-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit{

  registerForm!: FormGroup ;

  selectedOption: string = '';
  options = [
    { label: 'ADMIN', value: 'ADMIN' },
    { label: 'USER', value: 'USER' }
  ];

  constructor(
    private userService: UserServiceService,
    private fb: FormBuilder
  ) {}

  onOptionChange() {
    console.log('Selected Option:', this.selectedOption);
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      role: [null, [Validators.required]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]]
    }, { validator: this.passwordValidator })
  }

  passwordValidator(formGroup: FormGroup){
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    if(password!=confirmPassword)
      formGroup.get('confirmPassword')?.setErrors({ passwordMismatch:true});
    else
      formGroup.get('confirmPassword')?.setErrors(null);
  }

  submitForm(){
    console.log(this.registerForm.value);
    // this.userService.register(this.registerForm.value).subscribe(
    //   data => {
    //     console.log(data);
    //   }
    // )
  }

}
