// General functionality for switching tabs
function switchTab(formSelector, tabName) {
  $(formSelector + " .tablinks").removeClass("active");
  $(formSelector + " .tabcontent").removeClass("active");
  $(formSelector + " ." + tabName).addClass("active");
  $(formSelector + " #" + tabName).addClass("active");
}
// Functionality for tabs show/hide
function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

// Semester tab functionality
function semesterTab(evt, tabName, parentSelector = false) {
  var i, tabcontent, tablinks;
  tabcontent = document.querySelectorAll(parentSelector + ' .tabcontent');
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.querySelectorAll(parentSelector + ' .tablinks');
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

// Downloading file helper function
function download_file(fileURL, fileName) {
  if (!window.ActiveXObject) {
    var save = document.createElement('a');
    save.href = fileURL;
    save.target = '_blank';
    var filename = fileURL.substring(fileURL.lastIndexOf('/') + 1);
    save.download = fileName || filename;
    if (navigator.userAgent.toLowerCase().match(/(ipad|iphone|safari)/) && navigator.userAgent.search("Chrome") < 0) {
      document.location = save.href;
    } else {
      var evt = new MouseEvent('click', {
        'view': window,
        'bubbles': true,
        'cancelable': false
      });
      save.dispatchEvent(evt);
      (window.URL || window.webkitURL).revokeObjectURL(save.href);
    }
  } else if (!!window.ActiveXObject && document.execCommand) {
    var _window = window.open(fileURL, '_blank');
    _window.document.close();
    _window.document.execCommand('SaveAs', true, fileName || fileURL)
    _window.close();
  }
}

// Anchor tag navigationh
function offsetAnchor() {
  if (location.hash.length !== 0) {
    window.scrollTo(window.scrollX, window.scrollY - 100);
  }
}

// Functionality for setCookies
function setCookie(key, value) {
  var expires = new Date();
  expires.setTime(expires.getTime() + 31536000000);
  document.cookie = key + '=' + value + ';expires=' + expires.toUTCString();
}

// Functionality for retrive cookies
function getCookie(key) {
  var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
  return keyValue ? keyValue[2] : null;
}

var country_flag = "IN";
jQuery(document).ready(function ($) {

  let pathName = window.location.href.split('?')[0];
  var width = $(window).width();

  // Form selectors
  const brochureSelector = '#downloadform';
  const courseFloatSelector = '#course-float-form';
  const questionFormSelector = '#enrollNow';
  const leadFormSelector = '#lead-form';
  const popupRfiForm = '#popuprfiform';
  const signinform = "#signinform";
  const referearnform = "#referearn";
  const referearnformmobile = "#popupEnrollForm";
  const referearn_popup = "#referearn_popup";
  const demoleadFormSelector = '#demoLeadForm';
  const rfiFormSelector = "#rfiForm";

  if (width < 380) {
    $(".university-list li img").css("height", "40px");
  } else {
    $(".university-list li img").addClass("tools-certif-logos");
  }

  if (width > 480) {
    setTimeout(function () {
      if ($(".oma-tabcontent").length) {
        $(".oma-tab").css({ 'height': ($(".oma-tabcontent").first().height() + 'px') });
      }
    }, 2000);
    $('#coursedegree1 .course-card-second-row').css('display', 'flex');
    $('#coursedegree1 .course-show-more').hide();
    $('#coursedegree1 .course-browse-all').show();
  }

  // Top Banner Slick slider
  if ($(".bannerSliderHolder div.mainBanner").length) {
    $(".bannerSliderHolder div.mainBanner").slick({
      slidesToShow: 1,
      dots: true,
      arrows: true,
      infinite: false,
      autoplay: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 767,
          settings: {
            arrows: false,
          }
        },
      ]
    });
  }

  var websitePath = window.location.href.split('?')[0];
  if (websitePath.indexOf("international") > -1 || websitePath.indexOf("/ae") > -1 || websitePath.indexOf("/us-ca") > -1 || websitePath.indexOf("/np") > -1 || websitePath.indexOf("/saarc-ewc") > -1 || websitePath.indexOf("/global") > -1 || websitePath.indexOf("/sl") > -1 || websitePath.indexOf("/af") > -1 || websitePath.indexOf("/zambia") > -1) {
    $('.course-card a[href="https://www.onlinemanipal.com/pgcp-in-entrepreneurship-and-innovation"]').parents('.course-card').eq(0).hide();
    $("#enrollNow select option[value='PGCP Entrepreneurship and Innovation']").remove();
    $("#course-float-form select option[value='PGCP Entrepreneurship and Innovation']").remove();
    $("#downloadform select option[value='PGCP Entrepreneurship and Innovation']").remove();
    $("#popuprfiform select option[value='PGCP Entrepreneurship and Innovation']").remove();
  }
  // Close thank you msg
  $(document).on("click", ".tym-close", function () {
    $(".Download.thankyouMsg").hide();
  });

  // Form submission false on page load
  localStorage.setItem('formSubmitted', "No");

  // Counntry code dropdown functionality
  function apply_countrycode(formSelector) {
    let countryCode = $(".country-code").text();
    if (!countryCode) { countryCode = 'IN'; }
    if (countryCode == 'IN' || countryCode == 'in') {
      window.intlTelInput(document.querySelector(formSelector + " input[name=Phone]"), {
        allowExtensions: false,
        autoFormat: false,
        separateDialCode: true,
        initialCountry: countryCode,
        onlyCountries: ["in"],
        utilsScript: "//cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.3/js/utils.js"
      });
    } else {
      $(".menu-item-668786 a").text("Career Support");
      let websitePath = window.location.href.split('?')[0];
      let excludeCountryList = [''];
      if (websitePath.indexOf("international") > -1 || websitePath.indexOf("/nepal") > -1 || websitePath.indexOf("/ae") > -1 || websitePath.indexOf("/us-ca") > -1 || websitePath.indexOf("/np") > -1 || websitePath.indexOf("/saarc-ewc") > -1 || websitePath.indexOf("/global") > -1 || websitePath.indexOf("/sl") > -1 || websitePath.indexOf("/af") > -1 || websitePath.indexOf("/zambia") > -1) {
        excludeCountryList = ['in'];
      }
      window.intlTelInput(document.querySelector(formSelector + " input[name=Phone]"), {
        allowExtensions: false,
        autoFormat: false,
        separateDialCode: true,
        initialCountry: countryCode,
        excludeCountries: excludeCountryList,
        preferredCountries: ["ae", "us", "my", "ph"],
        utilsScript: "//cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.3/js/utils.js"
      });
    }
    mobileNumberValidation(formSelector);
  }

  //Accordion
  if ($('.accordion-title').length) {
    $('.accordion-desc').hide();
    $('.course-second-section .accordion-desc').show();
    $('.course-second-section .accordion-title').eq(0).addClass('accordion-open');
    var numberOfDesc = $('.accordion-title').length;
    var i = 0;
    while (i <= numberOfDesc) {
      function tasks(i) {
        $('.accordion-title').eq(i).click(function () {
          var isHidden = $('.accordion-desc').eq(i).is(':hidden');
          $('.accordion-desc').hide();
          $(".accordion-title").removeClass("accordion-open");
          if (isHidden) {
            $(this).addClass("accordion-open");
            $('.accordion-desc').eq(i).show();
          } else {
            $('.accordion-desc').eq(i).hide();
          }
        });
      }
      tasks(i);
      i++;
    }
  }
  if ($('.accordion-sub-title').length) {
    $('.accordion-sub-desc').hide();
    var numberOfDesc = $('.accordion-sub-title').length;
    var i = 0;
    while (i <= numberOfDesc) {
      function tasks(i) {
        $('.accordion-sub-title').eq(i).click(function () {
          var isHidden = $('.accordion-sub-desc').eq(i).is(':hidden');
          $('.accordion-sub-desc').hide();
          $(".accordion-sub-title").removeClass("accordion-open");
          if (isHidden) {
            $(this).addClass("accordion-open");
            $('.accordion-sub-desc').eq(i).show();
          } else {
            $('.accordion-sub-desc').eq(i).hide();
          }
        });
      }
      tasks(i);
      i++;
    }
  }

  // Email Validation
  function validateEmail($email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test($email);
  }

  // Terms and condition checkbox validation
  function validateCheckbox($checkbox) {
    var checkBox = $($checkbox).prop("checked") ? true : false;
    return checkBox;
  }

  // Trigger data layer push on form submission
  function custom_datalayer_push(email, LeadFormName = '') {
    // if (window.location.href.indexOf("www.onlinemanipal.com") > -1) {
    dataLayer.push({ 'event': 'formSubmitted', 'formName': 'Lead Form', 'form_type': LeadFormName });
    dataLayer.push({
      'event': 'enhanced_lead', 'enhanced_conversion_data': {
        "email": email
      }
    });
    var clickId = localStorage.getItem('clickId');
    var utm_source = localStorage.getItem('utm_source');
    if (clickId && utm_source == "sharechat") {
      var currentTimestamp = new Date().getTime();
      var adId = localStorage.getItem('adId');
      var userId = localStorage.getItem('userId');
      var utm_campaign = localStorage.getItem('utm_campaign');
      var apiTrigger = $.get("https://apis.sharechat.com/a1s-s2s-service/v1/events/manipal/post?clickId=" + clickId + "&gaid=&campaignName=" + utm_campaign + "&adId=" + adId + "&userId=" + userId + "&EventTime=" + currentTimestamp + "&eventName=registration&eventValue=1", function () { });
    }
    //}
    return true;
  }

  // FB event trigger
  function fbEventTrigger(email, mobileNumer) {
    fbq('track', 'Purchase', { currency: "INR", value: 10000.00 });
    var website = window.location.href;
    $.ajax({
      type: 'POST',
      url: '/wp-admin/admin-ajax.php',
      dataType: 'json',
      async: true,
      data: {
        action: 'fb_event_trigger',
        email: email,
        mobile_no: mobileNumer,
        website: website
      },
      success: function (res) {
      }
    });
    return true;
  }

  // Enroll Now button click
  function enrollNow(formSelector, e) {
    e.preventDefault();
    let number = $(formSelector + " input[name=Phone]").val();
    number = number.replace(/\s/g, '').trim();
    let dialCode = $(formSelector + " .iti__selected-dial-code").text();
    let name = $(formSelector + " input[name=leadsquared-FirstName]").val();
    let email = $(formSelector + " input[name=leadsquared-EmailAddress]").val();
    let tcCheckbox = $(formSelector + " input[type=checkbox]");
    let courseName;
    if ($(formSelector + " .radio-buttons").length) {
      courseName = $(formSelector + " input[type='radio'][name='leadsquared-mx_course_applying_for']:checked").val();
    } else {
      courseName = $(formSelector + " input[name=leadsquared-mx_course_applying_for]").val();
      if (courseName == undefined) { courseName = $(formSelector + " select[name=leadsquared-mx_course_applying_for]").val(); }
    }
    if (!name) {
      $(formSelector + " .nameError").html("Please enter the name");
      setTimeout(function () { $(formSelector + " .nameError").html(""); }, 5000);
    } else if (!email || !validateEmail(email)) {
      $(formSelector + " .emailError").html("Please enter the valid email id");
      setTimeout(function () { $(formSelector + " .emailError").html(""); }, 5000);
    } else if (!courseName) {
      $(formSelector + " .courseError").html("Please select the course name");
      setTimeout(function () { $(formSelector + " .courseError").html(""); }, 5000);
    } else if (!number || !dialCode) {
      $(formSelector + " .phoneError").html("Please enter the mobile number");
      setTimeout(function () { $(formSelector + " .phoneError").html(""); }, 5000);
    } else if ((number.length < 10 || number.length > 10) && dialCode == "+91") {
      $(formSelector + " .phoneError").html("Please enter a valid 10 digit number");
      setTimeout(function () { $(formSelector + " .phoneError").html(""); }, 5000);
    } else if (!validateCheckbox(tcCheckbox)) {
      $(formSelector + " .checkBoxError").html("Please check this checkbox");
      setTimeout(function () { $(formSelector + " .checkBoxError").html(""); }, 5000);
    } else {
      let leadID = localStorage.getItem('leadID');
      let userEdit = localStorage.getItem('userEdit');
      if (leadID && userEdit == "Yes") {
        let courseText = $(formSelector + " input[name=leadsquared-mx_course_applying_for]").val();
        if (courseText == undefined) { courseText = $(formSelector + " select[name=leadsquared-mx_course_applying_for] option:selected").text(); }
        let institutionText = $(formSelector + " input[name=Institution]").val();
        if (!institutionText) { institutionText = $(formSelector + " .institutionField #select_style .ss_dib.ss_text").text(); }
        if (courseName == "MBA" && institutionText == "Manipal Academy of Higher Education") {
          courseText = 'Master of Business Administration';
        }
        $(".otp-verification-block .courseName").text(courseText);
        $(".otp-verification-block .university").text(institutionText);
        send_otp(formSelector);
      } else {
        lsq_lead_creation_api_call(formSelector, e);
      }
    }
  }

  // Resend OTP functionality
  function resendOTP(formSelector) {
    let number = $(formSelector + " input[name=Phone]").val();
    number = number.replace(/\s/g, '').trim();
    let dialCode = $(formSelector + " .iti__selected-dial-code").text();
    let courseName = $(formSelector + " input[name=leadsquared-mx_course_applying_for]").val();
    if (courseName == undefined) { courseName = $(formSelector + " select[name=leadsquared-mx_course_applying_for]").val(); }
    let institutionName = $(formSelector + " input[name=Institution]").val();
    if (!institutionName) { institutionName = $(formSelector + " .institutionField #select_style .ss_dib.ss_text").text(); }
    courseName = courseMapping(courseName, institutionName);
    let siteDetails = fetchSiteDetails(courseName);
    let siteName = siteDetails.siteName;
    if (dialCode == "+91" && number.length == "10") {
      $.ajax({
        type: 'POST',
        url: '/wp-admin/admin-ajax.php',
        dataType: 'html',
        data: {
          action: 'generate_otp',
          mobile_number: number,
          country_code: dialCode,
          siteName: siteName
        },
        success: function (res) {
          if (res.status === 0) {
            alert(res.msg);
            return false;
          } else {
            $(formSelector + " .resend-otp").addClass("disable-send-otp");
            $(formSelector + " .resend-otp").html("Resend OTP (In&nbsp; <span class='countdown'>30</span>s)");
            timerCountdown();
            setTimeout(function () {
              $(formSelector + " .resend-otp").removeClass("disable-send-otp");
              $(formSelector + " .resend-otp").text("Resend OTP");
            }, 30000);
          }
        },
        error: function (err) {
        }
      });
    }
  }

  // Final submit buton functionality
  function LSQSubmission(formSelector, e) {
    let fetchLoginURL = $("#lsq-login-url").text();
    let formSubmitted = localStorage.getItem('formSubmitted');
    if (!fetchLoginURL) { fetchLoginURL = localStorage.getItem('loginURL'); }
    if (fetchLoginURL) {
      $(".overlay-bg").fadeIn(500);
      $("#lsq-process-overlay").fadeIn(500);
      window.location.href = fetchLoginURL;
    } else if (formSubmitted === "Yes") {
      let leadID = localStorage.getItem('leadID');
      let userEdit = localStorage.getItem('userEdit');
      let existingMobileNumber = localStorage.getItem('existingMobileNumber');
      if (!existingMobileNumber) {
        existingMobileNumber = getCookie('existingMobileNumber');
      }
      $(".mobileBottomWidget").hide();
      let number = $(formSelector + " input[name=Phone]").val();
      number = number.replace(/\s/g, '').trim();
      let dialCode = $(formSelector + " .iti__selected-dial-code").text();
      if (((number.length < 10 || number.length > 10) && dialCode == "+91") || (!number || !dialCode)) {
        $(formSelector + " .phoneError").html("Please enter a valid 10 digit number");
        setTimeout(function () { $(formSelector + " .phoneError").html(""); }, 5000);
        return false;
      }
      let mobileNumber = dialCode + '-' + number;
      let email = $(formSelector + " input[name=leadsquared-EmailAddress]").val();
      let courseName = $(formSelector + " input[name=leadsquared-mx_course_applying_for]").val();
      if (courseName == undefined) { courseName = $(formSelector + " select[name=leadsquared-mx_course_applying_for]").val(); }
      let institutionName = $(formSelector + " input[name=Institution]").val();
      if (!institutionName) { institutionName = $(formSelector + " .institutionField #select_style .ss_dib.ss_text").text(); }
      courseName = courseMapping(courseName, institutionName);
      let siteDetails = fetchSiteDetails(courseName);
      let siteName = siteDetails.siteName;
      let app_login_url = siteDetails.app_login_url;
      if (existingMobileNumber) {
        mobileNumber = existingMobileNumber
      }
      $.ajax({
        type: 'POST',
        url: '/wp-admin/admin-ajax.php',
        dataType: 'json',
        data: {
          action: 'lsq_submit_data',
          email: email,
          site_name: siteName,
          mobile_number: mobileNumber,
          ProspectID: leadID,
        },
        success: function (response) {
          localStorage.setItem('formSubmitted', "");
          localStorage.setItem('leadID', "");
          localStorage.setItem('userEdit', "");
          if (response.status === 1) {
            localStorage.removeItem('existingMobileNumber');
            setCookie("existingMobileNumber", "");
          }
          if (formSelector == "#downloadform") {
            $("#lsq-process-overlay").fadeOut(500);
            $(formSelector + " .otp-verification-block").hide();
            $(formSelector + " .rfi-form").hide();
            $("#downloadform h5").hide();
            closePopup();
            $(".Download.thankyouMsg p").html("Thank you for your interest. <a href='" + app_login_url + "'' target='_blank'>Click here</a> to apply.");
            $(".Download.thankyouMsg").show();
            $('html, body').animate({
              scrollTop: $(".Download.thankyouMsg").offset().top - 200
            }, 500);
            var fileURL = $("#download-url").text();
            var semData = fileURL.split("+");
            if (semData[1] == 'semesterPdf') {
              window.open(
                semData[0],
                '_blank'
              );
              $(formSelector + " .rfi-form").show();
              $("#downloadform h5").show();
              var fileURL = $("#download-url").text("");
              $(".wpcf7-form input[type='text']").val("");
              $(".wpcf7-form input[type='email']").val("");
              $(".wpcf7-form input[type='tel']").val("");
              $(".wpcf7-submit").prop("disabled", false);
              $('#downloadForm  .otp-verification-block').css('display', 'block');
              $('#downloadForm  .rfi-form').css('display', 'block');
            } else {
              var fileName = 'brochure.pdf';
              download_file(fileURL, fileName);
              $(formSelector + " .rfi-form").show();
              $("#downloadform h5").show();
              var fileURL = $("#download-url").text("");
              $('#downloadform form').eq(0).trigger("reset");
              $(".wpcf7-submit").prop("disabled", false);
              window.opener.location.reload();
              var inputs = form.getElementsByTagName("input");
            }
          } else {
            let loginURL = response.login_url;
            if (loginURL) {
              localStorage.setItem('loginURL', loginURL);
              $("#lsq-login-url").text(loginURL);
              if (dialCode != "+91") {
                window.location.href = loginURL;
              }
            } else {
              $(".resend-otp").hide();
              $("#lsq-process-overlay").fadeOut(500);
              $(formSelector + " .formMsg .error").html(response.message);
              $(formSelector + " .lsq-submit").prop("disabled", true);
            }
          }
        }
      });
    }
  }

  // Fetch site details using courseName
  function fetchSiteDetails(courseName) {
    let siteName = '';
    let app_login_url = '';
    let universityName = '';
    const MUJcourseList = ["BBA", "MBA", "BCA", "MCA", "B.Com", "M.Com", "MA.JMC", "MA in Economics"];
    const MAHEcourseList = ["MSc Data Science", "MSc Business Analytics", "PGCP Business Analytics", "PGCP Logistics and Supply Chain", "Master of Business Administration", "PGCP E&I", "PGCP Entrepreneurship and Innovation", "MCA-MAHE"];
    const SMUcourseList = ["BA", "MA", "MA in English", "MA in Sociology", "MA in Political Science", "MCA-SMU", "MCOM", "BCOM", "MBA-SMU"];
    if (jQuery.inArray(courseName, MUJcourseList) !== -1) {
      siteName = 'MUJ';
      app_login_url = 'https://login.muj.onlinemanipal.com/';
      universityName = 'Manipal University Jaipur';
    } else if (jQuery.inArray(courseName, MAHEcourseList) !== -1) {
      siteName = 'MAHE';
      app_login_url = 'https://login.mahe.onlinemanipal.com/';
      universityName = 'Manipal Academy of Higher Education';
    } else if (jQuery.inArray(courseName, SMUcourseList) !== -1) {
      siteName = 'SMU';
      app_login_url = 'https://login.smu.onlinemanipal.com/';
      universityName = 'Sikkim Manipal University';
    }
    const output = {
      siteName,
      app_login_url,
      universityName
    }
    return output;
  }

  function courseMapping(courseName, institutionName) {
    if (courseName == "MBA" && institutionName == "Manipal Academy of Higher Education") {
      courseName = 'Master of Business Administration';
    } else if (courseName == "MCA" && institutionName == "Manipal Academy of Higher Education") {
      courseName = 'MCA-MAHE';
    } else if (courseName == "BBA" && institutionName == "Manipal Academy of Higher Education") {
      courseName = 'BBA-MAHE';
    } else if (courseName == "B.Com" && institutionName == "Sikkim Manipal University") {
      courseName = 'BCOM';
    } else if (courseName == "M.Com" && institutionName == "Sikkim Manipal University") {
      courseName = 'MCOM';
    } else if (courseName == "MCA" && institutionName == "Sikkim Manipal University") {
      courseName = 'MCA-SMU';
    } else if (courseName == "MBA" && institutionName == "Sikkim Manipal University") {
      courseName = 'MBA-SMU';
    }
    return courseName;
  }


  // Functionality for LSQ lead creation as per new Flow
  function lsq_lead_creation_api_call(formSelector, e) {
    e.preventDefault();
    localStorage.setItem('loginURL', "");
    if ($("#form-overlay").length) { $("#form-overlay").show(); }
    let number = $(formSelector + " input[name=Phone]").val();
    number = number.replace(/\s/g, '').trim();
    let dialCode = $(formSelector + " .iti__selected-dial-code").text();
    if (((number.length < 10 || number.length > 10) && dialCode == "+91") || (!number || !dialCode)) {
      $(formSelector + " .phoneError").html("Please enter a valid 10 digit number");
      setTimeout(function () { $(formSelector + " .phoneError").html(""); }, 5000);
      return false;
    }
    let MobileNumber = dialCode + '-' + $.trim(number);
    let courseName;
    if ($(formSelector + " .radio-buttons").length) {
      courseName = $(formSelector + " input[type='radio'][name='leadsquared-mx_course_applying_for']:checked").val();
    } else {
      courseName = $(formSelector + " input[name=leadsquared-mx_course_applying_for]").val();
      if (courseName == undefined) { courseName = $(formSelector + " select[name=leadsquared-mx_course_applying_for]").val(); }
    }
    let institutionName = $(formSelector + " input[name=Institution]").val();
    if (!institutionName) { institutionName = $(formSelector + " .institutionField #select_style .ss_dib.ss_text").text(); }
    courseName = courseMapping(courseName, institutionName);
    let siteDetails = fetchSiteDetails(courseName);
    let siteName = siteDetails.siteName;
    let app_login_url = siteDetails.app_login_url;
    let formType = dialCode == "+91" ? 'Domestic Application Form' : 'International Application Form';
    let mx_Category = '';
    if (siteName === "MAHE") { mx_Category = dialCode == "+91" ? "Indian" : "Foreign & NRI"; }
    $(formSelector + " .wpcf7-submit").prop("disabled", true);
    let name = $(formSelector + " input[name=leadsquared-FirstName]").val();
    let email = $(formSelector + " input[name=leadsquared-EmailAddress]").val();
    let source = $(formSelector + " input[name=leadsquared-Source]").val();
    let utmCampaign = $(formSelector + " input[name=leadsquared-SourceCampaign]").val();
    let utmMedium = $(formSelector + " input[name=leadsquared-SourceMedium]").val();
    let utmContent = $(formSelector + " input[name=leadsquared-SourceContent]").val();
    let utmKeyword = $(formSelector + " input[name=leadsquared-mx_UTM_Keyword]").val();
    let utmAdset = $(formSelector + " input[name=leadsquared-mx_Marketing_Ad_Set]").val();
    let Adset_id = $(formSelector + " input[name=leadsquared-Adset_id]").val();
    let utmMatchType = $(formSelector + " input[name='leadsquared-mx_UTM_Matchtype']").val();
    let utmPlacement = $(formSelector + " input[name='leadsquared-mx_UTM_Placement']").val();
    let utmPosition = $(formSelector + " input[name='leadsquared-mx_UTM_Position']").val();
    let device = $(formSelector + " input[name=leadsquared-mx_Device]").val();
    let website = $(formSelector + " input[name=leadsquared-Website]").val();
    let location = $(formSelector + " input[name=leadsquared-mx_Location]").val();
    let ip_address = $(formSelector + " input[name=leadsquared-mx_Website_IP_Address]").val();
    let mx_mobile = $(formSelector + " input[name=leadsquared-mx_mobile]").val();
    let onCampusstudent = $(formSelector + " select[name=leadsquared-mx_Are_you_an_oncampus_student_of_MUJ]").val();
    let onCampusenrolled = $(formSelector + " select[name=leadsquared-mx_Oncampus_programme_enrolled_in]").val();
    let agentMedium = $(formSelector + " input[name='leadsquared-mx_Lead_Medium']").val();
    let gclid = $(formSelector + " input[name='leadsquared-mx_gclid']").val();
    let workExperience = $(formSelector + " select[name=leadsquared-mx_Student_Experience]").val();
    let token = $(formSelector + " #sub-token").val();
    let referer_url = $("input[name=referer_url]").val();
    let LeadFormName = $(formSelector + " input[name=LeadFormName]").val();
    let userCountry = $(formSelector + " input[name=userCountry]").val();
    if (window.location.href.indexOf("events-lp") > -1) {
      source = "feet_on_street";
      location = $(formSelector + " select[name=leadsquared-mx_Location]").val();
    }
    if (email && courseName && siteName && number && dialCode) {
      $.ajax({
        url: '/wp-admin/admin-ajax.php',
        type: 'POST',
        dataType: 'json',
        data: {
          action: 'lsq_post_lead_data',
          email: email,
          first_name: name,
          mobile_number: MobileNumber,
          utm_source: source,
          utm_campaign: utmCampaign,
          utm_medium: utmMedium,
          utm_content: utmContent,
          utm_keyword: utmKeyword,
          utm_adset: utmAdset,
          Adset_id: Adset_id,
          utmMatchType: utmMatchType,
          utmPlacement: utmPlacement,
          utmPosition: utmPosition,
          device: device,
          website: website,
          location: location,
          ip_address: ip_address,
          course_name: courseName,
          site_name: siteName,
          mx_Category: mx_Category,
          formType: formType,
          onCampusstudent: onCampusstudent,
          onCampusenrolled: onCampusenrolled,
          agentMedium: agentMedium,
          gclid: gclid,
          workExperience: workExperience,
          token: token,
          referer_url: referer_url,
          LeadFormName: LeadFormName,
          userCountry: userCountry,
          institutionName: institutionName,
          mx_mobile: mx_mobile
        },
        success: function (response) {
          if ($("#form-overlay").length) { $("#form-overlay").hide(); }
          if (formSelector == "#downloadform") {
            custom_datalayer_push(email, LeadFormName);
            fbEventTrigger(email, MobileNumber);
            if (response.status == 1 && response.msg == "Success") {
              localStorage.setItem('formSubmitted', "Yes");
              localStorage.setItem('prospectId', response.data.Message.RelatedId);
              if (dialCode == "+91") {
                $(formSelector + " .rfi-form").hide();
                $(formSelector + " h5").hide();
                $(formSelector + " .otp-verification-block").show();
                var leadID = response.data.Message.RelatedId;
                if (leadID) {
                  localStorage.setItem('leadID', leadID);
                }
                $(formSelector + " .lsq-submit").prop("disabled", true);
                send_otp(formSelector);
              } else {
                $(formSelector + " .otp-verification-block").hide();
                $(formSelector + " .rfi-form").hide();
                $("#downloadform h5").hide();
                closePopup();
                $(".Download.thankyouMsg p").html("Thank you for your interest. <a href='" + app_login_url + "'' target='_blank'>Click here</a> to apply.");
                $(".Download.thankyouMsg").show();
                $('html, body').animate({
                  scrollTop: $(".Download.thankyouMsg").offset().top - 200
                }, 500);
                var fileURL = $("#download-url").text();
                var semData = fileURL.split("+");
                if (semData[1] == 'semesterPdf') {
                  window.open(
                    semData[0],
                    '_blank'
                  );
                  $(formSelector + " .rfi-form").show();
                  $("#downloadform h5").show();
                  fileURL = $("#download-url").text("");
                  $(".wpcf7-form input[type='text']").val("");
                  $(".wpcf7-form input[type='email']").val("");
                  $(".wpcf7-form input[type='tel']").val("");
                  $(".wpcf7-submit").prop("disabled", false);
                  $('#downloadForm  .otp-verification-block').css('display', 'block');
                  $('#downloadForm  .rfi-form').css('display', 'block');
                } else {
                  var fileName = 'brochure.pdf';
                  download_file(fileURL, fileName);
                  $(formSelector + " .rfi-form").show();
                  $("#downloadform h5").show();
                  var fileURL = $("#download-url").text("");
                  $('#downloadform form').eq(0).trigger("reset");
                  $(".wpcf7-submit").prop("disabled", false);
                  window.opener.location.reload();
                  var inputs = form.getElementsByTagName("input");
                  setTimeout(function () {
                    $(formSelector + " .otp-verification-block").show();
                    $(formSelector + " .rfi-form").show();
                    $('#downloadForm  .otp-verification-block').css('display', 'block');
                    $('#downloadForm  .rfi-form').css('display', 'block');
                  }, 30000);
                }
              }
            } else {
              $(formSelector + " .otp-verification-block").hide();
              $(formSelector + " .rfi-form").hide();
              $("#downloadform h5").hide();
              closePopup();
              $(".Download.thankyouMsg p").html("Thank you for your interest. <a href='" + app_login_url + "'' target='_blank'>Click here</a> to apply.");
              $(".Download.thankyouMsg").show();
              $('html, body').animate({
                scrollTop: $(".Download.thankyouMsg").offset().top - 200
              }, 500);
              var fileURL = $("#download-url").text();
              var semData = fileURL.split("+");
              if (semData[1] == 'semesterPdf') {
                window.open(
                  semData[0],
                  '_blank'
                );
                $(formSelector + " .rfi-form").show();
                $("#downloadform h5").show();
                fileURL = $("#download-url").text("");
                $(".wpcf7-form input[type='text']").val("");
                $(".wpcf7-form input[type='email']").val("");
                $(".wpcf7-form input[type='tel']").val("");
                $(".wpcf7-submit").prop("disabled", false);
                $('#downloadForm  .otp-verification-block').css('display', 'block');
                $('#downloadForm  .rfi-form').css('display', 'block');
              } else {
                var fileName = 'brochure.pdf';
                download_file(fileURL, fileName);
                $(formSelector + " .rfi-form").show();
                $("#downloadform h5").show();
                var fileURL = $("#download-url").text("");
                $('#downloadform form').eq(0).trigger("reset");
                $(".wpcf7-submit").prop("disabled", false);
                window.opener.location.reload();
                var inputs = form.getElementsByTagName("input");
              }
            }
          } else {
            if (response.status == 1 && response.msg == "Success") {
              localStorage.setItem('formSubmitted', "Yes");
              localStorage.setItem('prospectId', response.data.Message.RelatedId);
              if (response.lead_mobile_number) {
                localStorage.setItem('existingMobileNumber', response.lead_mobile_number);
                setCookie('existingMobileNumber', response.lead_mobile_number);
              }
              custom_datalayer_push(email, LeadFormName);
              fbEventTrigger(email, MobileNumber);
              let courseText = $(formSelector + " input[name=leadsquared-mx_course_applying_for]").val();
              if (courseText == undefined) { courseText = $(formSelector + " select[name=leadsquared-mx_course_applying_for] option:selected").text(); }
              let institutionText = $(formSelector + " input[name=Institution]").val();
              if (!institutionText) { institutionText = $(formSelector + " .institutionField #select_style .ss_dib.ss_text").text(); }
              if (courseName == "MBA" && institutionText == "Manipal Academy of Higher Education") {
                courseText = 'Master of Business Administration';
              }
              $(".otp-verification-block .courseName").text(courseText);
              $(".otp-verification-block .university").text(institutionText);
              if (dialCode == "+91") {
                $(formSelector + " .rfi-form").hide();
                $(formSelector + " .otp-verification-block").show();
                $(formSelector + " h5").hide();
                let leadID = response.data.Message.RelatedId;
                if (leadID) {
                  localStorage.setItem('leadID', leadID);
                }
                $(formSelector + " .lsq-submit").prop("disabled", true);
                send_otp(formSelector);
                LSQSubmission(formSelector, e)
              } else {
                let leadID = response.data.Message.RelatedId;
                if (leadID) {
                  localStorage.setItem('leadID', leadID);
                }
                LSQSubmission(formSelector, e)
              }
            } else if (response.status == 1 && response.msg == "Email ID Exists") {
              app_login_url = app_login_url + "email-otp";
              existingLeadsErrorMsg(formSelector, response, siteName, app_login_url);
            } else if (response.status == 1 && response.msg == "Mobile Number Exists") {
              existingLeadsErrorMsg(formSelector, response, siteName, app_login_url);
            } else {
              alert("Something went wrong. Please try again later.");
              $(formSelector + " .formMsg .error").html("Something went wrong. Please try again later.");
            }
            $(formSelector + " .wpcf7-submit").prop("disabled", false);
          }
        },
        error: function (err) {
          $(formSelector + " .wpcf7-submit").prop("disabled", false);
          $(formSelector + " .formMsg .error").html("Something went wrong. Please try again later.");
        }
      });
    } else {
      $(formSelector + " .wpcf7-submit").prop("disabled", false);
      $(formSelector + " .formMsg .error").html("Please enter all the details");
    }
  }

  // Sending otp as per new LSQ flow
  function send_otp(formSelector) {
    let phoneNumber = $(formSelector + " input[name=Phone]").val();
    phoneNumber = phoneNumber.replace(/\s/g, '').trim();
    let dialCode = $(formSelector + " .phoneField .iti__selected-dial-code").text();
    let email = $(formSelector + " input[name=leadsquared-EmailAddress]").val();
    let courseName = $(formSelector + " input[name=leadsquared-mx_course_applying_for]").val();
    if (courseName == undefined) { courseName = $(formSelector + " select[name=leadsquared-mx_course_applying_for]").val(); }
    let institutionName = $(formSelector + " input[name=Institution]").val();
    if (!institutionName) { institutionName = $(formSelector + " .institutionField #select_style .ss_dib.ss_text").text(); }
    courseName = courseMapping(courseName, institutionName);
    let siteDetails = fetchSiteDetails(courseName);
    let siteName = siteDetails.siteName;
    let formatNumber = dialCode + '-' + phoneNumber;
    if (dialCode == "+91" && phoneNumber.length == "10") {
      $.ajax({
        type: 'POST',
        url: '/wp-admin/admin-ajax.php',
        dataType: 'html',
        data: {
          action: 'generate_otp',
          mail: email,
          mobile_number: phoneNumber,
          country_code: dialCode,
          siteName: siteName,
          type: 'New'
        },
        success: function (res) {
          if (res.status === 0) {
            return false;
          } else {
            $(formSelector + " .rfi-form").hide();
            $(formSelector + " h5").hide();
            $(formSelector + " .otp-verification-block").show();
            $(".otp-verification-block .number").text(formatNumber);
            $(formSelector + " .resend-otp").addClass("disable-send-otp");
            $(formSelector + " .resend-otp").html("Resend OTP (In&nbsp; <span class='countdown'>30</span>s)");
            timerCountdown();
            setTimeout(function () {
              $(formSelector + " .resend-otp").removeClass("disable-send-otp");
              $(formSelector + " .resend-otp").text("Resend OTP");
            }, 30000);
          }
        },
        error: function (err) {
          $(".rfi-form .formMsg .error").text("Please enter all the details.");
          setTimeout(function () {
            $(".rfi-form .formMsg .error").text("");
          }, 10000);
        }
      });
    }
    return true
  }

  function timerCountdown() {
    let timer2 = "0:30";
    let interval = setInterval(function () {
      let timer = timer2.split(':');
      let minutes = parseInt(timer[0], 10);
      let seconds = parseInt(timer[1], 10);
      --seconds;
      minutes = (seconds < 0) ? --minutes : minutes;
      if (minutes < 0) clearInterval(interval);
      seconds = (seconds < 0) ? 59 : seconds;
      seconds = (seconds < 10) ? '0' + seconds : seconds;
      $('.countdown').html(seconds);
      timer2 = minutes + ':' + seconds;
    }, 1000);
    return true;
  }

  // Mobile number validation
  function mobileNumberValidation(formSelector) {
    $(document).on("input", formSelector + " input[name=Phone]", function () {
      this.value = this.value.replace(/\D/g, '');
    });
    $(document).on("input", formSelector + " #phone_number", function () {
      this.value = this.value.replace(/\D/g, '');
    });
    $(document).on("input", formSelector + " .otp-verification-block input", function () {
      this.value = this.value.replace(/\D/g, '');
    });
    let dialCode = $(formSelector + " .iti__selected-dial-code").text();
    if (dialCode == "+91") {
      $(formSelector + ' input[name=Phone]').attr('maxlength', '10');
      $(formSelector + ' #phone_number').attr('maxlength', '10');
      $(formSelector + ' input[name=Phone]', formSelector + ' #phone_number').on('keypress', function (e) {
        let $this = $(this);
        let regex = new RegExp("^[0-9\b]+$");
        let str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
        if ($this.val().length > 9) {
          e.preventDefault();
          return false;
        }
        if (regex.test(str)) {
          return true;
        }
        e.preventDefault();
        return false;
      });
    } else {
      $(formSelector + ' input[name=Phone]').attr('maxlength', '15');
      $(formSelector + ' #phone_number').attr('maxlength', '15');
      $(formSelector + ' input[name=Phone]', formSelector + ' #phone_number').on('keypress', function (e) {
        let $this = $(this);
        let regex = new RegExp("^[0-9\b]+$");
        let str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
        if ($this.val().length > 14) {
          e.preventDefault();
          return false;
        }
        if (regex.test(str)) {
          return true;
        }
        e.preventDefault();
        return false;
      });
    }
  }

  // Verify the OTP
  function verifyOTP(formSelector) {
    if ($(formSelector + " .otp-verification-block input").length == $(formSelector + " .otp-verification-block input").maxLength) {
      $(formSelector + " .otp-verification-block input").next(formSelector + ' .otp-verification-block input').focus();
    }
    let digit1 = $(formSelector + " input[name=otp-digit-1]").val();
    let digit2 = $(formSelector + " input[name=otp-digit-2]").val();
    let digit3 = $(formSelector + " input[name=otp-digit-3]").val();
    let digit4 = $(formSelector + " input[name=otp-digit-4]").val();
    let otp = digit1 + digit2 + digit3 + digit4;
    if (otp.length == 4) {
      let leadID = localStorage.getItem('prospectId');
      let courseName = $(formSelector + " input[name=leadsquared-mx_course_applying_for]").val();
      if (courseName == undefined) { courseName = $(formSelector + " select[name=leadsquared-mx_course_applying_for]").val(); }
      let institutionName = $(formSelector + " input[name=Institution]").val();
      if (!institutionName) { institutionName = $(formSelector + " .institutionField #select_style .ss_dib.ss_text").text(); }
      courseName = courseMapping(courseName, institutionName);
      let siteDetails = fetchSiteDetails(courseName);
      let siteName = siteDetails.siteName;
      let number = $(formSelector + " input[name=Phone]").val();
      number = number.replace(/\s/g, '').trim();
      $.ajax({
        type: 'POST',
        url: '/wp-admin/admin-ajax.php',
        dataType: 'json',
        data: {
          action: 'verify_otp',
          mobile_number: number,
          otp: otp,
          siteName: siteName,
          leadID: leadID
        },
        success: function (res) {
          if (res.status == 1) {
            $(formSelector + " .otp-verification-block .otpMsg").remove();
            $(formSelector + " .otp-verification-block .verification-box").addClass("success");
            $(formSelector + " .otp-verification-block .verification-box").removeClass("error");
            $(formSelector + " .otp-verification-block .verification-box").append("<span class='otpMsg'><i class='fa fa-sharp fa-solid fa-check'></i></span>");
            $(formSelector + " .lsq-submit").prop("disabled", false);
          } else {
            $(formSelector + " .otp-verification-block .otpMsg").remove();
            $(formSelector + " .otp-verification-block .verification-box").addClass("error");
            $(formSelector + " .otp-verification-block .verification-box").removeClass("success");
            $(formSelector + " .otp-verification-block .verification-box").append("<span class='otpMsg'><i class='fa fa-times' aria-hidden='true'></i></span>");
            $(formSelector + " .lsq-submit").prop("disabled", true);
          }
        },
        error: function (err) { }
      });
    }
  }

  // Switching the form
  function switchScreen(formSelector) {
    $(formSelector + " .formMsg .error").html("");
    localStorage.setItem('userEdit', "Yes");
    $(formSelector + " select").prop("disabled", true);
    $(formSelector + " .rfi-form").show();
    $(formSelector + " .otp-verification-block").hide();
  }

  // removing error messhae when user editing the details
  function removeErrorMessages(formSelector) {
    $(formSelector + " .fieldError").html("");
    $(formSelector + " .wpcf7-submit").prop("disabled", false);
  }

  function apply_dropdown_form_list() {
    if ($(brochureSelector + ' input[name=Phone]').length) {
      var courseName = $("#course-float-form input[name=leadsquared-mx_course_applying_for]").val();
      if ($("#downloadform .radio-buttons").length > 0) {
      } else {
        $("#downloadform input[name=leadsquared-mx_course_applying_for]").val(courseName);
      }
      apply_countrycode(brochureSelector);
    }
    if ($(courseFloatSelector + ' input[name=Phone]').length) { apply_countrycode(courseFloatSelector); }
    if ($(questionFormSelector + ' input[name=Phone]').length) { apply_countrycode(questionFormSelector); }
    if ($(leadFormSelector + ' input[name=Phone]').length) { apply_countrycode(leadFormSelector); }
    if ($(popupRfiForm + ' input[name=Phone]').length) { apply_countrycode(popupRfiForm); }
    if ($(signinform + ' input[name=Phone]').length) { apply_countrycode(signinform); }
    if ($(referearnform + ' input[name=Phone]').length) { apply_countrycode(referearnform); }
    if ($(referearnformmobile + ' input[name=Phone]').length) { apply_countrycode(referearnformmobile); }
    if ($(referearn_popup + ' input[name=Phone]').length) { apply_countrycode(referearn_popup); }
    if ($(demoleadFormSelector + ' input[name=Phone]').length) { apply_countrycode(demoleadFormSelector); }
  }

  // Apply the country code in dropdown
  if (pathName.indexOf("/international") > -1 || pathName.indexOf("/global") > -1 || pathName.indexOf("/blogs") > -1 || pathName.indexOf("/online-manipal-plus") > -1 || pathName.indexOf("/placements") > -1 || pathName.indexOf("/muj/republic-day-discount") > -1) {
    const lastDate = $('#last_date_of_admission').text();
    lastDate && countDownTimer(lastDate);
  } else {
    const template_slug = $("#template-slug").text();
    const courseType = $("#courseType").text();
    if ((pathName.indexOf("/master-of-business-administration") > -1 || pathName.indexOf("/online-mba-") > -1 || pathName.indexOf("/online-mba-manipal-university-jaipur") > -1) && courseType === "MUJ") {
      const course_name = $("#courseName").text();
      jQuery.ajax({
        type: 'POST',
        url: '/wp-admin/admin-ajax.php',
        dataType: 'json',
        data: {
          action: 'course_page_geo_fencing',
          course_name: course_name
        },
        success: function (response) {
          const country_code = response.country_code;
          if (country_code !== "IN" && country_code) {
            const total_fee = response.total_fee;
            const semester_fee = response.semester_fee;
            const currency = response.currency;
            $(".courseInfo .emiAmount").hide();
            $(".courseInfo .feeText").html(currency + ' ' + semester_fee + ' per semester');
            $(".courseInfo .courseTotalFee").html(currency + ' ' + total_fee + ' (Course fee)');
            $("a.whatsapp-btn").attr("href", response.whatsapp_msg);
            $("a.call-gradient-btn").attr("href", "tel:" + response.call_number);
            $("a.call-gradient-btn").html('<img src="/wp-content/themes/flamingo/images/call-icon-black.svg" alt="call" /> ' + response.call_number);
            $("a.call-btn").attr("href", "tel:" + response.call_number);
            $(".country-code").text(country_code);
            $("#download-url").text(response.brochure);
            $(".who-can-apply-sect .international.tablinks").click();
            $(".who-can-apply-sect .tabs").hide();
            if (country_code === "NP") {
              $(".fees-container .right .line-item:nth-child(2)").hide();
            } else if (country_code === "ZA") {
              $(".fees-container .indian-african.tablinks").click();
            } else {
              $(".fees-container .non-indian.tablinks").click();
            }
            $(".fees-container.courseFee .tabs").hide();
            $(".scholarship-sect .left-info p").text("With our easy financing options, we let your learning take the spotlight without the stress of financing.");
            $(".scholarship-sect .right-info .sub-heading").text("Additional fee concessions");
            $(".scholarship-sect .right-info p").text("A 10% fee concession will be provided upon upfront payment of the full program fee and a 5% fee concession upon upfront payment of the annual fee.");
            $(".scholarship-sect .learn-more").hide();
            $(".contact-us-container .contact-us:first-child").html('<a class="info" href="mailto: international_admissions@onlinemanipal.com" target="_blank"><img src="https://www.onlinemanipal.com/wp-content/themes/flamingo/images/email.png" alt=""></noscript>international_admissions@onlinemanipal.com</a>');
            $('.dateHightlight .text span:first-child').text(response.lda_primary_text);
            $("#last_date_of_admission").text(response.last_date_of_admission);
            $("#konverse-container").hide();
            $(".fees-scholarship-sect .description-fee").hide();
            $(".course-first-section .footer-course-block .accordion-sub-desc a:nth-child(2)").hide();
            $(".course-first-section .footer-course-block .accordion-sub-desc a:last-child").hide();
            $(".career-support-sect .section-title").html("Career support <span>services</span>");
            $(".additional-skill .skill-desc").html("Access <strong>110+ hours</strong> of exclusively curated skill enhancement content worth <strong>USD 625.</strong>");
          }
          apply_dropdown_form_list();
          const lastDate = $('#last_date_of_admission').text();
          lastDate && countDownTimer(lastDate);
        },
        error: function (error) {
          console.log(error);
        }
      });
    } else {
      apply_dropdown_form_list();
      const lastDate = $('#last_date_of_admission').text();
      lastDate && countDownTimer(lastDate);
    }
  }

  if (pathName.indexOf("/international") > -1 || pathName.indexOf("/global") > -1 || pathName.indexOf("/international/refer-earn") > -1) {
    setTimeout(function () {
      jQuery.ajax({
        type: 'POST',
        url: '/wp-admin/admin-ajax.php',
        dataType: 'json',
        data: {
          action: 'get_user_location',
        },
        success: function (res) {
          if (res.country == "IN") {
            var countryCode = 'ae';
            $(".country-code").text("ae");
          } else if (res.country) {
            var countryCode = res.country;
            $(".country-code").text(res.country);
          } else {
            var countryCode = 'in';
            $(".country-code").text("in");
          }
          if (countryCode == "AE" || countryCode == "BH" || countryCode == "SA" || countryCode == "QA" || countryCode == "OM" || countryCode == "KW" || countryCode == "ae") {
            var courseType = $(".courseType").text();
            if (!courseType) { courseType = $("#courseType").text(); }
            if (courseType != "MAHE") {
              $("a.call-btn").attr("href", "tel:+971-507980775");
              $(".header-call.call-gradient-btn").attr("href", "tel:+971-507980775");
              $(".header-call.call-gradient-btn").html("<img src='/wp-content/themes/flamingo/images/call-icon-black.svg' alt='Call'> +971-507 980 775");
            }
          }
          if (countryCode == "US" || countryCode == "CA" || countryCode == "GB" || countryCode == "AU" || countryCode == "DE" || countryCode == "JP") {
            $("a.whatsapp-btn").attr("href", "https://wa.me/917387011278?text=Hi");
            $("a.call-btn").attr("href", "tel:+91-7387011278");
            $(".header-call.call-gradient-btn").attr("href", "tel:+91-7387011278");
            $(".header-call.call-gradient-btn").html("<img src='/wp-content/themes/flamingo/images/call-icon-black.svg'> +91-7387011278");
          }
          if (countryCode) {
            apply_dropdown_form_list();
          }
        },
        error: function (err) {
          console.log(err);
        }
      });
    }, 1000);
  }

  // Geo-location API call for fetching user location
  var placement_urls = ['/global/placements', '/ae/placements', '/np/placements', '/us-ca/placements', '/saarc-ewc/placements'];
  if (pathName.indexOf("/blogs") > -1 || pathName.indexOf("/online-manipal-plus") > -1 || (pathName.indexOf("/placements") > -1 && placement_urls.includes(location.pathname) !== true)) {
    setTimeout(function () {
      jQuery.ajax({
        type: 'POST',
        url: '/wp-admin/admin-ajax.php',
        dataType: 'json',
        data: {
          action: 'get_user_location',
        },
        success: function (res) {
          $(".country-code").text(res.country);
          var countryCode = res.country;
          if (countryCode == "IN" || countryCode == "in") {
          } else if (countryCode) {
            $(".menu-item-668786 a").text("Career Support");
            if (countryCode == "AE" || countryCode == "ae") {
              $("a.call-btn").attr("href", "tel:+971-507980775");
            } else {
              $("a.call-btn").attr("href", "tel:+91-8527268909");
            }
            $("a.whatsapp-btn").attr("href", "https://wa.me/+918527268909");
            $(".contact-us:first-child a.info").attr("href", "mailto:international_admissions@onlinemanipal.com");
            $(".contact-us:first-child a.info").html('<img src="/wp-content/themes/flamingo/images/email.png" alt=""> international_admissions@onlinemanipal.com');
            country_flag = 'NIN';
          }
          if (!countryCode) { var countryCode = 'in'; $(".country-code").text("in"); }
          if (pathName.indexOf("/blogs") > -1) {
            $(leadFormSelector).length && dropdownChange(leadFormSelector);
            $(questionFormSelector).length && dropdownChange(questionFormSelector);
            $(courseFloatSelector).length && dropdownChange(courseFloatSelector);
            $(brochureSelector).length && dropdownChange(brochureSelector);
            $(popupRfiForm).length && dropdownChange(popupRfiForm);
            $(signinform).length && dropdownChange(signinform);
            $(demoleadFormSelector).length && dropdownChange(demoleadFormSelector);
            $(referearnform).length && dropdownChange(referearnform);
            $(referearnformmobile).length && dropdownChange(referearnformmobile);
            $(referearn_popup).length && dropdownChange(referearn_popup);
          }
          if (countryCode) {
            apply_dropdown_form_list();
          }
        },
        error: function (err) {
          console.log(err);
        }
      });
    }, 1000);
  }

  var codeCharInput = '.otp-verification-block input';
  //   $(codeCharInput+':first').focus();
  $(codeCharInput).keyup(function (e) {
    if ((e.which == 8 || e.which == 46)) {
      $(this).prev(codeCharInput).focus().val($(this).prev().val());
    } else {
      if (this.value.length == this.maxLength) {
        $(this).next(codeCharInput).focus();
      }
    }
  });

  // Enrol now form submission
  $(document).on('click', rfiFormSelector + " .wpcf7-submit", function (e) {
    e.preventDefault();
    enrollNow(rfiFormSelector, e);
  });
  if (window.location.href.indexOf("muj/republic-day-discount") > -1) {
  } else {
    $(document).on('click', courseFloatSelector + " .wpcf7-submit", function (e) {
      e.preventDefault();
      enrollNow(courseFloatSelector, e);
    });
    $(document).on('click', questionFormSelector + " .wpcf7-submit", function (e) {
      e.preventDefault();
      enrollNow(questionFormSelector, e);
    });
  }
  $(document).on('click', brochureSelector + " .wpcf7-submit", function (e) {
    e.preventDefault();
    enrollNow(brochureSelector, e);
  });
  $(document).on('click', demoleadFormSelector + " .wpcf7-submit", function (e) {
    e.preventDefault();
    enrollNow(demoleadFormSelector, e);
  });

  if (pathName.indexOf("empower-her") > -1) {
  } else {
    $(document).on('click', popupRfiForm + " .wpcf7-submit", function (e) {
      e.preventDefault();
      enrollNow(popupRfiForm, e);
    });
  }

  // Pass the course name and university name for institution pages
  if (pathName.indexOf("/institution/muj") > -1) {
    $("#downloadform input[name=leadsquared-mx_course_applying_for]").val("BBA");
    $("#downloadform input[name=Institution]").val("Manipal University Jaipur");
  } else if (pathName.indexOf("/institution/mahe") > -1) {
    $("#downloadform input[name=leadsquared-mx_course_applying_for]").val("MSc Data Science");
    $("#downloadform input[name=Institution]").val("Manipal Academy of Higher Education");
  } else if (pathName.indexOf("/online-manipal-plus") > -1) {
    $("#downloadform input[name=leadsquared-mx_course_applying_for]").val("BBA");
    $("#downloadform input[name=Institution]").val("Manipal University Jaipur");
  } else if (pathName.indexOf("/institution/smu") > -1) {
    $("#downloadform input[name=leadsquared-mx_course_applying_for]").val("BA");
    $("#downloadform input[name=Institution]").val("Sikkim Manipal University");
  }

  // Final submission final submit button click
  $(document).on("click", rfiFormSelector + " .lsq-submit", function (e) {
    e.preventDefault();
    LSQSubmission(rfiFormSelector, e);
  });
  if (window.location.href.indexOf("muj/republic-day-discount") > -1) {
  } else {
    $(document).on("click", courseFloatSelector + " .lsq-submit", function (e) {
      e.preventDefault();
      LSQSubmission(courseFloatSelector, e);
    });
    $(document).on("click", questionFormSelector + " .lsq-submit", function (e) {
      e.preventDefault();
      LSQSubmission(questionFormSelector, e);
    });
  }
  $(document).on("click", brochureSelector + " .lsq-submit", function (e) {
    e.preventDefault();
    LSQSubmission(brochureSelector, e);
  });
  $(document).on("click", demoleadFormSelector + " .lsq-submit", function (e) {
    e.preventDefault();
    LSQSubmission(demoleadFormSelector, e);
  });
  if (pathName.indexOf("empower-her") > -1) {
  } else {
    $(document).on("click", popupRfiForm + " .lsq-submit", function (e) {
      e.preventDefault();
      LSQSubmission(popupRfiForm, e);
    });
  }

  // Auto focus on next input field for OTP
  $(document).on("change keyup input paste", rfiFormSelector + " .otp-verification-block input", function () { verifyOTP(rfiFormSelector); });
  $(document).on("change keyup input paste", questionFormSelector + " .otp-verification-block input", function () { verifyOTP(questionFormSelector); });
  $(document).on("change keyup input paste", brochureSelector + " .otp-verification-block input", function () { verifyOTP(brochureSelector); });
  $(document).on("change keyup input paste", courseFloatSelector + " .otp-verification-block input", function () { verifyOTP(courseFloatSelector); });
  $(document).on("change keyup input paste", popupRfiForm + " .otp-verification-block input", function () { verifyOTP(popupRfiForm); });
  $(document).on("change keyup input paste", referearnform + " .otp-verification-block input", function () { verifyOTP(referearnform); });
  $(document).on("change keyup input paste", referearn_popup + " .otp-verification-block input", function () { verifyOTP(referearn_popup); });
  $(document).on("change keyup input paste", referearnformmobile + " .otp-verification-block input", function () { verifyOTP(referearnformmobile); });
  $(document).on("change keyup input paste", demoleadFormSelector + " .otp-verification-block input", function () { verifyOTP(demoleadFormSelector); });

  // Go back to form on clicking edit
  $(document).on("click", rfiFormSelector + " .edit", function () { switchScreen(rfiFormSelector); });
  $(document).on("click", courseFloatSelector + " .edit", function () { switchScreen(courseFloatSelector); });
  $(document).on("click", questionFormSelector + " .edit", function () { switchScreen(questionFormSelector); });
  $(document).on("click", brochureSelector + " .edit", function () { switchScreen(brochureSelector); });
  $(document).on("click", popupRfiForm + " .edit", function () { switchScreen(popupRfiForm); });
  $(document).on("click", referearnform + " .edit", function () { switchScreen(referearnform); });
  $(document).on("click", referearnformmobile + " .edit", function () { switchScreen(referearnformmobile); });
  $(document).on("click", referearn_popup + " .edit", function () { switchScreen(referearn_popup); });
  $(document).on("click", demoleadFormSelector + " .edit", function () { switchScreen(demoleadFormSelector); });

  // Resend OTP functionality
  $(document).on("click", rfiFormSelector + " .resend-otp", function () { resendOTP(rfiFormSelector); });
  $(document).on("click", courseFloatSelector + " .resend-otp", function () { resendOTP(courseFloatSelector); });
  $(document).on("click", questionFormSelector + " .resend-otp", function () { resendOTP(questionFormSelector); });
  $(document).on("click", brochureSelector + " .resend-otp", function () { resendOTP(brochureSelector); });
  $(document).on("click", popupRfiForm + " .resend-otp", function () { resendOTP(popupRfiForm); });
  $(document).on("click", referearnform + " .resend-otp", function () { resendOTP(referearnform); });
  $(document).on("click", referearnformmobile + " .resend-otp", function () { resendOTP(referearnformmobile); });
  $(document).on("click", referearn_popup + " .resend-otp", function () { resendOTP(referearn_popup); });
  $(document).on("click", demoleadFormSelector + " .resend-otp", function () { resendOTP(demoleadFormSelector); });

  // Add the class name for popup
  $("#popupEnrollForm select").addClass("popup-select");
  $("#referearn select").addClass("refer-select");

  // Mobile number validation
  if ($(rfiFormSelector + " input[name=Phone]").length) {
    $(rfiFormSelector + " .rfi-form input[name=LeadFormName]").val("Lead Form");
  }
  if ($(courseFloatSelector + " input[name=Phone]").length) {
    $(courseFloatSelector + " .rfi-form input[name=LeadFormName]").val("Banner Lead Form");
  }
  if ($(questionFormSelector + " input[name=Phone]").length) {
    $(questionFormSelector + " .rfi-form input[name=LeadFormName]").val("Footer Enroll Form");
  }
  if ($(brochureSelector + " input[name=Phone]").length) {
    $(brochureSelector + " .rfi-form input[name=LeadFormName]").val("Download Brochure Form");
  }
  if ($(popupRfiForm + " input[name=Phone]").length) {
    $(popupRfiForm + " .rfi-form input[name=LeadFormName]").val("Popup Lead Form");
  }
  if ($(referearn_popup + " input[name=Phone]").length) {
    $(referearn_popup + " .rfi-form input[name=LeadFormName]").val("Refer & Earn Popup Lead Form");
  }
  if ($(referearnform + " input[name=Phone]").length) {
    $(referearnform + " .rfi-form input[name=LeadFormName]").val("Refer & Earn Popup Lead Form");
  }
  if ($(referearnformmobile + " input[name=Phone]").length) {
    $(referearnformmobile + " .rfi-form input[name=LeadFormName]").val("Refer & Earn Mobile Lead Form");
  }
  if ($(demoleadFormSelector + " input[name=Phone]").length) {
    $(demoleadFormSelector + " .rfi-form input[name=LeadFormName]").val("Footer Lead Form");
  }

  $(document).on("click", ".learn-show-popup", function (e) {
    e.preventDefault();
    var whichpopup = $(this).attr("data-showpopup");
    var docHeight = $(document).height();
    var scrollTop = $(window).scrollTop();
    $('.learn-more-bg .overlay-bg').show().css({
      'height': docHeight
    });
    if ($(window).width() < 480) {
      $('.popup' + whichpopup).show().css({ "display": "flex" });
    } else {
      $('.popup' + whichpopup).show().css({ "display": "flex" });
    }
  });

  // function to show popup
  function showPopup(whichpopup) {
    var docHeight = $(document).height();
    var scrollTop = $(window).scrollTop();
    $('.overlay-bg').show().css({
      'height': docHeight
    });
    if ($(window).width() < 480) {
      $('.popup' + whichpopup).show().css({ "display": "flex" });
    } else {
      $('.popup' + whichpopup).show().css({ "display": "flex" });
    }
  }

  // function to close our popups
  function closePopup() {
    $('.overlay-bg, .overlay-content').hide();
    $('.elective-overlay-bg, .overlay-content').hide();
    $('body').css('overflow', 'auto');
  }

  $(document).on("click", ".show-popup", function (event) {
    if ($(this).hasClass("muj-download")) {
      var downloadURL = $("#muj-download-url").html();
      $(brochureSelector + " input[name=leadsquared-mx_course_applying_for]").val("MBA");
      $(brochureSelector + " input[name=Institution]").val("MUJ");
      $("#download-url").html(downloadURL);
    } else if ($(this).hasClass("mahe-download")) {
      var downloadURL = $("#mahe-download-url").html();
      $(brochureSelector + " input[name=leadsquared-mx_course_applying_for]").val("Master of Business Administration");
      $(brochureSelector + " input[name=Institution]").val("MAHE");
      $("#download-url").html(downloadURL);
    }
    if ($(this).attr('data-showpopup') == 'downloadForm') {
      $(brochureSelector + " .otp-verification-block").hide();
      $(brochureSelector + " form")[0].reset();
      $(brochureSelector + " .rfi-form").show();
    }
    setTimeout(function () {
      $('.overlay-content').css({
        "top": "0",
        "bottom": "0"
      })
    }, 100);
    event.preventDefault();
    var selectedPopup = $(this).data('showpopup');
    showPopup(selectedPopup);
    setTimeout(function () {
      $('body').eq(0).css('overflow', 'hidden');
    }, 200);
  });

  // Pass the form name on button click
  $(document).on('click', '.headerGradientBtn', function () { $(".rfi-form input[name=LeadFormName]").val("Header Enroll Form"); });
  $(document).on('click', '.banner-btn', function () { $(".rfi-form input[name=LeadFormName]").val("Banner Lead Form"); });
  $(document).on('click', '.enrollNowBtn', function () { $(".rfi-form input[name=LeadFormName]").val("Floating Enroll Form"); });
  $(document).on('click', '.courseDownloadBtn', function () { $(".rfi-form input[name=LeadFormName]").val("Download Brochure Form"); });
  $(document).on('click', '.downloadNewsBtn', function () { $(".rfi-form input[name=LeadFormName]").val("Download Newsletter Form"); });
  $(document).on('click', '.requestCallBtn', function () { $(".rfi-form input[name=LeadFormName]").val("Request Call Back Form"); });
  $(document).on('click', '.course-details .show-popup[data-showpopup=downloadForm]', function () { $(".rfi-form input[name=LeadFormName]").val("Banner Download Form"); });
  $(document).on('click', '.courseOverview .show-popup[data-showpopup=downloadForm]', function () { $(".rfi-form input[name=LeadFormName]").val("Banner Download Form"); });
  $(document).on('click', '.expect-to-learn .show-popup[data-showpopup=downloadForm]', function () { $(".rfi-form input[name=LeadFormName]").val("Curriculum Download Form"); });
  $(document).on('click', 'header .show-popup[data-showpopup=downloadForm]', function () { $(".rfi-form input[name=LeadFormName]").val("Header Download Form"); });
  $(document).on('click', '.mobileBottomWidget .show-popup[data-showpopup=downloadForm]', function () { $(".rfi-form input[name=LeadFormName]").val("Mobile Bottom Widget Download Form"); });
  $(document).on('click', '.institutionOverview .show-popup[data-showpopup=downloadForm]', function () { $(".rfi-form input[name=LeadFormName]").val("Institution Overview Download Form"); });

  // Popup close btn functionality
  $(document).on('click', '.close-btn, .overlay-bg, .close-icon', function () {
    closePopup();
    $('.overlay-content').css({
      "top": "0"
    })
  });

  $(document).on('lity:open', function (event, instance) {
    setTimeout(() => {
      $('body').css('overflow', 'hidden');
    }, 200);
  });

  $(document).on('lity:close', function (event, instance) {
    $('body').css('overflow', 'auto');
  });

  $(".learn-more, .faculty .line-items .card").click(function () {
    $(".overlay-bg").css("background", "none");
  });
  // Start of sliders
  // Ranking slider
  if ($(".rankingSlider").length) {
    var rankingSliderCount = 7;
    if (pathName.indexOf("/muj-online-degree-courses-v2") > -1) {
      rankingSliderCount = 7;
    } else if (pathName.indexOf("smu-online-degree-courses") > -1 || pathName.indexOf("online-degree-courses") > -1 || pathName.indexOf("distance-degree-courses") > -1 || pathName.indexOf("international/online-degree-course") > -1 || pathName.indexOf("nepal/online-degree-course") > -1 || pathName.indexOf("/smu/print-ad") > -1 || pathName.indexOf("/muj/republic-day-discount") > -1 || pathName.indexOf("smu-distance-degree-courses") > -1 || pathName.indexOf("smu-online-degrees") > -1 || pathName.indexOf("muj-online-degrees") > -1 || pathName.indexOf("online-pgcp-entrepreneurship-and-innovation") > -1) {
      rankingSliderCount = 6;
    }
    if (window.location.href.indexOf("msc-in-data-science-v2") > -1) {
      $slidesToScroll = 3;
    } else {
      $slidesToScroll = 1;
    }
    $(".rankingSlider").slick({
      slidesToShow: rankingSliderCount,
      slidesToScroll: $slidesToScroll,
      dots: true,
      arrows: true,
      infinite: false,
      autoplay: false,
      responsive: [
        {
          breakpoint: 1025,
          settings: {
            slidesToShow: 5,
            slidesToScroll: $slidesToScroll,
          }
        },
        {
          breakpoint: 900,
          settings: {
            slidesToShow: 3,
            slidesToScroll: $slidesToScroll,
          }
        },
        {
          breakpoint: 640,
          settings: {
            slidesToShow: 2.4,
            slidesToScroll: $slidesToScroll,
            dots: true,
            arrows: false,
            centerMode: false,
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 3.2,
            slidesToScroll: $slidesToScroll,
            dots: true,
            arrows: false,
            centerMode: false,
            adaptiveHeight: true,
          }
        }
      ]
    });
  }

  if (pathName.indexOf("/muj-online-degree-courses-v2") > -1 && width < 768) {
    if ($('.rankingSlider').hasClass('slick-initialized')) {
      $('.rankingSlider').slick('unslick');
    }
  }
  // Electives slider
  if ($(".electivesSlider").length) {
    $(".electivesSlider").slick({
      slidesToShow: 8,
      slidesToScroll: 4,
      dots: true,
      arrows: true,
      infinite: false,
      autoplay: false,
      responsive: [
        {
          breakpoint: 1025,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 900,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 640,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 2,
            dots: true,
            arrows: false,
            centerMode: false,
          }
        }
      ]
    });
  }

  const sliderIds = ["electivetabSlider1", "electivetabSlider2", "electivetabSlider3", "electivetabSlider4"];
  sliderIds.forEach(id => {
    if ($(`#${id}`).length) {
      $(`#${id}`).slick({
        slidesToShow: 5,
        slidesToScroll: 3,
        dots: false,
        arrows: true,
        infinite: false,
        autoplay: false,
        variableWidth: true,
        responsive: [
          {
            breakpoint: 2200,
            settings: {
              slidesToShow: 10,
              slidesToScroll: 3,
              centerMode: false,
            }
          },
          {
            breakpoint: 1921,
            settings: {
              slidesToShow: 8,
              slidesToScroll: 3,
              centerMode: false,
            }
          },
          {
            breakpoint: 1601,
            settings: {
              slidesToShow: 8,
              slidesToScroll: 3,
              centerMode: false,
            }
          },
          {
            breakpoint: 1537,
            settings: {
              slidesToShow: 7,
              slidesToScroll: 3,
              centerMode: false,
            }
          },
          {
            breakpoint: 1441,
            settings: {
              slidesToShow: 6,
              slidesToScroll: 3,
              centerMode: false,
            }
          },
          {
            breakpoint: 1367,
            settings: {
              slidesToShow: 6,
              slidesToScroll: 3,
              centerMode: false,
            }
          },
          {
            breakpoint: 1281,
            settings: {
              slidesToShow: 5.5,
              slidesToScroll: 3,
              centerMode: false,
            }
          },
          {
            breakpoint: 640,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              centerMode: false,
            }
          }
        ]
      });
    }
  });

  if (width < 768) {
    sliderIds.forEach(id => {
      if ($(`#${id}`).hasClass('slick-initialized')) {
        $(`#${id}`).slick('unslick');
      }
    });
  }

  // Electives slider for VWO
  if ($(".electivesSlidervwo").length) {
    $(".electivesSlidervwo").slick({
      slidesToShow: 5,
      dots: true,
      arrows: true,
      infinite: false,
      autoplay: false,
      responsive: [
        {
          breakpoint: 900,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 640,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 2,
            dots: true,
            arrows: false,
            centerMode: false,
          }
        }
      ]
    });
  }
  // Tools covered slider
  if ($(".toolsCovered ul").length) {
    $(".toolsCovered ul").slick({
      slidesToShow: 6,
      slidesToScroll: 3,
      dots: false,
      arrows: true,
      infinite: false,
      autoplay: false,
      responsive: [{
        breakpoint: 768,
        settings: {
          slidesToShow: 3.5,
          slidesToScroll: 3,
          infinite: false,
          dots: true,
          arrows: false,
        }
      }
      ]
    });
  }


  //career placement carousel start
  if ($(".career-placement-cards").length) {
    $(".career-placement-cards").slick({
      slidesToShow: 2,
      slidesToScroll: 1,
      dots: true,
      arrows: true,
      infinite: false,
      autoplay: false,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            dots: true,
          }
        },
        {
          breakpoint: 900,
          settings: {
            slidesToShow: 2,
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
  // RecognisedSlider
  if ($(".recognisedSliderHolder ul").length) {
    $(".recognisedSliderHolder ul").slick({
      slidesToShow: 4,
      dots: true,
      arrows: false,
      infinite: false,
      autoplay: false,
      responsive: [{
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        }
      }
      ]
    });
  }
  // Institution slider
  if ($(".institutionSliderHolder .institute-slider").length) {
    $(".institutionSliderHolder .institute-slider").slick({
      slidesToShow: 3,
      dots: true,
      arrows: true,
      infinite: false,
      autoplay: false,
      responsive: [{
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
          centerMode: false,

        }
      }
      ]
    });
  }
  // Assesment Slider
  if ($(".assesmentSlider").length) {
    if ($('.assesmentSlider .slick-slide').length > 6) {
      var showDots = true;
    } else {
      var showDots = false;
    }
    $(".assesmentSlider").slick({
      slidesToShow: 6,
      slidesToScroll: 1,
      dots: showDots,
      arrows: true,
      infinite: false,
      autoplay: false,
      responsive: [
        {
          breakpoint: 900,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 640,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            dots: true,
            arrows: false,
          }
        }
      ]
    });
  }
  // Career support slider
  if ($(".lp-career-support-sec").length == 1) {
    var slide_to_scroll = 2;
  } else if (window.location.href.indexOf("msc-in-data-science-v2") > -1) {
    var slide_to_scroll = 3;
  } else {
    var slide_to_scroll = 1;
  }
  if ($(".career-support-slider").length) {
    $(".career-support-slider .career-support-div").not('.slick-initialized').slick({
      slidesToShow: 4,
      dots: false,
      arrows: true,
      infinite: false,
      autoplay: false,
      slidesToScroll: slide_to_scroll,
      responsive: [{
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: slide_to_scroll,
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: slide_to_scroll,
          dots: true,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: slide_to_scroll,
          dots: true,
          arrows: false,
          variableWidth: false,
        }
      }
      ]
    });
  }
  // Hiring partners
  if ($(".hiring-partner-mbl").length) {
    $(".hiring-partner-mbl").slick({
      dots: false,
      infinite: false,
      arrows: false,
      speed: 300,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
        { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 1, dots: false } },
        { breakpoint: 991, settings: { slidesToShow: 1, slidesToScroll: 1, infinite: false, dots: true, arrows: false, } },
        { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1, infinite: false, arrows: false, dots: true } },
        { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1, arrows: false, dots: true } },
      ],
    });
  }
  if ($(".our-repurated-hiring-partner").length) {
    $(".our-repurated-hiring-partner").slick({
      slidesToShow: 1,
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
            dots: true,
          }
        }
      ]
    });
  }
  // Showreel slider
  if ($(".showreel-slider").length) {
    $(".showreel-slider").slick({
      slidesToShow: 2,
      dots: true,
      arrows: true,
      infinite: false,
      autoplay: false,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 2,
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
            dots: true,
          }
        },
        {
          breakpoint: 640,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            arrows: false,
          }
        }
      ]
    });
  }
  //OM advantage mobile slider
  if ($(".om-advantage-mbl-nav").length) {
    $('.om-advantage-mbl-nav').slick({
      slidesToShow: 2,
      slidesToScroll: 1,
      asNavFor: '.om-advantage-mbl-for',
      dots: false,
      arrows: false,
      infinite: false,
      focusOnSelect: true,
      adaptiveHeight: true,
      variableWidth: true
    });
  }
  if ($(".om-advantage-mbl-for").length) {
    $('.om-advantage-mbl-for').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      infinite: false,
      dots: false,
      adaptiveHeight: true,
      asNavFor: '.om-advantage-mbl-nav'
    });
  }
  // Placement logo slider

  if ($(".placement-sect-logo-slider-new").length) {
    $(window).one("scroll resize", function () {
      $(".placement-sect-logo-slider-new").not('.slick-initialized').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 0,
        speed: 5000,
        cssEase: 'linear',
        infinite: true,
        swipeToSlide: true,
        variableWidth: true,
        arrows: false,
        dots: false,
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 1,
              dots: false,
            }
          },
          {
            breakpoint: 900,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 1,
              dots: false,
            }
          },
          {
            breakpoint: 640,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 1,
              dots: false,
            }
          }
        ]
      });
    });
  }

  if ($(".placement-sect-logo-slider").length) {
    $(window).one("scroll resize", function () {
      if (width <= 480) {
        $(".placement-sect-logo-slider").not('.slick-initialized').slick({
          slidesToShow: 1,
          dots: false,
          arrows: false,
          infinite: false,
          autoplay: false,
          responsive: [{
            breakpoint: 640,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              dots: true,
            }
          }
          ]
        });
      }
    });
  }

  // industry rediness programmes section
  if ($(".industry-readiness-cards").length) {
    $(".industry-readiness-cards").slick({
      dots: true,
      infinite: false,
      arrows: true,
      speed: 300,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1025,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: false,
            dots: true,
            arrows: true
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: false,
            dots: true,
            arrows: true
          }
        },
        {
          breakpoint: 769,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: false,
            dots: true,
            arrows: true
          }
        },
        {
          breakpoint: 767,
          settings: {
            arrows: false,
            centerMode: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: false
          }
        },
        {
          breakpoint: 480,
          settings: {
            arrows: false,
            dots: true,
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: false
          }
        }

      ]
    });
  }
  if ($(".placement-initiation-holder").length) {
    $(".placement-initiation-holder").slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      dots: true,
      arrows: true,
      infinite: false,
      autoplay: false,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            dots: true,
          }
        },
        {
          breakpoint: 900,
          settings: {
            slidesToShow: 2,
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
  //Placement services 
  if ($(".placement-services-holder").length) {
    $(".placement-services-holder").slick({
      slidesToShow: 3,
      slidesToScroll: 3,
      dots: true,
      arrows: true,
      infinite: false,
      autoplay: false,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            dots: true,
          }
        },
        {
          breakpoint: 900,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            dots: true,
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1.2,
            slidesToScroll: 1,
            dots: true,
            arrows: false,
            autoplay: false,
          }
        }
      ]
    });
  }
  //Job opprtunity slider
  if ($(".job-opportunity-slider").length) {
    $(".job-opportunity-slider").slick({
      slidesToShow: 3,
      dots: true,
      arrows: true,
      infinite: false,
      autoplay: false,
      responsive: [
        {
          breakpoint: 900,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 640,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            arrows: false,
            centerMode: false,
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1.1,
            slidesToScroll: 1,
            dots: true,
            arrows: false,
            centerMode: false,
          }
        }
      ]
    });
  }
  // Faculty slider
  if ($(".facultySlider").length) {
    $(".facultySlider").slick({
      slidesToShow: 3,
      dots: true,
      arrows: true,
      infinite: false,
      autoplay: false,
      responsive: [
        {
          breakpoint: 640,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            arrows: false,
          }
        }
      ]
    });
  }
  // PGCP-EI Faculty slider
  if ($(".pgcp-ei-facultySlider").length) {
    $(".pgcp-ei-facultySlider").slick({
      slidesToShow: 4,
      dots: true,
      arrows: true,
      infinite: false,
      autoplay: false,
      responsive: [
        {
          breakpoint: 640,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            dots: true,
            arrows: false,
          }
        }
      ]
    });
  }
  // Roles you can explore
  if ($(".roles-explore-slider").length) {
    $(".roles-explore-slider").slick({
      slidesToShow: 4,
      dots: true,
      arrows: true,
      infinite: false,
      autoplay: false,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            dots: true,
          }
        },
        {
          breakpoint: 900,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            dots: true,
          }
        },
        {
          breakpoint: 640,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            dots: true,
            arrows: false,
            autoplay: false,
            infinite: false
          }
        },
        {
          breakpoint: 380,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            dots: true,
            arrows: false,
            autoplay: false,
            infinite: false
          }
        }
      ]
    });
  }
  // Program benefits mobile slider
  if ($(".program-benefits-mbl-nav").length) {
    $('.program-benefits-mbl-nav').slick({
      slidesToShow: 2.5,
      slidesToScroll: 1,
      asNavFor: '.program-benefits-mbl-for',
      dots: false,
      arrows: false,
      infinite: false,
      focusOnSelect: true,
      variableWidth: true
    });
  }
  if ($(".program-benefits-mbl-for").length) {
    $('.program-benefits-mbl-for').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      infinite: false,
      dots: true,
      asNavFor: '.program-benefits-mbl-nav',
      responsive: [
        {
          breakpoint: 640,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            arrows: false,
            adaptiveHeight: true,
          }
        }
      ]
    });
  }
  if ($(".messageBlockSlider .line-items").length) {
    $('.messageBlockSlider .line-items').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      infinite: false,
      dots: true,
      responsive: [
        {
          breakpoint: 640,
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
  if ($(".instVideoSlider").length) {
    $('.instVideoSlider').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      infinite: false,
      dots: true,
      responsive: [
        {
          breakpoint: 640,
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
  // Program benefits slider
  if ($(".program-benefits-mbl-slider").length) {
    $(".program-benefits-mbl-slider").slick({
      slidesToShow: 1,
      dots: true,
      arrows: false,
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
          breakpoint: 640,
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
  if ($(".oma-slider").length) {
    $(".oma-slider").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: true,
      arrows: false,
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
          breakpoint: 640,
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
  if (width < 768) {
    if ($(".global-impact-sect .number-block-mobile-slider").length) {
      $(".global-impact-sect .number-block-mobile-slider").slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 0,
        speed: 5000,
        cssEase: 'linear',
        infinite: true,
        swipeToSlide: true,
        variableWidth: true,
        arrows: false,
        dots: false,
        responsive: [
          {
            breakpoint: 900,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              dots: false,
            }
          },
          {
            breakpoint: 640,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              dots: false,
              arrows: false,
              variableWidth: false,
            }
          }
        ]
      });
    }
  }

  if (width > 480) {
    setTimeout(function () {
      if ($(".oma-tabcontent").length) {
        $(".oma-tab").css({ 'height': ($(".oma-tabcontent").first().height() + 'px') });
      }
    }, 2000);
    $('#coursedegree1 .course-card-second-row').css('display', 'flex');
    $('#coursedegree1 .course-show-more').hide();
    $('#coursedegree1 .course-browse-all').show();
  }

  if ($(".mahe-generic-baner").length) {
    $(".mahe-generic-baner").slick({
      slidesToShow: 1,
      dots: true,
      arrows: false,
      infinite: false,
      autoplay: true,
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
          breakpoint: 640,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            arrows: false,
            autoplay: true,
            infinite: false
          }
        },
        {
          breakpoint: 380,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            arrows: false,
            autoplay: true,
            infinite: false
          }
        }
      ]
    });
  }
  //smoothscroll
  if ($('.placement-journey-menu').length > 0) {
    $('.placement-journey-menu .menuDetails a').on('click', function (e) {
      e.preventDefault();
      $(document).off("scroll");
      var sec_id = $(this).attr("href");
      var target = this.hash,
        menu = target;
      target = $(target);
      $('html, body').animate({
        'scrollTop': $(sec_id).position().top - 200
      });
    });
  }

  $(document).ready(function () {
    //toggle class for testimonial box
    $(".knowmore-button").click(function () {
      $(this).parents('.placement-services-slider').toggleClass('active');
      var indimgHeight = ($(this).text() === "Know More") ? $(this).parents('.placement-services-slider').find('.placement-services-card-img').height() : 0;
      if (indimgHeight != 0) {
        var newindimgHeight = indimgHeight + 10;
      } else {
        var newindimgHeight = indimgHeight;
      }
      $(this).parents('.placement-services-text').css("transform", "translateY(-" + newindimgHeight + "px)");
      $(this).text(function (i, text) {
        return text === "Know More" ? "Close" : "Know More";
      })
    });
    get_line_items_height();
  });

  $(window).on('resize', function () {
    get_line_items_height();
  });

  function get_line_items_height() {
    $(".Industry-readiness-section .slick-track > .placement-services-slider").each(function () {
      ind_child_height = $(this).height();
      $(".Industry-readiness-section .slick-track > .line-items").height(ind_child_height);
    });
  }


  // Passing utm sources to enrol now url
  var search = window.location.search;
  var searchString = 'utm_source';
  if (search && search.indexOf(searchString) != -1) {
    localStorage.setItem('utm_parameters', search);
    $('a').each(function () {
      var text = $(this).attr("href");
      var maheText = 'mahe.onlinemanipal.com';
      if (text && text.indexOf(maheText) != -1) {
        var utmParam = localStorage.getItem('utm_parameters');
        $(this).attr("href", $(this).attr("href") + utmParam);
      }
      var mujText = 'muj.onlinemanipal.com';
      if (text && text.indexOf(mujText) != -1) {
        var utmParam = localStorage.getItem('utm_parameters');
        $(this).attr("href", $(this).attr("href") + utmParam);
      }
    });
  } else {
    var utmParam = localStorage.getItem('utm_parameters');
    if (utmParam && utmParam.indexOf(searchString) != -1) {
      localStorage.setItem('utm_parameters', utmParam);
      $('a').each(function () {
        var text = $(this).attr("href");
        var maheText = 'mahe.onlinemanipal.com';
        if (text && text.indexOf(maheText) != -1) {
          var utmParam = localStorage.getItem('utm_parameters');
          $(this).attr("href", $(this).attr("href") + utmParam);
        }
        var mujText = 'muj.onlinemanipal.com';
        if (text && text.indexOf(mujText) != -1) {
          var utmParam = localStorage.getItem('utm_parameters');
          $(this).attr("href", $(this).attr("href") + utmParam);
        }
      });
    }
  }

  $(".otp-verification-block").hide();

  // Elective page redirection from close icon
  $(".ele-close-icon").click(function () {
    var redirectURL = $(this).attr("data-url");
    window.location.href = redirectURL;
  });

  // Start of Refer & Earn functionality
  if ($("#referearn").length) { referearnapplycontrycode("#referearn"); }
  if ($("#referearn_popup").length) { referearnapplycontrycode("#referearn_popup"); }
  if ($("#popupEnrollForm").length) { referearnapplycontrycode("#popupEnrollForm"); }

  // Refer & Earn form country code for second mobile number
  function referearnapplycontrycode(formSelector) {
    if ($(formSelector + ' #phone_number').length) {
      var countryCode = $(".country-code").text();
      var excludeCountryList = [''];
      if (!countryCode) { countryCode = 'IN'; }
      if (countryCode == 'IN' || countryCode == 'in') {
        $(formSelector + " #send-otp").show();
        $(formSelector + " .otp-verification").show();
        var phone_number = window.intlTelInput(document.querySelector(formSelector + " #phone_number"), {
          allowExtensions: false,
          autoFormat: false,
          separateDialCode: true,
          initialCountry: countryCode,
          // onlyCountries: ["in"],
          utilsScript: "//cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.3/js/utils.js"
        });
      } else {
        excludeCountryList = [''];
        var phone_number = window.intlTelInput(document.querySelector(formSelector + " #phone_number"), {
          allowExtensions: false,
          autoFormat: false,
          separateDialCode: true,
          initialCountry: countryCode,
          excludeCountries: excludeCountryList,
          preferredCountries: ["ae", "us", "my", "ph"],
          utilsScript: "//cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.3/js/utils.js"
        });
      }
    }
  }

  // Enroll Now button click
  function referenrollNow(formSelector, e) {
    e.preventDefault();
    let number = $(formSelector + " input[name=Phone]").val();
    number = number.replace(/\s/g, '').trim();
    let dialCode = $(formSelector + " .phoneField .iti__selected-dial-code").text();
    let name = $(formSelector + " input[name=leadsquared-FirstName]").val();
    let email = $(formSelector + " input[name=leadsquared-EmailAddress]").val();
    let courseName = $(formSelector + " input[name=leadsquared-mx_course_applying_for]").val();
    let refererName = $(formSelector + " input[name=leadsquared-mx_Referrer_Name]").val();
    let refererEmail = $(formSelector + " input[name=leadsquared-mx_Referrer_Email_ID]").val();
    let numbers = $(formSelector + " #phone_number").val();
    let refereedialCode = $(formSelector + " .referphoneField .iti__selected-dial-code").text();
    let refereeMobileNumber = refereedialCode + '-' + $.trim(numbers);
    if (courseName == undefined) { courseName = $(formSelector + " select[name=leadsquared-mx_course_applying_for]").val(); }
    if (!name) {
      $(formSelector + " .nameError").html("Please enter the name");
      setTimeout(function () { $(formSelector + " .nameError").html(""); }, 5000);
    } else if (!email || !validateEmail(email)) {
      $(formSelector + " .emailError").html("Please enter the valid email id");
      setTimeout(function () { $(formSelector + " .emailError").html(""); }, 5000);
    } else if (!refererName) {
      $(formSelector + " .refernameError").html("Please enter your friend name");
      setTimeout(function () { $(formSelector + " .refernameError").html(""); }, 5000);
    } else if (!refererEmail || !validateEmail(refererEmail)) {
      $(formSelector + " .referemailError").html("Please enter the valid email id");
      setTimeout(function () { $(formSelector + " .referemailError").html(""); }, 5000);
    } else if (numbers.length < 10 && dialCode == "+91") {
      $(formSelector + " .referphoneError").html("Please enter your friend number");
      setTimeout(function () { $(formSelector + " .referphoneError").html(""); }, 5000);
    } else if (!courseName) {
      $(formSelector + " .courseError").html("Please select the course name");
      setTimeout(function () { $(formSelector + " .courseError").html(""); }, 5000);
    } else if (!number) {
      $(formSelector + " .phoneError").html("Please enter the mobile number");
      setTimeout(function () { $(formSelector + " .phoneError").html(""); }, 5000);
    } else if (number.length < 10 && dialCode == "+91") {
      $(formSelector + " .phoneError").html("Please enter a valid 10 digit number");
      setTimeout(function () { $(formSelector + " .phoneError").html(""); }, 5000);
    } else {
      let leadID = localStorage.getItem('leadID');
      let userEdit = localStorage.getItem('userEdit');
      if (leadID && userEdit == "Yes") {
        let courseText = $(formSelector + " input[name=leadsquared-mx_course_applying_for]").val();
        if (courseText == undefined) { courseText = $(formSelector + " select[name=leadsquared-mx_course_applying_for] option:selected").text(); }
        let institutionText = $(formSelector + " input[name=Institution]").val();
        if (institutionText == undefined) { institutionText = $(formSelector + " select[name=Institution] option:selected").text(); }
        $(".otp-verification-block .courseName").text(courseText);
        $(".otp-verification-block .university").text(institutionText);
        if (dialCode == "+91") {
          send_otp(formSelector);
        } else {
          refer_earn_lsq_post_lead_data(formSelector, e);
        }
      } else {
        let courseText = $(formSelector + " input[name=leadsquared-mx_course_applying_for]").val();
        if (courseText == undefined) { courseText = $(formSelector + " select[name=leadsquared-mx_course_applying_for] option:selected").text(); }
        if (courseName == "MBA" && institutionText == "Manipal Academy of Higher Education") {
          courseText = 'Master of Business Administration';
        }
        $(".otp-verification-block .courseName").text(courseText);
        if (dialCode == "+91") {
          send_otp(formSelector);
        } else {
          refer_earn_lsq_post_lead_data(formSelector, e);
        }
      }
    }
  }

  // Send OTP for Refer & Earn form
  $(document).on('click', referearnform + " .wpcf7-submit", function (e) {
    e.preventDefault();
    referenrollNow(referearnform, e);
  });
  $(document).on('click', referearn_popup + " .wpcf7-submit", function (e) {
    e.preventDefault();
    referenrollNow(referearn_popup, e);
  });
  $(document).on('click', referearnformmobile + " .wpcf7-submit", function (e) {
    e.preventDefault();
    referenrollNow(referearnformmobile, e);
  });

  // Refer ane Earn login functionality
  function refer_earn_lsq_post_lead_data(formSelector, e) {
    e.preventDefault();
    let number = $(formSelector + " input[name=Phone]").val();
    let dialCode = $(formSelector + " .phoneField .iti__selected-dial-code").text();
    let refereedialCode = $(formSelector + " .referphoneField .iti__selected-dial-code").text();
    let MobileNumber = dialCode + '-' + $.trim(number);
    let courseName = $(formSelector + " input[name=leadsquared-mx_course_applying_for]").val();
    if (courseName == undefined) { courseName = $(formSelector + " select[name=leadsquared-mx_course_applying_for]").val(); }
    let siteName = 'MUJ';
    $(".overlay-bg").fadeIn(500);
    $("#lsq-process-overlay").fadeIn(500);
    let refererName = $(formSelector + " input[name=leadsquared-FirstName]").val();
    let refererEmail = $(formSelector + " input[name=leadsquared-EmailAddress]").val();
    let source = $(formSelector + " input[name=leadsquared-Source]").val();
    let utmCampaign = $(formSelector + " input[name=leadsquared-SourceCampaign]").val();
    let utmMedium = $(formSelector + " input[name=leadsquared-SourceMedium]").val();
    let utmContent = $(formSelector + " input[name=leadsquared-SourceContent]").val();
    let utmKeyword = $(formSelector + " input[name=leadsquared-mx_UTM_Keyword]").val();
    let utmAdset = $(formSelector + " input[name=leadsquared-mx_Marketing_Ad_Set]").val();
    let utmMatchType = $(formSelector + " input[name='leadsquared-mx_UTM_Matchtype']").val();
    let utmPlacement = $(formSelector + " input[name='leadsquared-mx_UTM_Placement']").val();
    let utmPosition = $(formSelector + " input[name='leadsquared-mx_UTM_Position']").val();
    let device = $(formSelector + " input[name=leadsquared-mx_Device]").val();
    let website = $(formSelector + " input[name=leadsquared-Website]").val();
    let location = $(formSelector + " input[name=leadsquared-mx_Location]").val();
    let ip_address = $(formSelector + " input[name=leadsquared-mx_Website_IP_Address]").val();
    let name = $(formSelector + " input[name=leadsquared-mx_Referrer_Name]").val();
    let email = $(formSelector + " input[name=leadsquared-mx_Referrer_Email_ID]").val();
    let agentMedium = $(formSelector + " input[name='leadsquared-mx_Lead_Medium']").val();
    let gclid = $(formSelector + " input[name='leadsquared-mx_gclid']").val();
    number = $(formSelector + " #phone_number").val();
    let refereeMobileNumber = refereedialCode + '-' + $.trim(number);

    if (email && courseName && siteName) {
      $.ajax({
        url: '/wp-admin/admin-ajax.php',
        type: 'POST',
        dataType: 'json',
        data: {
          action: 'refer_earn_lsq_lead_post',
          email: email,
          first_name: name,
          mobile_no: refereeMobileNumber,
          refererName: refererName,
          refererEmail: refererEmail,
          refererMobileNumber: MobileNumber,
          utm_source: source,
          utm_campaign: utmCampaign,
          utm_medium: utmMedium,
          utm_content: utmContent,
          utm_keyword: utmKeyword,
          utm_adset: utmAdset,
          utmMatchType: utmMatchType,
          utmPlacement: utmPlacement,
          utmPosition: utmPosition,
          device: device,
          website: website,
          location: location,
          ip_address: ip_address,
          course_name: courseName,
          site_name: siteName,
          agentMedium: agentMedium,
          gclid: gclid
        },
        success: function (response) {
          if (response.status == 1) {
            $(".overlay-bg").fadeOut();
            $("#lsq-process-overlay").fadeOut();
            $(".refer-form .rfi-form").hide();
            $(".otp-verification-block").hide();
            $(formSelector + " .wpcf7-response-output").show();
            $(formSelector + " .wpcf7-response-output").html("Thank you for your interest. Our counsellor will get back to you.");
            $(formSelector).animate({ scrollTop: $(window).scrollTop(0) }, "slow");
          }
        }
      });
    }
  }
  $(document).on("click", referearnform + " .lsq-submit", function (e) {
    e.preventDefault();
    refer_earn_lsq_post_lead_data(referearnform, e);
  });
  $(document).on("click", referearn_popup + " .lsq-submit", function (e) {
    e.preventDefault();
    refer_earn_lsq_post_lead_data(referearn_popup, e);
  });
  $(document).on("click", referearnformmobile + " .lsq-submit", function (e) {
    e.preventDefault();
    refer_earn_lsq_post_lead_data(referearnformmobile, e);
  });
  // End of refer & Earn functionality

  $(document).ready(function () {
    if ($(".xdk-iframe").length == 1) {
      $(".xdk-iframe").css("width", "56px");
    }
    setTimeout(function () {
      $(".xdk-iframe").css("width", "56px");
    }, 1000)
  });

  function show_hide_right_arrow() {
    var scroll_cnt = $('.sub-menu')[0].scrollWidth - $('.sub-menu')[0].clientWidth;
    var res = true;
    if (scroll_cnt > 5) {
      res = true;
    } else {
      res = false;
    }
    return res;
  }

  // faqAccordian
  $(".faqAccordian .Faq_title").click(function () {
    $(this).hasClass("open_accordian_faq") ? ($(this).parent().find(".Faq_accordian_data").slideUp(),
      $(this).removeClass("open_accordian_faq")) : ($(".Faq_accordian_data").slideUp(),
        $(".open_accordian_faq").removeClass("open_accordian_faq"),
        $(this).parent().find(".Faq_accordian_data").slideDown(),
        $(this).parent().find(".Faq_title").addClass("open_accordian_faq"))
  });

  // Passing values to LSQ form
  var deviceType = '';
  if (width < 480) {
    deviceType = 'Mobile';
  } else if (width < 768) {
    deviceType = 'Tablet';
  } else {
    deviceType = 'Desktop';
  }
  var sourceLocation = $(".source-location").text();
  var sourceIPAddress = $(".source-ip-address").text();
  var websiteurl = window.location.href;
  $("input[name='leadsquared-mx_Location']").val(sourceLocation);
  $("input[name='leadsquared-mx_Device']").val(deviceType);
  $("input[name='leadsquared-mx_Website_IP_Address']").val(sourceIPAddress);
  $("input[name='leadsquared-Website']").val(websiteurl);

  // Passing utm sources to enrol now url
  var search = window.location.search;
  var searchString = 'utm_source';
  if (search && search.indexOf(searchString) != -1) {
    localStorage.setItem('utm_parameters', search);
    $('a').each(function () {
      var text = $(this).attr("href");
      var maheText = 'mahe.onlinemanipal.com';
      if (text && text.indexOf(maheText) != -1) {
        var utmParam = localStorage.getItem('utm_parameters');
        $(this).attr("href", $(this).attr("href") + utmParam);
      }
      var mujText = 'muj.onlinemanipal.com';
      if (text && text.indexOf(mujText) != -1) {
        var utmParam = localStorage.getItem('utm_parameters');
        $(this).attr("href", $(this).attr("href") + utmParam);
      }
    });
  } else {
    var utmParam = localStorage.getItem('utm_parameters');
    if (utmParam && utmParam.indexOf(searchString) != -1) {
      localStorage.setItem('utm_parameters', utmParam);
      $('a').each(function () {
        var text = $(this).attr("href");
        var maheText = 'mahe.onlinemanipal.com';
        if (text && text.indexOf(maheText) != -1) {
          var utmParam = localStorage.getItem('utm_parameters');
          $(this).attr("href", $(this).attr("href") + utmParam);
        }
        var mujText = 'muj.onlinemanipal.com';
        if (text && text.indexOf(mujText) != -1) {
          var utmParam = localStorage.getItem('utm_parameters');
          $(this).attr("href", $(this).attr("href") + utmParam);
        }
      });
    }
  }

  // Get query string from url
  function getQueryString() {
    var key = false,
      res = {},
      itm = null;
    var qs = location.search.substring(1);
    if (qs) { qs = qs.replace(/&amp;/g, '&'); }
    if (arguments.length > 0 && arguments[0].length > 1)
      key = arguments[0];
    var pattern = /([^&=]+)=([^&]*)/g;
    while (itm = pattern.exec(qs)) {
      if (key !== false && decodeURIComponent(itm[1]) === key)
        return decodeURIComponent(itm[2]);
      else if (key === false)
        res[decodeURIComponent(itm[1])] = decodeURIComponent(itm[2]);
    }
    return key === false ? res : null;
  }

  // Append the previous page URL in page
  function append_referer_url() {
    var referer_url = document.referrer || window.location.href; $("<input>", { type: "hidden", name: "referer_url", value: referer_url }).appendTo("form");
  }
  append_referer_url();

  $('.tablinks').click(function () {
    $(".program-benefits-mbl-slider").slick("setPosition");
  });
  // Fetching course name and passing in input hidden fields
  var courseName = $("#courseName").text();
  var instituionName = $("#instituionName").text();
  if (courseName) {
    var courseName = $("input[name=leadsquared-mx_course_applying_for]").val(courseName);
    var courseName = $("input[name=Institution]").val(instituionName);
  }

  // Functionality to apply dropdown for select fields
  function apply_dropdown_search(fieldName, placeHolder, idName) {
    $(idName + " ." + fieldName + " select").attr("placeholder", placeHolder);
    if (fieldName == "institutionField") {
      $(idName + " ." + fieldName + " select").attr("data-search", "false");
    } else {
      $(idName + " ." + fieldName + " select").attr("data-search", "true");
    }
    $(idName + " ." + fieldName + " select").selectstyle({
      theme: 'google',
      fieldName: fieldName,
      onchange: function (val) {
      }
    });
    $(idName + " .institutionField").addClass("disable");
    $(idName + " .institutionField .selectstyle.ss_dib.google").addClass("disabledbutton");
  }

  // Select course field dropdown
  function dropdownChange(formSelector) {
    if ($(formSelector + " .courseField select").length) {
      apply_dropdown_search("courseField", "Select course*", formSelector);
      if ($(formSelector + " .courseField select[name=leadsquared-mx_course_applying_for]").length) {
        $(formSelector + " .courseField select[name=leadsquared-mx_course_applying_for]").prepend("<option value='' selected='selected'></option>");
      }
    }
    if ($(formSelector + " .institutionField select").length) {
      apply_dropdown_search("institutionField", "Select institution*", formSelector);
      if ($(formSelector + " select[name=institution]").length) {
        $(formSelector + " select[name=institution]").prepend("<option value='' selected='selected'></option>");
      }
    }
    return true;
  }

  if (pathName.indexOf("/blogs") > -1 || pathName.indexOf("/muj/republic-day-discount") > -1) {

  } else {
    $(leadFormSelector).length && dropdownChange(leadFormSelector);
    $(questionFormSelector).length && dropdownChange(questionFormSelector);
    $(courseFloatSelector).length && dropdownChange(courseFloatSelector);
    $(brochureSelector).length && dropdownChange(brochureSelector);
    $(popupRfiForm).length && dropdownChange(popupRfiForm);
    $(signinform).length && dropdownChange(signinform);
    $(demoleadFormSelector).length && dropdownChange(demoleadFormSelector);
    $(referearnform).length && dropdownChange(referearnform);
    $(referearnformmobile).length && dropdownChange(referearnformmobile);
    $(referearn_popup).length && dropdownChange(referearn_popup);
  }

  // VWO form dropdown names
  if ($(demoleadFormSelector + " select").length) {
    $(demoleadFormSelector + " select[name='leadsquared-mx_course_applying_for'] option").eq(1).before($("<option class='select-title' disabled></option>").val("").text("Manipal University Jaipur (MUJ)"));
    $(demoleadFormSelector + " select[name='leadsquared-mx_course_applying_for'] option").eq(9).before($("<option class='select-title' disabled></option>").val("").text("Manipal Academy of Higher Education (MAHE)"));
    $(demoleadFormSelector + " select[name='leadsquared-mx_course_applying_for'] option").eq(15).before($("<option class='select-title' disabled></option>").val("").text("T. A. Pai Management Institute (TAPMI)"));
    $(demoleadFormSelector + " select[name='leadsquared-mx_course_applying_for'] option").eq(17).before($("<option class='select-title' disabled></option>").val("").text("Manipal Institute of Technology (MIT)"));
  }

  function universitySelection(formSelector) {
    $(document).on("click", formSelector + " .courseField #select_style_ul li", function () {
      const selVal = $(formSelector + " select[name=leadsquared-mx_course_applying_for]").val();
      if (selVal) {
        let siteDetails = fetchSiteDetails(selVal);
        let institutionName = siteDetails.universityName;
        let MUJSMUCourses = ["MCA", "B.Com", "M.Com"];
        $(formSelector + " .institutionField #select_style_ul li").hide();
        if (selVal == "MBA" || selVal == "MCA") {
          $(formSelector + " .institutionField #select_style_ul [data-title='Manipal University Jaipur']").show();
          $(formSelector + " .institutionField #select_style_ul [data-title='Manipal Academy of Higher Education']").show();
          $(formSelector + " .institutionField #select_style_ul [data-title='Sikkim Manipal University']").show();
          $(formSelector + " .institutionField #select_style .ss_dib.ss_text").text("Select institution*");
          $(formSelector + " .institutionField #select_style_ul, " + formSelector + " .institutionField #select_style").show();
        } else if (MUJSMUCourses.includes(selVal)) {
          $(formSelector + " .institutionField #select_style_ul [data-title='Manipal University Jaipur']").show();
          $(formSelector + " .institutionField #select_style_ul [data-title='Sikkim Manipal University']").show();
          $(formSelector + " .institutionField #select_style .ss_dib.ss_text").text("Select institution*");
          $(formSelector + " .institutionField #select_style_ul, " + formSelector + " .institutionField #select_style").show();
          $(formSelector + " .institutionField #select_style_ul ul").css("width", "100%");
        } else {
          $(formSelector + " .institutionField #select_style_ul [data-title='" + institutionName + "']").show();
          $(formSelector + " .institutionField #select_style .ss_dib.ss_text").text(institutionName);
        }
        $(formSelector + " .institutionField").removeClass("disable");
        $(formSelector + " .institutionField .selectstyle").removeClass("disabledbutton");
      }
    });
  }

  // Based on course selection display university in dropdown list
  $(questionFormSelector).length && universitySelection(questionFormSelector);
  $(leadFormSelector).length && universitySelection(leadFormSelector);
  $(courseFloatSelector).length && universitySelection(courseFloatSelector);
  $(brochureSelector).length && universitySelection(brochureSelector);
  $(popupRfiForm).length && universitySelection(popupRfiForm);
  $(signinform).length && universitySelection(signinform);
  $(demoleadFormSelector).length && universitySelection(demoleadFormSelector);
  $(referearnform).length && universitySelection(referearnform);
  $(referearnformmobile).length && universitySelection(referearnformmobile);
  $(referearn_popup).length && universitySelection(referearn_popup);

  // Change terms and condition checkbox id with unique id
  $("input[id*='javascript']").each(function (index) {
    var newId = 'javascript' + (index + 1);
    $(this).attr('id', newId);
  });

  // Change terms and condition label for attribute value with unique value
  $("label[for*='javascript']").each(function (index) {
    var newFor = 'javascript' + (index + 1);
    $(this).attr('for', newFor);
  });

  // code for fixing course card nav tab at top 
  if ($(window).width() < 768 && $('#scroll_banner_mob').length) {
    var subNavPos = $('#scroll_banner_mob .section-title').offset().top - $('header').height();
    var showBlockPos = $('.course-filter-results').offset().top + $('.course-filter-results').height() - (($('header').height() + $('.course-nav-container-mobile').height() * 2) + 40);
    window.onscroll = function () {
      var scrollPos = $(window).scrollTop();
      if (scrollPos > subNavPos && scrollPos < showBlockPos) {
        $('.course-nav-container-mobile').css({
          'position': 'fixed',
          'overflow-x': 'auto',
          'width': '100%'
        });
      }
      else {
        $('.course-nav-container-mobile').css('position', 'sticky');
      }
    }
  }

  function countDownTimer(date) {
    var elem = $('#countDown, .countDown');
    var futureTime = new Date(date).getTime();
    const myTimer = setInterval(function () {
      var timeLeft = Math.floor((futureTime - new Date().getTime()) / 1000);
      var days = Math.floor(timeLeft / 86400);
      timeLeft -= days * 86400;
      var hours = Math.floor(timeLeft / 3600) % 24;
      timeLeft -= hours * 3600;
      var min = Math.floor(timeLeft / 60) % 60;
      timeLeft -= min * 60;
      var sec = timeLeft % 60;
      if (window.location.href.endsWith("/remarketing-v3") === true) {
        var timeString = "<span class='days'>" + days + "d " + "</span>" +
          "<span class='hours'>" + hours + "h " + "</span>" +
          "<span class='minutes'>" + min + "m " + "</span>" +
          "<span class='seconds'>" + sec + "s " + "</span>";
      } else {
        var timeString = "<span class='days'>" + days + "d " + "</span>" +
          "<span class='hours'>" + hours + "h " + "</span>" +
          "<span class='minutes'>" + min + "m " + "</span>";

      }
      elem.html(timeString);
      if (days < "0") {
        $("#countDown, .countDown").hide();
        $(".close_in").text("Application has been closed.");
      }
    }, 1000);
  }

  // Code for program curriculum
  const selectedElectives = {
    1: "",
    2: "",
    3: "",
    4: "",
  };

  function handleTabClick() {
    const blockId = $(this).data("block");

    $(`#electivetabSlider${blockId} .tab`).removeClass("is-tab-selected");
    $(this).addClass("is-tab-selected");
    $(`.elective-block-${blockId} .tabcontent`).hide();
    const contentId = $(this).data("id");
    $(`#${contentId}`).show();
    selectedElectives[blockId] = contentId;
  }

  $(".tabs .tab").on("click", handleTabClick);
  $(".electivesSlider .line-items").on("click", handleTabClick);

  function restoreSelectedElectives() {
    for (let blockId in selectedElectives) {
      const selectedId = selectedElectives[blockId];
      if (selectedId) {
        const tab = $(`#electivetabSlider${blockId} .tab[data-id="${selectedId}"]`);
        if (tab.length) {
          tab.addClass("is-tab-selected");
        }

        $(`.elective-block-${blockId} .tabcontent`).hide();
        const content = $(`#${selectedId}`);
        if (content.length) {
          content.show();
        }
      }
    }
  }

  function setDefaultElectives() {
    const defaultTabs = {
      2: "elec-finance-2",
      4: "elec-finance-4",
    };
    for (let blockId in defaultTabs) {
      const tabId = defaultTabs[blockId];
      const tabExists = $(`#electivetabSlider${blockId} .tab[data-id="${tabId}"]`).length > 0;
      if (tabExists) {
        selectedElectives[blockId] = tabId;
      }
    }
  }
  setDefaultElectives();
  restoreSelectedElectives();
  const electiveNames = $(".electiveSelector").text().trim();
  if (electiveNames) {
    $("." + electiveNames).show();
  }
  let websitePathName = window.location.pathname;
  if (websitePathName.indexOf("/online-mba-") > -1) {
    var electiveName = $(".electiveSelector").text();
    $("." + electiveName).show();
  }

  if (window.location.pathname === '/online-mba-muj') {
    const lineItems = document.querySelectorAll('.Electives .line-items');
    lineItems.forEach(item => {
      item.style.cursor = 'default';
      item.style.pointerEvents = 'none';
    });
  }
  
	$('#downloadform .otp-verification-block p').each(function () {
		var $this = $(this);
		var targetText = "Enter the code sent to your phone number to proceed with the application form";
		if ($this.text().includes(targetText)) {
			$this.html($this.html().replace(targetText, '<span style="display:none;">' + targetText + '</span>'));
		}
	});
});


