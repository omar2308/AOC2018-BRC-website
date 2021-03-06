(function($) {
    "use strict"; // Start of use strict

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    });

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function() {
        $('.navbar-toggle:visible').click();
    });

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    })

    // Initialize and Configure Scroll Reveal Animation
    window.sr = ScrollReveal();
    sr.reveal('.sr-icons', {
        duration: 600,
        scale: 0.3,
        distance: '0px'
    }, 200);
    sr.reveal('.sr-button', {
        duration: 1000,
        delay: 200
    });
    sr.reveal('.sr-contact', {
        duration: 600,
        scale: 0.3,
        distance: '0px'
    }, 300);

    // Initialize and Configure Magnific Popup Lightbox Plugin
    $('.popup-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
        }
    });
    // Magnific Popup for typeform for subscribe
    $('#typeform').magnificPopup({
        type: 'iframe',
        iframe: {
            markup: '<div class="mfp-iframe-scaler">'+
                        '<div class="mfp-close"></div>'+
                        '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
                      '</div>', // HTML markup of popup, `mfp-close` will be replaced by the close button
            patterns: {
                typeform: {
                    index: 'typeform.com',
                    src: 'https://aoc1.typeform.com/to/lapUWN'
                }
            }
        }
    });

    // Disable Google Maps scrolling
    // See http://stackoverflow.com/a/25904582/1607849
    // Disable scroll zooming and bind back the click event
    var onMapMouseleaveHandler = function(event) {
        var that = $(this);
        that.on('click', onMapClickHandler);
        that.off('mouseleave', onMapMouseleaveHandler);
        that.find('iframe').css("pointer-events", "none");
    }
    var onMapClickHandler = function(event) {
            var that = $(this);
            // Disable the click handler until the user leaves the map area
            that.off('click', onMapClickHandler);
            // Enable scrolling zoom
            that.find('iframe').css("pointer-events", "auto");
            // Handle the mouse leave event
            that.on('mouseleave', onMapMouseleaveHandler);
        }
        // Enable map zooming with mouse scroll when the user clicks the map
    $('.map').on('click', onMapClickHandler);


    //last 20 twitter Carousel
    var handleTweets = function(tweets) {
        $('#twitter-feed').html("");
        for (var i = 0; i < tweets.length; i++) {
            $('#twitter-feed').append(
                      '<div class="item' + (i===0?' active':'') + '">'
                    + ' <blockquote>'
                    + '  <div class="row">'
                    + '    <div class="col-sm-3 text-center">'
                    + '    <img class="img-circle" src="' +tweets[i].author_data.profile_image+ '" style="width: 100px;height:100px;">'
                    + '    </div>'
                    + '     <div class="col-sm-9">'
                    + '       <p>' + tweets[i].tweet +'</p>'
                    + '       <small>'+ tweets[i].author_data.screen_name+'</small>'
                    + '    </div>'
                    + '  </div>'
                    + ' </blockquote>'
                    + '</div>   ');
        }
    }

    $(document).ready(function() {
        twitterFetcher.fetch({
            "profile": {"screenName": 'AgileOpenCamp'},
            "dataOnly": true,
            "domId": '',
            "maxTweets": 20,
            "enableLinks": true,
            "showUser": true,
            "showTime": true,
            "dateFunction": '',
            "showRetweet": true,
            "customCallback": handleTweets,
            "showInteraction": false
        });
    });

})(jQuery); // End of use strict
