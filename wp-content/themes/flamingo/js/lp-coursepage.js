// duration of scroll animation
var scrollDuration = 10;
// paddles
var leftPaddle = document.getElementsByClassName('left-paddle');
var rightPaddle = document.getElementsByClassName('right-paddle');
// get items dimensions
var itemsLength = $('.item a').length;
var itemSize = $('.item a').outerWidth(true);
// get some relevant size for the paddle triggering point
var paddleMargin = 20;
var navHeight = $('header').height();
var breadcrumb = $('.breadcrumb-container').length > 0 ? $('.breadcrumb-container').height() : 0;
var courseOverview = $('.courseOverview').length > 0 ? $('.courseOverview').height() : 0;
var bannerContainer = $('.bannerContainer').length > 0 ? $('.bannerContainer').height() : 0;
var allheight = (navHeight + breadcrumb + courseOverview + bannerContainer) - 170;


jQuery(document).ready(function ($) {

  // jsSocials for program page
  if ($("#share").length) {
    $("#share").jsSocials({
      showLabel: false,
      showCount: false,
      shares: ["facebook", "twitter", "linkedin", "whatsapp"]
    });
  }

  // admission process section carousel for mobile
  if ($(".mobile-admission-process-nav").length) {
    $('.mobile-admission-process-nav').slick({
      slidesToShow: 2,
      slidesToScroll: 1,
      asNavFor: '.mobile-admission-process-for',
      dots: false,
      arrows: false,
      centerMode: true,
      infinite: false,
      focusOnSelect: true
    });
  }
  if ($(".mobile-admission-process-for").length) {
    $('.mobile-admission-process-for').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      infinite: false,
      dots: true,
      asNavFor: '.mobile-admission-process-nav'
    });
  }

  // Elective change dropdown
  $("#electives-subject").change(function () {
    var selVal = $(this).val();
    $(".expect-to-learn .tabcontent").hide();
    $("#" + selVal).show();
  });
  $("#electives-subject1").change(function () {
    var selVal = $(this).val();
    $(".expect-to-learn .tabcontent").hide();
    $("#" + selVal).show();
  });
  $("#electives-subject2").change(function () {
    var selVal = $(this).val();
    $(".expect-to-learn .tabcontent").hide();
    $("#" + selVal).show();
  });

  // bkfsAccordian
  $(".accordion-desc .bkfs_title").click(function () {
    $(this).hasClass("open_accordian_bkfs") ? ($(this).parent().find(".bkfs_accordian_data").slideUp(),
      $(this).removeClass("open_accordian_bkfs")) : ($(".bkfs_accordian_data").slideUp(),
        $(".open_accordian_bkfs").removeClass("open_accordian_bkfs"),
        $(this).parent().find(".bkfs_accordian_data").slideDown(),
        $(this).parent().find(".bkfs_title").addClass("open_accordian_bkfs"))
  });

  $("#course_detail_sec .accordion-title").click(function () {
    if ($('.panel-body').find('.open_accordian_bkfs').length) {
      $('.panel-body').find('.open_accordian_bkfs').click();
    }
  });

  // Displaying the eletive subject in program curriculum
  if ($(".electiveSelector").length) {
    var selectorName = $(".electiveSelector").text();
    if (selectorName) {
      $("#electives-subject").val(selectorName);
      $("#electives-subject1").val(selectorName + "-1");
      $("#electives-subject, #electives-subject1").attr("disabled", "disabled");
      $("#" + selectorName).show();
      $("#" + selectorName + "-1").show();
    }
  }


  // Script for running text
  if ($(".last_date_text").length) {
    $.fn.writeText = function (content) {
      var contentArray = content.split(""),
        current = 0,
        elem = this;
      setInterval(function () {
        if (current < contentArray.length) {
          elem.text(elem.text() + contentArray[current++]);
        }
      }, 100);
    };
    var text = $(".last_date_text").text();
    if (text) {
      $(".alert-msg").writeText(text);
    }
  }
  $("#coursedegree11-tab").click(function () {
    $(".institute-course-section .tab-content .tab-pane").removeClass("active");
    $('.institute-course-section .tab-content .tab-pane').first().addClass('active');

  })

  if($(window).width() < 768){
    // Remove aria-hidden="true" from elements within .slick-initialized
    $('.slick-initialized [aria-hidden="true"]').removeAttr('aria-hidden');
  
    // Set tabindex="-1" for buttons within elements with aria-hidden="true"
    $('.slick-initialized [aria-hidden="true"] button').attr('tabindex', '-1');
  }

});
setTimeout(function () {
  let tabContentHeighttArr = [];
  $('#admission_process_sec .content-wrapper .tab-content').each(function () {
    $(this).addClass('active');
    tabContentHeighttArr.push($(this).find('.content').height());
    $(this).removeClass('active');
  });
  $('#admission_process_sec .content-wrapper .tab-content').eq(0).addClass('active');
  tabContentHeighttArr.reverse();
  $('#admission_process_sec .content-wrapper .tab-content .content').css('min-height', tabContentHeighttArr[0]);
  //console.log(tabContentHeighttArr[0]);
}, 800);

//certificate carousel
if ($(".certificate-slider").length) {
  $(".certificate-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: true,
    infinite: false,
    autoplay: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
          autoplay: false,
        }
      }
    ]
  });
}
