import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms'; 
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { SlidesOutputData, OwlOptions } from 'ngx-owl-carousel-o';  
import { Location } from '@angular/common';
import { DataService } from  '../../Services/data.service';
import { GlobalService } from '../../Services/global.service';
declare var $;

@Component({
  selector: 'app-client-classes-detail',
  templateUrl: './client-classes-detail.component.html',
  styleUrls: ['./client-classes-detail.component.scss']
})
export class ClientClassesDetailComponent implements OnInit {

  public businessDetail : any =[];
  public navData : any =[];
  public ID : any = [];
  public loading : boolean = true;
  public ClassData : any =[];
  public classStatus: any ;
  public workshopStatus: any;
  public currentUrl : any ;
  public instrustorData : any = [] ;
  public CustomerDetail : any = [];
  public PassData : any = [];
  public PurchasedPassData : any = [];
  public PassID: any;

  public userInfo : any = [] ;
  public submitted : boolean;
  public q1_answer : any;
  public q2_answer : any;
  public q3_answer : any;
  public q4_answer2 : any = [{'id': 1, 'checked': false, 'text':'Cold or flu like symptoms: Headache, Fever, Cough'} ,{'id': 3, 'checked': false, 'text':'Chest pain'},{'id': 2, 'checked': false, 'text':'Difficulty breathing'}];

  public q4_answer1 : any = [{'id': 1, 'checked': false, 'text':'Cold or flu like symptoms: Headache, Fever, Cough'} ,{'id': 3, 'checked': false, 'text':'Chest pain'},{'id': 2, 'checked': false, 'text':'Difficulty breathing'}];

  public q4_answer : any = [{'id': 1, 'checked': false, 'text':'Cold or flu like symptoms: Headache, Fever, Cough'} ,{'id': 3, 'checked': false, 'text':'Chest pain'},{'id': 2, 'checked': false, 'text':'Difficulty breathing'}];
  public q4_answers : any =[];

  public QuestionShhet : any =[];
  public CovidSpinner : any;
  public covid_status : any;
  public punchPassDetail :any = [];
  public timePassDetail :any = [];
  public recurringPassDetail :any = [];

  public passDetail_Options: OwlOptions = {
    loop:true,
    margin:10,
    autoplay: false,
    mouseDrag: true, 
    nav:true, 
    navText: ['<i class="fas fa-long-arrow-alt-left"></i>', '<i class="fas fa-long-arrow-alt-right"></i>'],
    dots: false,
    responsive: {  
      0: {
        items: 1,
        loop: true,
      },
      400: {
        items: 1,
        loop: true,
      },
      740: {
        items: 1,
        loop: true,
      },     
      1000: {
        items: 2,
        loop: true,
      },     
      1280: {
        items: 2,
        loop: true,
      }
    },
  }
  slideConfig = {"slidesToShow": 1, "slidesToScroll": 1};

  constructor(public global :GlobalService,private route: Router,  private activeRoute: ActivatedRoute,  public commonservice: DataService,private location : Location) { 
    this.currentUrl = this.route.url;   
    this.userInfo =JSON.parse(localStorage.getItem('sw_loginDetail'));
    this.businessDetail = JSON.parse(localStorage.getItem('sw_BusinessDetail'));
    this.navData =this.location.getState();
    if(this.navData.Id){
      localStorage.setItem('sw_ClassId', JSON.stringify(this.navData.Id));
    }
    if(this.route.getCurrentNavigation().extras.state ==  undefined) {    
      if(localStorage.getItem('sw_ClassId')){
        this.ID= JSON.parse(localStorage.getItem('sw_ClassId'));
      }
    } else {      
      if(localStorage.getItem('sw_ClassId')){
        this.ID= JSON.parse(localStorage.getItem('sw_ClassId'));
      }
    } 
    this.getClaseDetail();
  }
  
  CovidForm = new FormGroup({
    q1_answer: new FormControl('',Validators.compose([
      Validators.required,
    ])),
    q2_answer: new FormControl('',Validators.compose([
      Validators.required,
    ])),
    q3_answer: new FormControl('',Validators.compose([
      Validators.required,
    ])) ,
    q4_answer: new FormControl('',Validators.compose([
      Validators.required,
    ])),
  })

// convenience getter for easy access to form fields
  get f() { return this.CovidForm.controls; }

  ngOnInit(): void {
    this.getCovidInfo(this.userInfo.id);
  }

