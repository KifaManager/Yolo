// Body Overflow
// ------------------------ //
const overflow = {
    Add: () => {
        $('body').addClass('overflow');
    },
    Remove: () => {
        $('body').removeClass('overflow');
    },
    Default: () => {
        $('body').addClass('default');
    }
};

// Header
// ------------------------ //
const header = {
    Scroll: () => {
        $('.header').addClass('scroll');
    },
    Default: () => {
        $('.header').removeClass('scroll');
    },
    Show: () => {
        $('.header').addClass('animate');
    },
    Open: () => {
        $('.header').addClass('open');
        setTimeout(function () {
            $('.fade-up-header').each((index, element) => {
                setTimeout(() => element.classList.add('animate'), 50 * index)
            });
        }, 100)
    },
    Close: () => {
        setTimeout(function () {
            $('.header').removeClass('open');
        }, 300)

        $('.fade-up-header').each((index, element) => {
            setTimeout(() => element.classList.remove('animate'), 0 * index)
        });

    }
}

// Slider Portfolio
// ------------------------ //
function initPortfolioSlider(){

    // Init Slider Elements
    // ------------------------ //
    let $slider = $('.portfolio-slider'),
        $sliderNav = $('#portfolio-navs'),
        widthWindow = $(window).width(),
        widthSlider = $slider.width();


    setTimeout(function () {
        if(widthSlider >= widthWindow){
            if(!$slider.hasClass('slick-initialized')){
                $slider.slick({
                    centerMode: true,
                    centerPadding: '0px',
                    variableWidth: true,
                    touchThreshold: 20,
                    prevArrow: $('#portfolio-prev'),
                    nextArrow: $('#portfolio-next'),
                });
                $sliderNav.addClass('open');
            }
            if($(window).width() > 1450){
                $slider.slick('slickSetOption', {
                    slidesToShow: 7,
                }, true);
            }
        } else{
            $slider.filter('.slick-initialized').slick('unslick');
            $sliderNav.removeClass('open');
        }
    }, 100);

}
// ------------------------ //

// Slider Team
// ------------------------ //
function initTeamSlider() {

    let $slider = $('.team-slider'),
        $slide = $('.team-slide'),
        $sliderNav = $('.team-nav'),
        $sliderArrows = $('#team-arrows');

    if($slide.length > 1){
        $slider.slick({
            slidesToShow: 1,
            fade: true,
            prevArrow: $('#team-prev'),
            nextArrow: $('#team-next'),
            asNavFor: $sliderNav,
            touchThreshold: 20,
        }).on('beforeChange', function(event, slick, currentSlide){
            $(this).find(".team-slide.slick-active").addClass("hide");
            loadImagesOnScroll($(window).scrollTop() + $(window).width())
        }).on('afterChange', function(event, slick, currentSlide){
            currentSlide++;
            let current = "0".substring(currentSlide >= 10) + currentSlide;
            $slider.find('.actions .current').html(current);
            setTimeout(function(){
                $(".team-slide").removeClass("hide")
            }, 300)
            loadImagesOnScroll($(window).scrollTop() + $(window).width())
        });
        $sliderNav.slick({
            asNavFor: $slider,
            vertical: true,
            focusOnSelect: true,
            arrows: false,
            centerMode: true,
            centerPadding: '35%',
            touchThreshold: 20,
            speed: 700
        }).on('beforeChange', function(event, slick, currentSlide){
            $this = $(this)
            $this.addClass('hide');
            setTimeout(function () {
                $this.removeClass('hide');
            }, 300);
        })
        $sliderArrows.addClass('open');

        // All Count Slider
        $slide.each(function (b) {
            b += 1;
            var numGallery = b;
            if (numGallery < 10) {
                numGallery = '0' + numGallery
            }
            $(this).closest('.team-slider').find('.actions .all').html(numGallery);
        });
    }

}
// ------------------------ //

// Slider Team Section
// ------------------------ //
function initTeamSectionSlider() {

    let $slider = $('#team-section-slider'),
        $slide = $('.team-section-slide');

    if($slide.length == 3){
        $slider.slick({
            slidesToShow: 2,
            arrows: false,
            touchThreshold: 20,
            autoplay: true,
            autoplaySpeed: 2000,
        });
    } else if($slide.length > 3){
        $slider.slick({
            slidesToShow: 3,
            arrows: false,
            touchThreshold: 20,
            autoplay: false,
            autoplaySpeed: 2000,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                    }
                }
            ]
        });
        $slider.addClass('increase-width')
    }

}
// ------------------------ //

