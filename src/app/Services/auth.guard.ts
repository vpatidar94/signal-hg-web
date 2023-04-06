import { Injectable } from '@angular/core';
import { Router, CanActivate, NavigationStart, CanActivateChild, CanDeactivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad {

  currentuserloggedin;


  constructor(private router:Router, private activeRoute: ActivatedRoute){
    this.currentuserloggedin = JSON.parse(localStorage.getItem('sw_loginDetail'));
   }

   logout(){
    var arr = [];
    for (var i = 0; i < localStorage.length; i++)
    { if (localStorage.key(i).substring(0,3) == 'sw_')
    {if(localStorage.key(i) != 'sw_Remember')
    {arr.push(localStorage.key(i)); } }}
    for (var i = 0; i < arr.length; i++)
    { localStorage.removeItem(arr[i]);
    }
    delete this.currentuserloggedin;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const url = state.url;
      if (url.includes('/consent-form?id=')) {
        this.activeRoute.queryParams.subscribe(params => {
          sessionStorage.setItem('web_view_id', '1');
          sessionStorage.setItem('web_view_active', '1');
        });
      }

      if (localStorage.getItem('sw_loginDetail')) {
        this.currentuserloggedin = JSON.parse(localStorage.getItem('sw_loginDetail'));
        if (url === '/login' || url === '/signin' || url === '/forgot' || url === '/registration') {
          this.router.navigate(['/home']);
        }
        if (sessionStorage.getItem('web_view_id')) {
          let sessionStorageId =  sessionStorage.getItem('web_view_id');
          if (sessionStorageId === '1') {
            sessionStorage.setItem('web_view_id', '2');
            this.router.navigate(['/consent-form']);
          }
          if (url === '/home') {
            if (sessionStorageId === '2') {
              sessionStorage.clear();
              location.reload();
            }
          }
        }
        return true;
      } else {
        if (sessionStorage.getItem('web_view_id')) {
          this.router.navigate(['/signin']);
        }
        if (url === '/login' || url === '/signin' || url === '/forgot' || url === '/registration' || url === '/Home') {
          return true;
        } else {
          if (sessionStorage.getItem('web_view_id')) {
            this.router.navigate(['/signin']);
          } else{
            this.router.navigate([url]);
          }
        }
      }

      return false;

  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
}
