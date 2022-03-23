import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from 'src/app/Models/Employee';
import { EmployeeService } from 'src/app/Services/Employee.service';

@Component({
    selector: 'app-addemployee',
    templateUrl: './AddEmployee.component.html',
    styleUrls: ['./AddEmployee.component.css']
})
export class AddEmployeeComponent implements OnInit {
    @Input() employeeId: string = '0';
    @Output() employeeSaved = new EventEmitter<string>();
    employeeForm: any;
    constructor(public employeeService: EmployeeService, public router: Router) {

    }
    designationList: any = ['SE', 'Junior SE', 'Senior SE']
    ngOnInit(): void {
        var employeeObj: Employee = { fname: "", lname: "", contactNumber: "", alternumber: "", email: "", checkAddress: false, permAddress: "", tempAddress: "", designation: "", employeeId: "" };
        if (this.employeeId != '0') {
            employeeObj = this.employeeService.getEmployeeByID(this.employeeId);
        }
        console.log(this.employeeId);

        this.employeeForm = new FormGroup({
            fname: new FormControl(employeeObj["fname"]),
            lname: new FormControl(employeeObj["lname"]),
            contactNumber: new FormControl(employeeObj["contactNumber"], [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
            alternumber: new FormControl(employeeObj["alternumber"]),
            email: new FormControl(employeeObj["email"], Validators.compose([Validators.required, Validators.email])),
            checkAddress: new FormControl(employeeObj["checkAddress"]),
            permAddress: new FormControl(employeeObj["permAddress"], [Validators.required, Validators.pattern("^[-@.\\/$>&%,#&+\\w\\s]*$")]),
            tempAddress: new FormControl(employeeObj["tempAddress"], [Validators.required, Validators.pattern("^[-@.\\/$>&%,#&+\\w\\s]*$")]),
            designation: new FormControl(employeeObj["designation"]),

        });

        this.validate(employeeObj["checkAddress"]);
    }

    onSubmit() {
        if (this.employeeForm.valid) {
            console.log(this.employeeForm.value);
            var employeeObj = this.employeeForm.value;
            if (this.employeeId != '0') {
                //update case
                employeeObj["employeeId"] = this.employeeId;
                this.employeeService.updateEmployee(employeeObj);
            } else {
                //create case

                employeeObj["employeeId"] = this.employeeService.generateUniqueID();
                this.employeeService.createEmployee(employeeObj);
                this.router.navigate(['/employee/list']);
            }
            this.employeeSaved.emit(employeeObj["employeeId"]);

        } else {
            alert("Form is invalid");
        }
    }

    sameAsPermanent(event: any) {
       this.validate(event.target.checked);
    }
    validate(isChecked:boolean){
        if (isChecked) {
            this.employeeForm.controls["tempAddress"].clearValidators();
        } else {
            this.employeeForm.controls["tempAddress"].setValidators([Validators.required, Validators.pattern("^[-@.\\/$>&%,#&+\\w\\s]*$")]);
        }
        this.employeeForm.controls["tempAddress"].updateValueAndValidity()
    }
}