import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms'; 
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { DataService } from  '../../Services/data.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { GlobalService } from '../../Services/global.service';
declare var $;

@Component({
  selector: 'app-trackin-meal-addnew',
  templateUrl: './trackin-meal-addnew.component.html',
  styleUrls: ['./trackin-meal-addnew.component.scss']
})
export class TrackinMealAddnewComponent implements OnInit {

  public loading : boolean = false;
  public imagePath;
  imgURL: any;
  public selectedFile: any ='';
  public message: string;
  public dietDetail:any ={};
  public dietlist:any ={};
  public submitted: boolean = false;
  public daysList:any=[];
  public currentUrl :any;
  public dropdownSettings :IDropdownSettings;
  public selected: boolean = false;
  public selectedDays:any =[];
  public businessDetail:any ={};

  constructor(public global :GlobalService,private route: Router, public commonservice: DataService) { 
    this.currentUrl = this.route.url;
    this.dietlist =JSON.parse(localStorage.getItem('sw_DietlistDetail'));
    if(this.currentUrl=='/update-diet'){
      this.dietDetail =JSON.parse(localStorage.getItem('sw_DietDetail'));
      var  selectedlist =[];
      if(this.dietDetail.week_days.length != 0){
        this.dietDetail.week_days.filter(function(el){       
          selectedlist.push(el);
        })
        this.selectedDays = selectedlist;
      }  
    } else {
      this.dietDetail.img_url="assets/img/uoload_meal_img.png";
    }
    if(localStorage.getItem('sw_clientId')){
      this.businessDetail = JSON.parse(localStorage.getItem('sw_BusinessDetail'));
    }
  }

  dietform = new FormGroup ({
    diet_name:new FormControl('',Validators.compose([Validators.required])),
    age:new FormControl(''),
    quantity:new FormControl('',Validators.compose([Validators.required])),
    calories:new FormControl('',Validators.compose([Validators.required])),
    carbs:new FormControl('',Validators.compose([Validators.required])),
    protien:new FormControl('',Validators.compose([Validators.required])),
    fat:new FormControl('',Validators.compose([Validators.required])),
    calcium:new FormControl('',Validators.compose([Validators.required])),
    description:new FormControl('',Validators.compose([Validators.required])),
  })

  get f() { return this.dietform.controls; }

  ngOnInit(): void {
    this.getweekdays();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'week_name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 4,
      allowSearchFilter: true
    }; 
  }

  changeDays(){
    var daysText;  
    if(this.selectedDays.length !=0){
      this.selected = false;
      this.selectedDays.filter(function(el) {
        if(daysText){
          daysText =  el.id +","+ daysText;
        } else{
          daysText =  el.id;  
        }
      });
    } else {
      this.selected = true;
    }
    this.dietDetail.week_day_id = daysText;
  }

  getweekdays(){
    var url="superadmin/webservices/instructor/week_days"
    this.commonservice.GetApi(url).subscribe((response : any) => {
      if(response.status == 1){
        this.daysList = response.data;
      } else {
      }
    })
  }

  submit(){
    var daysText;  
    if(this.selectedDays.length !=0){
      this.selected = false;
      this.selectedDays.filter(function(el) {
        if(daysText){
          daysText =  el.id +","+ daysText;
        } else{
          daysText =  el.id; 
        }
      });
    } else{
      this.selected = true;
      this.global.dangerAlert('Please select days');
      return false;
    }
    this.dietDetail.week_day_id = daysText; 
    this.submitted = true;
    if(this.dietform.valid){
      this.loading = true;     
      var formdata = new FormData();
      formdata.append('nutrition',this.dietlist.dietId);
      formdata.append('diet_name',this.dietform.value.diet_name);
      formdata.append('week_day_id',this.dietDetail.week_day_id);
      formdata.append('age',this.dietform.value.age);
      formdata.append('quantity',this.dietform.value.quantity);
      formdata.append('calories',this.dietform.value.calories);
      formdata.append('carbs',this.dietform.value.carbs);
      formdata.append('protien',this.dietform.value.protien);
      formdata.append('fat',this.dietform.value.fat);
      formdata.append('calcium',this.dietform.value.calcium);
      formdata.append('description',this.dietform.value.description);
      formdata.append("customer_id", localStorage.getItem('sw_clientId'));
      formdata.append("business_id", this.businessDetail.business_id);

      var url;
      if(this.currentUrl == '/add-diet'){
        url ="superadmin/webservices/instructor/add_meal";
        if(this.selectedFile != ''){
          formdata.append('file',this.selectedFile);
        } else {
          this.global.dangerAlert('Please Upload image');
          this.loading = false;
          return false;
        }
      } else {
        url ="superadmin/webservices/instructor/update_meal/"+ this.dietDetail.meal_id;
        if(this.selectedFile != ''){
          formdata.append('file',this.selectedFile);
        }
      }
      this.commonservice.PostApis(formdata,url).subscribe(((response : any ) =>{
        if(response.status == 1){
          this.loading = false;
          this.submitted = false;
          this.dietform.reset();
          this.route.navigate(['/nutrition-detail']);
        } else{
          this.loading = false;
          this.global.dangerAlert(response.message);
        }
      }))
    } else {
      this.global.dangerAlert('Please fill all detail');
      return false
    }
  }

  changeImage(){
    $("#file1").trigger('click');
  }

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
}
