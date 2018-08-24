// Form Selector
$(function() {
  $(".modal-footer").hide();
  $(".form-content").hide();
  $("#form-selector").change(function() {
    $(".form-content").hide();
    $("#" + $(this).val()).show();
    $(".modal-footer").show();
  });
});

// About Us Selector
$(document).ready(function() {
  $("#content1").show();
  $("#content2, #content3, #content4").hide();

  $("#btn1").click(function(e) {
    $("#content1").fadeIn(0);
    $("#content2, #content3, #content4").hide();
    $("#btn1").addClass("active");
    $("#btn2, #btn3, #btn4").removeClass("active");
    e.preventDefault();
  });

  $("#btn2").click(function(e) {
    $("#content2").fadeIn(0);
    $("#content1, #content3, #content4").hide();
    $("#btn2").addClass("active");
    $("#btn1, #btn3, #btn4").removeClass("active");
    e.preventDefault();
  });

  $("#btn3").click(function(e) {
    $("#content3").fadeIn(0);
    $("#content2, #content1, #content4").hide();
    $("#btn3").addClass("active");
    $("#btn2, #btn1, #btn4").removeClass("active");
    e.preventDefault();
  });

  $("#btn4").click(function(e) {
    $("#content4").fadeIn(0);
    $("#content2, #content3, #content1").hide();
    $("#btn4").addClass("active");
    $("#btn2, #btn3, #btn1").removeClass("active");
    e.preventDefault();
  });
});

// Services Page Selector
$(document).ready(function () {
  if (window.location.href.indexOf("g-suite") > -1) {
     $("#serviceBtn3").addClass('active');
  }

  if (window.location.href.indexOf("staff-augmentation") > -1) {
    $("#serviceBtn2").addClass('active');
 }

  if (window.location.href.indexOf("java-development") > -1) {
    $("#serviceBtn1").addClass('active');
 }
});

// $(document).ready(function() {
//   $("#serviceContent1").show();
//   $("#serviceContent2, #serviceContent3").hide();
//   $("#serviceBtn1").click(function(e) {
//     $("#serviceContent1").fadeIn(300);
//     $("#serviceContent2, #serviceContent3").hide();
//     $("#serviceBtn1").addClass("active");
//     $("#serviceBtn2, #serviceBtn3").removeClass("active");
//     e.preventDefault();
//   });

//   $("#serviceBtn2").click(function(e) {
//     $("#serviceContent2").fadeIn(300);
//     $("#serviceContent1, #serviceContent3").hide();
//     $("#serviceBtn2").addClass("active");
//     $("#serviceBtn1, #serviceBtn3").removeClass("active");
//     e.preventDefault();
//   });

//   $("#serviceBtn3").click(function(e) {
//     $("#serviceContent3").fadeIn(300);
//     $("#serviceContent2, #serviceContent1").hide();
//     $("#serviceBtn3").addClass("active");
//     $("#serviceBtn2, #serviceBtn1").removeClass("active");
//     e.preventDefault();
//   });
// });

$("#toggle").click(function() {
  $(this).toggleClass("active");
  $("#overlay").toggleClass("open");
});

//Video modal
$(document).ready(function() {
  // Gets the video src from the data-src on each button

  var $videoSrc;
  $(".video-btn").click(function() {
    $videoSrc = $(this).data("src");
  });
  console.log($videoSrc);

  // when the modal is opened autoplay it
  $("#myModal").on("shown.bs.modal", function(e) {
    // set the video src to autoplay and not to show related video. Youtube related video is like a box of chocolates... you never know what you're gonna get
    $("#video").attr(
      "src",
      $videoSrc + "?rel=0&amp;showinfo=0&amp;modestbranding=1&amp;autoplay=1"
    );
  });

  // stop playing the youtube video when I close the modal
  $("#myModal").on("hide.bs.modal", function(e) {
    // a poor man's stop video
    $("#video").attr("src", $videoSrc);
  });

  // document ready
});

// Portfolio Slider
$(document).ready(function() {
  $(".portfolio-slider").slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: false,
    fade: true,
    speed: 300,
    cssEase: "linear",
    adaptiveHeight: true
  });
});

$("#btn-prev").click(function(t) {
  t.preventDefault();
  $(".portfolio-slider").slick("slickPrev");
});
$("#btn-next").click(function(t) {
  t.preventDefault();
  $(".portfolio-slider").slick("slickNext");
});

// Feedback Slider
$(document).ready(function() {
  $(".feedback-slider").slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: false,
    fade: true,
    speed: 300,
    cssEase: "linear",
    adaptiveHeight: true
  });
});

$("#btn-prev").click(function(t) {
  t.preventDefault();
  $(".feedback-slider").slick("slickPrev");
});
$("#btn-next").click(function(t) {
  t.preventDefault();
  $(".feedback-slider").slick("slickNext");
});
