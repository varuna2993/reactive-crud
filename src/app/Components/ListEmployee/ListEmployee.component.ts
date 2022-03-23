import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/Services/Employee.service';

@Component({
  selector: 'app-listemployee',
  templateUrl: './ListEmployee.component.html',
  styleUrls: ['./ListEmployee.component.css']
})
export class ListEmployeeComponent implements OnInit {
  employeeList:any = [];
  currentPage:number = 1;
  totalItems:number = 0;
  itemPerPage:number = 2;
  expandMap:any = {};
  constructor(public employeeService:EmployeeService){

  }
  
  ngOnInit(): void {
    this.getInitalData();
  }

  changePage(page:number){
    if (page < 1) page = 1;
    if (page >this.numPages()) page = this.numPages();
  }

  numPages(){
    return Math.ceil(this.totalItems / this.itemPerPage);
  }
  paginate (array:any, page_size:any, page_number:any) {
    return array.slice((page_number-1) * page_size, (page_number) * page_size);
  }
  deleteEmployee(employeeID:string){
    var r = confirm("Are you sure");
    if(r){
      this.employeeService.deleteEmployee(employeeID);
      this.getInitalData();
    }
  }
  getInitalData(){
    this.employeeList = this.employeeService.getEmployeeList();
    this.totalItems = this.employeeList.length;
  }
  editEmployee(employeeID:string){
    this.expandMap[employeeID] = true;
  }
  undoEditEmployee(employeeID:string){
    delete this.expandMap[employeeID];
  }
  employeeSavedFunction(event:string){
    this.undoEditEmployee(event);
    this.getInitalData();
  }
}