  getClaseDetail(){
    var today = new Date();
    var send_date = this.global.ToDate(today);
    if(this.ID.currentdate){
      send_date =this.ID.currentdate;
    }
    this.loading = true;
    var url = 'superadmin/webservices/api/class_details';
    var detail ={  "pageid":"1",  "business_id":this.businessDetail.business_id,  "class_id":this.ID.id ,"select_dt":send_date, "schedule_id":this.ID.schedule_id};
    this.commonservice.PostApi(detail,url).subscribe(((response : any) => {
      if(response.status == 1){
          // Date Conversion UTC
          response.data.start_date_utc_new = this.global.dateConvert(response.data.start_date_utc);
          response.data.end_date_utc_new = this.global.dateConvert(response.data.end_date_utc);
          
          // time conversion
          response.data.from_time_new = this.global.timeConvert(response.data.from_time_utc);
          response.data.to_time_new = this.global.timeConvert(response.data.to_time_utc);
          var self = this;
          if(response.data.customer_details.length != 0)
          { 
            response.data.customer_details.filter(function (el){
            el.Age = self.global.ageCalculation(el.date_of_birth);
          })
        }
              if(response.data.instructor_details.length != 0){
            response.data.instructor_details.filter(function (el){
              el.from_time_new = self.global.timeConvert(el.from_time_utc);
              el.to_time_new = self.global.timeConvert(el.to_time_utc);
            })
          }

            if(response.data.passes_details.length != 0){
              var ageal;
              response.data.passes_details.filter(function (el){
                el.start_date_utc_new = self.global.dateConvert(el.start_date_utc);
                el.end_date_utc_new = self.global.dateConvert(el.end_date_utc);
              if(el.age_restriction =='Over')
              {
                if(self.userInfo.age >= el.age_over_under){
                  ageal = true;
                } else{
                  ageal = false;
                }
              }
              else if(el.age_restriction =='Under')
              
              {
                if(self.userInfo.age < el.age_over_under){
                  ageal = true;
                } else{
                  ageal = false;
                }
              }
              else{
                ageal = true;
              }
              el.ageallow = ageal;
              if(el.pass_type_name == 'Punch Card'){
                self.punchPassDetail.push(el);
              } else if(el.pass_type_name == 'Time Frame')  {
                self.timePassDetail.push(el);
              } else {
                self.recurringPassDetail.push(el);
              }
            })
          }

          if(response.data.my_passes_details.length != 0){
            var ageal;
            response.data.my_passes_details.filter(function (el){
              el.start_date_utc_new = self.global.dateConvert(el.start_date_utc);
              el.end_date_utc_new = self.global.dateConvert(el.end_date_utc);
              el.checked = false;
          })
        }
        self.ClassData = response.data;
        self.instrustorData = response.data.instructor_details;
        self.PassData = response.data.passes_details;
        self.PurchasedPassData = response.data.my_passes_details;

        if(self.PurchasedPassData.length!=0 && response.data.class_status == 0){
          self.classStatus = 1;
        } else{
          self.classStatus = response.data.class_status;
        }
        self.CustomerDetail = response.data.customer_details;

        self.loading = false;
      } else{
        this.loading = false;
      }
    }))
  }

  addFav(id,status){
    this.loading = true;
     var detail ={  "service_type":"2",   "service_id":id,   "status":status};
     var url = 'superadmin/webservices/api/favourite';
     this.commonservice.PostApi(detail,url).subscribe(((response : any) => {
      if(response.status == 1){
        this.global.successAlert(response.message);
        this.loading = false;
        this.getClaseDetail();
      } else{
        this.global.dangerAlert(response.message);    
        this.loading = false;
      }
     }))
   }

  redirectUrl(id,url,urlcurrent){
    if(urlcurrent){     
      if(id.ageallow){
        var detail ={'id':id.pass_id ,'user_booking_id':id.user_booking_id};
        this.route.navigate([url],{state:{Id : detail}});  
      } else{
        this.global.dangerAlert('You are not eligible');
      }
    } else{
      this.route.navigate([url],{state:{Id : id}});
    }
  }
  
  changePassStatus(data, types){  
    this.loading = true; 
    // if(this.workshopStatus == 0 || this.classStatus == 0){
     if(this.PurchasedPassData.length == 0){  
      this.global.dangerAlert("Please purchase the pass");
      window.scroll(0,300);
      //this.loading = false; 
      return false;
    }
    if(data == 'singup'){
      // if(this.PurchasedPassData.length == 1){
      //   this.PassID = this.PurchasedPassData[0].pass_id;
      //   this.loading = false; 
      // } else{ 
        
        //setTimeout(function(){ 
          $('#passselect').trigger('click'); 
        //}, 1000);
        this.loading = false; 
      //}
    } else{
      this.changePassStatus1(data,types);
    }
  }

