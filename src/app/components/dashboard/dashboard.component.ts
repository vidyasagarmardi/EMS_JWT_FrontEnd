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

  empList! : Employee[];
  selectedEmpId : number = 0;
  empForm! : FormGroup;
  modalTitle! : string;
  infoMessage! : string;
  selectedEmp! : Employee;

  constructor(
    private fb : FormBuilder,
    private empService : EmpServiceService
  ){}
  ngOnInit(): void {

    this.getEmployeeList();

    this.empForm = this.fb.group({
      firstName: [null, [Validators.required]],
      middleName: [null],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      address: [null, [Validators.required]],
      phone: [null, [Validators.required]]
    })
  }

  selectedEmployee(id: number){
    this.selectedEmpId = id;
  }

  onAddEmp(){
    this.modalTitle = "Add Employee";
  }

  onUpdateEmp(id: number){
    this.selectedEmpId = id;
    this.modalTitle = "Update Employee";
    this.empService.getEmployeeById(id).subscribe(
      data => {
        console.log("emp data: ",data.Data);
        this.selectedEmp = data.Data;
        this.empForm.patchValue({
          firstName: this.selectedEmp.firstName || ' ',
          middleName: this.selectedEmp.middleName || ' ',
          lastName: this.selectedEmp.lastName || ' ',
          email: this.selectedEmp.email || ' ',
          address: this.selectedEmp.address || ' ',
          phone: this.selectedEmp.phone || ' '
        })
      }
    );
  }

  getEmployeeList(){
    this.empService.getEmployees().subscribe(
      data => {
        console.log(data);
        this.empList = data.Data;
      }
    )
  }

  deleteEmp(){
    console.log("employee id to delete",this.selectedEmpId);
    if(this.selectedEmpId!=null){
      this.empService.deleteEmployee(this.selectedEmpId).subscribe(
        data => {
          console.log("The delete Employee is:",data);
          this.getEmployeeList();
          this.selectedEmpId = 0;
        }
      );
    }
  }

  clearForm(){
    this.empForm.reset();
    this.selectedEmpId=0;
  }

  updateEmp(){
    this.empService.updateEmployee(this.empForm.value,this.selectedEmpId).subscribe(
      data => {
        console.log("Updated Employee : ",data.Data);
        this.getEmployeeList();
        this.selectedEmpId = 0;
        this.infoMessage = "Employee updated successfully.";
      }
    );
  }

  addEmp(){
    this.empService.addEmployee(this.empForm.value).subscribe(
      data => {
        console.log(data);
        this.empForm.reset();
        this.infoMessage = "Employee added successfully.";
      }
    );
  }

  submitForm(){
    if(this.selectedEmpId!=0)
      this.updateEmp();
    else
      this.addEmp();
  }

}
