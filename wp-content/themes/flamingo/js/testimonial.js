jQuery(document).ready(function ($) {
  // Toggle class for testimonial box
  $(".testi-read").click(function () {
    if ($(this).text() === "Read More") {
      $(".testi-wrap.active .testi-read").text(function (i, text) {
        return text === "Read More" ? "Close" : "Read More";
      })
      $('.testi-wrap.active .content-wrap').css("transform", "revert-layer");
      $('.testi-wrap.active').toggleClass('active');
    }
    $(this).parents('.testi-wrap').toggleClass('active');
    var imgHeight = ($(this).text() === "Read More") ? $(this).parents('.testi-wrap').find('.img-wrap img').height() : 0;
    $(this).parents('.content-wrap').css("transform", "translateY(-" + imgHeight + "px)");
    $(this).text(function (i, text) {
      return text === "Read More" ? "Close" : "Read More";
    })
  });

  $(window).one("scroll resize", function () {
    if ($(".testimonial-section").length) {
      if (window.location.href.indexOf("international/mahe-online-degree-courses-v3") > -1 || window.location.href.indexOf("mahe-online-degree-courses-v2") > -1 || window.location.href.indexOf("online-mba-degrees-v2") > -1 ||  window.location.href.indexOf("muj-online-degree-courses-v2") > -1 ||  window.location.href.indexOf("online-mca-degrees-v2") > -1 || window.location.href.endsWith("online-mba") === true || window.location.href.endsWith("online-ma-economics") === true) {
        slide = 4;
      } else {
        slide = 3;
      }
      $(".testimonial-section").not('.slick-initialized').slick({
        slidesToShow: slide,
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
          breakpoint: 1025,
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
          breakpoint: 640,
          settings: {
            slidesToShow: 1.2,
            slidesToScroll: 1,
            arrows: false,
            dots: true,
          }
        }
        ]
      });
    }
  });
  get_testimonial_card_height();
  get_ekam_testimonial_card_height();
});

$('.student-engagement .testimonial-section').on('init', function (event, slick) {
  get_testimonial_card_height();
});

$('.ekam-section.mobile').on('init', function (event, slick) {
  get_ekam_testimonial_card_height();
});

$('.testimonial-section').on('init', function (event, slick) {
  get_testimonial_card_height();
});

$(window).on('resize', function () {
  get_testimonial_card_height();
});

function get_testimonial_card_height() {
  $(".testimonial-section .slick-track > li > .testi-wrap").each(function () {
    child_height = $(this).height();
    $(".testimonial-section .slick-track > li .testi-wrap").height(child_height);
  });
}
function get_ekam_testimonial_card_height() {
  $(".ekam-section.mobile .slick-track > .ekam-container > .testi-wrap").each(function () {
    child_height = $(this).height();
    $(".ekam-section.mobile .slick-track > .ekam-container > .testi-wrap").height(child_height);
  });
}