// Slider History
// ------------------------ //
function initHistorySlider(){
    let $slider = $('#history-slider'),
        $slide = $('.history-slide'),
        $sliderNav = $('#history-nav');

    if($slide.length > 1){
        $slider.slick({
            slidesToShow: 1,
            fade: true,
            infinite: false,
            prevArrow: $('#history-prev'),
            nextArrow: $('#history-next'),
            asNavFor: $sliderNav,
            touchThreshold: 20,
        });

        $sliderNav.slick({
            asNavFor: $slider,
            focusOnSelect: true,
            arrows: false,
            slidesToShow: 5,
            slidesToScroll: 1,
            touchThreshold: 20,
            infinite: false,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 3,
                    }
                }
            ]
        }).on('afterChange', function(event, slick, currentSlide, nextSlide){
            if($('#history-nav .slick-slide[data-slick-index="6"]').hasClass('slick-active') ){
                $sliderNav.addClass('remove-mask')
            }else{
                $sliderNav.removeClass('remove-mask')
            }
        });
    }
}
// ------------------------ //

// Contact Info Offset
// ------------------------ //
function contactOffsetInfo(){
    let widthWindow = $(window).width(),
        widthContainer = $('.container').innerWidth(),
        offsetLeft =  (widthWindow - widthContainer) / 2;
    $('.contact-info').css({'left': offsetLeft + 'px'})
}
// ------------------------ //

// Show elements on scroll
//-----------------------------//
function showElementsOnScroll(e) {
    $(".fade-up,.fade-scale,.title-mask").each(function() {
        var a = $(this);
        a.offset().top <= e + $(window).height() / 1.05 && a.addClass("animate")
    })
}
//-----------------------------//

// Show elements queue on scroll
//-----------------------------//
function showElementsQueueOnScroll(t) {
    var Time = 0;
    $(".fade-up-queue").each(function() {
        var elementAnimate = $(this);
        if(elementAnimate.offset().top <= t + $(window).height() / 1.2 && !elementAnimate.hasClass('animate')) {
            Time += 150;
            setTimeout(function () {
                elementAnimate.addClass("animate");
            }, Time);
        }
    })
}
//-----------------------------//

// Show elements on scroll
//-----------------------------//
function playVideoOnScroll(e) {
    $('.partners').each(function(){
        var video = $(this).find('video');
        if(!$(this).hasClass('video-open')){
            video.offset().top <= e + $(window).height() / 1.01 && video[0].play();
        }
    });
}
//-----------------------------//

// Animation Folder
//-----------------------------//
function showFolder(){
    header.Show();
    setTimeout(function () {
        $('.folder-fade-up').each(function(index, element) {
            let $this = $(this);
            setTimeout(function() {
                if($this.find('.caption-animation').length > 0){
                    showFolderCaption();
                }
                element.classList.add('animate')
            }, 300 * index);
        });
    }, 100);
    setTimeout(function () {
        $('.folder-decor').addClass('animate')
    }, 700);
}
//-----------------------------//

// Show Folder Caption
//-----------------------------//
function showFolderCaption (){
    $('.caption-animation').addClass('animate')
}

// Loading images on scroll
//-----------------------------//
const loadImagesOnScroll = (scrollValue) => {
    $('[data-src]').each(function () {
        let elem = $(this);
        if (elem.offset().top <= (scrollValue + $(window).height())) {
            elem.attr('src', $(this).attr('data-src')).removeAttr('data-src');
        }
    });
    $('[data-srcset]').each(function () {
        let elem = $(this);
        if (elem.offset().top <= (scrollValue + $(window).height())) {
            elem.attr('srcset', $(this).attr('data-srcset')).removeAttr('data-srcset');
        }
    });
};
//-----------------------------//



// Window on load
// ------------------------ //
$(window).on('load', function () {

    // Visible Main
    // ------------------------ //
    $('#wrapper').addClass('visible');
    // ------------------------ //

    // Show Folder
    // ------------------------ //
    showFolder();
    // ------------------------ //

    // Sliders
    // ------------------------ //
    initPortfolioSlider();
    initTeamSlider();
    initHistorySlider();
    initTeamSectionSlider();
    // ------------------------ //

    // Contact Block Offset
    // ------------------------ //
    contactOffsetInfo();
    // ------------------------ //

    // Show elements on scroll
    //-----------------------------//
    showElementsOnScroll($(window).scrollTop());
    showElementsQueueOnScroll($(window).scrollTop());
    // showElementsScaleOnScroll($(window).scrollTop());
    // showElementsTitleScaleOnScroll($(window).scrollTop());
    //-----------------------------//




});
// ------------------------ //








