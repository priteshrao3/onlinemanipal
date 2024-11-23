let currentGallery = "";
function getGallerySlider(sliderForName,sliderNavName){
  setTimeout(function () {
    $(sliderForName).slick("setPosition");
    $(sliderNavName).slick("setPosition");
  }, 100);

  setTimeout(function () {
    $(sliderForName).slick("setPosition");
  }, 500);

  $(sliderForName).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
      var currentSlideElem = $(slick.$slides[currentSlide]);
      var iframe = currentSlideElem.find('iframe');
      if (iframe.length) {
          var src = iframe.attr('src');
          var newSrc = src.replace('autoplay=1', 'autoplay=0');
          iframe.attr('src', newSrc);

      }
    });

    $(sliderForName).on('afterChange', function(event, slick, currentSlide, nextSlide) {
      var currentSlideElem = $(slick.$slides[currentSlide]);
      var iframe = currentSlideElem.find('iframe');
      if (iframe.length) {
          var src = iframe.attr('src');
          var newSrc = src.replace('autoplay=0', 'autoplay=1');
          iframe.attr('src', newSrc);
      }
    });
    var currentSlideElem = $(sliderForName+' .slick-current');
    var iframe = currentSlideElem.find('iframe');
    if (iframe.length) {
      var src = iframe.attr('src');
      var newSrc = src.replace('autoplay=0', 'autoplay=1');
      iframe.attr('src', newSrc);
    }
}

jQuery(document).ready(function ($) {
  if ($(".ekam-div").length) {
    $(".ekam-div").slick({
      slidesToShow: 2,
      dots: true,
      arrows: true,
      infinite: false,
      autoplay: false,
      responsive: [
        {
          breakpoint: 1921,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            //variableWidth: true,
          },
        },
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
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
          breakpoint: 640,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            centerMode: false,
            arrows: false,
            variableWidth: false,
            //centerPadding: '95px',
          },
        },
      ],
    });
  }
  if ($(".gallery-div").length) {
    $(".gallery-div").slick({
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
          breakpoint: 640,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            arrows: false,
            variableWidth: false,
          },
        },
      ],
    });
  }
  if ($(".remote-exam-sec").length) {
    $(".remote-exam-sec").slick({
      slidesToShow: 3,
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
          breakpoint: 640,
          settings: {
            slidesToShow: 1.1,
            slidesToScroll: 1,
            dots: true,
            arrows: false,
          },
        },
        {
          breakpoint: 375,
          settings: {
            slidesToShow: 1.1,
            slidesToScroll: 1,
            dots: true,
            arrows: false,
          },
        },
      ],
    });
  }

  if (window.location.href.indexOf("remarketing-v2") > -1) {
    $slidesToShowMob = 1.2;
  } else {
    $slidesToShowMob = 1;
  }
  if ($(".epic-u-slider").length) {
    $(".epic-u-slider").slick({
      slidesToShow: 3,
      dots: true,
      arrows: true,
      infinite: false,
      autoplay: false,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
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
          breakpoint: 640,
          settings: {
            slidesToShow: $slidesToShowMob,
            slidesToScroll: 1,
            dots: true,
            arrows: false,
          },
        },
        {
          breakpoint: 375,
          settings: {
            slidesToShow: $slidesToShowMob,
            slidesToScroll: 1,
            dots: true,
            arrows: false,
          },
        },
      ],
    });
  }
  if ($(".epic-u-slider-new").length) {
    $(".epic-u-slider-new").slick({
      slidesToShow: 1,
      dots: false,
      arrows: false,
      infinite: false,
      autoplay: false,
    });
  }

  if ($(".wrapper").length) {
    var noofcardItems = 3;
  } else {
    var noofcardItems = 3;
  }
  if ($(".learning-methodology-card-slider").length) {
    $(".learning-methodology-card-slider").slick({
      slidesToShow: noofcardItems,
      dots: true,
      arrows: true,
      infinite: false,
      speed: 300,
      //slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: false,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            arrows: false,
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            arrows: false,

            slidesToShow: 1.1,
            slidesToScroll: 1,
          },
        },
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ],
    });
  }
  if (typeof $.fn.magnificPopup !== "undefined") {
    $(".gallery-image").magnificPopup({
      delegate: "a",
      gallery: {
        enabled: true,
      },
      type: "image", // this is a default type
      callbacks: {
        elementParse: function (item) {
          $("header").css({ "z-index": "0" });
          // Function will fire for each target element
          // "item.el" is a target DOM element (if present)
          // "item.src" is a source that you may modify
          if (item.el[0].className == "video-link") {
            (item.type = "iframe"),
              (item.iframe = {
                patterns: {
                  youtube: {
                    index: "youtube.com/", // String that detects type of video (in this case YouTube). Simply via url.indexOf(index).

                    id: "v=", // String that splits URL in a two parts, second part should be %id%
                    // Or null - full URL will be returned
                    // Or a function that should return %id%, for example:
                    // id: function(url) { return 'parsed id'; }

                    src: "www.youtube.com/embed/%id%", // URL that will be set as a source for iframe.
                  },
                  vimeo: {
                    index: "vimeo.com/",
                    id: "/",
                    src: "//player.vimeo.com/video/%id%?autoplay=1",
                  },
                  gmaps: {
                    index: "//maps.google.",
                    src: "%id%&output=embed",
                  },
                },
              });
          } else {
            item.type = "image";
          }
        },
        close: function () {
          $("header").css({ "z-index": "1201" });
        },
      },
    });
  }
  $(".ekam-section .ekam-container .testi-read").click(function () {
    setTimeout(() => {
      $(this)
        .parents(".course-wrap")
        .siblings(".testimonial-desc")
        .toggleClass("show");
    }, 200);
  });
  $(".downloadNewsBtn").click(function () {
    $(
      "#downloadform .rfi-form input[name=leadsquared-mx_course_applying_for]"
    ).val("MBA");
  });

  // campus event section
  $("#convocation").click(function () {
    $(".campus-events-wrapper .tab-wrapper").removeClass("ekamTheme");
    $(".campus-events-wrapper .tab-wrapper").removeClass("panoramaTheme");
  });
  $("#ekam").click(function () {
    $(".campus-events-wrapper .tab-wrapper").addClass("ekamTheme");
    $(".campus-events-wrapper .tab-wrapper").removeClass("panoramaTheme");
  });
  $("#panoroma").click(function () {
    $(".campus-events-wrapper .tab-wrapper").removeClass("ekamTheme");
    $(".campus-events-wrapper .tab-wrapper").addClass("panoramaTheme");
  });

  // popup gallery slider

  $(".gallery-slider-for").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: ".gallery-slider-nav",
  });
  $(".gallery-slider-nav").slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    asNavFor: ".gallery-slider-for",
    dots: false,
    centerMode: false,
    focusOnSelect: true,
    vertical: true,
    infinite: true,
    prevArrow: ".gallery-prev-nav",
    nextArrow: ".gallery-next-nav",
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 1,
          vertical: false,
        },
      },
    ],
  });

  $(".convocation-slider-for").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: ".convocation-slider-nav",
  });
  $(".convocation-slider-nav").slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    asNavFor: ".convocation-slider-for",
    dots: false,
    centerMode: false,
    focusOnSelect: true,
    vertical: true,
    infinite: true,
    prevArrow: ".convocation-prev-nav",
    nextArrow: ".convocation-next-nav",
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 1,
          vertical: false,
        },
      },
    ],
  });

  $(".ekam-slider-for").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: ".ekam-slider-nav",
  });
  $(".ekam-slider-nav").slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    asNavFor: ".ekam-slider-for",
    dots: false,
    centerMode: false,
    focusOnSelect: true,
    vertical: true,
    infinite: true,
    prevArrow: ".ekam-prev-nav",
    nextArrow: ".ekam-next-nav",
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 1,
          vertical: false,
        },
      },
    ],
  });

  $(".view-gallery").click(function () {
    let galleryForName = $(this).attr("data-for");
    let gallerynavName = $(this).attr("data-nav");
    currentGallery = galleryForName;
    getGallerySlider(galleryForName,gallerynavName);
    $(".overlay-bg").addClass("changed-bg");
  });
  $(".galleryPopup .close-icon").click(function () {
    $(".overlay-bg").removeClass("changed-bg");
      var currentSlideElem = $(currentGallery+' .slick-current');
      var iframe = currentSlideElem.find('iframe');
      if (iframe.length) {
          var src = iframe.attr('src');
          var newSrc = src.replace('autoplay=1', 'autoplay=0');
          iframe.attr('src', newSrc);

      }
  });

  // student spotlight slider
  $(".student-spotlight-for-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    infinite: false,
    dots: true,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          arrows: false,
        },
      },
    ],
  });
  $(".video-testi").parents(".ekam-container").addClass("video-testi-card");
});
/**************************************************/
if ($(".om-plus-testimonials").length) {
  $(".om-plus-testimonials").slick({
    infinite: true,
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    speed: 3000,
    cssEase: "linear",
    arrows: false,
    pauseOnHover: false,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1921,
        settings: {
          slidesToShow: 8,
          slidesToScroll: 1,
          //variableWidth: true,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 8,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 8,
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: false,
          centerMode: false,
          arrows: false,
          variableWidth: true,
          //centerPadding: '95px',
        },
      },
    ],
  });
}

