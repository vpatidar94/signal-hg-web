import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms'; 
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { DataService } from  '../../Services/data.service';
import { GlobalService } from '../../Services/global.service';
declare var $;

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.scss']
})
export class FamilyComponent implements OnInit {

  public loading : boolean = false;
  public memberDetail : any = [];
  public memberDetail1 : any = [];
  public Relations : any = []; 
  public relationIds : any ;
  public submitted : any ;
  public MemberSpinner : any;
  public monthArray: any = [
    'Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'
  ];
  public selectedFile: any;
  public userUpdatedImage: any; 
  public imagePath;
  imgURL: any;
  public message: string;
  public DOB : any;
  maxDate: any = new Date();

  constructor(public global :GlobalService,private route: Router,  private activeRoute: ActivatedRoute,  public commonservice: DataService) { 
    // const currentYear = new Date().getFullYear();
    // const currentMonth = new Date().getMonth();
    // const currentDate = new Date().getDate();
    // this.maxDate = new Date(currentYear - 18, currentMonth, currentDate); 
  }

  MembersForm = new FormGroup({
    fullname: new FormControl('',Validators.compose([
      Validators.required,
    ])),
    dob: new FormControl('',Validators.compose([
      Validators.required,
    ])),
    relative_id: new FormControl('',Validators.compose([
      Validators.required,
    ])) ,
    gender: new FormControl('',Validators.compose([
      Validators.required,
    ])),
    email: new FormControl(''),
  })

// convenience getter for easy access to form fields
  get f() { return this.MembersForm.controls; }

  ngOnInit(): void {
    this.getRelationList();
    this.getMemberList();

  }

  getRelationList(){
    var url = 'superadmin/webservices/api/get_relations';
     this.commonservice.PostApi({},url).subscribe(((response : any) => {
      if(response.status == 1){
        this.Relations = response.data;
      }
    }))

  }

  getMemberList(){
    this.loading = true;
    var detail = {"pageid":"1"} ;
    var url = 'superadmin/webservices/api/get_member_list';
    this.commonservice.PostApi(detail,url).subscribe(((response : any) => {
    if(response.status == 1){
      var self = this;
      response.data.filter(function(el){
        if(el.dob){
          var currentDate_date = el.dob.split('-');
          el.new_dob =self.monthArray[currentDate_date[1]-1]+' '+  currentDate_date[2]+' '+currentDate_date[0]
        }       
      })

      self.memberDetail = response.data;
      localStorage.setItem('sw_MemberDetail', <any>JSON.stringify(response.data));      
      self.loading = false;
    } else{
      this.loading = false;
    }
  }))

  }

  addMembers(){   
    if(this.MembersForm.value.dob){
      this.DOB = this.global.ToDate(this.MembersForm.value.dob);
    }
   
    this.submitted = true;  
    // this.loading = true;  
    let userdetail = this.MembersForm;
    if(userdetail.valid){
      this.MemberSpinner = true;
    var formdata = new FormData();
    formdata.append('fullname',userdetail.value.fullname);
    formdata.append('dob', this.DOB);
    formdata.append('relative_id', this.relationIds);
    formdata.append('image', this.selectedFile);
    formdata.append('gender', userdetail.value.gender);
    //formdata.append('email', userdetail.value.email); 
    var url =  'superadmin/webservices/api/add_member';
    this.commonservice.PostApis(formdata,url).subscribe(((response : any) => {
    if(response.status == 1){
      this.global.successAlert(response.message);      
      this.MemberSpinner = false; 
     // this.MembersForm.reset();
     this.closeModal();
      $('#btn_close1').trigger('click');
      this.getMemberList();
      // this.loading = false;
    } else {
      this.MemberSpinner = false;
    }
  }))
} else{
  this.MemberSpinner = false;
  return false;
}
  }

  updateMembers(){
   
    this.submitted = true;    
    // let userdetail = this.MembersForm;
    // if(userdetail.valid){ 
      this.MemberSpinner = true;
     
      var formdata = new FormData();
      formdata.append('fullname',this.memberDetail1.member_name);
      formdata.append('dob', this.memberDetail1.dob);
      formdata.append('relative_id', this.relationIds);
      // formdata.append('image', this.selectedFile);
      formdata.append('member_id', this.memberDetail1.memeber_id);
      formdata.append('gender', this.memberDetail1.gender);
      //formdata.append('email', this.memberDetail1.value.email);
      if(this.selectedFile){
        formdata.append('image', this.selectedFile);
      }
      var url = 'superadmin/webservices/api/edit_member';
      this.commonservice.PostApis(formdata,url).subscribe(((response : any) => {
      if(response.status == 1){
        this.global.successAlert(response.message);
        this.MemberSpinner = false;
        $('#btn_close1').trigger('click');
        this.closeModal();
        this.getMemberList();
      } else{
        this.MemberSpinner = false;
      }
  }))
// } else{

//}

  }

  deleteMembers(id){
    this.loading = true;
    var detail = { "member_id":id} ;
    var url = 'superadmin/webservices/api/remove_member';
    this.commonservice.PostApi(detail,url).subscribe(((response : any) => {
    if(response.status == 1){
      this.global.successAlert(response.message);      
      this.getMemberList();
    } else{
      this.loading = false
      this.global.dangerAlert(response.message);
    }
  }))

  }

  /*
* open dailog to select image
*/
  changeImage(){
    $("#file1").trigger('click');
  }

/*
* get Upload image detail
*/
  getUploadFileDetail(event){
    if (event.target.files.length > 0) {
      this.selectedFile  =  event.target.files[0];
      var mimeType  =  event.target.files[0].type;
      if (mimeType.match(/image\/*/)  ==   null) {
        this.message  =  "Only images are supported.";
        return;
      }
      var reader  =  new FileReader();
      this.imagePath  =  event.target.files;
      reader.readAsDataURL(event.target.files[0]); 
      reader.onload  =  (_event) =>  { 
        this.imgURL  =  reader.result; 
      }
    } 
  } 

 update(detail){
  this.memberDetail1 = detail;
  this.imgURL = detail.image;
   $('#btn_close').trigger('click');
 } 

 closeModal(){
  this.submitted = false;    
  this.MembersForm.reset();
  this.MemberSpinner = false; 
  this.selectedFile ='';   
  this.imgURL ="";
} 

getRElation(event){
  for(let i=0;i< this.Relations.length ; i++){
    if(this.Relations[i].realtion_name == event.target.value ){
      this.relationIds = this.Relations[i].relative_id;
    }
  }
}
}