// Hender menu start
function openNavmb() {
  $("#myNavmb").scrollTop(0);
  $("#myNavmb").css("width", "100%");
  $("body").addClass("headoverscl");
  if ($('.downloadBtn.show-popup').length > 0) {
    $('.downloadBtn.show-popup').css('display', 'none');
  }
}
function closeNavmb() {
  $("#myNavmb").css("width", "0%");
  $("body").removeClass("headoverscl");
  if ($('.downloadBtn.show-popup').length > 0) {
    $('.downloadBtn.show-popup').css('display', 'flex');
  }
}
function toggleAccordion(panel) {
  if (panel.style.maxHeight) {
    panel.style.maxHeight = null;
  } else {
    panel.style.maxHeight = panel.scrollHeight + "px";
  }
}
function closeAccordion(accordion) {
  accordion.classList.remove('active');
  var panel = accordion.nextElementSibling;
  panel.style.maxHeight = null;
}
document.addEventListener("click", function (event) {
  var target = event.target;
  var allAccordions = document.querySelectorAll('.accordionmenu-course, .accordionmenu-inst');
  if (target.classList.contains("accordionmenu-course") || target.classList.contains("accordionmenu-inst")) {
    var clickedAccordion = target;
    allAccordions.forEach(function (accordion) {
      if (accordion !== clickedAccordion) {
        closeAccordion(accordion);
      }
    });
    clickedAccordion.classList.toggle("active");
    if (clickedAccordion.classList.contains("accordionmenu-inst")) {
      document.getElementById('header-course-div').classList.add('inst-course-div');
    } else {
      document.getElementById('header-course-div').classList.remove('inst-course-div');
    }
    var panel = clickedAccordion.nextElementSibling;
    toggleAccordion(panel);
  }
});
$('.mobmenu-wrap').find('button').eq(0).click();
function openCourse(byType, courseName, courses) {
  if ($('#header-course-div').css('width') == "0px") {
    $('#header-course-div .tab-pane').removeClass("show active")
    $('.header-couse-type').text(byType);
    document.getElementById("header-course-div").style.width = "100%";
    var ul = $('.header-course-title ul');
    var listElements = document.querySelectorAll(".header-course-title ul li");
    for (var i = 0; (li = listElements[i]); i++) {
      li.parentNode.removeChild(li);
    }
    var selectedTab = undefined;
    courses.map((e) => {
      var li = document.createElement("li");
      li.classList.add("nav-item");
      var a = document.createElement("a");
      a.setAttribute("id", `coursedegree${e.id}-tab`);
      a.setAttribute("href", `#coursedegree${e.id}`);
      a.setAttribute("data-toggle", "tab");
      a.setAttribute("role", "tab");
      a.setAttribute("aria-controls", `coursedegree${e.id}`);
      a.classList.add("nav-link");
      if (courseName == e.name) {
        a.classList.add("active");
        a.classList.add("show");
        a.setAttribute("aria-selected", "true");
        $(`#coursedegree${e.id}`).addClass("show active");
        selectedTab = `coursedegree${e.id}-tab`;
      } else {
        a.setAttribute("aria-selected", "false");
        $(`#coursedegree${e.id}`).removeClass("show active");
      }
      var div = a.appendChild(document.createTextNode(e.name));
      li.appendChild(a);
      ul.append(li);
    });
    var actWidth = $(".header-course-title").find(".active").parent("li").width();
    var actPosition = $(".header-course-title .active").position();
    selectedTab && document.getElementById(selectedTab).scrollIntoView();
    $(".header-course-title .slider").css({ "left": + actPosition.left, "width": actWidth });
    $(".header-course-title .nav-tabs a").click(function () {
      var position = $(this).parent().position();
      var width = $(this).parent().width();
      $(".header-course-title .slider").css({ "left": + position.left, "width": width });
      document.getElementById($(this).attr('id')).scrollIntoView()
    });
  } else {
    document.getElementById("header-course-div").style.width = "0%";
  }
}
function backCourseNav() {
  document.getElementById("header-course-div").style.width = "0%";
}
function closeCourse() {
  document.getElementById("header-course-div").style.width = "0%";
  closeNavmb();
}
function openNav() {
  closeUniversityNav();
  if ($('#myNav').css('width') == "0px") {
    $("#myNav").css('width', '100%');
    $('.submenu-top-item div').first().click();

    $("li.menu-item:first").addClass("active");
    $('body').css('overflow', 'hidden');
  } else {
    $("#myNav").css('width', '0%');
    $("li.menu-item:first").removeClass("active");
    $('body').css('overflow-y', 'visible');
  }
}
function closeNav() {
  $("#myNav").css('width', '0%');
  $("li.menu-item:first").removeClass("active");
  $('body').css('overflow-y', 'visible');
}
$(document).on('click', function (e) {
  var container = $("#myNav");
  var container1 = $("nav ul.menu li");
  var container2 = $("#myUniversityNav");
  if (!$(e.target).closest(container).length && !$(e.target).closest(container1).length && !$(e.target).closest(container2).length) {
    if ($('#myNav').css('width') != "0px") {
      closeNav();
    }
    if ($('#myUniversityNav').css('width') != "0px") {
      closeUniversityNav();
    }
  }
});
var $navEscp = $("#myNav, #myUniversityNav");
$(document).on('keydown', function (e) {
  if (e.keyCode === 27) {
    $navEscp.css('width', '0px');
    $("li.menu-item:first").removeClass("active");
    $('body').css('overflow', 'visible');
  }
});

