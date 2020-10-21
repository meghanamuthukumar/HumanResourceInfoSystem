import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { faPhone, faEnvelope, faBuilding, faRupeeSign } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-revenue-reports',
  templateUrl: './revenue-reports.component.html',
  styleUrls: ['./revenue-reports.component.css']
})
export class RevenueReportsComponent implements OnInit {

  constructor(private httpService: HttpClient) { }

  arrPatients: string [];
  revenueDoc: string [];
  id:string;
  faPhone = faPhone;
  faEnvelope = faEnvelope;
  faBuilding = faBuilding;
  faRupeeSign = faRupeeSign;
  ngOnInit(): void {
    this.httpService.get('./assets/patients.json').subscribe(
      data => {
        this.arrPatients = data as string [];	 // FILL THE ARRAY WITH DATA.
        //  console.log(this.arrBirds[1]);
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
    this.httpService.get('./assets/revenueByDoctors.json').subscribe(
      data => {
        this.revenueDoc = data as string [];	 // FILL THE ARRAY WITH DATA.
        //  console.log(this.arrBirds[1]);
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );

  }
  

}
