import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {  AddEmployeeComponent } from './Components/AddEmployee/AddEmployee.component';
import { ListEmployeeComponent } from './Components/ListEmployee/ListEmployee.component';

const routes: Routes = [
  {path:'employee/add', component:AddEmployeeComponent},
  {path:'employee/list', component:ListEmployeeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
