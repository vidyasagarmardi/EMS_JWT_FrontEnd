import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from 'src/app/models/employee.model';
import { EmpServiceService } from 'src/app/services/employee/emp-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  empList!: Employee[];

  empForm! : FormGroup;

  constructor(
    private fb : FormBuilder,
    private empService : EmpServiceService
  ){}
  ngOnInit(): void {

    this.getEmployeeList();

    this.empForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      address: [null, [Validators.required]],
      phone: [null, [Validators.required]]
    })
  }

  getEmployeeList(){
    this.empService.getEmployees().subscribe(
      data => {
        console.log(data);
        this.empList = data.Data;
      }
    )
  }

  deleteEmp(id: number){
    console.log("employee id to delete",id);
    this.empService.deleteEmployee(id).subscribe(
      data => {
        console.log("The delete Employee is:",data);
        this.getEmployeeList();
      }
    )
  }

  submitForm(){
    console.log(this.empForm.value);
   
    this.empService.addEmployee(this.empForm.value).subscribe(
      data => {
        console.log(data);
        this.empForm.reset();
        this.getEmployeeList();
      }
    )
  }

}
