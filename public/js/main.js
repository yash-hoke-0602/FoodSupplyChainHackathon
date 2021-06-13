 $(document).ready(function () {

 	// script for smooth scrolling //
 	jQuery(document).ready(function ($) {
 		$(".scroll ").click(function (event) {
 			event.preventDefault();

 			$('html,body').animate({
 				scrollTop: $(this.hash).offset().top
 			}, 1000);
 		});
 	});



 	//script  for  ease //
 	$(document).ready(function () {
 		
 		 var defaults = {
 			 containerID: 'toTop', // fading element id
 			 containerHoverID: 'toTopHover', // fading element hover id
 			 scrollSpeed: 1200,
 			 easingType: 'linear' 
 		 };
 		

 		$().UItoTop({
 			easingType: 'easeOutQuart'
 		});

 	});

 });

 // Smooth scrolling using jQuery easing
     $('a.js-scroll-trigger[href*="#"]:not([href="#"])').on('click', function() {
       if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
         var target = $(this.hash);
         target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
         if (target.length) {
           $('html, body').animate({
             scrollTop: (target.offset().top - 54)
           }, 1000, "easeInOutExpo");
           return false;
         }
       }
   });