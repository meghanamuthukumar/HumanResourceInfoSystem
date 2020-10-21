import { Component, OnInit } from '@angular/core';
import { Employee } from '../../model/employee';
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from './../../service/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import Swal from 'sweetalert2';
import {FormControl} from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { faRedo, faAddressBook, faMoneyCheck, faInfo } from '@fortawesome/free-solid-svg-icons';
import { faEdit, faEye, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FaStackItemSizeDirective } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-employee-view',
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.css']
})
export class EmployeeViewComponent implements OnInit {

  
  Employee:any = [];
  faEdit = faEdit;
  loaded:boolean;
  constructor(
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
  ) {
    this.readEmployee();
  }
  
  ngOnInit() {
    this.loaded=true;
  }
  
  readEmployee(){
    console.log("before paramMap")
    let id = this.actRoute.snapshot.paramMap.get('empid');
    console.log(id)
    this.apiService.getEmployee(id).subscribe((data) => {
     this.Employee = data;
     this.loaded=false;
    })    
  }
  readLink(){
    console.log("before paramMap")
    let id = this.actRoute.snapshot.paramMap.get('empid');
    console.log(id)
    this.apiService.getLink(id).subscribe((data) => {
     this.Employee = data;
     this.loaded=false;
    })    
  }
  

}
