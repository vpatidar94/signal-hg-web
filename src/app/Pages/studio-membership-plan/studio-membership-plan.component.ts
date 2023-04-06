import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";
import { DataService } from  '../../Services/data.service';
import { GlobalService } from '../../Services/global.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-studio-membership-plan',
  templateUrl: './studio-membership-plan.component.html',
  styleUrls: ['./studio-membership-plan.component.scss']
})
export class StudioMembershipPlanComponent implements OnInit {

  public planList : any = [];
  public studioList :any =[];
  public instructorList :any =[];
  public loading :boolean = true;
  public payments :boolean = false;
  public businessId : any='';
  public instructorId : any='';
  public userInfo : any =[];
  public savecard : any = 0 ;
  public cardType : any;
  public CardData : any;
  public customerData : any = [];
  public cardTypevalue : boolean;
  public submitted : any ;
  public selectedPlan :any ={};
  public businessLogo :any;
  public planview :boolean = false;
  public PurchasedPlan:any ={};

  constructor(public global :GlobalService,private route: Router,  private activeRoute: ActivatedRoute,  public commonservice: DataService) {
    // this.businessDetail = JSON.parse(localStorage.getItem('sw_BusinessDetail'));
    this.userInfo = JSON.parse(localStorage.getItem('sw_loginDetail'));
  }

  paymentCard = new FormGroup({
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
  get f() { return this.paymentCard.controls; }

  savedCard = new FormGroup({
    cvv_no: new FormControl('',Validators.compose([
      Validators.required
    ]))
  })
  get sf() { return this.savedCard.controls; }


  ngOnInit(): void {
    this.getPurchaseplan();
    this.getSaveCardDetail();
    this.getstudioList()
  }

  getPurchaseplan(){
    var url = "superadmin/webservices/api/subscription";
    this.commonservice.GetApi(url).subscribe(((response :any )=>{
      if(response.status == 1){
        this.PurchasedPlan = response.data;
      } else{
      }
    }))
  }

  getstudioList(){
    var url = "superadmin/webservices/api/studio_list";
    this.commonservice.GetApi(url).subscribe(((response :any )=>{
      if(response.status == 1){
        this.studioList = response.data;
        this.loading =false;
      } else{
        this.loading =false;
      }
    }))
  }

  getDetail(event,type){
    if(type == 1){
      this.businessId = event.target.value;
      if(this.businessId != ''){
        this.planview = true;
        this.getplanList();
      } else {
        this.planList =[];
        this.planview = false;
      }
    } else {
      this.instructorId = event.target.value;
    }
  }

  getplanList(){
    this.loading = true;
    var detail ={"business_id": this.businessId };
    var url = "superadmin/webservices/api/get_studio_plan_list";
    this.commonservice.PostApi(detail,url).subscribe((response : any) => {
      if(response.status == 1){
        this.planList=response.data;
        this.businessLogo =response.business_logo;
        this.loading =false;
      } else {
        this.planList =[];
        this.loading =false;
      }
    })
  }

  getPlan(items){
    this.selectedPlan = items;
    if(items.instructor.length != 0){
      this.instructorList =items.instructor;
    } else {
      this.instructorList =[];
      this.instructorId = '';
    }
  }

  redirectPayment(){
    if(this.PurchasedPlan == ''){
     this.confirmation();
    } else {
      Swal.fire({
        title:'Plan Purchse ?',
        text: 'Do you want to discard the current plan and Purchase new plan from new studio?.',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'No',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.value) {
          this.confirmation();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
        }
      })
    }
  }

  confirmation(){
    if(this.selectedPlan.price){
      if(this.instructorId == '' && this.instructorList.length !=0){
        this.global.dangerAlert('Please select Instructor');
        return false;
      }
      this.payments = true;
    } else{
      this.global.dangerAlert('Please select Plan');
      return false;
    }
  }

  generateToken(type){
    this.submitted = true;
      let detail;
      if(type == 1){
        if (this.paymentCard.valid) {
        var expired = this.global.ExpiryCheck(this.paymentCard.value.expiry);
        if(expired)  {
          this.paymentCard.value.expiry_month = expired[0];
          this.paymentCard.value.expiry_year = expired[1];
        }  else{
          return false;
        }
      } else{
        this.loading = false;
        return false;
      }
        detail = {
          "number": this.paymentCard.value.card_number,
          "exp_month": this.paymentCard.value.expiry_month,
          "exp_year": this.paymentCard.value.expiry_year,
          "cvc": this.paymentCard.value.cvv_no,
        };
      } else {
        if (this.savedCard.valid) {
        detail = {
          "number": this.CardData.number,
          "exp_month": this.CardData.expiry_month,
          "exp_year": this.CardData.expiry_year,
          "cvc": this.savedCard.value.cvv_no,
        };
      } else{
        return false;
      }
      }

    this.loading =true;
        (<any>window).Stripe.card.createToken(detail, (status: number, response: any) => this.payment(status,detail,response));
  }

  payment(status: any,details : any, response: any){
    this.loading = true;
    if (status == 402) {
      this.loading = false;
      this.global.dangerAlert(response.error.message);
    } else {
    this.loading = true;
      var detail = {"business_id": this.businessId, "studio_plan_id": this.selectedPlan.id, "instructor_id": this.instructorId, "token": response.id}
      var url = 'superadmin/webservices/api/studio_plan_buy';
      this.commonservice.PostApi(detail,url).subscribe(((response : any) => {
        if(response.status == 1){
          this.global.successAlert(response.message);
          this.loading = false;
          this.submitted = false;
          this.paymentCard.reset();
          this.payments = false;
          this.getPurchaseplan();
          this.selectedPlan ={};
          this.instructorId = '';
          // this.route.navigate(['/home']);
        } else{
          this.global.dangerAlert(response.message);
          this.loading = false;
        }
      }))
    }
  }

  getSaveCardDetail(){
    var detail= {"userid" :this.userInfo.id };
    var url = 'superadmin/webservices/api/cardGet' ;
    this.commonservice.PostApis(detail,url).subscribe(((response : any) => {
      if(response.status == 1){
        response.data.filter(function (el){
          el.checked = false;
          el.card_type = el.card_type.toLowerCase();
        })
        this.customerData = response.data;
      } else{
      }
    }))
  }

  Savecard(event){
    if(event.target.checked == true){
      this.savecard = 1;
    }
    else{ this.savecard = 0}
  }

  getCardType(event){
      var self= this,selected ;
      self.cardType = event.target.id;
      self.customerData.filter(function (el){
        if(el.card_id == self.cardType){
          el.checked = event.target.checked;
          selected = el;
        }
      })
      this.CardData = selected;
  }
}
