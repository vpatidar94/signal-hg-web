import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { DataService } from  '../../Services/data.service';
import { GlobalService } from '../../Services/global.service';
declare var $;

@Component({
  selector: 'app-instructor-all',
  templateUrl: './instructor-all.component.html',
  styleUrls: ['./instructor-all.component.scss']
})
export class InstructorAllComponent implements OnInit {


  public navData : any =[];
  public ID : any;
  public StaffDetail : any =[];
  public businessDetail : any =[];
  public loading : boolean = true;
  public pagecount : any = 1;
  public skillList :any =[];
  public search_text: any;

  constructor(public global :GlobalService,private route: Router,  private activeRoute: ActivatedRoute,  public commonservice: DataService) {
    this.businessDetail = JSON.parse(localStorage.getItem('sw_BusinessDetail'));
    //var CurrentUrl = this.route.url;  
    //localStorage.setItem('sw_backUrl', CurrentUrl) ; 
   }

  ngOnInit(): void {
    this.getStaffList();
  }

  getStaffList(){
    this.loading = true;
    var url = 'superadmin/webservices/api/instructor_list';
    var detail ={ "pageid":this.pagecount, "business_id":this.businessDetail.business_id, "search_val":this.search_text}
    this.commonservice.PostApi( detail,url ).subscribe(((response : any)=> {
      if(response.status == 1){
      //   var skills;
      //   this.skillList.filter(function(el) {
      //     response.daat.skill.filter(function (ell){
      //       if(el.id == ell){
      //         skills = el.name +','+ skills;
      //       }
      //     })       
      // });
      // response.data.skill = skills;
        this.StaffDetail=response.data;  
        this.loading = false;
      } else{
        this.loading = false;
      }
    }))
  }

  redirectUrl(Id){
    this.route.navigate(['/instructor-detail'],{state:{Id : Id}});
  }

  // addFav(id,status){
  //   this.loading = true;
  //    var detail ={  "service_type":"1",   "service_id":id,   "status":status};
  //    var url = 'superadmin/webservices/api/favourite';
  //    this.commonservice.PostApi(detail,url).subscribe(((response : any) => {
  //     if(response.status == 1){
  //       this.global.successAlert(response.message);
  //       this.getStaffList();
  //     } else{
  //       this.global.dangerAlert(response.message);    
  //       this.loading = false;
  //     }
  //    }))
  //  }

  getskills(){
    var url = 'superadmin/webservices/api/get_skills';
    this.commonservice.GetApi(url).subscribe(((response : any) => {
      if(response.status == 1){
        this.skillList = response.data;
      }
    }))
  }

  reset(){
    this.search_text ='';
    this.getStaffList();
  }
}