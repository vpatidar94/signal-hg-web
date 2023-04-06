import { Injectable } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public currYear = new Date().getFullYear();
  public monthArray: any = [
    'Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'
  ];


  constructor(private location: Location, public toastr: ToastrManager ) { }

      
  // successAlert for fire toast/...
  successAlert(msg :any) {
    this.toastr.successToastr(msg, ' ', {
      position: 'top-right'
    })
  }

    //successAlert for fire toast/...
    dangerAlert(msg :any) {
    this.toastr.errorToastr(msg, ' ', {
      position: 'top-right'
    })
  }



  // Time conversion UTC
  timeConvert(times){
  //   convertUTCToLocalTime(timestamp : Long, mDateFormat : String ) : String
  // {
  // val value = Date(timestamp * 1000)
  // val dateFormatter = SimpleDateFormat(mDateFormat, Locale.ENGLISH)
  // dateFormatter.timeZone = TimeZone.getDefault()
  // return dateFormatter.format(value)
  // }
    // var event_date_end_utc = new Date(times*1000);
    // var hoursEnd = event_date_end_utc.getHours() < 10 ? "0" + event_date_end_utc.getHours() : event_date_end_utc.getHours();
    // var minutes = event_date_end_utc.getMinutes() < 10 ? "0" + event_date_end_utc.getMinutes() : event_date_end_utc.getMinutes();
    // var seconds = event_date_end_utc.getSeconds() < 10 ? "0" + event_date_end_utc.getSeconds() : event_date_end_utc.getSeconds();
    // var time = hoursEnd + ":" + minutes ;
    // return time;



  
    var event_date_start_utc = new Date(times*1000);
    var hours = event_date_start_utc.getHours() > 12 ? event_date_start_utc.getHours() - 12 : event_date_start_utc.getHours();
    var am_pm = event_date_start_utc.getHours() >= 12 ? "PM" : "AM";
    var hoursEnd = hours < 10 ? "0" + hours : hours;
    var minutes = event_date_start_utc.getMinutes() < 10 ? "0" + event_date_start_utc.getMinutes() : event_date_start_utc.getMinutes();
    var seconds = event_date_start_utc.getSeconds() < 10 ? "0" + event_date_start_utc.getSeconds() : event_date_start_utc.getSeconds();
    var time = hoursEnd + ":" + minutes + " " + am_pm;
    return time;

    //var tz = moment.tz.guess();
      // var zoneArea = moment.tz.guess();
      // const time = moment.unix(times).tz(zoneArea).format('LT');
      // return time;
    //let info = moment.unix(times);
    //info.tz(tz).format('LT');
    // var hours = event_date_start_utc.getHours() > 12 ? event_date_start_utc.getHours() - 12 : event_date_start_utc.getHours();
    // var am_pm = event_date_start_utc.getHours() >= 12 ? "PM" : "AM";
    // var hoursEnd = hours < 10 ? "0" + hours : hours;
    // var minutes = event_date_start_utc.getMinutes() < 10 ? "0" + event_date_start_utc.getMinutes() : event_date_start_utc.getMinutes();
    // var seconds = event_date_start_utc.getSeconds() < 10 ? "0" + event_date_start_utc.getSeconds() : event_date_start_utc.getSeconds();
    // var time = hoursEnd + ":" + minutes + " " + am_pm;
    // return time;
  }

  // Date Conversion UTC
  dateConvert(Dates){
    var event_date_start_utc1;
    event_date_start_utc1 = new Date(Dates*1000);
    var date = event_date_start_utc1.getDate();
    if(date < 10){
      date = '0'+ date;
    }
    var month = event_date_start_utc1.getMonth();
    var year = event_date_start_utc1.getFullYear();
    var newdate = this.monthArray[month] +' '+ date+' '+year;
    //var newdate ={date,month,year};
    return  newdate;
  }

  toTimestamp(strDate){
    var datum = Date.parse(strDate);
    return datum/1000;
  }

  ageCalculation(dob){ 
    var birthyear = dob.split('-');
    var age = this.currYear - birthyear[0];
    return age;
  }

  ExpiryCheck(expiry){
    var today = new Date();
      var currYear = today.getFullYear();
      var month =  today.getMonth() + 1;
      var newmonth;
      if(month < 10){
        newmonth = '0'+ month;
      }      
      var expired = expiry.split('/');

      if((expired[0] < newmonth && expired[1] <=  currYear )||  expired[1] <  currYear) {
        this.dangerAlert('Expiry Month & Year is not valid')
        return false;
      } else{
        return expired;
      }     
  }

    // convert date in (yyyy-mm-dd)
    ToDate(date){
      var day = date.toString().slice(4,15);
        var day1= day.split(' ');
        var newmonth = this.monthArray.findIndex(rank => rank === day1[0])+1;
        if(newmonth < 10){
          newmonth = '0'+ newmonth ;
        }
        var dob = day1[2] + "-"+newmonth+ "-"+day1[1];
        return dob;
    }


    numberOnly(event): boolean {
      const charCode = (event.which) ? event.which : event.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
      }
      return true;
    }
  
    backStep() {
      this.location.back();
    }
}
