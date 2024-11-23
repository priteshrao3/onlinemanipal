var pageURL = window.location.origin + window.location.pathname;
jQuery(document).ready(function ($) {
  let width = $(window).width();
  function filterCourseCard() {
    var searchInput = $("input[name=searchText]").val();
    var domain = $(".course-dropdown .same-as-selected").text();
    var institution = $(".institution-dropdown .same-as-selected").text();
    var courseType = [];
    var domain_mobile = [];
    var institution_mobile = [];
    var experience = [];
    var duration = [];
    var fee = [];
    $("#homepage-course-filter-form input[name='courseType[]']:checked").each(function () {
      courseType.push($(this).val());
    });
    $("#homepage-course-filter-form input[name='domain[]']:checked").each(function () {
      domain_mobile.push($(this).val());
    });
    $("#homepage-course-filter-form input[name='institution[]']:checked").each(function () {
      institution_mobile.push($(this).val());
    });
    $("#homepage-course-filter-form input[name='experience[]']:checked").each(function () {
      experience.push($(this).val());
    });
    $("#homepage-course-filter-form input[name='duration[]']:checked").each(function () {
      duration.push($(this).val());
    });
    $("#homepage-course-filter-form input[name='fee[]']:checked").each(function () {
      fee.push($(this).val());
    });

    var pageId = $("#page-id").val();
    var pageType = '';
    var pathName = window.location.href;
    if (pathName.indexOf("global") > -1) {
      pageType = 'International';
    } else {
      pageType = 'Domestic';
    }
    var requestUri = window.location.pathname;
    var institutionName1 = institution;
    if (institution === "All Universities") {
      institutionName1 = '';
    }
    $.ajax({
      url: '/wp-admin/admin-ajax.php',
      type: 'POST',
      dataType: 'html',
      data: {
        action: 'homepage_courses_filter',
        searchInput: searchInput,
        pageType: pageType,
        page_id: pageId,
        domain: domain,
        institution: institutionName1,
        courseType: courseType,
        domain_mobile: domain_mobile,
        institution_mobile: institution_mobile,
        experience: experience,
        duration: duration,
        fee: fee,
        request_uri: requestUri,
        page_url: pageURL
      },
      success: function (response) {
        $(".course-filter-results").html(response);
        if ($(window).width() > 768) {
          restruct_filter(institution);
        } else {
          var selectedVal = $('.institution-dropdown .select-selected').html();
          if (selectedVal === "Manipal University Jaipur (MUJ)" || selectedVal === "Manipal Univers...") {
            $('.select-selected.select-box').css({ "background": "#DEEDFF", "color": "#0522D2" });
          } else if (selectedVal === "Manipal Academy of Higher Education (MAHE)" || selectedVal === "Manipal Academy...") {
            $('.select-selected.select-box').css({ "background": "#BFE9E7", "color": "#14223D" });
          } else if (selectedVal === "Sikkim Manipal University (SMU)" || selectedVal === "Sikkim Manipal ...") {
            $('.select-selected.select-box').css({ "background": "#DEFFD3", "color": "#013C51" });
          } else {
            $('.select-selected.select-box').css({ "background": "#f7f7f7", "color": "#000" });
          }
          (!$(".nav-tabs-mobile").find(".nav-link-mobile").eq(0).hasClass('active')) ? $(".nav-tabs-mobile").find(".nav-link-mobile").eq(0).addClass('active') : '';
          var actWidth = $(".nav-tabs-mobile").find(".active").parent("li").width();
          var actPosition = $(".nav-tabs-mobile .active").position();
          if ($(".nav-tabs-mobile").eq(0).position()) {
            $(".nav-tabs-mobile .slider").css({ "left": + actPosition.left, "width": actWidth });
          }
        }
        if (institution === "All Universities") {
          $('#coursedegree1 .course-card-second-row').css('display', 'flex');
          $('#coursedegree1 .course-show-more').hide();
          $('#coursedegree1 .course-browse-all').show();
          $('#coursedegree3 .course-card-second-row').css('display', 'flex');
          $('#coursedegree3 .course-show-more').hide();
          $('#coursedegree3 .course-browse-all').show();
        }
        // if (width < 480 && (pathName.indexOf("home-page") || pathName.indexOf("/") > -1) > -1 && institution !== "All Universities") {
        $("#coursedegree5-mobile").hide();
        $("#popular-courses-tab").hide();
        //}
        var websitePath = window.location.href.split('?')[0];
        if (websitePath.indexOf("international") > -1 || websitePath.indexOf("/ae") > -1 || websitePath.indexOf("/us-ca") > -1 || websitePath.indexOf("/np") > -1 || websitePath.indexOf("/saarc-ewc") > -1 || websitePath.indexOf("/global") > -1 || websitePath.indexOf("/sl") > -1 || websitePath.indexOf("/af") > -1 || websitePath.indexOf("/zambia") > -1) {
          $('.course-card a[href="https://www.onlinemanipal.com/pgcp-in-entrepreneurship-and-innovation"]').parents('.course-card').hide();
        }
      },
      error: function (response) {
        console.warn(response);
      }
    });
  }

  // Search icon button click form submission
  $(document).on("click", ".course-search-icon", function () {
    filterCourseCard();
    $(".filter-applied-area-mobile .filter-headtext").show();
  });

  // Search input keypress/ enter key submission
  $('#courseSearchText').keypress(function (e) {
    if (e.which == 13) {
      e.preventDefault();
      filterCourseCard();
      $(".filter-applied-area-mobile .filter-headtext").show();
    }
  })

  // Input field click form submission
  $(document).on("click", "#homepage-course-filter-form input[type=checkbox]", function () {
    filterCourseCard();
    selectedTags();
  });

  function selectedTags() {
    var sList = "";
    var fList = "";
    $('#homepage-course-filter-form input[type=checkbox]').each(function () {
      if ($(this).prop('checked') == true) {
        var selectedText = $(this).parent('label').text();
        var selectedVal = $(this).val();
        var name = $(this).attr("name").replace('[]', '');
        sList += '<span class="selLabel ' + selectedVal + '" data-label="' + name + '" data-val="' + selectedVal + '">' + selectedText + '<span class="close"> x</span></span>';
        fList += '<div class="filter-keytext checkbox_filter_item ' + name + '_value">' + selectedVal + '<span>x</span></div>';
      } else {
        $(".filteredLabels ." + selectedVal).remove();
      }
    });
    $(".filteredLabels").html(sList);
    if (sList) {
      $(".filter-applied-text").show();
      $(".filter-applied-area-mobile .filter-headtext").show();
    } else {
      $(".filter-applied-text").hide();
      $(".filter-applied-area-mobile .filter-headtext").hide();
    }
    return true;
  }

  // Input field click form submission
  $(document).on("click", ".select-items div", function () {
    setTimeout(function () {
      filterCourseCard();
    }, 100);
  });

  // filtered values clear all
  $(document).on("click", ".filter_clear_all", function () {
    $(".search-container input").val('');
    $(".course-dropdown .select-selected").text("Course Domains");
    $(".institution-dropdown .select-selected").text("Institutions");
    $(".custom-select div").removeClass("same-as-selected");
    filterCourseCard();
  });

  // filtered values clear all mobile
  $(document).on("click", ".filter_clear_all_mobile", function () {
    $(".search-container input").val('');
    $('#courseFilterOverlay').find('form')[0].reset();
    selectedTags();
    $(".filter-applied-text").hide();
    $(".filter-applied-area-mobile .filter-headtext").hide();
    filterCourseCard();
    $('.homepage-mobile-course-filter .clear-btn, .homepage-mobile-course-filter .apply-btn').attr('disabled', true); //enable input     
    $('.homepage-mobile-course-filter .clear-btn, .homepage-mobile-course-filter .apply-btn').addClass('disabled'); //enable input 
  });

  // filtered value clear individually
  $(document).on("click", ".search_keyword_value span", function () {
    $(".search_keyword_value").hide();
    $(".search-container input").val('');
    filterCourseCard();
  });
  $(document).on("click", ".domain_selected_value span", function () {
    $(".domain_selected_value").hide();
    $(".course-dropdown .select-selected").text("Course Domains");
    $(".course-dropdown div").removeClass("same-as-selected");
    filterCourseCard();
  });
  $(document).on("click", ".institution_selected_value span", function () {
    $(".institution_selected_value").hide();
    $(".institution-dropdown .select-selected").text("Institutions");
    $(".institution-dropdown div").removeClass("same-as-selected");
    filterCourseCard();
  });

  // Close individual tagging
  $(document).on("click", ".filteredLabels .close", function () {
    var classSelector = $(this).parent().attr('data-val');
    var classLabel = $(this).parent().attr('data-label');
    $("#homepage-course-filter-form ." + classLabel + " input[value='" + classSelector + "']").click();
  });

  // Form reset options
  $(document).on("click", ".homepage-mobile-course-filter .clear-btn", function () {
    $('.homepage-mobile-course-filter .clear-btn, .homepage-mobile-course-filter .apply-btn').attr('disabled', true);
    $('.homepage-mobile-course-filter .clear-btn, .homepage-mobile-course-filter .apply-btn').addClass('disabled');
    $('#courseFilterOverlay').find('form')[0].reset();
    selectedTags();
    $(".filter-applied-text").hide();
    filterCourseCard();
  });

  // Mobile filter code
  $(document).on("click", ".homepage-mobile-course-filter .apply-btn", function (e) {
    e.preventDefault();
    filterCourseCard();
    closeCourseFilter();
  });

  // on click of mobile filter checkbox enable/disable "Clear All" and "Apply" button
  $('.homepage-mobile-course-filter .clear-btn, .homepage-mobile-course-filter .apply-btn').attr('disabled', true);
  $('.homepage-mobile-course-filter .clear-btn, .homepage-mobile-course-filter .apply-btn').addClass('disabled');
  $('.homepage-mobile-course-filter #homepage-course-filter-form input[type="checkbox"]').click(function () {
    if (($('#homepage-course-filter-form input:checkbox:checked').length) > 0) {
      $('.homepage-mobile-course-filter .clear-btn, .homepage-mobile-course-filter .apply-btn').removeAttr('disabled');
      $('.homepage-mobile-course-filter .clear-btn, .homepage-mobile-course-filter .apply-btn').removeClass('disabled');
    } else {
      $('.homepage-mobile-course-filter .clear-btn, .homepage-mobile-course-filter .apply-btn').attr('disabled', true);
      $('.homepage-mobile-course-filter .clear-btn, .homepage-mobile-course-filter .apply-btn').addClass('disabled');
    }
  });

  // Homepage course card scrolling in mobile design
  if (width < 768) {
    var actWidth = $(".nav-tabs-mobile").find(".active").parent("li").width();
    var actPosition = $(".nav-tabs-mobile .active").position();
    if ($(".nav-tabs-mobile .active").position()) {
      $(".nav-tabs-mobile .slider").css({ "left": + actPosition.left, "width": actWidth });
    }
    var isCourseTabSelected = false;
    function scrollToCourse(courseClass, courseTabPosition) {
      $(".course-nav-container-mobile").animate({ scrollLeft: '+=' + courseTabPosition + 'px' }, 0);
      $(".coursedegree2-tab").removeClass("active");
      $(".coursedegree3-tab").removeClass("active");
      $(".coursedegree4-tab").removeClass("active");
      $(".coursedegree5-tab").removeClass("active");
      $(courseClass).addClass("active");
      var actWidth = $(".nav-tabs-mobile").find(".active").parent("li").width();
      var actPosition = $(".nav-tabs-mobile .active").position();
      if ($(".nav-tabs-mobile .active").position()) {
        $(".nav-tabs-mobile .slider").css({ "left": + actPosition.left, "width": actWidth });
      }
    }

    $('#coursedegree5-mobile').waypoint(function (direction) {
      if (direction == 'up' && !isCourseTabSelected) {
        if (direction == 'up') {
          scrollToCourse(".coursedegree5-tab", -150);
        }
      }
    }, { offset: '10%' });
    $('#coursedegree5-mobile').waypoint(function (direction) {
      if (direction == 'down' && !isCourseTabSelected) {
        if (direction == 'down') {
          scrollToCourse(".coursedegree5-tab", 0);
        }
      }
    }, { offset: '60%' });
    $('#coursedegree2-mobile').waypoint(function (direction) {
      if (direction == 'up' && !isCourseTabSelected) {
        if (direction == 'up') {
          var tablength = (pageURL == "/home-page" || pageURL == "/") ? 0 : -150;
          scrollToCourse(".coursedegree2-tab", tablength);
        }
      }
    }, { offset: '10%' });
    $('#coursedegree2-mobile').waypoint(function (direction) {
      if (direction == 'down' && !isCourseTabSelected) {
        if (direction == 'down') {
          var tablength = (pageURL == "/home-page" || pageURL == "/") ? 0 : -150;
          scrollToCourse(".coursedegree2-tab", tablength);
        }
      }
    }, { offset: '60%' });
    $('#coursedegree3-mobile').waypoint(function (direction) {
      if (direction == 'up' && !isCourseTabSelected) {
        if (direction == 'up') {
          scrollToCourse(".coursedegree3-tab", 0);
        }
      }
    }, { offset: '10%' });
    $('#coursedegree3-mobile').waypoint(function (direction) {
      if (direction == 'down' && !isCourseTabSelected) {
        if (direction == 'down') {
          scrollToCourse(".coursedegree3-tab", 0);
        }
      }
    }, { offset: '60%' });
    $('#coursedegree4-mobile').waypoint(function (direction) {
      if (direction == 'up' && !isCourseTabSelected) {
        if (direction == 'up') {
          scrollToCourse(".coursedegree4-tab", 0);
        }
      }
    }, { offset: '10%' });
    $('#coursedegree4-mobile').waypoint(function (direction) {
      if (direction == 'down' && !isCourseTabSelected) {
        scrollToCourse(".coursedegree4-tab", 150);
      }
    }, { offset: '60%' });

    $(document).on("click", ".coursedegree5-tab, .coursedegree2-tab, .coursedegree3-tab, .coursedegree4-tab", function (e) {
      isCourseTabSelected = true;
      if (e.currentTarget.className.includes("coursedegree4-tab")) {
        scrollToCourse(".coursedegree4-tab", 150);
      } else if (e.currentTarget.className.includes("coursedegree2-tab")) {
        scrollToCourse(".coursedegree2-tab", -150);
      } else if (e.currentTarget.className.includes("coursedegree5-tab")) {
        scrollToCourse(".coursedegree5-tab", -150);
      } else {
        scrollToCourse(".coursedegree3-tab", -150);
      }
      setTimeout(function () {
        isCourseTabSelected = false;
      }, 3000);
    });
  }

  // Pupular courses tab show more
  $(document).on("click", '#coursedegree5 .course-show-more', function () {
    $('#coursedegree5 .course-card-second-row').css('display', 'flex');
    $('#coursedegree5 .course-show-more').hide();
    $('#coursedegree5 .course-browse-all').show();
  })

  if (width < 480) {
    setTimeout(function () {
      $("#coursedegree5-mobile .tag-list .mba-tab").click();
    }, 1000);
    $(document).on("click", "#coursedegree5-mobile .tag-list p", function () {
      var classAttr = $(this).attr("data-short-name");
      $("#coursedegree5-mobile .tag-list p").removeClass("active");
      $(this).addClass("active");
      $('#coursedegree5-mobile .course-card-second-row').css('display', 'flex');
      $("#coursedegree5-mobile .course-card").hide();
      $("#coursedegree5-mobile .course-card.item-" + classAttr).show();
    });
  } else {
    setTimeout(function () {
      $("#coursedegree5-mobile .tag-list .mba-tab").click();
    }, 1000);
    $(document).on("click", "#coursedegree5 .tag-list p", function () {
      var classAttr = $(this).attr("data-short-name");
      $("#coursedegree5 .tag-list p").removeClass("active");
      $(this).addClass("active");
      $('#coursedegree5 .course-card-second-row').css('display', 'flex');
      $("#coursedegree5 .course-card").hide();
      $("#coursedegree5 .course-card.item-" + classAttr).show();
    });
  }

  $("#coursedegree5 .course-card.mahe.item-MCA").hide();

  function popularTab(classAttr) {
    $(".popular-courses").click();
    $('html, body').animate({
      scrollTop: $("#scroll_banner_mob").offset().top - 100
    }, 1000);
    if (width < 480) {
      $("#coursedegree5-mobile .tag-list p").removeClass("active");
      $(".line-item-" + classAttr).addClass("active");
      $('#coursedegree5-mobile .course-card-second-row').css('display', 'flex');
      $("#coursedegree5-mobile .course-card").hide();
      $("#coursedegree5-mobile .course-card.item-" + classAttr).show();
      $("#coursedegree5-mobile").show();
      $("#popular-courses-tab").show();
    } else {
      $("#coursedegree5 .tag-list p").removeClass("active");
      $(".line-item-" + classAttr).addClass("active");
      $('#coursedegree5 .course-card-second-row').css('display', 'flex');
      $("#coursedegree5 .course-card").hide();
      $("#coursedegree5 .course-card.item-" + classAttr).show();
      if (classAttr === "MCA") {
        $("#coursedegree5 .course-card.mahe.item-MCA").show();
      }
    }
  }

  $(document).on("click", ".course-name-tag", function (e) {
    e.preventDefault();
    var classAttr = $(this).attr("data-short-name");
    let selectdInstituteVal = $(".institution-dropdown .select-selected.select-box").text();
    if (selectdInstituteVal !== "All Universities") {
      $(".institution-dropdown .select-items > div").removeClass("same-as-selected");
      $(".institution-dropdown .select-items > div:first-child").addClass("same-as-selected");
      // $(".institution-dropdown .same-as-selected").text("All Universities");
      filterCourseCard();
      setTimeout(function () {
        $(".select-selected.select-box").text("All Universities");
        $('.select-selected.select-box').css({ "background": "#f7f7f7", "color": "#000" });
        popularTab(classAttr);
      }, 1000);
    } else {
      popularTab(classAttr);
    }
  });

  $(document).on("click", ".more-popular-courses", function (e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: $("#scroll_banner_mob").offset().top - 100
    }, 500);
    if ($(window).width() > 768) {
      $('.course-section #tile-1 .nav-tabs #coursedegree1-tab').click();
    }
  });

  $('.university-block .universityName').click(function (e) {
    let universityName = $(this).attr("data-univ-name");
    let indexValue = 1;
    if (universityName === "Manipal University Jaipur (MUJ)") {
      indexValue = 2;
    } else if (universityName === "Sikkim Manipal University (SMU)") {
      indexValue = 3;
    }
    $('.institution-dropdown .select-items div').eq(indexValue).click();
    $('html, body').animate({
      scrollTop: $("#scroll_banner_mob").offset().top - 100
    }, 500);
  });

});

