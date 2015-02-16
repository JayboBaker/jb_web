$(document).ready(function(){
  $('.no-js').removeClass('no-js');

  //
  /* ===========================================================================
  Slick carousel call
  =========================================================================== */
  $('.skills-carousel').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    arrows: false,
  });

  /* ===========================================================================
  Responsive side menu
  =========================================================================== */
  $('.menu-toggle').on('click', function(event){
    event.preventDefault();
    // create menu variables
    var slideoutMenu = $('.main-menu');
    var slideoutMenuWidth = $('.main-menu').width();

    // toggle open class
    slideoutMenu.toggleClass("open");

    // slide menu
    if (slideoutMenu.hasClass("open")) {
    	slideoutMenu.animate({
      	right: "0"
    	});	
    } else {
    	slideoutMenu.animate({
      	right: "-250px"
     });	
    }
  });

  /* ===========================================================================
  Scroll down page functionality
  =========================================================================== */
  $('.scroll-arrow a, .scroll-link').on('click', function(event){
    event.preventDefault();
            
    var $input = $(this).attr("href");
    $('html, body').animate({
        scrollTop: $($input).offset().top
    }, 950, 'swing');
        
  });

  /* ===========================================================================
  Parallax Image
  =========================================================================== */
  var parallax = document.querySelectorAll(".parallax"),
  speed = 0.4;
 
  window.onscroll = function(){
    [].slice.call(parallax).forEach(function(el,i){

      var windowYOffset = window.pageYOffset,
      elBackgrounPos = "50% " + (windowYOffset * speed) + "%";
      el.style.backgroundPosition = elBackgrounPos;

    });
  };

  /* ===========================================================================
  Fade in
  =========================================================================== */
  $('#skills').slideDown();

  /* ===========================================================================
  Parse / SendGrid Functionality for Sending Mail
  =========================================================================== */
  // Initialize Parse with your Parse application & javascript keys
  Parse.initialize("N9dC0iisJzlFvW0tcu8lk1seoqOGpc2RW5Zjl3R9", "yVAY44a2cQBEHRKlxEqXr1AiCCHbnfiFne4VK7P8");
 
  // Setup the form to watch for the submit event
  $('#contact-form').submit(function(e){
    e.preventDefault();
 
    // Grab the elements from the form to make up
    // an object containing name, email and message
    var data = { 
      fullName: document.getElementById('full-name').value, 
      email: document.getElementById('email').value,
      telephone: document.getElementById('telephone').value,
      message: document.getElementById('message').value
    }
    
    // Run our Parse Cloud Code and 
    // pass our 'data' object to it
    Parse.Cloud.run("sendEmail", data, {
      success: function(object) {
        $('#contact h2').fadeOut(500, function() {
          $('.input').val('');
          $(this).html('Thanks for your message!').fadeIn(500);
        });
      },
 
      error: function(object, error) {
        console.log(error);
        $('#contact h2').fadeOut(500, function() {
          $(this).html('Error sending message. Please try again.').fadeIn(500);
        });
      }
    }); // end sendEmail 
  }); // end submit
}); // end doc ready



