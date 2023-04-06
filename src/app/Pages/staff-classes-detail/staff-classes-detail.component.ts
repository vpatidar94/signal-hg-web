import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { Location } from '@angular/common';
import { SlidesOutputData, OwlOptions } from 'ngx-owl-carousel-o';  
import { DataService } from  '../../Services/data.service';
import { GlobalService } from '../../Services/global.service';
declare var $;

@Component({
  selector: 'app-staff-classes-detail',
  templateUrl: './staff-classes-detail.component.html',
  styleUrls: ['./staff-classes-detail.component.scss']
})
export class StaffClassesDetailComponent implements OnInit {

  public loading : boolean = false;
  public businessDetail : any = [];
  public classDetail : any = [];
  public CustomerDetail : any = [];
  public CurrentUrl :any;
  public navData : any =[];
  public ID : any =[];
  public check_type: any ='';
  public gender : any= '';
  public checkStatus : any ;
  public checkStatusval : any ;
  public instrustorData : any =[] ;
  public StaffType : boolean;
  public userInfo : any = [] ;
  public QuestionShhet : any =[];
  public q4_answer2 : any = [{'id': 1, 'checked': false, 'text':'Cold or flu like symptoms: Headache, Fever, Cough'} ,{'id': 3, 'checked': false, 'text':'Chest pain'},{'id': 2, 'checked': false, 'text':'Difficulty breathing'}];
  public q4_answer1 : any = [{'id': 1, 'checked': false, 'text':'Cold or flu like symptoms: Headache, Fever, Cough'} ,{'id': 3, 'checked': false, 'text':'Chest pain'},{'id': 2, 'checked': false, 'text':'Difficulty breathing'}];
  public covid_status : any;
  public customerId : any;
  public attandancceId : any;
  public PurchasedPassData : any = [];
  public PassID : any;