  changePassStatus1(data, types){  
    this.loading = true; 
    var url = 'superadmin/webservices/api/passes_status_change';
    var detail={  "service_type":types,    "service_id": this.ID.id,    "passes_status":data, "schedule_id":this.ClassData.schedule_id,'pass_id':this.PassID, 'attendance_id':this.ClassData.attendance_id };
    this.commonservice.PostApi(detail,url).subscribe(((response: any) => {
      if(response.status == 1){
       this.global.successAlert(response.message);
       if(data == 'cancel'){
         if(types == "1"){
          this.route.navigate(['/classes']);
         } else{
          this.route.navigate(['/workshops']);
         }
       }
        this.getClaseDetail(); 
       this.getCovidInfo(this.userInfo.id);
       this.loading = false;     
      } else {
        this.global.dangerAlert(response.message)
        this.loading = false;
      }
    }))
  }

  getvalue(event,name){
    
  }

  changeSelection(event){
    this.q4_answers =[];
    var subcatText;  
    this.q4_answer.filter((value, index) => {
      if(value.checked){
        if(subcatText){
          subcatText =  value.id +","+ subcatText;
         }
         else{
          subcatText =  value.id;  
         }
      }
    });
    this.q4_answers.push(subcatText);
  }

  getCovidInfo(userid){
    var q4_sheet = this.q4_answer2, anser_sheet=[];
    var detail ={"userid":userid,"business_id":this.businessDetail.business_id,    "class_id":this.ID.id,};
    var url = 'superadmin/webservices/api/getUserQuestionnaire';
    this.commonservice.PostApi(detail,url).subscribe(((response : any ) => {
      if(response.status == 1){
        this.QuestionShhet = response.data;  
        this.QuestionShhet.covid_status = response.danger_status; 
        if(response.data){
          response.data.filter(function (el){
            if(el.question_id == '4'){
              anser_sheet = el.question_answer;            
            }
          })
          anser_sheet.filter(function (el){
            q4_sheet.filter(function (ell){
              if(ell.id == el){
                ell.checked = true;
              }
            })
          })
        }   
        this.q4_answer1 = q4_sheet;
      }
    }))

  }

  SubmitCovidInfo(){
    this.submitted = true;
    if(!this.q1_answer)
    {this.global.dangerAlert('Question 1-3 are mandatory to answer')
    return false;      
    }
     if(!this.q2_answer)
     {this.global.dangerAlert('Question 1-3 are mandatory to answer')
     return false;      
    }
    if(!this.q3_answer)
    {this.global.dangerAlert('Question 1-3 are mandatory to answer')
      return false;      
    }
    var detail ={"userid":this.userInfo.id,"business_id":this.businessDetail.business_id,    "class_id":this.ID.id,
    "questionnaire": [
           {
               "question_id": "1",
               "question_answer": this.q1_answer
           },
           {
               "question_id": "2",
                "question_answer": this.q2_answer
           },
           {
               "question_id": "3",
                "question_answer": this.q3_answer
           },
           {
               "question_id": "4",
                "question_answer": this.q4_answers
           }
       ]
   };
   var url = 'superadmin/webservices/api/submitQuestionnaire';
   this.commonservice.PostApi(detail,url).subscribe(((response : any) =>{
    if(response.status == 1){
      this.CovidSpinner= false;
      this.changePassStatus('singup','1');
      $('#btn_close21').trigger('click')
      this.closeModal();  
      this.submitted = false;
    } else{
      this.global.dangerAlert(response.message);
    }
   }))
  }

  closeModal(){
    this.q1_answer = this.q2_answer = this.q3_answer = '';
    this.q4_answers =[] ; 
    this.q4_answer.filter(function (ell){
      ell.checked = false;
    })
  } 

  getPassId(event){
    var self= this;
    self.PurchasedPassData.filter(function (el){
      if(el.pass_id == event.target.id){
        el.checked = event.target.checked;
      }
    })
    this.PassID = event.target.id;
  }

  closed(){
    this.PurchasedPassData.filter(function (el){
        el.checked = false;
    });
  }

  makeActive(){
    setTimeout(()=>{
      var parent = document.querySelector('#purchasePassPopupSlide') as HTMLElement;
    parent.firstElementChild.classList.add('active');
    },500)
  }

  CheckInfo(){
    if(this.classStatus == 0){
      this.global.dangerAlert('Please purchase the pass');
      window.scroll(0,1500);
    } else {
      $('#covidForm').trigger('click');
    }
  }

}
