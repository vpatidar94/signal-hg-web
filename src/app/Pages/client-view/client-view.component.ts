import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms'; 
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { DataService } from  '../../Services/data.service';
import { GlobalService } from '../../Services/global.service';
declare var $;

@Component({
  selector: 'app-client-view',
  templateUrl: './client-view.component.html',
  styleUrls: ['./client-view.component.scss']
})
export class ClientViewComponent implements OnInit {

  public loading : boolean = true;
  public businessDetail : any = [];
  public search_text : any;
  public clientDetail : any = [];
  public gender : any = 'male';
  public CountryList : any =[];
  public country_code : any;
  public dob : any;
  maxDate: Date;
  public currentUrl : any;
  public submitted: boolean = false;

  constructor(public global :GlobalService,private route: Router,  private activeRoute: ActivatedRoute,  public commonservice: DataService) { 
    this.currentUrl = this.route.url;    
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDate = new Date().getDate();
    this.maxDate = new Date(currentYear - 18, currentMonth, currentDate); 
    this.businessDetail = JSON.parse(localStorage.getItem('sw_BusinessDetail'));

  }

  addnewClient = new FormGroup({
    name: new FormControl('',Validators.compose([
      Validators.required,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),
    lastname: new FormControl('',Validators.compose([
      Validators.required,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),
    email: new FormControl('',Validators.compose([
      Validators.required,Validators.email])),
    country_code: new FormControl('',Validators.compose([
      Validators.required])),
    mobile: new FormControl('',Validators.compose([
      Validators.required])),
    date_of_birth: new FormControl('',Validators.compose([
      Validators.required])),

  })

// convenience getter for easy access to form fields
  get f() { return this.addnewClient.controls; }

 ngOnInit(): void {
    this.ClientList();
    this.getCountry();

  }

  
  ClientList(){
    var today = new Date();
    var currYear = today.getFullYear();
    var url = 'superadmin/webservices/instructor/client_list';
    var detail = { "pageid":"1", "business_id":this.businessDetail.business_id, "search_val":this.search_text}
    this.commonservice.PostApi(detail,url).subscribe(((response : any) => {
      if(response.status == 1){
        var self = this;
        response.data.filter(function (el){
          el.age = self.global.ageCalculation(el.date_of_birth);

          // var birthyear = el.date_of_birth.split('-');
          // var age = currYear - birthyear[0];
          // el.age = age;
        })
        self.clientDetail = response.data;
        //this.reset();
        self.loading = false;
      } else{
        this.clientDetail = [];
        //this.reset();
        this.loading= false;
      }
    }))
  }

  onAddclient(){
    this.loading = true;
    var newadte;
    if(this.dob){
      newadte = this.global.ToDate(this.dob);
    }
    var s=this.country_code.split('(');
    var s1= s[1].split(')');
    this.submitted = true;
    let userdetail = this.addnewClient;    
    if(userdetail.valid){
      var url = 'superadmin/webservices/instructor/add_client';
      var detail = {"name":userdetail.value.name, "lastname":userdetail.value.lastname, "email":userdetail.value.email,"country_code":s1[0], "mobile":userdetail.value.mobile, "date_of_birth":newadte,"gender":this.gender}
      this.commonservice.PostApi(detail,url).subscribe(((response : any) => {
        if(response.status == 1){
          this.global.successAlert(response.message);
          this.submitted = false;
          this.dob ='';
          this.addnewClient.reset();
          this.ClientList();
          if(this.currentUrl == "/clientview"){
            this.route.navigate(['/appointment']);
          } 
          this.loading = false;
        } else{
          this.global.dangerAlert(response.message);
          this.loading = false;
        }
      }))
    } else{
      this.loading = false;
    }
  }

  redirectUrl(Id){
    this.route.navigate(['/client-detail'],{state:{Id : Id}});
  }
  
  reset(){
    this.search_text ='';
    this.ClientList();
    // this.addnewClient.reset();
    this.submitted = false;
    this.dob ='';
    // this.addnewClient.value.country_code = this.country_code;
  }

  getGender(event){
    this.gender = event.target.value;
  }

  getCountry (){
    var cd , url = 'superadmin/webservices/api/get_countries';
    this.commonservice.GetApi(url).subscribe((response : any) =>{      
      if(response.status == 1){
       response.data.filter(function(el){
         if(el.name== 'United States'){
         cd =  el.name +' ('+el.code+')' ;
         }
       })
       this.CountryList = response.data;
       this.country_code = cd;
       }
    })
  }
}