// Window on scroll
// ------------------------ //
$(window).scroll(function (e) {
    var scrollTopValue = $(this).scrollTop();

    scrollTopValue > showElementsOnScroll(scrollTopValue);
    scrollTopValue > showElementsQueueOnScroll(scrollTopValue);
    scrollTopValue > playVideoOnScroll(scrollTopValue)

    loadImagesOnScroll(scrollTopValue);




});
// ------------------------ //



$(document).ready(function(){





    // Window on resize
    // ------------------------ //
    $(window).resize(() => {
        $(window).afterResize( function() {

            $('.portfolio-slider').filter('.slick-initialized').slick('unslick');

            setTimeout(function () {
                initPortfolioSlider();
                contactOffsetInfo();
            }, 100);

        }, true, 100 );
    });
    // ------------------------ //

	// Select
    // ------------------------ //
	$('select.selectize').selectize()
    // ------------------------ //

    // Header mobile menu
    // ------------------------ //
    $('.header-burger').on('click', function () {
        $(this).toggleClass('active');
        if($(this).hasClass('active')){
            header.Open();
            overflow.Add();
        }else{
            header.Close();
            overflow.Remove();
        }
    });
    // ------------------------ //

    // Folder button scroll
    // ------------------------ //
    $('.btn-scroll').on('click', function () {
        let scrollTo = $($(this).attr('data-href'));
        $("html, body").animate({ scrollTop: scrollTo.offset().top }, 500);
        setTimeout(function(){
            $('.partners-wrap').addClass('non-scroll');
        }, 600);
    });
    // ------------------------ //

    // Work circle
    // ------------------------ //
    $(".work-list .circle")
        .mouseenter(function() {
            let $this = $(this);
            setTimeout(function () {
                $this.addClass('background');
            }, 300);
            setTimeout(function () {
                $this.addClass('active');
            }, 400)
        })
        .mouseleave(function() {
            let $this = $(this);
            $this.removeClass('active');
            setTimeout(function () {
                $this.removeClass('background');
            }, 300);
            setTimeout(function () {
                $this.removeClass('active');
            }, 400)
        });
    $('.work-list .circle .btn').on('click', function () {
        $('.work-list .circle').removeClass('active');
    });
    // ------------------------ //

    // Scroll Portfolio Slider
    // ------------------------ //
    $('.portfolio-slider').on('wheel', (function(e) {
        if($(this).hasClass('slick-initialized')){
            e.preventDefault();
            e.originalEvent.deltaY < 0 ? $(this).slick('slickNext') : $(this).slick('slickPrev');
        }
    }));
    // ------------------------ //


    // Partner Video
    // ------------------------ //



    // Window on scroll
    // ------------------------ //


    // $(window).scroll(function (e) {
    //
    //     var scrollTopValue = $(this).scrollTop(),
    //         partnersWrap = $('.partners-wrap'),
    //         partnersHeight = partnersWrap.height(),
    //         partnersOffset = partnersWrap.position().top;
    //
    //
    //     if (scrollTopValue <= partnersOffset || scrollTopValue >= partnersOffset + (partnersHeight / 5)) {
    //
    //         partnersWrap.removeClass('non-scroll');
    //
    //         return false;
    //
    //     } else {
    //
    //         // Last Slide
    //         partnersWrap.addClass('non-scroll');
    //
    //         $('.partners-wrap').on('wheel', (function (e) {
    //
    //             if(partnersWrap.hasClass('non-scroll')) {
    //                 e.preventDefault();
    //                 if (e.originalEvent.deltaY > 0) {
    //                     $(this).slick('slickNext');
    //                     var partnersSlideCount = $('.partners').length - 1;
    //                     partnersWrap.on('afterChange', function (event, slick, currentSlide, nextSlide) {
    //                         if (partnersWrap.find(`.partners[data-slick-index=${partnersSlideCount}]`).hasClass('slick-active')) {
    //                             partnersWrap.removeClass('non-scroll');
    //                             // setTimeout(function () {
    //                             //     partnersWrap.removeClass('non-scroll');
    //                             // }, 500)
    //                         }
    //                     });
    //                 } else {
    //                     $(this).slick('slickPrev');
    //                     if(partnersWrap.find(`.partners[data-slick-index=0]`).hasClass('slick-active') ){
    //                         partnersWrap.removeClass('non-scroll');
    //                         // setTimeout(function () {
    //                         //     partnersWrap.removeClass('non-scroll');
    //                         // }, 500)
    //                     }
    //                 }
    //
    //                 $('.partners').find('video').each(function () {
    //                     $(this)[0].muted = true;
    //                 });
    //                 $('.partners').removeClass('video-open');
    //                 $('.partners').find('.video-sound').removeClass('active');
    //             }
    //
    //         }));
    //     }
    // });










    // Partner Video
    // ------------------------ //

        $('.partners').each(function(index){

            // Init Element
            // ---------------- //
            const video = $(this).find('video')[0],
                  partners = $(this).attr({'id':`partners-${index + 1}`});

            // Turn On Sound
            // ---------------- //
            partners.find('.video-sound').on('click', function () {
                video.play();
                video.muted = !video.muted;
                $(this).toggleClass('active');
            });

            // Video Play
            // ---------------- //
            partners.find('.video-play').on('click', function () {
                video.play();
                video.muted = false;
                partners.addClass('video-open');
                overflow.Add();
                setTimeout( () => { $("html, body").animate({ scrollTop: partners.find('.partners-photo').offset().top}, 700), 500})
            });

            // Video Close
            // ---------------- //
            partners.find('.video-close').on('click', function () {
                video.muted = true;
                partners.removeClass('video-open');
                overflow.Remove();
                partners.find('.video-sound').removeClass('active');
            });

            // Video Pause
            // ---------------- //
            partners.find('video').on('click', function () {
                if(partners.hasClass('video-open')){
                    video.paused ? video.play() : video.pause()
                }
            });

            // Video Ended
            // ---------------- //
            video.addEventListener('ended', (event) => {
                video.play();
                video.muted = true;
                partners.removeClass('video-open');
                partners.find('.video-sound').removeClass('active');
                overflow.Remove();
            });

            // Remove Video Poster
            // ---------------- //
            if($(window).width() > 991){
                $(this).find('video').attr({'poster':''})
            }

        });
    // ------------------------ //


    // Portfolio filtration
    // ------------------------ //
    // $('.nav-btn').on('click', function () {
    //
    //     let currentCategory = $(this).attr('data-category');
    //
    //     // Active class on Nav
    //     // ----------------------- //
    //     $('.nav-btn').removeClass('active');
    //     $(this).addClass('active');
    //
    //     if(!currentCategory.length){
    //         $('.portfolio-slide').removeClass('hide');
    //         initPortfolioSlider();
    //         return
    //     }
    //
    //     // Filtration
    //     // ------------------------ //
    //     $('.portfolio-slide').each(function () {
    //         let attrCategories = $(this).attr('data-category'),
    //             attrCategoriesMod = attrCategories.split(','),
    //             portfolioSlide = $(this);
    //         if(attrCategoriesMod.includes(currentCategory)){
    //             portfolioSlide.removeClass('hide');
    //         } else {
    //             portfolioSlide.addClass('hide');
    //         }
    //     });
    //
    //     // Reinit Slider
    //     // ------------------------ //
    //     initPortfolioSlider();
    // });
    // ------------------------ //

});


