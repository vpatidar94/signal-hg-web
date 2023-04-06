import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";
import { DataService } from  '../Services/data.service';
import { GlobalService } from '../Services/global.service';
import { of } from 'rxjs';
import { NgWizardConfig, NgWizardService, StepChangedArgs, StepValidationArgs, STEP_STATE, THEME } from 'ng-wizard';

declare var $: any;


@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class WizardComponent implements OnInit {

  public categoryList: any = [];
  public fontList: any = [];
  public selectedData : any ={};
  public categoryId:any = '';
  public subCategoryId:any = '';
  public platFormFees:any = [];
  public loading:boolean = true;
  public userType:any = "0";
  public payments:boolean = false;
  public text24:boolean = false;
  public currentStep :any =1;
  public submittedData:any ={};
  public minDate:any=new Date();
  public loginInfo: boolean ;
  public helpSpinner: boolean = false;
  public submitted: boolean = false;
  public currentuserloggedin : any =[];
  public lattitude: any;
  public longitude: any;
  public selectedPrice :any;
  public usertypePrice:any;
  public TotalAmount :any ;
  public categoryName:any;
  public subcategoryName:any;

  stepStates = {
    normal: STEP_STATE.normal,
    disabled: STEP_STATE.disabled,
    error: STEP_STATE.error,
    hidden: STEP_STATE.hidden
  };
  config: NgWizardConfig = {
    selected: 0,
    theme: THEME.arrows,
    toolbarSettings: {
      toolbarExtraButtons: [
        // { text: 'Finish', class: 'btn btn-info', event: () => { location.reload(); this.route.navigateByUrl('/home');} }
      ],
    }
  };
  public userId: string;
  constructor(public global :GlobalService,private route: Router,  private activeRoute: ActivatedRoute,  public commonservice: DataService, private ngWizardService: NgWizardService) {
    this.currentuserloggedin = JSON.parse(localStorage.getItem('sw_loginDetail'));
    if(this.currentuserloggedin.consent_status == 7 || this.currentuserloggedin.role_id == 4){
      this.route.navigate(['/home']);
    }
    if(localStorage.getItem('sw_loginDetail')){
      this.loginInfo = true;
      // this.submittedData.step_8_data={};
      this.submittedData.step_7_data={};
      this.submittedData.step_6_data={};
      this.submittedData.step_5_data={};
      this.submittedData.step_4_data={};
      this.submittedData.step_3_data={};
      this.submittedData.step_2_data={};
      this.submittedData.step_1_data={};
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
      Validators.required
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
      Validators.required
    ])),
    address: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),
    name1: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),
    phone: new FormControl('',Validators.compose([
      Validators.required ,Validators.pattern('^[1-9][0-9]{8,10}')
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
      Validators.required
    ])),
    activity_6: new FormControl('',Validators.compose([
      Validators.required
    ])),
    activity_5: new FormControl('',Validators.compose([
      Validators.required
    ])),
    activity_4: new FormControl('',Validators.compose([
      Validators.required
    ])),
    activity_3: new FormControl('',Validators.compose([
      Validators.required
    ])),
    activity_2: new FormControl('',Validators.compose([
      Validators.required
    ])),
    activity_1: new FormControl('',Validators.compose([
      Validators.required
    ])),
    check2: new FormControl('',Validators.compose([
      Validators.required
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
      Validators.required
    ])),
    date2: new FormControl('',Validators.compose([
      Validators.required
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
      Validators.required
    ])),
    question_2: new FormControl('',Validators.compose([
      Validators.required
    ])),
    question_3: new FormControl('',Validators.compose([
      Validators.required
    ])),
    question_4: new FormControl('',Validators.compose([
      Validators.required
    ])),
    question_5: new FormControl('',Validators.compose([
      Validators.required
    ])),
    question_6: new FormControl('',Validators.compose([
      Validators.required
    ])),
    question_7_a: new FormControl('',Validators.compose([
      Validators.required
    ])),
    question_7_b: new FormControl('',Validators.compose([
      Validators.required
    ])),
    question_7_c: new FormControl('',Validators.compose([
      Validators.required
    ])),
    question_7_d: new FormControl('',Validators.compose([
      Validators.required
    ])),

    question_8: new FormControl('',Validators.compose([
      Validators.required
    ])),
    question_9: new FormControl('',Validators.compose([
      Validators.required
    ])),
    question_10: new FormControl('',Validators.compose([
      Validators.required
    ])),
    question_11: new FormControl('',Validators.compose([
      Validators.required
    ])),
    question_12: new FormControl(''),
    question_13: new FormControl(''),
    question_14: new FormControl(''),
    question_15: new FormControl(''),
    question_16: new FormControl(''),
    question_17: new FormControl(''),
    question_18: new FormControl(''),
    question_19: new FormControl(''),
    question_20: new FormControl('',Validators.compose([
      Validators.required
    ])),
    question_21: new FormControl('',Validators.compose([
      Validators.required
    ])),
    question_22: new FormControl('',Validators.compose([
      Validators.required
    ])),
    question_23: new FormControl('',Validators.compose([
      Validators.required
    ])),
    question_24: new FormControl('',Validators.compose([
      Validators.required
    ])),
    question_24_y: new FormControl(''),

    question_25_a: new FormControl('',Validators.compose([
      Validators.required
    ])),
    question_25_b: new FormControl('',Validators.compose([
      Validators.required
    ])),
    question_25_c: new FormControl('',Validators.compose([
      Validators.required
    ])),
    question_25_d: new FormControl('',Validators.compose([
      Validators.required
    ])),
    question_25_e: new FormControl('',Validators.compose([
      Validators.required
    ])),
    question_25_f: new FormControl('',Validators.compose([
      Validators.required
    ])),
    question_26: new FormControl('',Validators.compose([
      Validators.required
    ])),
    question_27: new FormControl('',Validators.compose([
      Validators.required
    ])),
    question_28: new FormControl('',Validators.compose([
      Validators.required
    ])),
    question_29: new FormControl('',Validators.compose([
      Validators.required
    ])),
    question_30: new FormControl('',Validators.compose([
      Validators.required
    ])),
    question_31_a: new FormControl('',Validators.compose([
      Validators.required
    ])),
    question_31_b: new FormControl('',Validators.compose([
      Validators.required
    ])),

    question_32: new FormControl('',Validators.compose([
      Validators.required
    ])),
    question_33: new FormControl('',Validators.compose([
      Validators.required
    ])),
    question_34: new FormControl('',Validators.compose([
      Validators.required
    ])),
    question_skip: new FormControl('',Validators.compose([
      Validators.required
    ])),
  })
  get sxf() { return this.sixForm.controls; }

  sevenForm = new FormGroup({
    user_type: new FormControl('',Validators.compose([
      Validators.required
    ])),
    check4: new FormControl('',Validators.compose([
      Validators.required
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
    // card_holder_name: new FormControl('',Validators.compose([
    //   Validators.required
    // ]))

  })
  get snf() { return this.sevenForm.controls; }

  ngOnInit() {
    this.getCategories();
    this.getFonts();
    this.getPlatformFees();
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

  showPreviousStep(event?: Event) {
    this.ngWizardService.previous();
    if(this.currentStep != 1){
      this.currentStep -= 1;
    }
  }

  showNextStep(event?: Event) {
    if(this.currentStep > this.submittedData.fullfill_step){
      this.ngWizardService.next();
    } else {
      return false;
    }
    if(this.currentStep < 10){
      this.currentStep += 1;
    }
  }

  resetWizard(event?: Event) {
    this.ngWizardService.reset();
  }

  setTheme(theme: THEME) {
    this.ngWizardService.theme(theme);
  }

  stepChanged(args: StepChangedArgs) {
    this.currentStep = args.step.title;
    this.currentStep -= 1;
    if(this.currentStep > 0){
      this.onSubmit();
    } else {
      return false;
    }
  }

  isValidTypeBoolean: boolean = true;

  isValidFunctionReturnsBoolean(args: StepValidationArgs) {
    return true;
  }

  isValidFunctionReturnsObservable(args: StepValidationArgs) {
    return of(true);
  }

  getSubmittedData(){
    var url ="superadmin/webservices/api/get_user_registration_step";
    this.commonservice.GetApi(url).subscribe(((response :any ) =>{
      if(response.status ==1){
        if(response.data.step_1_data != ""){
          var selected,selectprice,categoryname,subcategoryname;
          response.data.step_1_data = JSON.parse(response.data.step_1_data);
          this.categoryId = response.data.step_1_data.category_id;
          this.subCategoryId =response.data.step_1_data.subcategory_id;
          this.categoryList.filter(function (el){
            if(el.id == response.data.step_1_data.category_id){
              el.status = true;
              selected = el;
              categoryname = el.category_name;
            } else {
              el.status =false;
            }
          })
          this.selectedData = selected;
          this.subCategoryId = response.data.step_1_data.subcategory_id;
          this.selectedData.sub_category_child.filter (function (el){
            if(el.id == response.data.step_1_data.subcategory_id){
              el.status = true;
              selectprice = el.price;
              subcategoryname = el.category_name
            }
          })
          this.selectedPrice = selectprice;
          this.subcategoryName = subcategoryname;
          this.categoryName = categoryname;
        }
        if(response.data.step_2_data != ""){
          response.data.step_2_data = JSON.parse(response.data.step_2_data);
        }
        if(response.data.step_3_data != ""){
          response.data.step_3_data = JSON.parse(response.data.step_3_data);
        }
        if(response.data.step_4_data != ""){
          response.data.step_4_data = JSON.parse(response.data.step_4_data);
        }
        if(response.data.step_5_data != ""){
          response.data.step_5_data = JSON.parse(response.data.step_5_data);
        }
        if(response.data.step_6_data != ""){
          response.data.step_6_data = JSON.parse(response.data.step_6_data);
          if(response.data.step_6_data.question_24 == 'Yes'){
            this.text24 = true;
          }
        }
        if(response.data.step_7_data != ""){
          var price;
          response.data.step_7_data = JSON.parse(response.data.step_7_data);
          this.userType = response.data.step_7_data.user_type;
          this.platFormFees.filter(function (el){
            if(el.id == response.data.step_7_data.user_type){
              price = el.value;
            }
          })
          this.usertypePrice = price;
          this.TotalAmount = parseFloat(this.usertypePrice);
          this.payments = true;
        }
        this.submittedData = response.data;
        this.loading = false;
      } else {
        this.loading = false;
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
        this.getSubmittedData();
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

  getPlatformFees(){
    var url = "superadmin/webservices/api/plateform_chareges";
    this.commonservice.GetApi(url).subscribe((response : any) => {
      if(response.status == 1){
        this.platFormFees = response.data;
      } else
      {

      }
    })
  }

  getCategoryID(event){
    var selected;
    this.categoryList.filter(function (el){
      if(el.id == event.target.id){
        el.status = event.target.checked;
        selected = el;
      } else {
        el.status =false;
      }
    })
    this.categoryId = event.target.id;
    this.selectedData = selected;
  }

  getsubCategoryID(event){
    var selectprice;
    this.subCategoryId = event.target.id;
    this.selectedData.sub_category_child.filter (function (el){
      if(el.id == event.target.id){
        el.status = event.target.checked;
        selectprice = el.price;
      }
    })
    this.selectedPrice = selectprice;
  }

  onSubmit(){
    var detail
    if(this.currentStep!= 7){
      detail ={
        "user_id":JSON.parse(localStorage.getItem('sw_parentId')),
        "step":this.currentStep,
        "json_step_data":this.getcurrentSubmitData(),
      };
    } else {
      detail ={
        "user_id":JSON.parse(localStorage.getItem('sw_parentId')),
        "step":this.currentStep,
        "json_step_data":this.getcurrentSubmitData(),
        "card_number" : this.sevenForm.value.card_number,
        "expiry_month" : this.sevenForm.value.expiry_month,
        "expiry_year" : this.sevenForm.value.expiry_year,
        "cvv_no" : this.sevenForm.value.cvv_no,
        "amount":this.TotalAmount
      };
    }

    if(detail.json_step_data == false){
      return false;
    } else {
      var url = "superadmin/webservices/api/signal_registration_from";
      this.commonservice.PostApi(detail,url).subscribe((response : any) => {
        if(response.status == 1){
          this.getSubmittedData();
          if(this.currentStep == 7){
            this.currentuserloggedin.consent_status = 7;
            localStorage.setItem('sw_loginDetail',<any> JSON.stringify(this.currentuserloggedin));
            this.route.navigateByUrl('/home');
          }
        } else {
          this.global.dangerAlert(response.message);
        }
      })
    }
  }

  getcurrentSubmitData(){
    let detail1:any ={};
    if(this.currentStep == 1){
      if(this.categoryId== '' || this.subCategoryId == ''){
        this.global.dangerAlert("Please fill all detail");
        return false;
      } else{
        detail1={'category_id':this.categoryId,'subcategory_id':this.subCategoryId};
        return detail1;
      }
    } else  if(this.currentStep == 2){
      if(this.secondForm.valid){

      detail1={'parent_name':this.secondForm.value.parent_name,'child_name':this.secondForm.value.child_name,'city':this.secondForm.value.city,'state':this.secondForm.value.state,'limited1':this.secondForm.value.limited1,'limited2':this.secondForm.value.limited2,'release1':this.secondForm.value.release1,'release2':this.secondForm.value.release2,'result1':this.secondForm.value.result1,'result2':this.secondForm.value.result2,'location':this.secondForm.value.location,'date1':this.secondForm.value.date1,'auth_signature1':this.secondForm.value.auth_signature1,'client_signature1':this.secondForm.value.client_signature1};
      return detail1;
    } else{
      this.global.dangerAlert("Please fill all detail");
      return false;
    } ;
    } else  if(this.currentStep == 3){
      if(this.thirdForm.valid){
      detail1={'name1':this.thirdForm.value.name1,'phone':this.thirdForm.value.phone ,'address':this.thirdForm.value.address,'check1':this.thirdForm.value.check1,'auth_signature2':this.thirdForm.value.auth_signature2,'client_signature2':this.thirdForm.value.client_signature2};
      return detail1;
    } else{
      this.global.dangerAlert("Please fill all detail");
      return false;
    } ;
    } else  if(this.currentStep == 4){
      if(this.forthForm.valid){
      detail1={'activity_1':this.forthForm.value.activity_1,'activity_2':this.forthForm.value.activity_2,'activity_3':this.forthForm.value.activity_3, 'activity_4':this.forthForm.value.activity_4,'activity_5':this.forthForm.value.activity_5,'activity_6':this.forthForm.value.activity_6,'activity_7':this.forthForm.value.activity_7, 'check2':this.forthForm.value.check2,'auth_signature3':this.forthForm.value.auth_signature3,'client_signature3':this.forthForm.value.client_signature3};
      return detail1;
    } else{
      this.global.dangerAlert("Please fill all detail");
      return false;
    } ;
    } else  if(this.currentStep == 5){
      if(this.fifthForm.valid){
      detail1={'name2':this.fifthForm.value.name2,'date2':this.fifthForm.value.date2, 'check3':this.fifthForm.value.check3,'signature':this.fifthForm.value.signature,};
      return detail1;
    } else{
      this.global.dangerAlert("Please fill all detail");
      return false;
    } ;
    } else  if(this.currentStep == 6){
      if(this.sixForm.valid){
      detail1={ 'name3': this.sixForm.value.name3,
      'question_1': this.sixForm.value.question_1,
       'question_2': this.sixForm.value.question_2,
       'question_3': this.sixForm.value.question_3,
       'question_4': this.sixForm.value.question_4,
       'question_5': this.sixForm.value.question_5,
       'question_6': this.sixForm.value.question_6,
       'question_7_a': this.sixForm.value.question_7_a,
       'question_7_b': this.sixForm.value.question_7_b,
       'question_7_c': this.sixForm.value.question_7_c,
       'question_7_d': this.sixForm.value.question_7_d,
       'question_8': this.sixForm.value.question_8,
       'question_9': this.sixForm.value.question_9,
        'question_10': this.sixForm.value.question_10,
        'question_11': this.sixForm.value.question_11,
        'question_12': this.sixForm.value.question_12,
        'question_13': this.sixForm.value.question_13,
        'question_14': this.sixForm.value.question_14,
        'question_15': this.sixForm.value.question_15,
        'question_16': this.sixForm.value.question_16,
        'question_17': this.sixForm.value.question_17,
        'question_18': this.sixForm.value.question_18,
        'question_19': this.sixForm.value.question_19,
        'question_20': this.sixForm.value.question_20,
        'question_21': this.sixForm.value.question_21,
        'question_22': this.sixForm.value.question_22,
        'question_23': this.sixForm.value.question_23,
        'question_24': this.sixForm.value.question_24,
        'question_24_y': this.sixForm.value.question_24_y,
        'question_25_a': this.sixForm.value.question_25_a,
        'question_25_b': this.sixForm.value.question_25_b,
        'question_25_c': this.sixForm.value.question_25_c,
        'question_25_d': this.sixForm.value.question_25_d,
        'question_25_e': this.sixForm.value.question_25_e,
        'question_25_f': this.sixForm.value.question_25_f,
        'question_26': this.sixForm.value.question_26,
        'question_27': this.sixForm.value.question_27,
        'question_28': this.sixForm.value.question_28,
        'question_29': this.sixForm.value.question_29,
        'question_30': this.sixForm.value.question_30,
        'question_31_a': this.sixForm.value.question_31_a,
        'question_31_b': this.sixForm.value.question_31_b,
        'question_32': this.sixForm.value.question_32,
        'question_33': this.sixForm.value.question_33,
        'question_34': this.sixForm.value.question_34,
        'question_skip': this.sixForm.value.question_skip};
        return detail1;
      } else{
        this.global.dangerAlert("Please fill all detail");
        return false;
      } ;
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
        detail1={'user_type':this.sevenForm.value.user_type,'check4':this.sevenForm.value.check4,
        }
        return detail1;
      } else{
        this.global.dangerAlert("Please fill all detail");
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

  getUserType(event){
    var price;
    this.userType = event.target.value;
    this.platFormFees.filter(function (el){
      if(el.id == event.target.value){
        price = el.value;
      }
    })
    this.usertypePrice = price;
    // this.TotalAmount = parseFloat(this.usertypePrice) + parseFloat(this.selectedPrice);
    this.TotalAmount = parseFloat(this.usertypePrice);
  }

  showcard(event){
    if(event.target.checked == true){
      this.payments = true;
    } else {
      this.payments = false;
    }
  }

  showrequired(event){
    if(event.target.value == 'Yes'){
      this.sixForm.controls['question_12'].setValidators([Validators.required,Validators.min(0.1)]);
      this.sixForm.controls['question_12'].updateValueAndValidity();
      this.sixForm.controls['question_13'].setValidators([Validators.required,Validators.min(0.1)]);
      this.sixForm.controls['question_13'].updateValueAndValidity();
      this.sixForm.controls['question_14'].setValidators([Validators.required,Validators.min(0.1)]);
      this.sixForm.controls['question_14'].updateValueAndValidity();
      this.sixForm.controls['question_15'].setValidators([Validators.required,Validators.min(0.1)]);
      this.sixForm.controls['question_15'].updateValueAndValidity();
      this.sixForm.controls['question_16'].setValidators([Validators.required,Validators.min(0.1)]);
      this.sixForm.controls['question_16'].updateValueAndValidity();
      this.sixForm.controls['question_17'].setValidators([Validators.required,Validators.min(0.1)]);
      this.sixForm.controls['question_17'].updateValueAndValidity();
      this.sixForm.controls['question_18'].setValidators([Validators.required,Validators.min(0.1)]);
      this.sixForm.controls['question_18'].updateValueAndValidity();
      this.sixForm.controls['question_19'].setValidators([Validators.required,Validators.min(0.1)]);
      this.sixForm.controls['question_19'].updateValueAndValidity();


    } else {
      this.sixForm.controls['question_12'].clearValidators();
      this.sixForm.controls['question_12'].updateValueAndValidity();
      this.sixForm.controls['question_13'].clearValidators();
      this.sixForm.controls['question_13'].updateValueAndValidity();
      this.sixForm.controls['question_14'].clearValidators();
      this.sixForm.controls['question_14'].updateValueAndValidity();
      this.sixForm.controls['question_15'].clearValidators();
      this.sixForm.controls['question_15'].updateValueAndValidity();
      this.sixForm.controls['question_16'].clearValidators();
      this.sixForm.controls['question_16'].updateValueAndValidity();
      this.sixForm.controls['question_17'].clearValidators();
      this.sixForm.controls['question_17'].updateValueAndValidity();
      this.sixForm.controls['question_18'].clearValidators();
      this.sixForm.controls['question_18'].updateValueAndValidity();
      this.sixForm.controls['question_19'].clearValidators();
      this.sixForm.controls['question_19'].updateValueAndValidity();

    }
  }

  show24(event){
    if(event.target.value == 'Yes'){
      this.text24 = true;
      this.sixForm.controls['question_24_y'].setValidators([Validators.required,Validators.min(0.1)]);
      this.sixForm.controls['question_24_y'].updateValueAndValidity();

    } else {
      this.text24 = false;
      this.sixForm.controls['question_24_y'].clearValidators();
      this.sixForm.controls['question_24_y'].updateValueAndValidity();
    }
  }

}
