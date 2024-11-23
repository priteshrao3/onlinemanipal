jQuery(document).ready(function ($) {

   $(".course-card-slider").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: true,
      arrows: false,
      infinite: false,
      autoplay: false,
      responsive: [
      ]
  });
  
  
  $(".omadvantage-cards").slick({
    slidesToShow: 1,
    dots: true,
    arrows: false,
    infinite: false,
    autoplay: false,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
          autoplay: false
        }
      }
    ]
  });
  get_testimonial_card_height();

  $("#muj-tab, #mahe-tab, #tapmi-tab, #smu-tab").click(function () {
    $(".rankingSlider").slick("setPosition");
  });

  // show first faq open
  $('#General .item:first-child .Faq_title').addClass("open_accordian_faq");
  $("#General .item:first-child .Faq_accordian_data").show();
  $("#downloadform h5").text("Please share your details to proceed with the download");
});
$(window).on("resize", function () {
  get_testimonial_card_height();
});
function get_testimonial_card_height() {
  $(".testimonial-section .slick-track > li > .testi-wrap").each(function () {
    child_height = $(this).height();
    $(".testimonial-section .slick-track > li .testi-wrap").height(
      child_height
    );
    //$(".testimonial-section .slick-track > li").height(child_height);
  });
}

// Banner slider

if ($(".Mainbannerslider").length) {
  $(".Mainbannerslider").slick({
    slidesToScroll: 1,
    slidesToShow: 1,
    infinite: true,
    dots: true,
    arrows: false,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          arrows: false,
          centerMode: false,
          centerPadding: "30px",
          dots: true,
        },
      },
    ],
  });
}


//career placement carousel start
if ($(".career-placement-cards-smu").length) {
  $(".career-placement-cards-smu").slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    dots: true,
    arrows: true,
    infinite: false,
    autoplay: false,
    responsive: [
      {
        breakpoint: 1282,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1.1,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
          autoplay: false,
        },
      },
    ],
  });
}

if (window.location.pathname == "/online-mba-courses") {
  $(document).on("click", '#coursedegree2 .course-show-more', function (event) {
    $('#coursedegree2 .course-card-second-row').css('display', 'flex');
    $('#coursedegree2 .course-show-more').hide();
    $('#coursedegree2 .course-browse-all').show();
  });
}

// Form dropdown labels
function applyDropdownLabels(univList) {
  for (var i = 0; i < univList.length; i++) {
    $(".rfi-form select[name='leadsquared-mx_course_applying_for']").each(function (index) {
      $(this).find('option').eq(univList[i].position).before($("<option class='select-title' disabled></option>").val("").text(univList[i].name));
    });
  }
}

let pathURL = window.location.pathname;
if (["/online-degree-courses-in-india"].includes(pathURL)) {
  var univList = [{ name: "Manipal University Jaipur (MUJ)", position: "1" }, { name: "Sikkim Manipal University (SMU)", position: "9" }, { name: "Manipal Academy of Higher Education (MAHE)", position: "17" }];
  applyDropdownLabels(univList);
}

if (["/online-pg-master-degree"].includes(pathURL)) {
  var univList = [{ name: "Manipal University Jaipur (MUJ)", position: "1" }, { name: "Sikkim Manipal University (SMU)", position: "6" }, { name: "Manipal Academy of Higher Education (MAHE)", position: "12" }];
  applyDropdownLabels(univList);
}

if (["/online-ug-bachelor-degree"].includes(pathURL)) {
  var univList = [{ name: "Manipal University Jaipur (MUJ)", position: "1" }, { name: "Sikkim Manipal University (SMU)", position: "5" }];
  applyDropdownLabels(univList);
}

// Code for hide SMU courses from following pages
if (window.location.pathname == "/nepal/online-degree-course") {
  var form_arr = ['#course-float-form', '#enrollNow', '#popuprfiform'];
  for (let i = 0; i < form_arr.length; i++) {
    $(form_arr[i] + " select[name='leadsquared-mx_course_applying_for'] option").each(function (index) {
      if (index > 0 && index > 8) {
        $(this).remove();
      }
    });
  }
}

var width = $(window).width();
if (width <= 480) {
  if ($(".smu-mba-om-advantages .mba-om-avantages").length) {
    $(".smu-mba-om-advantages .mba-om-avantages").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: true,
      arrows: false,
      infinite: false,
      adaptiveHeight: false,
    });
  }
}
if (width < 769) {
  $(window).scroll(function () {
    if (
      $(document).scrollTop() >= $(".course-section").offset().top &&
      $(".course-section").offset().top + $(".course-section").height() - 30 >=
      $(document).scrollTop()
    ) {
      $(".smuLp").css("overflow-x", "visible");
    } else {
      $(".smuLp").css("overflow-x", "hidden");
    }
  });
}
if (width < 769) {
  $(window).scroll(function () {
    if ($(document).scrollTop() >= $(".rankings").offset().top - 200) {
      $(".enrollNowBtn").css("display", "block");
    } else {
      $(".enrollNowBtn").css("display", "none");
    }
  });
} else {
  $(window).scroll(function () {
    if ($(document).scrollTop() >= $(".rankings").offset().top - 200) {
      $(".enrollNowBtn").css("display", "block");
    } else {
      $(".enrollNowBtn").css("display", "none");
    }
  });
}

$(".request-callback .show-popup").click(function () {
  $('.popupleadForm').removeClass("onScroll");
  $(".popupleadForm #popuprfiform h5").text("Request Call Back");
  $(".popupleadForm .submitField .wpcf7-submit").val("Request Call Back");
  $(".popupleadForm.overlay-content").css("z-index", "9999");
});

let pathName = window.location.href.split('?')[0];

if (pathName.indexOf("/online-degree-courses") > -1) {
  $(".smu-enroll-div a").click(function () {
    window.scrollTo({ top: $("#enRoll").offset().top - 80, behavior: 'smooth' });
  });
  $(".enrollNowBtn").click(function () {
    window.scrollTo({ top: $("#enRoll").offset().top - 80, behavior: 'smooth' });
  });
}

// SMU Print Ad know more navigation
if (pathName.indexOf("/smu/print-ad") > -1) {
  $(".fees_secnav").removeAttr("href");
  $(".fees_secnav").click(function () {
    window.scrollTo({ top: $("#fees_sec").offset().top - 100, behavior: 'smooth' });
  });
}

function readFunction(e) {
  $(".electives_wrap").toggleClass("show-content"),
    $(".brochure_wrap").toggleClass("show-content"),
    $(".view-more.desktop").text(function(e, t) {
        return "See All" === t ? "Show Less" : "See All" 
    });
}
function enrollnowFunction(course_name, university){
  $("#demoLeadForm input[name=leadsquared-mx_course_applying_for]").val(course_name);
  $("#demoLeadForm input[name=Institution]").val(university);
}
function downloadnowFunction(pdf_path, course_name, university){
  $("#downloadform .wpcf7-submit").val("Download Now");
  $('#download-url').text(pdf_path);
  $("#downloadform input[name=leadsquared-mx_course_applying_for]").val(course_name);
  $("#downloadform input[name=Institution]").val(university);
  $("#downloadform .otp-verification-block .download-broucher .paragraph").text("Enter the code sent to your phone number to proceed with the download brochure");
  $('.popupElectives').css("display","none");
}
function electives(course_class){
  $('.popupElectives .course-card-mba').css("display","none");
  $('.popupElectives .'+course_class).css("display","block");
}