function openUniversityNav() {
  closeNav();
  if ($('#myUniversityNav').css('width') == "0px") {
    $('#myUniversityNav').css('width', "100%");
    $('#myUniversityNav .submenu-institute-item div').first().click();
    $("#myUniversityNav").parents("li.menu-item:first").addClass("active");
    $('body').css('overflow', 'hidden');
  } else {
    $('#myUniversityNav').css('width', "0%");
    $("#myUniversityNav").parents("li.menu-item:first").removeClass("active");
    $('body').css('overflow-y', 'visible');
  }
}
function closeUniversityNav() {
  $('#myUniversityNav').css('width', "0%");
  $("#myUniversityNav").parents("li.menu-item:first").removeClass("active");
  $('body').css('overflow-y', 'visible');
}
function changeMenu(menuTitle, menuCourses) {
  if (menuCourses.length > 5) {
    $('.rightmenu-bg').eq(0).css('overflow-y', 'auto');
  } else {
    $('.rightmenu-bg').eq(0).css('overflow-y', 'unset');
  }
  var courseListElement = $('ul.submenu-list');
  $('ul .viewAll').css('visibility', menuCourses.length > 5 ? 'visible' : 'hidden');
  $('#myNav div.rightmenu').attr('data-before', menuTitle);
  courseListElement.empty();
  $.each(menuCourses, function (index, course) {
    var tagHTML = course['tag'] ? "<span class='hlight'>" + course['tag'] + "</span>" : "";
    var univClass = "";
    if (course['institute'] === "Manipal University Jaipur") {
      univClass = "muj";
    } else if (course['institute'] === "Manipal Academy of Higher Education") {
      univClass = "mahe";
    } else if (course['institute'] === "Sikkim Manipal University") {
      univClass = "smu";
    }
    courseListElement.append(
      "<li><a href='https://" + document.location.host + course['link'] + "'><span class='submenu-thumbnail'><img src='https://" + document.location.host + course['img'] + "' alt='" + course['name'] + "'></span><p>" + tagHTML + "<span class='course-name'>" + course['name'] + "</span><span class='unversity-name " + univClass + "'>" + course['institute'] + "</span><span class='course-duration'><img src='https://" + document.location.host + "/wp-content/themes/flamingo/images/header/Nav-DropDown-Calendar.svg' alt='duration'>" + course['duration'] + "</span></p></a></li>"
    );
  });
}

