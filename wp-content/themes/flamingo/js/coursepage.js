// duration of scroll animation
var scrollDuration = 10;
var isWayPointInitialized = false;
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
var courseOverview = $('.course-details').length > 0 ? $('.course-details').height() : 0;
var bannerContainer = $('.bannerContainer').length > 0 ? $('.bannerContainer').height() : 0;
var elective = ($('.Electives ').length && $(window).width() < 767) > 0 ? $('.Electives ').height() / 4 - 220 : 0;

//var allheight = (navHeight + breadcrumb + courseOverview + bannerContainer + elective) - 170;
if ($(window).width() < 767) {
  sub_nav_height = 0;
} else {
  sub_nav_height = 120;
}
var allheight = (navHeight + breadcrumb + courseOverview + bannerContainer + elective) - sub_nav_height;

var enrollbuttonhide = $(".course-details .left").height() + navHeight + breadcrumb;
var enrollbuttonshow = $(".course-details").height() + navHeight + breadcrumb;
var enrollnowbuttonshow = $(".course-details .courseInfo").height() + navHeight + breadcrumb;

// get wrapper width
var getMenuWrapperSize = function () {
  return $('.sub-menu-wrapper').outerWidth();
}
var menuWrapperSize = getMenuWrapperSize();
// the wrapper is responsive
$(window).on('resize', function () {
  menuWrapperSize = getMenuWrapperSize();
});
// size of the visible part of the menu is equal as the wrapper size 
var menuVisibleSize = menuWrapperSize;

// get total width of all menu items
var getMenuSize = function () {
  return itemsLength * itemSize;
};
var menuSize = getMenuSize();
// get how much of menu is invisible
var menuInvisibleSize = menuSize - menuWrapperSize;

// get how much have we scrolled to the left
var getMenuPosition = function () {
  return $('.sub-menu').scrollLeft();
};
function showHideSubNavArrows() {
  // get how much of menu is invisible
  menuInvisibleSize = menuSize - menuWrapperSize;
  // get how much have we scrolled so far
  var menuPosition = getMenuPosition();

  //var menuEndOffset = menuInvisibleSize - paddleMargin;
  //var menuEndOffset = menuInvisibleSize - paddleMargin;
  var menuEndOffset = $('.sub-menu')[0].scrollWidth - $('.sub-menu').scrollLeft();
  var width = $('.sub-menu').outerWidth();

  // show & hide the paddles 
  // depending on scroll position
  if (menuPosition <= paddleMargin) {
    $(leftPaddle).addClass('hidden');
    $(rightPaddle).removeClass('hidden');
  } else if (menuPosition < menuEndOffset) {
    // show both paddles in the middle
    $(leftPaddle).removeClass('hidden');
    $(rightPaddle).removeClass('hidden');
  } else if (menuPosition >= paddleMargin) {
    $(leftPaddle).removeClass('hidden');
    $(rightPaddle).addClass('hidden');
  }

  if ((Math.trunc(menuEndOffset) == Math.trunc(width)) || (menuEndOffset - width < 1)) {
    $(rightPaddle).addClass('hidden');
  }
  else {
    $(rightPaddle).removeClass('hidden');
  }
}
// finally, what happens when we are actually scrolling the menu
$('.sub-menu').on('scroll', function () {
  showHideSubNavArrows();
});

// scroll to left
$(rightPaddle).on('click', function () {
  //$('.sub-menu').animate( { scrollLeft: menuInvisibleSize}, scrollDuration);
  $('.sub-menu').animate({ scrollLeft: '+=260px' }, 10);
});

// scroll to right
$(leftPaddle).on('click', function () {
  //$('.sub-menu').animate( { scrollLeft: '0' }, scrollDuration);
  $('.sub-menu').animate({ scrollLeft: '-=260px' }, 10);
});
// sticky sub navigation start
var sections = $('.id-row')
  , nav = $('.sub-menu');
// var nav_height = 210;
var nav_height = navHeight + breadcrumb;


var ht_flag = 0;

