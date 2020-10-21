import { Router } from '@angular/router';
import { ApiService } from './../../service/api.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import {FormControl} from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { faRedo, faAddressBook, faMoneyCheck, faInfo, faHashtag } from '@fortawesome/free-solid-svg-icons';
import {ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class EmployeeCreateComponent implements OnInit {
  faRedo = faRedo;
  faMoneyCheck= faMoneyCheck;
  faAddressBook = faAddressBook;
  faInfo = faInfo
  faHashtag = faHashtag;
  employeeCreateForm: FormGroup;
  submitted = false;
  displayFiled = true;
  returnUrl: "";
  public today = new Date();
  employeeProfile: string[] = ['Finance', 'BDM', 'HR', 'Sales', 'Admin'];
  Employee: any = [];
  gender: string[] = ['Female', 'Male'];
  Option: string[] = [
    'O -ve',
    'O +ve',
    'A -ve',
    'A +ve',
    'B -ve',
    'B +ve',
    'AB -ve',
    'AB +ve',
  ];
  successMsg:string;
  filteredOptions: Observable<string[]>;
  
  panelOpenState = false;
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) {
    this.mainForm();
  }
  create() {
    this.router.navigateByUrl('/create-employee');
  }
  readEmployee() {
    this.apiService.getEmployees().subscribe((data) => {
      this.Employee = data;
    });
  }
  ngOnInit() {
    this.displayFiled = true;
  }
  
  mainForm() {
    this.employeeCreateForm = this.fb.group({
      name: [''],
      email1: [''],
      email2: [''],      
      designation: [''],
      phonenumber1: [],
      phonenumber2: [],
      gender: [''],
      city: [''],
      state: [''],
      address1: [''],
      address2: [''],
      area: [''],
      pincode: [],
      dob: [''],
      joindate: [''],
      bankac: [],
      bankifsc: [''],
      bankupi: [''],
      aadhar: [],
      pan: [''],
      bloodgroup: [''],
      photo: [''],
      referred: [''],
      comments: [''],
      linkedin: [''],
      facebook: [''],
      twitter: [''],
      instagram: [''],
      pinterest: [''],
      youtube: [''],
    });
  }
  resetForm() {
    Swal.fire({
      text: 'Are you sure you want to reset ?',
      width: 300,
      showCancelButton: true,
      cancelButtonText: 'No',
      cancelButtonColor: '#ff0000',
      confirmButtonText: 'Yes',
      confirmButtonColor: '#008000',
    }).then((result) => {
      if (result.value) {
        window.location.reload();
      }
    });
  }
  redirect() {
    // this.router.navigate("/patients");
    Swal.fire({
      text: 'Are you sure you want to cancel it ?',
      width: 300,
      showCancelButton: true,
      cancelButtonText: 'No',
      cancelButtonColor: '#ff0000',
      confirmButtonText: 'Yes',
      confirmButtonColor: '#008000',
    }).then((result) => {
      if (result.value) {
        this.router.navigateByUrl('/create-employee');
      }
    });
  }
  disableEnterKey(e) {
    if (e.keyCode === 13) {
      return false;
    } else {
      return true;
    }
  }

  // Choose designation with select dropdown
  updateProfile(e) {
    this.employeeCreateForm.get('designation').setValue(e, {
      onlySelf: true,
    });
  }

  // Getter to access form control
  get myForm() {
    return this.employeeCreateForm.controls;
  }


  onSubmit() {
    console.log("submit pressed")
    if (!this.employeeCreateForm.valid) {
      console.log("problem!!!!")
      return false;
    } else {
      console.log("before apiService")
      this.apiService.createEmployee(this.employeeCreateForm.value).subscribe(
        (res) => {
          this.successMsg="Registration successful for"+" "+this.employeeCreateForm.get("name").value+"!";
          console.log('Employee successfully created!');
          Swal.fire({
            text: this.successMsg,
            width: 300,
            showCancelButton: false,
            cancelButtonText: 'Cancel',
            cancelButtonColor: '#ff0000',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#008000',
          }).then((result) => {
            if (result.value) {
              window.location.reload();
            }
          });
          this.ngZone.run(() => this.router.navigateByUrl('/employees-list'))
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }


}
