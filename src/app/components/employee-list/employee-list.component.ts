import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../service/api.service';
import {Sort} from '@angular/material/sort';
import { faEdit, faEye, faChevronRight, faHashtag, faPencilAlt, faPlus, faRedoAlt } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})

export class EmployeeListComponent implements OnInit {
  // post: Post[]
  Employee:any = [];
  faPencilAlt =faPencilAlt;
  items:any = [];
  faEdit = faEdit;
  faEye = faEye;
  faPlus = faPlus;
  faRedoAlt =faRedoAlt;
  faHashtag = faHashtag;
  title = 'Card View Demo';
  gridColumns = 3;
  faAngleRight = faChevronRight;
  id:string;
  date:string;
  loaded:boolean;
  sortedData:any = [];
  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 3 ? 4 : 3;
  }
  constructor(private apiService: ApiService, private router: Router) { 
     this.readEmployee();
  }
  
 
  ngOnInit() {
    // this.apiService.getEmployees().subscribe((data) => {
    //   this.Employee = data;
    //   this.loaded=false;
    //   console.log(this.loaded)
     //})    
     this.loaded=true;
  }
  
  readEmployee(){
    this.apiService.getEmployees().subscribe((data) => {
     this.Employee = data;
     this.loaded=false;
    })    
  }

  removeEmployee(employee, index) {
    if(window.confirm('Are you sure?')) {
        this.apiService.deleteEmployee(employee._id).subscribe((data) => {
          this.Employee.splice(index, 1);
        }
      )    
    }  
  }
  
  redirect() {
    Swal.fire({
      text: 'Are you sure you want to Reload ?',
      width: 300,
      showCancelButton: true,
      cancelButtonText: 'No',
      cancelButtonColor: '#ff0000',
      confirmButtonText: 'Yes',
      confirmButtonColor: '#008000',
    }).then((result) => {
      if (result.value) {
        this.router.navigateByUrl('/employees-list');
      }
    });
  }
}