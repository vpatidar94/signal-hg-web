import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";
import { DataService } from  '../../Services/data.service';

@Component({
  selector: 'app-my-nutrition-description',
  templateUrl: './my-nutrition-description.component.html',
  styleUrls: ['./my-nutrition-description.component.scss']
})
export class MyNutritionDescriptionComponent implements OnInit {

  public loading:boolean = false;
  public dietDetail:any ={};


  constructor(private route: Router, public commonservice: DataService) { 
    this.dietDetail =JSON.parse(localStorage.getItem('sw_DietDetail'));
  }

  ngOnInit(): void {
  }

}
