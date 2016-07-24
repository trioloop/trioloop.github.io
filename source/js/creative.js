/*!
 * 
 * 
 * 
 */

(function($) {


// =============================================
// for general
// =============================================


$('.custom-menu a[href^="#"], .intro-scroller .inner-link, .page-scroll-custom').on('click',function (e) {
    e.preventDefault();

    var target = this.hash;
    var $target = $(target);

    $('html, body').stop().animate({
      'scrollTop': $target.offset().top
    }, 900, 'swing', function () {
      window.location.hash = target;
    });
  });

  $('a.page-scroll').bind('click', function(event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: $($anchor.attr('href')).offset().top
    }, 1500, 'easeInOutExpo');
    event.preventDefault();
  });


   $(".nav a").on("click", function(){
     $(".nav").find(".active").removeClass("active");
    $(this).parent().addClass("active");
  });


$('#contactForm').on('submit', function(e){
e.preventDefault();
e.stopPropagation();

// get values from FORM
var name = $("#name").val();
var email = $("#email").val();
var message = $("#message").val();
var goodToGo = false;
var messgaeError = 'Request can not be send';
var pattern = new RegExp(/^(('[\w-\s]+')|([\w-]+(?:\.[\w-]+)*)|('[\w-\s]+')([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

$('#contact-overlay').show();

 if (name && name.length > 0 && $.trim(name) !='' && message && message.length > 0 && $.trim(message) !='' && email && email.length > 0 && $.trim(email) !='') {
    if (pattern.test(email)) {
     goodToGo = true;
    } else {
     messgaeError = 'Please check your email address';
     goodToGo = false; 
    }
 } else {
   messgaeError = 'You must fill all the form fields to proceed!';
   goodToGo = false;
 }

 
if (goodToGo) {
   $.ajax({
   url: "https://formspree.io/info@trioloop.com", 
   method: "POST",
   dataType: "json",
   data: $('#contactForm').serializeObject() ,
   beforeSend: function() {
     //$('#success').html('<div class="col-md-12 text-center"><img src="./source/images/spinner.gif" alt="spinner" /></div>');
   },
   success:function(response){
   	 console.log(response);
     if (response.success!="") {
     	$('#success').html('<div class="col-md-12 text-center">Your email was sent successfully</div>');
     	$('#contactForm').trigger("reset");
     } else {
     	$('#success').html('<div class="col-md-12 text-center">E-mail was not sent. Please try again!</div>');
     }
   },
   error:function(e){
   	console.log('Error');
     $('#success').html('<div class="col-md-12 text-center">We could not fetch the data from the server. Please try again!</div>');
   },
   complete: function(done){
     console.log('Finished');
     $('#contact-overlay').hide();

   },
   });
   return true;
} else {
   $('#success').html('<div class="col-md-12 text-center">'+messgaeError+'</div>');
   return false;
}
return false;
});



// =============================================
// for index.html
// =============================================

        var winWidth = $(window).width(),
    targetCircleConXPosBuffer = 85;


  function intSetCirclePos(){
    var targetXPos = ($('.showcase-item').parent().position().left);
      $('.animate-circle-wrap').css("left", targetXPos);
  }

  function checkWinWidth(){
    winWidth = $(window).width();
    if(winWidth>1200){
      targetCircleConXPosBuffer = 85;
      // console.log('abc');
    }else if(winWidth>960){
      $('.animate-circle-wrap').css("display", 'block');
      targetCircleConXPosBuffer = 50;
      $('.intro-row-separator-img').css("width", '100%');
      $('.intro-row-separator-img').css("display", 'block');
      $('#about').css("padding-top", '0px');
      $('.img-why-trioloop').css("width", 'auto');
      $('.img-why-trioloop').css("padding", '0');
    }else{
      $('.intro-row-separator-img').css("display", 'none');
      $('#about').css("padding-top", '100px');
      $('.img-why-trioloop').css("width", '100%');
      $('.img-why-trioloop').css("padding", '0 30px');
      // console.log('< 960');
      $('.animate-circle-wrap').css("display", 'none');
    }
  }

  checkWinWidth();
  

  $('.showcase-item').on("mouseover", function(event){
    var targetXPos = ($(this).parent().position().left)+targetCircleConXPosBuffer;
    $('.animate-circle-wrap').css("left", targetXPos);
    $('.animate-circle').addClass('active');
    $(this).children().children('.home-case-img-main').addClass('active');
  }).mouseout(function () {
    $('.home-case-img-main').removeClass('active');
    $('.animate-circle').removeClass('active');
    });


  
  var targetConWidth = $('#home').width(),
    targetConHeight = $('#home').height(),
    ringuWidth = $('.ringu').width(),
    ringuHeight = $('.ringu').height(),
    ringuCenterPosTop = targetConHeight/2,
    ringuCenterPosLeft = targetConWidth/2;


  function updateRingPos(){
    targetConWidth = $('#home').width();
    targetConHeight = $('#home').height();
    ringuCenterPosTop = targetConHeight/2;
    ringuCenterPosLeft = targetConWidth/2;
    // console.log('targetConWidth = '+targetConWidth+';'+
    //    'ringuWidth = '+ringuWidth+';'+
    //    'targetConWidth - ringuWidth = '+(targetConWidth-ringuWidth)+';'+
    //    'ringuCenterPosLeft = '+ringuCenterPosLeft+';');
  }

  updateRingPos();

  var numRingu = $('.ringu').length;

  

  function getRandom(min, max) {
    return min + Math.random() * (max - min);
  }


  var $clip = $('.ringu'),
    tlRingMain = new TimelineMax({repeat: -1, repeatDelay: 0.5});

  

  $clip.each(function(index, element){

    var $ring = $(this),
      // delay = getRandom(1, 2),
      counterNum = index+1,
      delay = index * 0.2,
      ranRange = 30,
      scaleFixed = [0.4,0.7,0.9],
      maxRangeX = ringuCenterPosLeft+ranRange,
      minRangeX = ringuCenterPosLeft-ranRange,
      maxRangeY = ringuCenterPosTop+ranRange,
      minRangeY = ringuCenterPosTop-ranRange,
      ranXPos = ringuCenterPosLeft - getRandom(minRangeX, maxRangeX),
      ranYPos = ringuCenterPosTop - getRandom(minRangeY, maxRangeY),
      tlRingSub = new TimelineMax({delay: delay});

       

    tlRingSub
      .from($ring, 1, {scale:0, autoAlpha: 0, ease:Back.easeInOut})
      .to($ring, 2, {x:ranXPos, y:ranYPos, ease:Linear.easeInOut})
      .to($ring, 0.3, {scale:scaleFixed[index], x:0, y:0, ease:Power1.easeInOut})
      .to($ring, 0.3, {opacity:0.3, ease:Power1.easeInOut})
      .fromTo($ring, 0.7, {opacity:0.3}, {opacity:0.8, ease:Power1.easeInOut}, "-=0.1")
      .fromTo($ring, 1, {opacity:0.3}, {opacity:0.8, ease:Power1.easeInOut})
      .fromTo($ring, 1, {opacity:0.3}, {opacity:0.8, ease:Power1.easeInOut})
      .to($ring, 1, {scale:2, autoAlpha: 0, ease:Power1.easeInOut});

    tlRingMain.add(tlRingSub, '1');

  });


  window.onresize = function(event) {
    updateRingPos();
    checkWinWidth();
  };

$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

// =============================================
// end index.html
// =============================================



// =============================================
// for news.html
// =============================================
// =============================================
// end news.html
// =============================================



// =============================================
// for show-case.html
// =============================================
// =============================================
// end show-case.html
// =============================================



})(jQuery); // End of use strict

