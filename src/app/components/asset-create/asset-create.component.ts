import { Router } from '@angular/router';
import { ApiService } from './../../service/api.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import {FormControl} from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { faRedo, faAddressBook, faMoneyCheck, faInfo } from '@fortawesome/free-solid-svg-icons';
import {ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-asset-create',
  templateUrl: './asset-create.component.html',
  styleUrls: ['./asset-create.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AssetCreateComponent implements OnInit {

  faRedo = faRedo;
  faMoneyCheck= faMoneyCheck;
  faAddressBook = faAddressBook;
  faInfo = faInfo
  assetCreateForm: FormGroup;
  submitted = false;
  displayFiled = true;
  returnUrl: "";
  public today = new Date();
  employeeProfile: string[] = ['Finance', 'BDM', 'HR', 'Sales', 'Admin'];
  Asset: any = [];
  gender: string[] = ['Female', 'Male'];
  AssetCategory: string[] = [
    'IT',
    'Furniture',
    'Canteen',
    'Electronics',
  ];
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
    this.router.navigateByUrl('/asset-create');
  }
  readAsset() {
    this.apiService.getAsset().subscribe((data) => {
      this.Asset = data;
    });
  }
  ngOnInit() {
    this.displayFiled = true;
    
  }
  
  mainForm() {
    this.assetCreateForm = this.fb.group({
      assetcategory: [''],
      name: [''],
      quantity: [],      
      measurement: [''],
      vendorname: [''],
      price: [],
      date: [''],
      receiver: [''],
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
        this.router.navigateByUrl('/asset-create');
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
    this.assetCreateForm.get('designation').setValue(e, {
      onlySelf: true,
    });
  }

  // Getter to access form control
  get myForm() {
    return this.assetCreateForm.controls;
  }


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
    if (!this.assetCreateForm.valid) {
      console.log("problem!!!!")
      return false;
    } else {
      console.log("before apiService")
      this.apiService.createAsset(this.assetCreateForm.value).subscribe(
        (res) => {
          console.log('Asset successfully created!');
          Swal.fire({
            text: 'Asset successfully created!',
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
