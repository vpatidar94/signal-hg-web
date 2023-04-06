import { Component } from '@angular/core';
declare var $;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'signalhg-Web';
}
$(window).scroll(function(){
  var header = document.getElementById("myHeader");
  if($(this).scrollTop() >= 1){
    header.classList.add('sticky-header');
 } else{
    header.classList.remove("sticky-header");
  }
});

// window.onbeforeunload  = () => {
//   // Clear the local storage
//   localStorage.clear()
// }

// window.onscroll = function() {myFunction()};
// var header = document.getElementById("myHeader");
// var sticky = header.offsetTop;

// function myFunction() {
//   if (window.pageYOffset > sticky) {
//     header.classList.add("sticky");
//   } else {
//     header.classList.remove("sticky");
//   }
// }