function selectSubNav(selectedNav) {
  nav.find('a').parent().removeClass('active');
  var selectedElePosition = selectedNav.offset().left + selectedNav.parent()[0].clientWidth;
  selectedNav.parent().addClass('active');
  if (selectedElePosition > $(window).width() || (!$(rightPaddle).hasClass('hidden') && selectedElePosition > $(rightPaddle).offset().left)) {
    $('.sub-menu').animate({ scrollLeft: '+=' + $(window).width() / 2 + 'px' }, scrollDuration);
  } else if (selectedNav.offset().left < ($(leftPaddle).offset().left + $(leftPaddle)[0].clientWidth)) {
    $('.sub-menu').animate({ scrollLeft: '-=' + $(window).width() / 2 + 'px' }, scrollDuration);
  }

  if ($(".courseSubNav ul li").last().hasClass('active')) {
    $(rightPaddle).addClass('hidden');
  }
}
// Function to handle intersection observer callback
if ($(window).width() < 768) {
  function handleIntersection(entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        // If form is not in viewport, show the buttons
        $('.enrollNowBtn').removeClass('mobileenrollnow').show();
        $('.mobileEnrollBtn').removeClass('mobileenrollnow').show();
        $('.downloadBtn').removeClass('mobileenrollnow').show();

        // Hide the "Payroll" button
        //$('#payrollButton').show();
      } else {
        // If form is in viewport, hide the buttons
        $('.enrollNowBtn').addClass('mobileenrollnow').hide();
        $('.mobileEnrollBtn').addClass('mobileenrollnow').hide();
        $('.downloadBtn').addClass('mobileenrollnow').hide();
        $("header .overlaymb").css("height", "100%");
      }
    });
  }

  // Create a new intersection observer
  const observer = new IntersectionObserver(handleIntersection, {
    root: null,
    rootMargin: '0px',
    threshold: 0.5 // Trigger callback when at least 50% of form is visible
  });

  // Select the form element
  const formElement = document.getElementById('course-float-form');

  // Start observing the form element
  observer.observe(formElement);



  // Function to hide buttons
  function hideButtons() {
    $('.mobileEnrollBtn').addClass('mobileenrollnow').hide();
    $('.downloadBtn').addClass('mobileenrollnow').hide();
    $("header .overlaymb").css("height", "100%");
  }

  // Function to show buttons
  function showButtons() {
    $('.mobileEnrollBtn').removeClass('mobileenrollnow').show();
    $('.downloadBtn').removeClass('mobileenrollnow').show();
  }

  // Function to check if form is visible
  function isFormVisible() {
    const formOffset = $('#course-float-form').offset().top;
    const windowHeight = $(window).height();
    const scrollTop = $(window).scrollTop();

    return scrollTop >= formOffset - windowHeight && scrollTop <= formOffset;
  }

  // Function to check if the user is in the first two sections
  function isInFirstThreeSections(scrollTop) {
    const sectionHeight = $(window).height();
    return scrollTop < sectionHeight * 2;
  }

  // Initially hide buttons
  hideButtons();
}

$(window).on('resize scroll', function () {
  if ($(window).width() < 768) {
    const scrollTop = $(this).scrollTop();

    // Check if the user is in the first three sections
    if (isInFirstThreeSections(scrollTop)) {
      hideButtons();
    } else {
      // Check if the form is visible or the user has scrolled past the top of the page
      if (isFormVisible() || scrollTop > 0) {
        showButtons();
      } else {
        hideButtons();
      }
    }
  }

  if ($('.courseSubNav').length) {
    if ($(window).scrollTop() > allheight) {
      $('.courseSubNav').addClass('show');
      $(".courseSubNav").css("top", "116px");
      if ($(window).width() > 768) {
        $('.call').removeClass('mobileOnly');
        $('.enrollNowBtn').removeClass('mobileOnly');
      }
      if ($(window).width() < 768) {
        $('.mobileBottomWidget').show();
        $(".courseSubNav").css("top", "66px");
      }
      showHideSubNavArrows();
      if (ht_flag == 0) {
        nav_height = nav_height + $('.courseSubNav').height() + 50;
        ht_flag = 1;
        var left_mgr_pd = Math.trunc($('.leftBlock section.id-row').eq(1).offset().left);
        $('section.courseSubNav').animate({ marginLeft: '-' + left_mgr_pd + 'px', paddingLeft: left_mgr_pd + 'px' }, 10);
      }

    } else {
      $('.sub-menu').animate({ scrollLeft: '0px' }, 10);
      $('.courseSubNav').removeClass('show');
    }
  }
});
var checkWaypoint = true;

