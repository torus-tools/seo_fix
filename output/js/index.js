(function($) {
    "use strict"; // Start of use strict
  
    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: (target.offset().top - 70)
          }, 1000, "easeInOutExpo");
          return false;
        }
      }
    });
  
    // Closes responsive menu when a scroll trigger link is clicked
    $('.js-scroll-trigger').click(function() {
      $('.navbar-collapse').collapse('hide');
    });
  
    // Activate scrollspy to add active class to navbar items on scroll
    $('body').scrollspy({
      target: '#mainNav',
      offset: 100
    });
  
    // Collapse Navbar
    var navbarCollapse = function() {
      if ($("#mainNav").offset().top > 150) {
        $("#mainNav").addClass("navbar-shrink");
      } else {
        $("#mainNav").removeClass("navbar-shrink");
      }
    };
    // Collapse now if page is not at top
    navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).scroll(navbarCollapse);
  
  })(jQuery); // End of use strict

$(function(){
  $('#super-easy-form').submit(function(e){
      e.preventDefault();
      var formdata = toJSONString(this);
      console.log(formdata);
      $.ajax({
          type: "POST",
          url: "https://fp25gke307.execute-api.us-east-1.amazonaws.com/deployment2019-08-02T06-10-27-306Z/",
          dataType: "json",
          contentType: "application/json",
          data: JSON.stringify( { "id": "","name": $('#name').val(),"email": $('#email').val(),"message": $('#message').val() } ),
          beforeSend: function(data) {
              $('#super-easy-btn').prop('disabled', true);
              $('#super-easy-form :input').prop('disabled', true);
              $('#contact-status').html('Sending...').show();
          },
          success: function(data) {
              console.log(data);
              $('#contact-status').text("Gracias por contactarnos.").show();
              $('#super-easy-form :input').removeProp('disabled');
              $('#super-easy-btn').removeProp('disabled');
          },
          error: function(jqXHR, textStatus, errorThrown) {
              $('#contact-status').text('Error. Please try again soon.').show();
              $('#super-easy-form :input').removeProp('disabled');
              $('#super-easy-btn').removeProp('disabled');
          }
      });
  }); 

  function toJSONString (form) {
  var obj = {};
  var elements = form.querySelectorAll("input, select, textarea");
  for(var i = 0; i < elements.length; ++i) {
    var element = elements[i];
    var name = element.name;
    var value = element.value;
    if(name) {
      obj[name] = value;
    }
      }
      return JSON.stringify(obj);
  }
});
  
