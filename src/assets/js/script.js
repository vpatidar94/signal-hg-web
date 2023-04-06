





$(document).ready(function() {
  
  // Header Addon Class
  // var window_w = $(window).width();
  // $(window).resize(function(){
  //     window_w = $(window).width();
  // });
  // $(window).ready(function() {
  //     var navbar = $('#header');
  //     if(window_w >= 1024){
  //         $(navbar).removeClass('sticky-header');
  //         $(window).scroll(function(){
  //             if($(this).scrollTop() >= 50){
  //                 $(navbar).addClass('sticky-header');
  //             }else{
  //                 $(navbar).removeClass('sticky-header');
  //             }
  //         });
  //     }else{
  //         $(navbar).addClass('sticky-header');
  //     }
  // });

  // Header Sticky 
  window.onscroll = function() {myFunction()};
  var header = document.getElementById("myHeader");
  var sticky = header.offsetTop;

  function myFunction() {
    if (window.pageYOffset > sticky) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  }

  // Header scroll class CUSTOM STOP BODY MOVE 
  function addbodyClas(){
    var toggler = $('.navbar-toggler');
    $(toggler).click(function(){
      $('body').toggleClass('overflow-hidden');
      $('#header').toggleClass('fadebody');
      console.log("jj")
    })
  }

  addbodyClas();

  $(document).mouseup(function(e){
    if($(e.target).closest(".navbar").length === 0){
      $('#header').find('.navbar-collapse').removeClass('show');
      $('#header').find('.navbar-toggler').addClass('collapsed');
      $('#header').removeClass('fadebody');
      $('body').removeClass('overflow-hidden');
    }
  })


  // Accordian ( FAQ Page )
  $("#accordion").on("hide.bs.collapse show.bs.collapse", e => {
    $(e.target)
      .prev()
      .find("i:last-child")
      .toggleClass("fa-minus fa-plus");
  });


  // Input password eye functionality
  // $(".toggle-password").click(function() {
  //   $(this).toggleClass("fa-eye fa-eye-slash");
  //   var input = $($(this).attr("toggle"));
  //   if (input.attr("type") == "password") {
  //     input.attr("type", "text");
  //   } else {
  //     input.attr("type", "password");
  //   }
  // });
  

  // Modal Popup
  $('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
  })

});





  
