import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { DataService } from  '../../Services/data.service';
import { GlobalService } from '../../Services/global.service';
declare var $;

@Component({
  selector: 'app-staff-availability',
  templateUrl: './staff-availability.component.html',
  styleUrls: ['./staff-availability.component.scss']
})
export class StaffAvailabilityComponent implements OnInit {

  public loading : boolean = true;
  public businessDetail : any = [];
  public AvailableList : any = [];
  public availability_status : any;

  constructor(public global :GlobalService,private route: Router,  private activeRoute: ActivatedRoute, public commonservice: DataService) { 
    this.businessDetail = JSON.parse(localStorage.getItem('sw_BusinessDetail'));
  }

  ngOnInit(): void {
    this.staffAvailabilityList();
  }


  staffAvailabilityList(){
    var detail = {"business_id": this.businessDetail.business_id};
    var url =  'superadmin/webservices/instructor/get_weekdays_timeslot';
    this.commonservice.PostApi(detail,url).subscribe(((response : any) => {
      if(response.status == 1){
        var self = this;
        response.data.week_data.filter(function(el){          
          if(el.day_status == 1){
            el.day_status1 = true;
          } else{
            el.day_status1 = false;
          }          
              el.time_slot.filter(function(ell){
                if(ell.time_slot_status == 1){
                  ell.time_slot_status1 = true;
                } else{
                  ell.time_slot_status1 = false;
                }
                ell.time_slote_from_new = self.global.timeConvert(ell.time_slote_from);
               ell.time_slote_to_new = self.global.timeConvert(ell.time_slote_to);

              })
        })
        if( response.data.availability_status == 'Available'){
          response.data.availability_status = true;
        } else{
          response.data.availability_status = false;
        }
        self.AvailableList = response.data;
        self.loading = false
      } else{
        self.loading = false;
      }
    }))
  }

  changeAvailability(event){
    if(event.target.checked == true){
      this.availability_status = 'Available';
    } else{
      this.availability_status = 'Unavailable';
    }
   
  }
  
  changeStatus(event,dayname, id){
    this.loading = true;
    var status, updateslot,detail={},self= this, timeslots =[], updatestatus;
    if(event.target.checked == true){
      status = 1;
      self.AvailableList.week_data.filter(function(el){
        if(el.week_name == dayname){
          if(id){
            if(el.day_status == true || el.day_status == 1){
              el.time_slot.filter(function(ell){
                if(ell.id == id){
                  ell.time_slot_status = status;
                }
              })
            } else{
              self.loading = false;

              return false;
            }
          } else{
            el.time_slot.filter(function(ell){
              if(ell.time_slot_status == true || ell.time_slot_status == 1){
                updatestatus = 1;
              }              
            })
if(updatestatus == 1){
  el.day_status = status;
} else{
  self.global.dangerAlert('Please check at least 1 time slot to update availibility');
  self.loading = false;
  return ;
}
          }
        }
      })
    } else{
      status =  0;
        self.AvailableList.week_data.filter(function(el){
          if(el.week_name == dayname){
            if(!id){
              el.time_slot.filter(function(ell){
                ell.time_slot_status = status;
              })
              el.day_status = status;
            } else {
              el.time_slot.filter(function(ell){
                if(ell.id == id){ 
                  ell.time_slot_status = status;
                }
                if(ell.time_slot_status == true || ell.time_slot_status == 1){
                  updatestatus = 1;
                }
              })
              if(updatestatus !=1){
                el.day_status = status;
              }
            }
            }
      })
    }

    self.AvailableList.week_data.filter(function(el){
      if(el.week_name == dayname){
          el.time_slot.filter(function(ell){
            timeslots.push({"time_slot_id": ell.id,"time_slot_status":ell.time_slot_status});
          })
          updateslot = el;
        }        
  })    

    
    detail ={ "day_id": updateslot.id, "day_status":updateslot.day_status, "business_id":self.businessDetail.business_id, "slot_time": timeslots
    };
    var url = 'superadmin/webservices/instructor/instructor_availabilityn' ;
    this.commonservice.PostApi(detail,url).subscribe(((response: any) => {
      if(response.status == 1){
        this.global.successAlert(response.message);
        this.staffAvailabilityList();
      } else {
        this.global.dangerAlert(response.message);
        this.loading = false;
      }
    }))

  }

  changeStatus1(event,data,id){

   // this.loading = true;
    var status,timeslots =[],currentstatus ;
    if(event.target.checked == true){
      status = 1;
    } else {
      status = 0;      
    }
    if(status == 0 && !id){
      data.time_slot.filter(function(el){
        el.time_slot_status = status;
      })
      data.day_status = status;
    }

    if(status == 0 && id){
      data.time_slot.filter(function(el){
        if(el.id == id){
          el.time_slot_status = status;
        }
      })
      data.time_slot.filter(function(el){
        if(el.time_slot_status == true || el.time_slot_status == 1){
          currentstatus = 1;
        }
      })
      if(currentstatus !=1){
        data.day_status = status;
      }
    }

    if(status == 1 && !id){
      this.global.dangerAlert('Please check at least 1 time slot to update availibility');
      this.loading = false;
      return ;
    }

    if(status == 1 && id){
      if(data.day_status !=1 && data.day_status1 != true){
        this.global.dangerAlert('Please check day first to update availibility');
        this.loading = false;
        event.target.checked = false;
        return ;
      } else{
        data.day_status = status;
        data.time_slot.filter(function(el){
          if(el.id == id){
            el.time_slot_status = status;
          }
        })
      }
    }
    // if(id){
    //   data.time_slot.filter(function(el){
    //     if(el.id == id){
    //       el.time_slot_status = status;
    //     }
    //   })
    // } else{
    //   data.day_status = status;
    // } 

    // data.time_slot.filter(function(el){
    //   timeslots.push({"time_slot_id": el.id,"time_slot_status":el.time_slot_status});
    // })

    
    // var detail ={ "day_id": data.id, "day_status":data.day_status, "business_id":this.businessDetail.business_id, "slot_time": timeslots };
    // this.commonservice.getStaffAvailbilityDetail(detail).subscribe(((response: any) => {
    //   if(response.status == 1){
    //     this.global.successAlert(response.message);
    //     this.staffAvailabilityList();
    //   } else {
    //     this.global.dangerAlert(response.message);
    //     this.loading = false;
    //   }
    // }))

  }

  SaveChanges(){
    var updatedList = [],timeslot = [];
    this.AvailableList.week_data.filter(function (el) {
      el.time_slot.filter(function (ell){
        timeslot.push({'time_slot_id': ell.id,'time_slot_status' : ell.time_slot_status });
      })
      updatedList.push({"day_id":el.id,"day_status":el.day_status, "slot_time":timeslot});
      timeslot =[];
    })
    var url = 'superadmin/webservices/instructor/instructor_availabilityn' ;
    var detail = { "availability_status": this.availability_status,  "business_id":this.businessDetail.business_id ,"days":updatedList};
    this.commonservice.PostApi(detail,url).subscribe(((response: any) => {
      if(response.status == 1){
        this.global.successAlert(response.message);
        this.staffAvailabilityList();
        this.loading = false;

      } else {
        this.global.dangerAlert(response.message);
        this.loading = false;
      }
    }))
  }

}