  public eventDetail_Options: OwlOptions = {
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
        items: 1,
        loop: true,
      },     
      1280: {
        items: 2,
        loop: true,
      }
    },
  }
  slideConfig = {"slidesToShow": 1, "slidesToScroll": 1};


  constructor(public global :GlobalService,private route: Router,  private activeRoute: ActivatedRoute, public commonservice: DataService, private location :Location) { 
    this.CurrentUrl = this.route.url;  
    localStorage.setItem('sw_backUrl', this.CurrentUrl) ; 
    this.userInfo =JSON.parse(localStorage.getItem('sw_loginDetail'));
    this.businessDetail = JSON.parse(localStorage.getItem('sw_BusinessDetail'));
    this.navData =this.location.getState();
    if(this.navData.Id){
      localStorage.setItem('sw_classDetailId', JSON.stringify(this.navData.Id));
    }
    if(this.route.getCurrentNavigation().extras.state ==  undefined) {    
      if(localStorage.getItem('sw_classDetailId')){
        this.ID= JSON.parse(localStorage.getItem('sw_classDetailId'));
      }
    } else {      
      if(localStorage.getItem('sw_classDetailId')){
        this.ID= JSON.parse(localStorage.getItem('sw_classDetailId'));
      }
    } 
  }

  ngOnInit(): void {
    this.getclassDetail();
    
  }

  getclassDetail(){
    var today = new Date();
    var send_date;
    var currYear = today.getFullYear();
     send_date = this.global.toTimestamp(today.toUTCString());;   

    if(this.ID.currentdate){
      send_date = this.ID.currentdate;
    }
    this.loading = true;
    var detail ,url ;
    if(this.CurrentUrl == "/workshop-detail"){
      url ='superadmin/webservices/instructor/workshop_details';
      detail={ "pageid":"1",    "business_id":this.businessDetail.business_id,    "workshop_id":this.ID.id,    "customer_type":this.gender,     "checkedin_type":this.check_type ,"select_dt":send_date};
      this.commonservice.PostApi(detail,url).subscribe(((response : any) => {
        if(response.status == 1){
          response.data.scheduled_date_new = this.global.dateConvert(response.data.scheduled_date);
          response.data.end_date_utc_new = this.global.dateConvert(response.data.end_date_utc);

                // time conversion

                response.data.from_time_new = this.global.timeConvert(response.data.from_time_utc);
                response.data.to_time_new = this.global.timeConvert(response.data.to_time_utc);
          if(response.data.customer_details.length != 0)
          {var self= this;
            response.data.customer_details.filter(function (el){
            // var birthyear = el.date_of_birth.split('-');
            // var age = currYear - birthyear[0];
            // el.age = age;
            el.age = self.global.ageCalculation(el.date_of_birth);

          })
        }

         
          if(response.data.timeframe.length != 0){
            var self = this;
            response.data.timeframe.filter(function (el){              
              if( self.userInfo.id == el.id){
                self.StaffType = true;
              }
              el.from_time_new = self.global.timeConvert(el.from_time);
              el.to_time_new = self.global.timeConvert(el.to_time);
            })
          }

          this.classDetail = response.data;        
          this.instrustorData = response.data.timeframe;
          this.CustomerDetail = response.data.customer_details;
          this.loading = false;
        } else{
          this.loading = false;
        }
      }))
    } else{
      url = 'superadmin/webservices/instructor/class_details';
      detail={ "pageid":"1",    "business_id":this.businessDetail.business_id,    "class_id":this.ID.id, "schedule_id": this.ID.schduleId, "customer_type":this.gender,     "checkedin_type":this.check_type,"select_dt":send_date};
      this.commonservice.PostApi(detail,url).subscribe(((response : any) => {
        if(response.status == 1){
          response.data.scheduled_date_new = this.global.dateConvert(response.data.scheduled_date);
          response.data.end_date_utc_new = this.global.dateConvert(response.data.end_date_utc);
                // time conversion

                response.data.from_time_new = this.global.timeConvert(response.data.from_time_utc);
                response.data.to_time_new = this.global.timeConvert(response.data.to_time_utc);

          if(response.data.timeframe.length != 0){
            var self = this;
            response.data.timeframe.filter(function (el){              
              if( self.userInfo.id == el.id){
                self.StaffType = true;
              }
              el.from_time_new = self.global.timeConvert(el.from_time);
              el.to_time_new = self.global.timeConvert(el.to_time);
            })
          }

          if(response.data.customer_details.length != 0)
          {  var self= this;
            response.data.customer_details.filter(function (el){
            // var birthyear = el.date_of_birth.split('-');
            // var age = currYear - birthyear[0];
            // el.age = age;
            el.age = self.global.ageCalculation(el.date_of_birth);

          if(el.my_passes_details.length != 0){
            el.my_passes_details.filter(function (ell){
              ell.start_date_utc_new = self.global.dateConvert(ell.start_date_utc);
              ell.end_date_utc_new = self.global.dateConvert(ell.end_date_utc);
              ell.checked = false;
          })
        }
      })
        }
     
          this.classDetail = response.data;
          this.instrustorData = response.data.timeframe;
          this.CustomerDetail = response.data.customer_details;
          this.loading = false;
        } else{
          this.loading = false;
        }
      }))
    }
  

  
  }

  getvalue(event,name){
    if(name == 'gender'){
      this.gender = event.target.value;
    } else if(name == 'check'){
      this.check_type = event.target.value;
    } else{
      this.checkStatus = event.target.value;
     this.checkStatusval =event.target.id;
    }
  }
  
  reset(){
    this.gender = this.check_type = '';
    this.getclassDetail();
  }

  ChangePass(type,id, userid, status,attandancceId){    
    if(status == 'notcheckin'){
      // if(this.PurchasedPassData.length == 1){
      //   this.PassID = this.PurchasedPassData[0].pass_id;
      //   this.ChangePass1(type,id, userid, status,attandancceId);
      // } else{
        setTimeout(function(){ $('#passselect').trigger('click'); }, 1000);
      //}
      return false;
    } else{
      this.ChangePass1(type,id, userid, status,attandancceId);
    }
  }

  ChangePass1(type,id, userid, status,attandancceId){  
    var url ='superadmin/webservices/instructor/passes_status_change' ;
    var detail ={ "service_type":type, "service_id":id,  "user_id":userid,  "passes_status":status ,"schedule_id":this.classDetail.schedule_id,'attendance_id':attandancceId,'pass_id':this.PassID};
    this.commonservice.PostApi(detail,url).subscribe(((response : any) => {
      if(response.status == 1){
        this.global.successAlert(response.message);
        this.getclassDetail();
        this.closed();
      } else{
        this.global.dangerAlert(response.message);
      }

    }))
  }

  redirectUrl(id,url,urlcurrent){
    if(urlcurrent){
      // if(this.classDetail.class_end_status == 2){
      //   this.global.dangerAlert('Class is completed');
      //   return false;
      // } else{
      //   // if(this.classDetail.add_customer_status == 1){
      //   //   this.global.dangerAlert('Class is cancelled');
      //   //   return false;
      //   // }
        var detail ={'id':id ,'url':this.CurrentUrl,'sedule_id':this.classDetail.schedule_id};
        this.route.navigate([url],{state:{Id : detail}});
    } else{
      this.route.navigate([url],{state:{Id : id}});
    }
  }

  getCovidInfo(id){
    this.loading = true;
    var q4_sheet = this.q4_answer2, anser_sheet=[];
    this.QuestionShhet =[];  this.q4_answer1=[];
    var detail ={"userid":id,"business_id":this.businessDetail.business_id,    "class_id":this.ID.id,};
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
        this.loading = false;
        $('#Covid19').trigger('click');
      }
    }))

  }

  changeSelection(){
  }
  
  reload(){
    this.q4_answer1.filter(function (ell){
      ell.checked = false;
    })
  }

  getStatusDetail(items){
   this.checkStatus = items.class_status;
   this.customerId = items.id;
   this.attandancceId = items.attendance_id;
   this.PurchasedPassData = items.my_passes_details;
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
    this.checkStatus ='';
  }

  makeActive(){
    setTimeout(()=>{
      var parent = document.querySelector('#purchasePassPopupSlide') as HTMLElement;
    parent.firstElementChild.classList.add('active');
    },500)
  }

  back(){
    if(this.CurrentUrl == "/workshop-detail"){
      this.route.navigate(['/workshopss']);

    } else{
      this.route.navigate(['/classess']);

    }
  }
}
