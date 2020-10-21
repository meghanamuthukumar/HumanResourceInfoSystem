import { Component, OnInit } from '@angular/core';
import { faUsers, faWeightHanging } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  faUsers = faUsers;
  faWeightHanging = faWeightHanging;
  constructor() { }

  ngOnInit(): void {
  }

}