nav.find('a').on('click', function () {
  var id = $(this).attr('href');
  selectSubNav($(this));
  checkWaypoint = false;

  $('html, body').animate({

    scrollTop: $(id).offset().top - nav_height - 50
  }, {
    duration: 0,
    done: function () {
      setTimeout(function () {
        // console.log(" ========= animation Complete === ");
        checkWaypoint = true;
      }, 1000);
    }
  });
  return false;
});

jQuery(document).ready(function ($) {
  if ($(window).width() < 768) {
    // Remove aria-hidden="true" from elements within .slick-initialized
    $('.slick-initialized [aria-hidden="true"]').removeAttr('aria-hidden');

    // Set tabindex="-1" for buttons within elements with aria-hidden="true"
    $('.slick-initialized [aria-hidden="true"] button').attr('tabindex', '-1');

    $('.mobileEnrollBtn').hide();
    $('.downloadBtn').hide();
  }

  if (window.location.pathname.indexOf("/international/online-mba-v2") == -1) {
    setTimeout(function () {
      sections.each(function () {
        var sectionItem = $(this);
        sectionItem.waypoint(function (direction) {
          if (direction == 'up' && checkWaypoint) {
            selectSubNav(nav.find('a[href="#' + sectionItem.attr('id') + '"]'));
          }
        }, {
          offset: function () {
            return 0 - (sectionItem.height() / 2 - 100);
          }
        });
        sectionItem.waypoint(function (direction) {
          if (direction == 'down' && checkWaypoint) {
            selectSubNav(nav.find('a[href="#' + sectionItem.attr('id') + '"]'));
          }
        }, { offset: '50%' });
      });
    }, 2000);
  }

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
      slidesToShow: 2,
      slidesToScroll: 1,
      arrows: false,
      infinite: false,
      dots: false,
      // asNavFor: '.mobile-admission-process-nav'
    });
  }

  // Elective change dropdown
  $("#electives-subject").change(function () {
    var selVal = $(this).val();
    $(".expect-to-learn .tabcontent").hide();
    $("#" + selVal).show();
  });

  if (window.location.pathname.indexOf("/bachelor-of-business-administration-honors-mahe") > -1 || window.location.pathname.indexOf("/online-mba-sikkim-manipal-university") > -1 || window.location.pathname.indexOf("/online-mba-in-marketing-smu") > -1) {
    //code for mahe bba elective
    for (let i = 1; i < 10; i++) {
      $("#electives-subject" + i).change(function () {
        var selVal = $(this).val();
        $(".expect-to-learn .tabcontent").hide();
        if (selVal == "default") {
          $("#electives-subject1").val("default");
          $("#electives-subject3").val("default");
        } else {
          for (let i = 1; i < 10; i++) {
            var electVal = selVal.slice(0, -1);
            $("#electives-subject" + i).val(electVal + i);
            $("#" + electVal + i).show();
          }
        }
        return false;
      });
    }
  } else {
    for (let i = 1; i < 10; i++) {
      $("#electives-subject" + i).change(function () {
        var selVal = $(this).val();
        $(".expect-to-learn .tabcontent").hide();
        if (selVal == "") {
          $("#electives-subject1").val("");
          $("#electives-subject3").val("");
        } else {
          if (window.location.pathname.indexOf("/master-of-computer-applications-mahe") > -1 || (window.location.pathname.indexOf("/online-mca-") > -1 && window.location.pathname.indexOf("-mahe") > -1)) {
            $("#" + selVal).show();
          } else {
            for (let i = 1; i < 10; i++) {
              var electVal = selVal.slice(0, -1);
              $("#electives-subject" + i).val(electVal + i);
              $("#" + electVal + i).show();
            }
          }
        }
      });
    }
  }

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
      if (window.location.pathname.indexOf("/online-mba-sikkim-manipal-university") == -1 && window.location.pathname.indexOf("/online-mba-in-marketing-smu") == -1) {
        $("#electives-subject1").val(selectorName + "-1");
        $("#electives-subject3").val(selectorName + "-3");
      }
      $("#electives-subject2").val(selectorName + "-2");
      if (window.location.pathname.indexOf("/online-mba-sikkim-manipal-university") > -1 || window.location.pathname.indexOf("/online-mba-in-marketing-smu") > -1) {
        $("#electives-subject, #electives-subject2").attr("disabled", "disabled").css('cursor', 'default');
      }
      else {
        $("#electives-subject, #electives-subject1, #electives-subject2, #electives-subject3").attr("disabled", "disabled").css('cursor', 'default');
        $('head').append('<style>.select-dropdown::after{content:none !important;}</style>');
      }
      $("#" + selectorName).show();
      $("#" + selectorName + "-1").show();
      $("#" + selectorName + "-2").show();
      $("#" + selectorName + "-3").show();
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

  // refer and earn page refer now button redirection
  $('.refer-earn-button').click(function () {
    window.open("/refer-earn", "_blank");
  });

  $('.electivesSlider .line-items').removeAttr('role');
  setTimeout(() => {
    $('.jssocials-share-whatsapp .jssocials-share-link').attr('aria-label', 'share icon');
  }, 500);

  if ($('.coursera').length > 0 && $('.google-text').length > 0) {
    //$('.coursera').css('border-bottom', 'solid #cad0e3 1px');
  }

  // ---------------------------
  if (window.location.pathname.indexOf("/pgcp-in-entrepreneurship-and-innovation") > -1) {
    $('.pgcp-text .know-more').click(function (e) {
      e.preventDefault();
      $('html,body').animate({
        scrollTop: $('#faculty_sec').offset().top
      }, {
        duration: 600,
        easing: 'linear',
        complete: function () {
          setTimeout(function () {
            if ($(window).width() < 768) {
              var scrollTo = $('#faculty_sec').offset().top - 200;
            } else {
              var scrollTo = $('#faculty_sec').offset().top - 300;
            }
            $('html,body').animate({
              scrollTop: scrollTo,
            }, {
              easing: 'linear',
              duration: 100
            });
          }, 500);
        }
      });
    });
  } else {
    $('span.know-more a').click(function (e) {
      e.preventDefault();
      $('html,body').animate({
        scrollTop: $('#tool-certification-sect').offset().top
      }, {
        duration: 600,
        easing: 'linear',
        complete: function () {
          setTimeout(function () {
            if ($(window).width() < 768) {
              var scrollTo = $('#tool-certification-sect').offset().top - 200;
            } else {
              var scrollTo = $('#tool-certification-sect').offset().top - 300;
            }
            $('html,body').animate({
              scrollTop: scrollTo,
            }, {
              easing: 'linear',
              duration: 100
            });
          }, 500);
        }
      });
    });
  }

  if (!$.cookie("cookieName")) {
    $.cookie("cookieName", "firstSet", { "expires": 7 })
  }
  // ----------------------------------------

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
if (window.location.pathname.indexOf("/mca-artificial-intelligence") > -1) {
  $('#elec-ai1').css('display', 'block');
  $('#elec-ai2').css('display', 'block');
  $('#elec-ai3').css('display', 'block');
  for (var i = 0; i <= 4; i++) {
    if (i == 0) {
      $('#electives-subject').find('option[value=elec-ai]')
        .attr('selected', 'selected');
      $('#electives-subject').prop('disabled', true);
      $('#elec-ai').css('display', 'block');
    }
    var selectId = '#electives-subject' + i;
    var optionValue = 'elec-ai' + i;
    $("#elec-ai" + optionValue).css('display', 'block');
    $(selectId).find('option[value=' + optionValue + ']')
      .attr('selected', 'selected');
    $(selectId).prop('disabled', true);
  }
}