function changeUniversityMenu(instituteName, menuTitle, menuCourses) {
  if (menuCourses.length > 5) {
    $('#myUniversityNav .rightmenu-bg').eq(0).css('overflow-y', 'auto');
  } else {
    $('#myUniversityNav .rightmenu-bg').eq(0).css('overflow-y', 'unset');
  }
  var courseListElement = $('#myUniversityNav ul.submenu-list');
  var instituteViewAll = $('#myUniversityNav .viewAll');
  instituteViewAll.css('visibility', menuCourses.length > 5 ? 'visible' : 'hidden');
  instituteViewAll.attr("href", "/all-courses?institute=" + instituteName);
  $('#myUniversityNav div.rightmenu').attr('data-before', menuTitle);
  let menu_img_logo_path = window.location.origin + '/wp-content/themes/flamingo/images/';
  if (instituteName == "MAHE") {
    menu_img_logo_path += 'mahe-inst-logo1.png';
  } else if (instituteName == "MUJ") {
    menu_img_logo_path += 'muj-inst-logo1.png';
  } else {
    menu_img_logo_path += 'smu-inst-logo1.png';
  }
  $('head').append('<style>#myUniversityNav div.rightmenu:after{background:url("' + menu_img_logo_path + '"); background-size:190px;}</style>');
  courseListElement.empty();
  $.each(menuCourses, function (index, course) {
    var tagHTML = course['tag'] ? "<span class='hlight'>" + course['tag'] + "</span>" : "";
    courseListElement.append(
      "<li><a href='https://" + document.location.host + course['link'] + "'><span class='submenu-thumbnail'><img src='https://" + document.location.host + course['img'] + "' alt='" + course['name'] + "'></span><p>" + tagHTML + "<span class='course-name'>" + course['name'] + "</span><span class='course-duration'><img src='https://" + document.location.host + "/wp-content/themes/flamingo/images/header/Nav-DropDown-Calendar.svg' alt='duration'>" + course['duration'] + "</span></p></a></li>"
    );
  });
  return false;
}
$('.browseBtn-university').click(function () {
  var instName = $('.submenu-institute').find('li.active').eq(0).find('div').eq(0).data('institute_name');
  window.location.href = window.location.origin + '/institution/' + instName;
});
$(".mob-submenu").click(function () {
  $("#header-course-div .header-browse-all").text("Browse All courses");
  $("#header-course-div .header-course-heading").text("Courses");
  $("#header-course-div .header-browse-all").attr("href", window.location.origin + '/all-courses');
});
$(document).on('click', '.inst-course-div .nav-tabs li a, .header-mobile-menu.accordionmenu-inst.active, .mob-submenu.mob-instsubmenu', function () {
  if ($(".header-mobile-menu.accordionmenu-inst").hasClass('active')) {
    $("#header-course-div .header-browse-all").text("Browse Uiniversity");
    $("#header-course-div .header-course-heading").text("Institution");
  }
  var activeLi = $('.inst-course-div .nav-tabs li a.active').text().trim();
  var inst_urls = {
    "Manipal Academy of Higher Education": "/institution/mahe",
    "Manipal University Jaipur": "/institution/muj",
    "Sikkim Manipal University": "/institution/smu"
  };
  var inst_url = inst_urls[activeLi];
  if (inst_url) {
    $(".inst-course-div .header-browse-all").attr("href", window.location.origin + inst_url);
  }
});
$('#myNav ul li ul li:first').addClass('active');
$('ul.submenu-top li').click(function () {
  $("ul.submenu-domain li").each(function (index) {
    $(this).removeClass("active");
  });
  $("ul.submenu-institute li").each(function (index) {
    $(this).removeClass("active");
  });
  $("ul.submenu-top li").each(function (index) {
    $(this).removeClass("active");
  });
  $(this).addClass("active");
});
$('ul.submenu-domain li').click(function () {
  $("ul.submenu-top li").each(function (index) {
    $(this).removeClass("active");
  });
  $("ul.submenu-institute li").each(function (index) {
    $(this).removeClass("active");
  });
  $("ul.submenu-domain li").each(function (index) {
    $(this).removeClass("active");
  });
  $(this).addClass("active");
});
$('ul.submenu-institute li').click(function () {
  $("ul.submenu-top li").each(function (index) {
    $(this).removeClass("active");
  });
  $("ul.submenu-domain li").each(function (index) {
    $(this).removeClass("active");
  });
  $("ul.submenu-institute li").each(function (index) {
    $(this).removeClass("active");
  });
  $(this).addClass("active");
});
// Header menu end

