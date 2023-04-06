import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { DataService } from  '../../Services/data.service';
declare var $;

@Component({
  selector: 'app-staff-my-appointment-schedule',
  templateUrl: './staff-my-appointment-schedule.component.html',
  styleUrls: ['./staff-my-appointment-schedule.component.scss']
})
export class StaffMyAppointmentScheduleComponent implements OnInit {

  public businessDetail : any =[];
  public loading : boolean = true;

  constructor(private route: Router,  private activeRoute: ActivatedRoute,  public commonservice: DataService) { 
    this.businessDetail = JSON.parse(localStorage.getItem('sw_BusinessDetail'));
  }
 
  ngOnInit(): void {
  }

}