// Contact Map
// ------------------------ //
if($('#map').length){

    var defaultLocation = {
        lat: 37.788929,
        lng: -122.400302,
    }

    $('.contact-item').on('click', function () {
        $('.contact-item').removeClass('open');
        $(this).toggleClass('open');
        let lat = parseFloat($(this).attr('data-lat')),
            lng = parseFloat($(this).attr('data-lng'));
        defaultLocation = {
            lat: lat,
            lng: lng
        }
        initMap()
    });

    var locations = [
        {
            city: 'San Francisco',
            lat: 37.788929,
            lng: -122.400302,
        },
        {
            city: 'London',
            lat: 51.509705,
            lng: -0.126369,
        },
        {
            city: 'Kiyv',
            lat: 50.450453,
            lng: 30.530084,
        },
    ]


    function initMap() {

        var map = new google.maps.Map( document.getElementById('map'), {
            zoom: 15,
            center: defaultLocation,
            disableDefaultUI: true,
            styles: [
                {
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#f5f5f5"
                        }
                    ]
                },
                {
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#616161"
                        }
                    ]
                },
                {
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "color": "#f5f5f5"
                        }
                    ]
                },
                {
                    "featureType": "administrative.land_parcel",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#bdbdbd"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#eeeeee"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#757575"
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#e5e5e5"
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#9e9e9e"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#757575"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#dadada"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#616161"
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#9e9e9e"
                        }
                    ]
                },
                {
                    "featureType": "transit.line",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#e5e5e5"
                        }
                    ]
                },
                {
                    "featureType": "transit.station",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#eeeeee"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#c9c9c9"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#9e9e9e"
                        }
                    ]
                }
            ]
        });

        locations.forEach(function(location){
            var marker = new google.maps.Marker({
                position: {
                    lat: location.lat,
                    lng: location.lng,
                },
                map: map,
                icon: 'images/icons/ic-marker.png'
            });
        })

    }

    $("body").append('<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDZFgWU3gIM0PmGfVbyWerT89A8ttSV_i8&amp;callback=initMap"></script>');
}
