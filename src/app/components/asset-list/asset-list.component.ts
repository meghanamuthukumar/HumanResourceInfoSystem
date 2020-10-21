import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import {Sort} from '@angular/material/sort';
import { faEdit, faEye, faChevronRight, faHashtag, faPencilAlt, faPlus, faRedoAlt } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.css']
})
export class AssetListComponent implements OnInit {
  Asset:any = []; 
 loaded:boolean
 id:string;
 faPencilAlt =faPencilAlt;
  faEdit = faEdit;
  faEye = faEye;
  faPlus = faPlus;
  faRedoAlt =faRedoAlt;
  faHashtag = faHashtag;
 sortedData:any = [];
  constructor(private apiService: ApiService, private router: Router) { 
    this.readAsset();
  }
  
 
  ngOnInit() {
   this.loaded=true;
  }

  readAsset(){
    this.apiService.getAsset().subscribe((data) => {
     this.Asset = data;
     this.loaded=false;
    })    
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
