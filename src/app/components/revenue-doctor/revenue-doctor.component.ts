import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { faEdit, faEye} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-revenue-doctor',
  templateUrl: './revenue-doctor.component.html',
  styleUrls: ['./revenue-doctor.component.css']
})
export class RevenueDoctorComponent implements OnInit {

  constructor(private httpService: HttpClient) { }
  arrDocs: string [];
  id:string;
  faEye =faEye;
  ngOnInit(): void {
    this.httpService.get('./assets/doctors.json').subscribe(
      data => {
        this.arrDocs = data as string [];	 // FILL THE ARRAY WITH DATA.
        //  console.log(this.arrBirds[1]);
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
  }

}
