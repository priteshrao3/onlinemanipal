jQuery(document).ready(function ($) {
  if ($(".omadvantage-cards").length) {
    $(window).one("scroll resize", function () {

      if ($(".global-impact-sect .home-statistics-slider").length) {
        $(".global-impact-sect .home-statistics-slider").not('.slick-initialized').slick({
          slidesToShow: 3,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 0,
          speed: 12000,
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
                slidesToShow: 2,
                slidesToScroll: 1,
                dots: false,
              }
            },
            {
              breakpoint: 640,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                dots: false,
                arrows: false,
                variableWidth: false,
              }
            }
          ]
        });
      }

      $(".omadvantage-cards").not('.slick-initialized').slick({
        dots: true,
        infinite: false,
        arrows: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        responsive: [
          {
            breakpoint: 1025,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: false,
              dots: true,
              arrows: true
            }
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: false,
              dots: true,
              arrows: true
            }
          },
          {
            breakpoint: 769,
            settings: {
              slidesToShow: 1,
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
              centerMode: false,
              adaptiveHeight: true
            }
          }
        ]
      });
    });
  }
  if ($(window).width() < 768) {
    var observer = new MutationObserver(function (mutationsList) {
      mutationsList.forEach(function (mutation) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'aria-hidden') {
          // Check if the added attribute is aria-hidden="true"
          if ($(mutation.target).attr('aria-hidden') === 'true') {
            // Remove the aria-hidden attribute
            $(mutation.target).removeAttr('aria-hidden');
          }
        }
      });
    });
    $('.global-impact-sect-home .line-item.slick-slide').each(function () {
      observer.observe(this, { attributes: true });
    });
  }

  // Load mobile menu after 3 seconds
  if ($(window).width() < 480) {
    setTimeout(function () {
      jQuery.ajax({
        type: 'POST',
        url: '/wp-admin/admin-ajax.php',
        dataType: 'json',
        data: {
          action: 'fetchMobileMenu',
        },
        success: function (res) {
          if (res) {
            $(".mobileHeader").html(res.menuDetails);
            $(".header-mobile-menu.accordionmenu-course").click();
            var websitePath = window.location.href.split('?')[0];
            if (websitePath.indexOf("international") > -1 || websitePath.indexOf("/ae") > -1 || websitePath.indexOf("/us-ca") > -1
            || websitePath.indexOf("/np") > -1 || websitePath.indexOf("/saarc-ewc") > -1 || websitePath.indexOf("/global") > -1 ||
            websitePath.indexOf("/sl") > -1 || websitePath.indexOf("/af") > -1 || websitePath.indexOf("/zambia") > -1) {
              $('.header-course-card-container a[href="/pgcp-in-entrepreneurship-and-innovation"]').hide();
            }
          }
        },
        error: function (err) {
          console.log(err);
        }
      });
    }, 3000);
  }

});