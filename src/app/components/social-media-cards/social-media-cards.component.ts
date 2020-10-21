import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

import { faEdit, faEye, faChevronRight } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-social-media-cards',
  templateUrl: './social-media-cards.component.html',
  styleUrls: ['./social-media-cards.component.css']
})
export class SocialMediaCardsComponent implements OnInit {
  
  faEdit = faEdit;
  faEye = faEye;
  id:string;
  constructor( private apiService: ApiService) { }
    
  Employee:any=[];
  ngOnInit(): void {
    this.readEmployee();
  }

  readEmployee(){
    this.apiService.getEmployees().subscribe((data) => {
     this.Employee = data;
    })    
  }
}
