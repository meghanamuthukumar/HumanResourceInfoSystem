import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeViewComponent } from './components/employee-view/employee-view.component';
import { EmployeeCreateComponent } from './components/employee-create/employee-create.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';
import { AssetCreateComponent } from './components/asset-create/asset-create.component';
import { AssetListComponent } from './components/asset-list/asset-list.component';
import { RevenueDoctorComponent } from './components/revenue-doctor/revenue-doctor.component';
import { RevenueReportsComponent } from './components/revenue-reports/revenue-reports.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'create-employee' },
  { path: 'create-employee', component: EmployeeCreateComponent },
  { path: 'edit-employee/:empid', component: EmployeeEditComponent },
  { path: 'view-employee/:empid', component: EmployeeViewComponent },
  { path: 'employees-list', component: EmployeeListComponent },
  { path: 'create-asset', component: AssetCreateComponent}  ,
  {path: 'asset-list', component:AssetListComponent},
  {path: 'revenue-doctor', component:RevenueDoctorComponent},
  {path: 'revenue-report', component:RevenueReportsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }