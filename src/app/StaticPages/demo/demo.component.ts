import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms'; 
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { DataService } from  '../../Services/data.service';
import { GlobalService } from '../../Services/global.service';
declare var $;

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {

  public demoSpinner: boolean = false;
  public submitted: boolean = false;
  public currentuserloggedin : any =[];
  public baseUrl = this.commonservice.baseUrl;


  constructor(public global :GlobalService,private route: Router,  private activeRoute: ActivatedRoute,  public commonservice: DataService) { 
    this.currentuserloggedin = JSON.parse(localStorage.getItem('sw_loginDetail'));
  }

  demoForm = new FormGroup({
    email: new FormControl('',Validators.compose([
      Validators.required, Validators.email 
    ])),
    first_name: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),
    last_name: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),
    business_name: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),
    phone: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[1-9][0-9]{8,200}')
    ])),
    comment: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),
  })

   // convenience getter for easy access to form fields
   get f() { return this.demoForm.controls; }

  ngOnInit() {
  }

  SendMessage(){
    this.submitted = true;
    let userdetail = this.demoForm;
    if(userdetail.valid){
      this.demoSpinner = true;
      var detail ={
        first_name:userdetail.value.first_name,
        last_name:userdetail.value.last_name,
          email:userdetail.value.email,
          business_name:userdetail.value.business_name,
          phone:userdetail.value.phone,
          comment:userdetail.value.comment,
      }
      var url = 'superadmin/webservices/api/demo';
      this.commonservice.PostApi(detail,url).subscribe(((response : any) =>{
        if(response.status == 1){         
          this.global.successAlert(response.message);
          this.demoSpinner = false;
          this.submitted = false;
          this.demoForm.reset();
        } else{
          this.global.dangerAlert(response.message);          
          this.demoSpinner = false;
        }
      }))    
   } else{
      this.demoSpinner = false;
      return false;
    }
  }
  }