import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { DataService } from  '../../Services/data.service';
import { GlobalService } from '../../Services/global.service';
declare var $;

@Component({
  selector: 'app-my-transaction',
  templateUrl: './my-transaction.component.html',
  styleUrls: ['./my-transaction.component.scss']
})
export class MyTransactionComponent implements OnInit {

  public loading : boolean = true;
  public CurrentUrl :any;
  public pagecount : any = 1;
  public TransactionDetail : any = [];
  public dataCount : any;
  public throttle              = 300;
  public scrollDistance        = 2;
  public scrollUpDistance      = 1.5; 
  public direction             = '';

  constructor(public global :GlobalService,private route: Router,  private activeRoute: ActivatedRoute,  public commonservice: DataService){ 
    this.CurrentUrl = this.route.url;  
  }

  ngOnInit(): void {
    if(this.CurrentUrl == '/my-transaction'){
      this.getTransactionDetail();
    } else{
      this.getPayoutDetail();
    }
  }

  getTransactionDetail(){    
    var detail = {'pageid': this.pagecount};
    var url = 'superadmin/webservices/api/transaction_list';
    this.commonservice.PostApi(detail,url).subscribe(((response : any) => {
      if(response.status == 1){
        if(response.data.length != 0){ var self = this;
          response.data.filter(function (el){
            // Date Conversion UTC
            el.transaction_date_new = self.global.dateConvert(el.transaction_date);
            el.time =self.global.timeConvert(el.transaction_date);
          })
        }
        if(this.pagecount == 1){
          this.TransactionDetail = response.data;
        } else {
          this.TransactionDetail =this.TransactionDetail.concat(response.data);
        }
        this.loading = false;
      } else{
        this.dataCount = 0;
        if(this.pagecount == 1){
          this.TransactionDetail = [];
        } 
        this.loading = false;
      }
    }))
  }

  getPayoutDetail(){
    this.loading = false;
  }
  
  //onScroll function for scroll listing..of the event,...
  onScroll() {
    if(this.dataCount !=0 && this.TransactionDetail.length == 20) {
      this.pagecount++;
      this.getTransactionDetail();
    }
  }
}
