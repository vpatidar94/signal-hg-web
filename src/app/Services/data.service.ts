import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Router,NavigationExtras, NavigationEnd } from "@angular/router"; 
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Location } from '@angular/common';

// import * as moment from 'moment-timezone';
import * as moment from 'moment';
import 'moment-timezone';


@Injectable({
  providedIn: 'root'
})
export class DataService {

//declare the global varible here


// AWS Development Server URL
baseUrl: string = 'https://signalhg.consagous.co.in/';

// // AWS testing  Server URL 
//  baseUrl: string = 'https://signalhgwellness.com/';
 
  private currentUser      : any = {};   
  private loggedUserObject : any = {};
  private subject = new Subject<any>();

constructor(public http : HttpClient, private router: Router,private location: Location,) {
  this.router.events.forEach((event) => {
    if(event instanceof NavigationEnd) {
      // this.currentUser = JSON.parse(localStorage.getItem('sw_userData'));
    }})
 }

//http option for token
httpOption = {
  headers: new HttpHeaders({'Content-Type' : 'application/json',"Access-Control-Allow-Origin":"*"})
  //.append('Access-Control-Allow-Origin', 'http://localhost:4200')
}  

  // Http Options
  getHeaderLogin(){
    var  currentUserId ='',role_id ='',lat= '', lang ='',parentid =''; 
    if(localStorage.getItem('sw_loginDetail')){
      var detail = JSON.parse(localStorage.getItem('sw_loginDetail'));
      currentUserId = detail.id;      
      role_id = detail.role_id;
      lat = detail.lat; lang= detail.lang;
    } else{
      if(localStorage.getItem('sw_UserID')){
        currentUserId = JSON.parse(localStorage.getItem('sw_UserID'));
      }
    }
    if(localStorage.getItem('sw_parentId')){
      parentid = JSON.parse(localStorage.getItem('sw_parentId'));
    }
 
    return {   
    headers: new HttpHeaders({
    'Content-Type' : 'application/json', 
    //'deviceType':'browser',
    //'deviceId':'',
    'language':'en',
    'version':'1',
    'lat':lat,
    'long':lang,
    'userid':currentUserId,
    'parentId':parentid,
    'timeZone':moment.tz.guess(),
    'timeZoneOffset':'',
    'role':role_id,
    })
    }  
  }
  // Http Options
  getHeadersLogin(){
    var currentUserId = '',role_id ='',lat= '', lang ='',parentid ='';
    if(localStorage.getItem('sw_loginDetail')){
      var detail = JSON.parse(localStorage.getItem('sw_loginDetail'));
      currentUserId = detail.id;      role_id = detail.role_id;
      lat = detail.lat; lang= detail.lang;
    } else{
      if(localStorage.getItem('sw_UserID')){
        currentUserId = JSON.parse(localStorage.getItem('sw_UserID'));
      }
    }
    if(localStorage.getItem('sw_parentId')){
      parentid = JSON.parse(localStorage.getItem('sw_parentId'));
    }
    return {
    headers: new HttpHeaders({
    //'Content-Type' : 'application/json, text/plain, */*',
    //'Authorization': this.currentUser.Authorization,
    //'deviceType':'browser',
    //'deviceId':'',
    'language':'en',
    'version':'1',
    'lat':lat,
    'long':lang,
    'userid':currentUserId,
    'parentId':parentid,
    'timeZone':moment.tz.guess(),
    'timeZoneOffset':'',
    'role':role_id,
    })
  };
  }

  setSubject(obj){
    this.subject.next({ cartdata: obj});
  }
  
  back() {
    this.location.back();
  }

  forword() {
    this.location.forward();
  }

/*
  * return data array
*/
  getSubject(): Observable <any> {
    return this.subject.asObservable().pipe(
      retry(0),
      catchError(this.handleError)
    );   
  }


  // Common post api
  PostApi(data,url) {
    return this.http.post(this.baseUrl + url , data, this.getHeaderLogin())
    .pipe(
      retry(0),
      catchError(this.handleError)
    )
  }

  // Common get api
  GetApi(url) {
    return this.http.get(this.baseUrl + url ,this.getHeaderLogin())
    .pipe(
      retry(0),
      catchError(this.handleError)
    )
  }

  // Common post api
  PostApis(data,url): Observable<any> {
    return this.http.post(this.baseUrl + url , data, this.getHeadersLogin())
    .pipe(
      retry(0),
      catchError(this.handleError)
    )
  }

  // Common get api
  GetApis(url) {
    return this.http.get(this.baseUrl + url ,this.getHeadersLogin())
    .pipe(
      retry(0),
      catchError(this.handleError)
    )
  }
     // Get covid info
    getcovidDetail(data): Observable<any> {
      return this.http.post<any>(this.baseUrl + 'superadmin/webservices/api/questionnaire',  data, this.getHeaderLogin())
      .pipe(
        retry(0),
        catchError(this.handleError)
      )
    }

    // Error handling 
    handleError(error) {
      let errorMessage = '';
      if(error.error instanceof ErrorEvent) {
        // Get client-side error
        errorMessage = error.error.message;
      } else {
        // Get server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      window.alert(errorMessage);
      return throwError(errorMessage);
  }

}