if ($(".om-campus-slider").length) {
  $(".om-campus-slider").slick({
    slidesToShow: 3,
    dots: true,
    arrows: false,
    infinite: false,
    autoplay: false,
    responsive: [
      {
        breakpoint: 1921,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          //variableWidth: true,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1.1,
          slidesToScroll: 1,
          dots: false,
          centerMode: false,
          arrows: false,
          variableWidth: false,
          //centerPadding: '95px',
        },
      },
    ],
  });
}

if ($(".indistry-talk-slider").length) {
  $(".indistry-talk-slider").slick({
    slidesToShow: 4,
    dots: true,
    arrows: false,
    infinite: false,
    autoplay: false,
    //variableWidth: true,
    responsive: [
      {
        breakpoint: 1921,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          //variableWidth: true,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1.1,
          slidesToScroll: 1,
          dots: true,
          centerMode: false,
          arrows: false,
          variableWidth: false,
          //centerPadding: '95px',
        },
      },
    ],
  });
}

$(".campus-div").on("click", function () {
  var targetSection = $($(this).data("target"));
  $("html, body").animate(
    {
      scrollTop: targetSection.offset().top - 200,
    },
    800
  ); // 800 milliseconds for smooth scrolling
});

jQuery(document).ready(function ($) {
  $(".tool-certification-sect .tab-link").click(function () {
    var tabID = $(this).attr("data-tab");

    $(this).addClass("active").siblings().removeClass("active");

    $(".tool-certification-sect #tab-" + tabID)
      .addClass("active")
      .siblings()
      .removeClass("active");
  });
});
