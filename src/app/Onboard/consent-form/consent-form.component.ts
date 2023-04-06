import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms'; 
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { DataService } from  '../../Services/data.service';
import { GlobalService } from '../../Services/global.service';
declare var $;

@Component({
  selector: 'app-consent-form',
  templateUrl: './consent-form.component.html',
  styleUrls: ['./consent-form.component.scss']
})
export class ConsentFormComponent implements OnInit {


  public categoryList: any = [];
  public fontList: any = [];
  public selectedData : any ={};
  public categoryId:any ='';
  public subCategoryId:any= '';
  public currentStep :any =1;
  public submittedData:any ={};
  public minDate:any=new Date();
  public loginInfo: boolean ;
  public helpSpinner: boolean = false;
  public submitted: boolean = false;
  public currentuserloggedin : any =[];
  public lattitude: any;
  public longitude: any;
  public currentData :any ={};
  public currentStatus:boolean =false;

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
  get f() { return this.HelpUsForm.controls; }

  secondForm = new FormGroup({
    parent_name: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),
    child_name: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),  
    city: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),  
    state: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),  
    limited1: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),  
    limited2: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),  
    release1: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),  
    release2: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),  
    result1: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),  
    result2: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),  
    location: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),  
    date1: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),  
    auth_signature1: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),  
    client_signature1: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),
  })
  get sf() { return this.secondForm.controls; }

  thirdForm = new FormGroup({
    check1: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),  
    address: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),  
    name1: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),
    phone: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[1-9][0-9]{8,200}')
    ])),
    auth_signature2: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),  
    client_signature2: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),

  })
  get tf() { return this.thirdForm.controls; }

  forthForm = new FormGroup({
    activity_7: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),  
    activity_6: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),  
    activity_5: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),  
    activity_4: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),  
    activity_3: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),  
    activity_2: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),  
    activity_1: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),  
    check2: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),
    auth_signature3: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),  
    client_signature3: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),

  })
  get ff() { return this.forthForm.controls; }

  fifthForm = new FormGroup({
    signature: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),  
    check3: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),  
    date2: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),  
    name2: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),  

  })
  get fvf() { return this.fifthForm.controls; }

  sixForm = new FormGroup({    
    name3: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),  
    question_1: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),  
    question_2: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),  
    question_3: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),  
    question_4: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),  
    question_5: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),  
    question_6: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),  
    question_7: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),  
    question_8: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),  
    question_9: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),  
    question_10: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),  
    question_11: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),  
    question_12: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),  
    question_13: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),  
    question_14: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),  
    question_15: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),
    question_16: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),
    question_17: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),
    question_18: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),
    question_19: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),
    question_20: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),
    question_21: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),
    question_22: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),
    question_23: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),
    question_24: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),
    question_25: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),
    question_26: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),
    question_27: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),
    question_28: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),
    question_29: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),
    question_30: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),
    question_31: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),
    question_32: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),
    question_33: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),
    question_34: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),
  })
  get sxf() { return this.sixForm.controls; }

  sevenForm = new FormGroup({
    user_type: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),  
    check4: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),

    card_number: new FormControl('',Validators.compose([
      Validators.required
    ])),
    cvv_no: new FormControl('',Validators.compose([
      Validators.required
    ])), 
    expiry: new FormControl('',Validators.compose([
      Validators.required
    ])),
    card_holder_name: new FormControl('',Validators.compose([
      Validators.required
    ]))

  })
  get snf() { return this.sevenForm.controls; }

  ngOnInit(): void {
    this.getCategories();
    this.getSubmittedData();
    this.getFonts();
    // $(document).ready(function () {
      var current_fs, next_fs, previous_fs; //fieldsets
      var opacity;
      var status = this.currentStatus;

      $(".next").click(function () {
        // if(status == true){
          current_fs = $(this).parent();
          next_fs = $(this).parent().next();
 
          //Add Class Active
          $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
 
          //show the next fieldset
          next_fs.show();
          //hide the current fieldset with style
          current_fs.animate({ opacity: 0 }, {
             step: function (now) {
                // for making fielset appear animation
                opacity = 1 - now;
 
                current_fs.css({
                   'display': 'none',
                   'position': 'relative'
                });
                next_fs.css({ 'opacity': opacity });
             },
             duration: 600
          });
        // } else {
        //   alert('Please fill all detail');
        // }
     
      });

      $(".previous").click(function () {

         current_fs = $(this).parent();
         previous_fs = $(this).parent().prev();

         //Remove class active
         $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

         //show the previous fieldset
         previous_fs.show();

         //hide the current fieldset with style
         current_fs.animate({ opacity: 0 }, {
            step: function (now) {
               // for making fielset appear animation
               opacity = 1 - now;

               current_fs.css({
                  'display': 'none',
                  'position': 'relative'
               });
               previous_fs.css({ 'opacity': opacity });
            },
            duration: 600
         });
      });

      $('.radio-group .radio').click(function () {
         $(this).parent().find('.radio').removeClass('selected');
         $(this).addClass('selected');
      });

      $(".submit").click(function () {
         return false;
      })

  //  });
  }

  nextprev(){
    this.currentStatus = this.getcurrentSubmitData();
    if(this.currentStatus){
      this.onSubmit();
    }

  }

  getSubmittedData(){
    var url ="superadmin/webservices/api/get_user_registration_step";
    this.commonservice.GetApi(url).subscribe(((response :any ) =>{
      if(response.status ==1){
        this.submittedData = response.data;
      }
    }))
  }

  getCategories(){
    var url = "superadmin/webservices/api/get_category_list";
    this.commonservice.GetApi(url).subscribe((response : any) => {
      if(response.status == 1){
        response.data.filter(function (el){
          el.status = false;
          el.sub_category_child.filter(function (ell){
            ell.status = false;
          })
        })
        this.categoryList = response.data;
      } else
      {

      }
    })
  }

  getFonts(){
    var url = "superadmin/webservices/api/get_font_list";
    this.commonservice.GetApi(url).subscribe((response : any) => {
      if(response.status == 1){
        this.fontList = response.data;
      } else
      {

      }
    })
  }

  getCategoryID(event){
    var selected;
    this.categoryList.filter(function (el){
      if(el.id == event.target.value){
        el.status = event.target.checked;
        selected = el;  
      } else {
        el.status =false;
      }
    })
    this.categoryId = event.target.value;
    this.selectedData = selected;
  }

  getsubCategoryID(event){
    this.subCategoryId = event.target.value;
    if(this.selectedData.id == this.categoryId){
      this.selectedData.sub_category_child.filter (function (el){
        if(el.id == event.target.id){
          el.status = event.target.checked;
        }
      })
    } else {
      return false;
    }
   
  }

  onSubmit(){
    var detail ={    
      "user_id":JSON.parse(localStorage.getItem('sw_parentId')),
      "step":this.currentStep,
      "json_step_data":this.currentData
    };
    if(detail.json_step_data == false){
      return false;
    } else {
      var url = "superadmin/webservices/api/signal_registration_from";
      this.commonservice.PostApi(detail,url).subscribe((response : any) => {
        if(response.status == 1){
          this.getSubmittedData();
        } else
        {
  
        }
      }) 
    }
  }
  
  getcurrentSubmitData(){
    if(this.currentStep == 1){
      if(this.categoryId== '' || this.subCategoryId == ''){
        return false;
      } else{
        this.currentData={'category_id':this.categoryId,'subcategory_id':this.subCategoryId};
        return true;
      }
    } else  if(this.currentStep == 2){
      if(this.secondForm.valid){
      this.currentData={'parent_name':this.categoryId,'child_name':this.subCategoryId,'city':this.categoryId,'state':this.subCategoryId,'limited1':this.categoryId,'limited2':this.subCategoryId,'release1':this.categoryId,'release2':this.subCategoryId,'result1':this.categoryId,'result2':this.subCategoryId,'location':this.categoryId,'date1':this.subCategoryId,'auth_signature':this.categoryId,'client_signature':this.subCategoryId};
      return true;
    } else{
      return false;
    } ;
    } else  if(this.currentStep == 3){
      if(this.thirdForm.valid){
      this.currentData={'name1':this.categoryId,'phone':this.subCategoryId ,'address':this.categoryId,'check3':this.subCategoryId,'auth_signature1':this.categoryId,'client_signature1':this.subCategoryId};
      return true;

    } else{
      return false;
    } ;
    } else  if(this.currentStep == 4){
      if(this.forthForm.valid){
      this.currentData={'activity_1':this.categoryId,'activity_2':this.subCategoryId,'activity_3':this.categoryId, 'activity_4':this.categoryId,'activity_5':this.categoryId,'activity_6':this.categoryId,'activity_7':this.categoryId, 'check4':this.categoryId,'auth_signature2':this.categoryId,'client_signature2':this.subCategoryId};
      return true;

    } else{
      return false;
    } ;
    } else  if(this.currentStep == 5){
      if(this.fifthForm.valid){
      this.currentData={'name2':this.categoryId,'date2':this.subCategoryId, 'check5':this.categoryId,'signature':this.categoryId,};
      return true;

    } else{
      return false;
    } ;
    } else  if(this.currentStep == 6){
      if(this.sixForm.valid){
      this.currentData={ 'name3': this.categoryId,'question_1': this.categoryId,  
       'question_2': this.categoryId,  
       'question_3': this.categoryId,  
       'question_4': this.categoryId,  
       'question_5': this.categoryId,  
       'question_6': this.categoryId,  
       'question_7': this.categoryId,  
       'question_8': this.categoryId,  
       'question_9': this.categoryId,  
        'question_10': this.categoryId,  
        'question_11': this.categoryId,  
        'question_12': this.categoryId,  
        'question_13': this.categoryId,  
        'question_14': this.categoryId,  
        'question_15': this.categoryId,
        'question_16': this.categoryId,
        'question_17': this.categoryId,
        'question_18': this.categoryId,
        'question_19': this.categoryId,
        'question_20': this.categoryId,
        'question_21': this.categoryId,
        'question_22': this.categoryId,
        'question_23': this.categoryId,
        'question_24': this.categoryId,
        'question_25': this.categoryId,
        'question_26': this.categoryId,
        'question_27': this.categoryId,
        'question_28': this.categoryId,
        'question_29': this.categoryId,
        'question_30': this.categoryId,
        'question_31': this.categoryId,
        'question_32': this.categoryId,
        'question_33': this.categoryId,
        'question_34': this.categoryId,};
        return true;
      } else{
        return false;
      } ;
    } else  if(this.currentStep == 7 ){
      var user_type = this.categoryId;
      return false;
    } else  if(this.currentStep == 8){
      this.currentData={'param_1':this.categoryId,'param_2':this.subCategoryId};
      return false;
    } else {
      var today = new Date();
      var currYear = today.getFullYear();
      var month =  today.getMonth() + 1;
      var newmonth;
      if(month < 10){
        newmonth = '0'+ month;
      }      
      var expired = this.sevenForm.value.expiry.split('/');
  
      if((expired[0] < newmonth && expired[1] <=  currYear )||  expired[1] <  currYear) {
        this.global.dangerAlert('Expiry Month & Year is not valid')
        return false;
      }
      this.sevenForm.value.expiry_month =expired[0];
      this.sevenForm.value.expiry_year =expired[1];
      if(this.sevenForm.valid){
        this.currentData={'user_type':this.categoryId,'check4':this.subCategoryId,
        "card_holdername" : this.sevenForm.value.card_holder_name,
        "card_token" : this.sevenForm.value.token,
        "number" : this.sevenForm.value.card_number,
        "expiry_month" : this.sevenForm.value.expiry_month,
        "expiry_year" : this.sevenForm.value.expiry_year,
        "cvv" : this.sevenForm.value.cvv_no,
        }
        return true;
      } else{
        return false;
      } ;
    }
  }

  handleAddressChange(address: any) {
    this.lattitude = address.geometry.location.lat();
    this.longitude = address.geometry.location.lng();
    this.secondForm.controls['location'].setValue(address.formatted_address);
    // this.userregister1.value.location_name = address.name;
    // this.otherData.street = address.name;
    for(var i = 0; i < address.address_components.length; i++){
      var state = address.address_components[i].types[0];
      if(state == "administrative_area_level_1"){
        // this.otherData.state = address.address_components[i].long_name;
        // this.userregister1.value.state = address.address_components[i].long_name;
      }
      var city = address.address_components[i].types[0];
      if(city == "administrative_area_level_2"){
        // this.userregister1.value.city = address.address_components[i].long_name;
        // this.otherData.city = address.address_components[i].long_name;
      }
      var country = address.address_components[i].types[0];
      if(country == "country"){
        // this.userregister1.value.country = address.address_components[i].long_name;
        // this.otherData.country = address.address_components[i].long_name; 
      }
      var postal_code =  address.address_components[i].types[0];
      if(postal_code == "postal_code"){
        // this.zipcode = address.address_components[i].long_name; 
      }
    }
}
}