//START custom js for homepage course filter bar custom select dropdown
var x, i, j, l, ll, selElmnt, a, b, c;
/*look for any elements with the class "custom-select":*/
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /*for each element, create a new DIV that will act as the selected item:*/
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected select-box");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /*for each element, create a new DIV that will contain the option list:*/
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 0; j < ll; j++) {
    /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function (e) {
      /*when an item is clicked, update the original select box,
      and the selected item:*/
      var y, i, k, s, h, sl, yl;
      s = this.parentNode.parentNode.getElementsByTagName("select")[0];
      sl = s.length;
      h = this.parentNode.previousSibling;
      for (i = 0; i < sl; i++) {
        if (s.options[i].innerHTML == this.innerHTML) {
          s.selectedIndex = i;
          if (this.innerHTML.length >= 15) {
            h.innerHTML = $.trim(this.innerHTML);
            // h.innerHTML = $.trim(this.innerHTML).substring(0, 15) + "...";
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
    /*when the select box is clicked, close any other select boxes,
    and open/close the current select box:*/
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
    $(this).parent(".custom-select").toggleClass("select-bg-change");
  });
}
function closeAllSelect(elmnt) {
  /*a function that will close all select boxes in the document,
  except the current select box:*/
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
      // For Institution Page breadcrumd section dropdown
      var drp_dwn = y[i].parentElement.querySelector('.slect');
      if (drp_dwn != null && (drp_dwn.dataset != null && (drp_dwn.dataset.defaultSelect != null || drp_dwn.dataset.defaultSelect != undefined))) {
        y[i].innerHTML = drp_dwn.dataset.defaultSelect;
      }
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}
/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener("click", closeAllSelect);
// END: custom js for homepage course filter bar custom select dropdown

// START: custom js for homepage course nav tab effect
$(document).ready(function () {
  $(document).on("click", '#tile-1 .nav-tabs a', function (event) {
    var position = $(this).parent().position();
    var width = $(this).parent().width();
    $("#tile-1 .slider").css({ "left": + position.left, "width": width });
  });
  var actWidth = $("#tile-1 .nav-tabs").find(".active").parent("li").width();
  var actPosition = $("#tile-1 .nav-tabs .active").position();
  if ($("#tile-1 .nav-tabs .active").position()) {
    $("#tile-1 .slider").css({ "left": + actPosition.left, "width": actWidth });
  }
});
// END: custom js for institution page course nav tab effect
// START: custom js for homepage course nav tab effect
$(document).ready(function () {
  $(document).on("click", '#tile-11 .nav-tabs a', function (event) {
    var position = $(this).parent().position();
    var width = $(this).parent().width();
    $("#tile-11 .slider").css({ "left": + position.left, "width": width });
  });
  var actWidth = $("#tile-11 .nav-tabs").find(".active").parent("li").width();
  var actPosition = $("#tile-11 .nav-tabs .active").position();
  if ($("#tile-11 .nav-tabs .active").position()) {
    $("#tile-11 .slider").css({ "left": + actPosition.left, "width": actWidth });
  }
});
// END: custom js for institution page course nav tab effect
// START om advantage Vertical Tabs JS
function openContent(evt, omaContent) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("oma-tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("oma-tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(omaContent).style.display = "block";
  evt.target.className += " active";
}
//document.getElementById("defaultOpen").click();
$(document).ready(function () {
  $(".oma-tab .oma-tablinks:first-child").click();
  $(".oma-tab .oma-tablinks").click(function () {
    // remove classes from all
    $(".oma-tab .oma-tablinks").removeClass("active");
    // add class to the one we clicked
    $(this).addClass("active");
  });
  // $(".oma-tab .oma-tablinks:first-child").toggleClass("active");
  if (document.getElementById("defaultOpen")) {
    document.getElementById("defaultOpen").click();
  }
});
// END om advantage Vertical Tabs JS
// START Open or close course filter on homepage mobile
function openCourseFilter() {
  document.getElementById("courseFilterOverlay").style.width = "100%";
}
function closeCourseFilter() {
  document.getElementById("courseFilterOverlay").style.width = "0%";
}
// END Open or close course filter on homepage mobile
// START course filter accordion
var acc = document.getElementsByClassName("filter-accordion");
var i;
for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("filter-active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}
// END course filter accordion

// For Institution Page breadcrumd section dropdown
$(document).ready(function () {
  var page_title = $('.page_title').text();
  $('.title1').text(page_title);
  $('.test-drop .select-selected').text(page_title);

  $('.test-drop .select-selected').click(function () {
    if ($(this).text() == "Select Institution") {
      $(this).text(page_title);
    } else {
      $(this).text('Select Institution');
    }
  });

  $('.test-drop .select-items div').click(function () {
    var new_option = $(this).text();
    var new_option_array = new_option.split("(");
    var param = new_option_array[1].replace(")", "").toLowerCase();
    window.location.href = window.location.origin + "/institution/" + param;
  });
});
//START Course Show More click to display second row
$(document).ready(function () {
  var page_url = window.location.href;
  if (page_url.search("institution/mit") != -1 || page_url.search("mahe-online-courses") != -1) {
    if (page_url.search("muj-online-degree-courses") > 1 || page_url.search("online-degree-courses") > 1) {
    }
    else {
      var course_card_length = $(".course-card-container").first().find(".course-card").length;
      if (course_card_length == 4 && page_url.search("smu-online-degree-courses") <= 1) {
        var child2 = $('.course-card:nth-child(4)').html();
        $(".course-card-second-row").prepend("<div class='course-card'>" + child2 + "</div>");
      }
    }
  }
  if (page_url.search("us-ca/online-degree-courses") > 0) {
    $('.course-card:nth-child(1)').hide();
  }
  $(document).on("click", '#coursedegree1 .course-show-more', function (event) {
    $('#coursedegree1 .course-card-second-row').css('display', 'flex');
    $('#coursedegree1 .course-show-more').hide();
    $('#coursedegree1 .course-browse-all').show();
  })
  $(document).on("click", '#coursedegree3 .course-show-more', function (event) {
    $('#coursedegree3 .course-card-second-row').css('display', 'flex');
    $('#coursedegree3 .course-show-more').hide();
    $('#coursedegree3 .course-browse-all').show();
  })
});
//END Course Show More click to display second row
// Back to Top script start
var scrolltop = $('#back-top');
scrolltop.on('click', function (e) {
  e.preventDefault();
  $('html, body').animate({ scrollTop: 0 }, '300');
});

$(function () {
  var didScroll, lastScrollTop = 0, delta = 5, navbarHeight = 1645;
  $(window).scroll(function (event) { didScroll = true; });
  setInterval(function () { if (didScroll) { hasScrolled(); didScroll = false; } }, 250);
  function hasScrolled() {
    var st = $(window).scrollTop();
    // Make sure they scroll more than delta
    if (Math.abs(lastScrollTop - st) <= delta) { return; }
    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight) {
      /*if (st > 25) {*/
      // Scroll Down
      $('#back-top').removeClass('hide').addClass('show');
    } else {
      // Scroll Up
      if (st + $(window).height() < $(document).height()) {
        $('#back-top').removeClass('show').addClass('hide');
      }
    }
    lastScrollTop = st;
  }
});
// Back to Top script end

// add width height auto for all the images
$(document).ready(function () {
  if ($(".faq").length > 0) {
    var tabs_array = ["General", "GENERAL", "Admission", "Academics", "Program", "PROGRAM", "ADMISSION", "ACADEMICS"];
    $.each(tabs_array, function (index, value) {
      if ($('.faq #' + value + '  .item').length > 5) {
        $("#" + value + '  .item').hide();
        $("#" + value + '  .item').slice(0, 5).show();
        $("#" + value).append("<div class='show-all-link faq-" + value + "-show-more faq-show-more'><span>Show More</span></div>");
      }
    });
    $('.tabcontent').on('click', '.faq-show-more', function (e) {
      var tab_id = ($(this).parents(".tabcontent").attr("id"));
      var faq_count = $('#' + tab_id + ' .item').length;
      $('#' + tab_id + ' .item').slice(0, faq_count).show();
      $(".faq-" + tab_id + "-show-more").css("display", "none");
      $('#' + tab_id).append("<div class='show-all-link faq-" + tab_id + "-show-less faq-show-less'><span>Show Less</span></div>");
    });
    $('.tabcontent ').on('click', '.faq-show-less', function (e) {
      var tab_id = ($(this).parents(".tabcontent").attr("id"));
      $('#' + tab_id + ' .item').hide();
      $('#' + tab_id + ' .item').slice(0, 5).show();
      $(".faq-" + tab_id + "-show-less").css("display", "none");
      $('#' + tab_id).append("<div class='show-all-link faq-" + tab_id + "-show-more faq-show-more'><span>Show More</span></div>");
    });
  }
  $('.institute-bread-drop .select-items div').each(function (index) {
    if ($(this).text() == $('.page-title-name').text()) {
      $(this).hide();
    }
  });
  // Whats app fix
  setTimeout(function () {
    if ($('.share-block #share .jssocials-share-whatsapp').length) {
      var whatsupp_url = $('.share-block #share .jssocials-share-whatsapp a').eq(0).attr('href').replace('whatsapp://', 'https://api.whatsapp.com/');
      $('.share-block #share .jssocials-share-whatsapp a').eq(0).attr('href', whatsupp_url);
      $('.share-block #share .jssocials-share-whatsapp a').eq(0).attr('target', 'blank');
    }
  }, 2000);
  if (window.location.pathname == "/international/refer-earn" ||
    window.location.pathname == "/us-ca/online-degree-courses" ||
    window.location.pathname == "/international/online-degree-course" ||
    window.location.pathname == "/international/online-mba-v2" ||
    window.location.pathname == "/international/muj-online-degree-courses-v2" ||
    window.location.pathname == "/international/muj-online-degree-courses-v3" ||
    window.location.pathname == "/international/mahe-online-degree-courses-v3" ||
    window.location.pathname == "/nepal/muj-online-degree-courses-v3" ||
    window.location.pathname == "/nepal/online-degree-course") {
    $("body").addClass("marquee_there");
    const container = document.getElementsByTagName("header");
    let textElement = ''; // Use let instead of const
    if (window.location.pathname == "/international/mahe-online-degree-courses-v3") {
      textElement = '<span><strong>5% fee</strong> concession on upfront payment of full program fee </span>&nbsp;&nbsp;&nbsp;  |&nbsp;&nbsp;&nbsp; <span> Attractive scholarships available - <span class="learn-more show-popup marquee-nkow-more" data-showpopup="attractiveScholarshipModal" >Know More</span></span>';
    } else {
      textElement = '<span><strong>10% fee</strong> concession on upfront payment of full program fee  |  </span><span><strong>5% fee</strong> concession on upfront payment of annual fee  </span>';
    }
    const text = textElement; // Get the HTML content including the image
    const space = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    let newText = "";
    for (let i = 0; i < 100; i++) {
      newText += text + space + "|" + space;
    }
    $(container).prepend('<div class="marquee-text-parent"><div class="marquee-text">' + newText + '</div></div>');
    let pos = 0;
    const speed = 1; // Change the speed of scrolling as needed
    let isRunning = false;
    function scrollText() {
      pos -= speed;
      $('.marquee-text').css('transform', `translateX(${pos}px)`);
      if (!isRunning) {
        requestAnimationFrame(scrollText);
      }
    }
    scrollText();
    function pauseAnimation() {
      isRunning = true;
    }
    function resumeAnimation() {
      isRunning = false;
      // Start the animation loop again
      scrollText();
    }
    $(".marquee-text-parent").mouseover(function () {
      pauseAnimation();
    });
    $(".marquee-text-parent").mouseout(function () {
      resumeAnimation();
    });

  }
  $(".scroller-learn-more").click(function () {
    $(".overlay-bg").css("background", "none")
  });

  var websitePath = window.location.href.split('?')[0];
  if (websitePath.indexOf("/international") > -1 || websitePath.indexOf("/nepal") > -1 || websitePath.indexOf("/ae") > -1 || websitePath.indexOf("/us-ca") > -1 || websitePath.indexOf("/np") > -1 || websitePath.indexOf("/saarc-ewc") > -1 || websitePath.indexOf("/global") > -1 || websitePath.indexOf("/sl") > -1 || websitePath.indexOf("/af") > -1 || websitePath.indexOf("/zambia") > -1) {
    $('.course-card a[href="/pgcp-in-entrepreneurship-and-innovation"]').parents('.course-card').eq(0).hide();
  }
});
function get_muj_brochure_url(courseName) {
  var pdf_array = { "BBA": "wp-content/uploads/2022/11/MUJ-BBA-Brochure-2023.pdf", "MBA": "wp-content/uploads/2022/11/MUJ_Domestic_MBA-1.pdf", "BCA": "wp-content/uploads/2022/11/MUJ-BCA-Brochure-2023.pdf", "MCA": "wp-content/uploads/2022/11/MUJ-MCA-Brochure-2023-1.pdf", "B.Com": "wp-content/uploads/2022/11/MUJ-BCOM-Brochure-2023.pdf", "M.Com": "wp-content/uploads/2022/11/MUJ-MCOM-Brochure-2023.pdf", "MA.JMC": "wp-content/uploads/2023/11/MUJ-Domestic-MAJMC.pdf", "MSc Data Science": "wp-content/uploads/2022/11/MAHE-MSC-DS-Brochure-2023.pdf", "MSc Business Analytics": "wp-content/uploads/2022/11/MAHE-MSC-BA-Brochure-2023.pdf", "Master of Business Administration": "wp-content/uploads/2022/11/MAHE-MBA-Brochure-2023.pdf", "MBA - Banking and Financial Services": "wp-content/uploads/2023/11/MBA-BKFS-Brochure-International.pdf", "BA": "wp-content/uploads/2023/06/SMU-BA-Domestic-Brochure-1.pdf", "MA in English": "wp-content/uploads/2023/06/SMU-MA-English-Domestic-Brochure-1.pdf", "MA in Sociology": "wp-content/uploads/2023/06/SMU-MA-Sociology-Domestic-Brochure-1.pdf", "MA in Political Science": "wp-content/uploads/2023/06/SMU-MA-Political-Science-Domestic-Brochure-1.pdf", "MCOM": "wp-content/uploads/2023/09/SMU-MCOM-Domestic-Brochure.pdf", "BCOM": "wp-content/uploads/2023/09/SMU-BCOM-Domestic-Brochure.pdf", "MCA-SMU": "wp-content/uploads/2023/09/SMU-MCA-Domestic-Brochure.pdf" };
  var brochure_course_name = pdf_array[courseName];
  var brochure_url = "https://www.onlinemanipal.com/" + brochure_course_name;
  var fileName = 'brochure.pdf';
  download_file(brochure_url, fileName);
}

function fetchSemester(semesterPdf) {
  var semesterPdf = $("#download-url").text(semesterPdf);
  $('#downloadform h5').css('display', 'block');
  $('#downloadform .rfi-form').css('display', 'block');
  $('#downloadform .has-spinner').val('Get Started');
  $("#downloadform h5").text('Interested in our courses? Share your details');
  $('#downloadform form').eq(0).trigger("reset");
}
// User Revisit Tracking
jQuery(window).on('load', function ($) {

  function userRevisitTracking(prospectId, siteName) {
    const currentTimestamp = Date.now();
    const source = jQuery("input[name=leadsquared-Source]").val() ? jQuery("input[name=leadsquared-Source]").val() : 'Direct Traffic';
    const device = jQuery("input[name=leadsquared-mx_Device]").val();
    const website = jQuery("input[name=leadsquared-Website]").val();
    const location = jQuery("input[name=leadsquared-mx_Location]").val();
    const ip_address = jQuery("input[name=leadsquared-mx_Website_IP_Address]").val();
    jQuery.ajax({
      type: 'POST',
      url: '/wp-admin/admin-ajax.php',
      dataType: 'json',
      data: {
        action: 'revisitTracking',
        utm_source: source,
        device: device,
        website_url: website,
        location: location,
        ip_address: ip_address,
        prospectId: prospectId,
        site_name: siteName
      },
      success: function (res) {
        if (res.status === 1) {
          setCookie("_" + siteName + "_revisitTime", currentTimestamp);
        }
      }
    });
  }

  function time_diff(dt2, dt1) {
    if (dt2 && dt1) {
      var res = Math.abs(dt2 - dt1) / 1000;
      var hours = Math.floor(res / 3600) % 24;
      return hours;
    } else {
      return false;
    }
  }

  setTimeout(function () {
    const MUJProspectId = getCookie("_MUJ_prospectId");
    const MAHEProspectId = getCookie("_MAHE_prospectId");
    const SMUProspectId = getCookie("_SMU_prospectId");
    const MUJRevisitTime = getCookie("_MUJ_revisitTime");
    const MAHERevisitTime = getCookie("_MAHE_revisitTime");
    const SMURevisitTime = getCookie("_SMU_revisitTime");
    const currentTimestamp = Date.now();
    if (MUJProspectId && (!MUJRevisitTime || (time_diff(MUJRevisitTime, currentTimestamp) >= 3))) {
      userRevisitTracking(MUJProspectId, "MUJ");
    }
    if (MAHEProspectId && (!MAHERevisitTime || (time_diff(MAHERevisitTime, currentTimestamp) >= 3))) {
      userRevisitTracking(MAHEProspectId, "MAHE");
    }
    if (SMUProspectId && (!SMURevisitTime || (time_diff(SMURevisitTime, currentTimestamp) >= 3))) {
      userRevisitTracking(SMUProspectId, "SMU");
    }
  }, 5000);

});

function existingLeadsErrorMsg(formSelector, response, site_name, app_login_url) {
  const course_name = response.existing_course_name;
  const firstName = response.existing_name;
  $(formSelector + " h5:first-child").hide();
  let university = 'Manipal University Jaipur';
  if (site_name === "MAHE") {
    university = 'Manipal Academy of Higher Education';
  } else if (site_name === "SMU") {
    university = 'Sikkim Manipal University';
  }
  const courseList = {
    "MBA": "Master of Business Administration (MBA)",
    "BBA": "Bachelor of Business Administration (BBA)",
    "BCA": "Bachelor of Computer Applications (BCA)",
    "MCA": "Master of Computer Applications (MCA)",
    "B.Com": "Bachelor of Commerce (BCOM)",
    "M.Com": "Master of Commerce (MCOM)",
    "MA.JMC": "Master of Arts in Journalism & Mass Communication (MAJMC)",
    "MSc Data Science": "MSc in Data Science (MSC-DS)",
    "MSc Business Analytics": "MSc in Business Analytics (MSC-BA)",
    "PGCP Business Analytics": "PGCP in Business Analytics (PGCP-BA)",
    "PGCP Logistics and Supply Chain": "PGCP in Logistics and Supply Chain Management (PGCP-LSCM)",
    "BA": "Bachelor of Arts (BA)",
    "MA in English": "Master of Arts in English (MA)",
    "MA in Sociology": "Master of Arts in Sociology (MA)",
    "MA in Political Science": "Master of Arts in Political Science (MA)",
    "PGCP Entrepreneurship and Innovation": "PGCP Entrepreneurship and Innovation (PGCP E&I)",
    "MA in Economics": "MA in Economics"
  };
  const output = '<div class="existingLeadsMsg">   <img src="/wp-content/themes/flamingo/images/success-icon.png">   <h5>Hey ' + firstName + ', we have your application ready with us!</h5>   <p>Click on the button below to continue.</p>   <div class="courseSelected">     <label>COURSE SELECTED</label>     <div class="details">       <div class="left">         <span class="courseName">' + courseList[course_name] + '</span>       </div>       <div class="right">         <span class="universityName">' + university + '</span>       </div>     </div>   </div>   <div class="loginBtn">     <a href="' + app_login_url + '" target="_blank">Continue to Log in</a>   </div> </div>';
  $(formSelector + " .rfi-form").html(output);
}

function popupTimeInterval(pageClass, inactive_time) {
  var inactiveTime = inactive_time;
  var popupShown = true;
  var timer;
  $(".show-popup").click(function (e) {
    popupShown = false;
  });
  $(".enrollNowBtn").click(function (e) {
    popupShown = false;
  });
  $(".fa-play-circle").click(function (e) {
    popupShown = false;
  });
  $(document).on('click', '.iti__selected-dial-code', function () {
    popupShown = false;
  });
  $("input").on("keyup", function () {
    var inputValue = $(this).val();
    if (inputValue !== "") {
      popupShown = false;
    }
  });
  $(document).on('click', '.iti__selected-flag', function () {
    popupShown = false;
  });

  $('select').on('click change', function () {
    selectval = this.value;
    if (selectval !== "") {
      popupShown = false;
    }
  });
  function showPopup() {
    if (popupShown) {
      setTimeout(function () {
        $('.popupleadForm.overlay-content').css({
          "top": "0",
          "bottom": "0"
        });
        $('body').css({
          "overflow": "hidden"
        });
      }, 100);
      var docHeight = $(document).height();
      var scrollTop = $(window).scrollTop();
      $('.popupleadForm').addClass("onScroll");
      $('.overlay-bg').show().css({
        'height': docHeight
      });
      $('.popupleadForm').addClass("onScroll");
      if (pageClass == "collection-mba" || pageClass == "muj-mahe-lp") {
        $("#popuprfiform h5").html("Get started <span>Enter your details and our experts will get in touch with you shortly!</span>");
        $(".onScroll .submitField .wpcf7-submit").val("ENROLL NOW");
        $(".onScroll .websiteForm h5").css({ "text-align": "left", "padding": "0 6px 24px 6px" });
        $(".onScroll #popuprfiform h5 span").css("display", "block");
        $(".onScroll.overlay-content").css("z-index", "9999");
      }
      $('.overlay-bg').show().css({
        'height': docHeight
      });
      $('.popupleadForm').fadeIn();
      popupShown = false;
    }
  }

  function resetTimer() {
    clearTimeout(timer);
    timer = setTimeout(showPopup, inactiveTime);
  }
  resetTimer(); // Start the timer initially
}
