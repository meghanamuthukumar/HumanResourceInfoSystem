import { Router } from '@angular/router';
import { ApiService } from './../../service/api.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import {FormControl} from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
//import {  } from '@fortawesome/free-solid-svg-icons';
import {ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'app-link-create',
  templateUrl: './link-create.component.html',
  styleUrls: ['./link-create.component.css']
})
export class LinkCreateComponent implements OnInit {
  socialMediaForm: FormGroup;
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) {
    this.mainForm();
  }

  ngOnInit(): void {
  }
  mainForm() {
    this.socialMediaForm = this.fb.group({
      facebook: [''],
      twitter: [''],
      instagram: [''],      
      pinterest: [''],
      linkedin: [],
      youtube: [],
      empid: ['']
    });
  }
  getEmployee(id) {
    this.apiService.getEmployee(id).subscribe(data => {
      this.socialMediaForm.patchValue({
        empid: data[0].empid,
      });
    });
  }/*
  create() {
    this.router.navigateByUrl('/createSocialNetwork');
  }*/
  onSubmit() {
    //this.submitted = true;
    console.log("submit pressed")
    /*Swal.fire({
      text: 'Are you sure you want to Submit ?',
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
    });*/
    if (!this.socialMediaForm.valid) {
      console.log("problem!!!!")
      return false;
    } else {
      console.log("before apiService")
      this.apiService.createLinks(this.socialMediaForm.value).subscribe(
        (res) => {
          console.log('Links successfully Updated!');
          Swal.fire({
            text: 'Link successfully Updated!',
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
          //this.ngZone.run(() => this.router.navigateByUrl('/employees-list'))
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
