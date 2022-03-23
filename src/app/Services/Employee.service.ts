import { Injectable } from '@angular/core';
import { Employee } from '../Models/Employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {


    getEmployeeByID(employeeID:string){
        var employeeList = this.getEmployeeList();
        for (let index = 0; index < employeeList.length; index++) {
            var singleEmployee = employeeList[index];
            if(singleEmployee["employeeId"] == employeeID){
               return employeeList[index];
            }
        }
        return false;
    }

    updateEmployee(employeeObj:Employee){
        var employeeList = this.getEmployeeList();
        for (let index = 0; index < employeeList.length; index++) {
            var singleEmployee = employeeList[index];
            if(singleEmployee["employeeId"] == employeeObj["employeeId"]){
                employeeList[index] = employeeObj;//updating the employee with the new value
            }
        }
        this.saveEmployeeRequest(employeeList);
    }
    createEmployee(employeeObj:Employee){
        
        var employeeList = this.getEmployeeList();
        employeeList.unshift(employeeObj);
        this.saveEmployeeRequest(employeeList);
    }

    deleteEmployee(employeeID:string){
        var employeeList = this.getEmployeeList();
        for (let index = 0; index < employeeList.length; index++) {
            var singleEmployee = employeeList[index];
            if(singleEmployee["employeeId"] == employeeID){
                employeeList.splice(index, 1)//removing the employee from the list
            }
        }
        this.saveEmployeeRequest(employeeList);
    }

    saveEmployeeRequest(employeeList:any){
        //We should post an API here but for the demo purpose I am going to save it to Localtorage
        localStorage.setItem("employeeList",JSON.stringify(employeeList));
    }

    getEmployeeList(){
        var list:any = localStorage.getItem("employeeList");
        if(list != null){
            return JSON.parse(list);
        }else{
            return [];
        }
    }

    generateUniqueID() {
        // http://www.ietf.org/rfc/rfc4122.txt
        var s:any = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";
    
        var uuid = s.join("");
        return uuid;
    }
}