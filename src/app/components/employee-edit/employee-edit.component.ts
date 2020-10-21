import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from './../../service/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import Swal from 'sweetalert2';
import {FormControl} from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { faRedo, faAddressBook, faMoneyCheck, faInfo, faHashtag } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})

export class EmployeeEditComponent implements OnInit {
  faRedo = faRedo;
  faMoneyCheck= faMoneyCheck;
  faAddressBook = faAddressBook;
  faInfo = faInfo
  faHastag = faHashtag;
  submitted = false;
  editForm: FormGroup;
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
  public today = new Date();
  filteredOptions: Observable<string[]>;
  panelOpenState = false;
  successMsg:string;
  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.updateEmployee();
    let id = this.actRoute.snapshot.paramMap.get('empid');
    this.getEmployee(id);
    this.editForm = this.fb.group({
      name: [''],
      email1: [''],
      email2: [''],      
      designation: [''],
      phonenumber1: [''],
      phonenumber2: [''],
      gender: [''],
      city: [''],
      state: [''],
      address1: [''],
      address2: [''],
      area: [''],
      pincode: [''],
      dob: [''],
      joindate: [''],
      bankac: [''],
      bankifsc: [''],
      bankupi: [''],
      aadhar: [''],
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
    })
  }

  // Choose options with select-dropdown
  updateProfile(e) {
    this.editForm.get('designation').setValue(e, {
      onlySelf: true
    })
  }

  // Getter to access form control
  get myForm() {
    return this.editForm.controls;
  }

  getEmployee(empid) {
    this.apiService.getEmployee(empid).subscribe(data => {
      this.editForm.patchValue({
        name: data[0].name,
        designation: data[0].designation,
        email1: data[0].email1,
        email2: data[0].email2,      
        dob: data[0].dob,
        gender: data[0].gender,
        joindate: data[0].joindate,
        address1: data[0].address1,
        address2: data[0].address2,
        area: data[0].area,
        pincode: data[0].pincode,
        city: data[0].city,
        state: data[0].state,
        bankifsc: data[0].bankifsc,
        bankupi: data[0].bankupi,
        pan: data[0].pan,
        bloodgroup: data[0].bloodgroup,
        referred: data[0].referred,
        comments: data[0].comments,
        photo: data[0].photo,
        phonenumber1: data[0].phonenumber1,
        phonenumber2: data[0].phonenumber2,
        bankac: data[0].bankac,
        aadhar: data[0].aadhar,
        facebook: data[0].facebook,
        pinterest: data[0].pinterest,
        linkedin: data[0].linkedin,
        twitter: data[0].twitter,
        instagram: data[0].instagram,
        youtube: data[0].youtube,

      });
    });
  }

  updateEmployee() {
    this.editForm = this.fb.group({
      name: [''],
      email1: [''],
      email2: [''],      
      designation: [''],
      phonenumber1: [''],
      phonenumber2: [''],
      gender: [''],
      city: [''],
      state: [''],
      address1: [''],
      address2: [''],
      area: [''],
      pincode: [''],
      dob: [''],
      joindate: [''],
      bankac: [''],
      bankifsc: [''],
      bankupi: [''],
      aadhar: [''],
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
    })
  }

  onSubmit() {
    this.submitted = true;
    if (!this.editForm.valid) {
      return false;
    } else {
        let id = this.actRoute.snapshot.paramMap.get('empid');
        this.apiService.updateEmployee(id, this.editForm.value)
          .subscribe(res => {
            this.router.navigateByUrl('/employees-list');
            console.log('Content updated successfully!')
            this.successMsg="Content updated successfully for"+" "+this.editForm.get("name").value+"!";
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
          }, (error) => {
            console.log(error)
          })
    }
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
        this.router.navigateByUrl('/employees-list');
      }
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

}