$('.banner-slide .uni-items a').click(function (e) {
  $('.institution-dropdown .select-items div').eq($(this).index()).click();
});

function restruct_filter(institution) {
  var x, i, j, l, ll, selElmnt, a, b, c;
  x = document.getElementsByClassName("custom-select");
  l = x.length;
  for (i = 0; i < l; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    ll = selElmnt.length;
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected select-box");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 0; j < ll; j++) {
      c = document.createElement("DIV");
      c.innerHTML = selElmnt.options[j].innerHTML;
      c.addEventListener("click", function (e) {
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            if (this.innerHTML.length >= 15) {
              h.innerHTML = $.trim(this.innerHTML);
            } else {
              h.innerHTML = this.innerHTML;
            }
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
      });
      b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function (e) {
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
      $(this).parent(".custom-select").toggleClass("select-bg-change");
    });
  }
  $('.institution-dropdown .select-selected').text(institution);
  var selectedVal = $('.institution-dropdown .select-selected').html();
  if (selectedVal === "Manipal University Jaipur (MUJ)") {
    $('.select-selected.select-box').css({ "background": "#DEEDFF", "color": "#0522D2" });
  } else if (selectedVal === "Manipal Academy of Higher Education (MAHE)") {
    $('.select-selected.select-box').css({ "background": "#BFE9E7", "color": "#14223D" });
  } else if (selectedVal === "Sikkim Manipal University (SMU)") {
    $('.select-selected.select-box').css({ "background": "#DEFFD3", "color": "#013C51" });
  } else {
    $('.select-selected.select-box').css({ "background": "#f7f7f7", "color": "#000" });
  }
}

