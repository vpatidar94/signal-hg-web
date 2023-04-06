import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms'; 
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { DataService } from  '../../Services/data.service';
import { GlobalService } from '../../Services/global.service';
declare var $;

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

  public loginInfo: boolean ;
  public helpSpinner: boolean = false;
  public submitted: boolean = false;
  public currentuserloggedin : any =[];

  constructor(public global :GlobalService,private route: Router,  private activeRoute: ActivatedRoute,  public commonservice: DataService) { 
    this.currentuserloggedin = JSON.parse(localStorage.getItem('sw_loginDetail'));
    if(localStorage.getItem('sw_loginDetail')){
      this.loginInfo = true;
    } 
  }
  
  HelpUsForm = new FormGroup({
    email: new FormControl('',Validators.compose([
      Validators.required, Validators.email 
    ])),
    name: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')

    ])),
    phone: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[1-9][0-9]{8,200}')
    ])),
    message: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')

    ])),
  })

   // convenience getter for easy access to form fields
   get f() { return this.HelpUsForm.controls; }

  ngOnInit() {
  }

  SendMessage(){
    this.submitted = true;
    let userdetail = this.HelpUsForm;
    if(userdetail.valid){
      this.helpSpinner = true;
      var detail ={
        name:userdetail.value.name,
          email:userdetail.value.email,
          phone:userdetail.value.phone,
          message:userdetail.value.message,
      }
      var url = 'superadmin/webservices/api/help_contact';
      this.commonservice.PostApi(detail,url).subscribe(((response : any) =>{
        if(response.status == 1){         
          this.global.successAlert(response.message);
          this.helpSpinner = false;
          this.HelpUsForm.reset();
          this.submitted = false;
        } else{
          this.global.dangerAlert(response.message);          
          this.helpSpinner = false;
        }
      }))    
   } else{
      this.helpSpinner = false;
      return false;
    }
  }
}
