(function($) {

  $.fn.extend({

    alphascroll: function() {

      return this.each(function() {

        var content       = $(this),
            alphabet      = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
            shortAlphabet = ['a','d','g','j','m','p','s','w','z'],
            dividers      = [],
            dividerClass,
            scrollbar     = '';

        // attach classes to list autodividers
        $(content).find('.ui-li-divider').each( function() {
          dividerClass = $(this).html().toLowerCase();
          dividers.push(dividerClass);
          $(this).addClass(dividerClass);
        });

        // create and display the scrollbar
        function createScrollbar() {
          // generate scrollbar HTML
          $(alphabet).each(function(index, value) {
            // attach the alphascroll-item class to each letter if there is a corresponding divider (acts as a link)
            if ($.inArray(value, dividers) > -1) {
              scrollbar += '<li id="alphascroll-' + value + '" class="alphascroll-item" unselectable="on">' + value.toUpperCase() + '</li>';
            } else {
              scrollbar += '<li id="alphascroll-' + value + '" unselectable="on">' + value.toUpperCase() + '</li>';
            }
          });

          // attach scrollbar to page
          $(content).wrap('<div />');
          var wrapper = $(content).parent();
          $(wrapper).prepend('<ul class="alphascroll">' + scrollbar + '</ul>');
          var alphascroll = $(content).closest('div').children('.alphascroll');

          // bind touch event to scrollbar (for touch devices)
          $(alphascroll).bind('touchmove', function(e) {
            e.preventDefault();
            var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
            // scroll to divider position
            alphaScroll(touch.pageY);
          });

          // bind mouse events to scrollbar (for desktop browsers)
          $(alphascroll).bind('mousedown', function() {
            $('.ui-page-active' ).bind('mousemove', function(e) {
              // prevent text selection while scrolling
              $(this).css({
                "-webkit-user-select" : "none",
                "-moz-user-select"    : "none",
                "-ms-user-select"     : "none",
                "user-select"         : "none"
              });
              // scroll to divider position
              alphaScroll(e.pageY);
            });

            // return page to normal functioning after mouseup
            $('.ui-page-active').bind('mouseup', function() {
              // release mousemove event control
              $('.ui-page-active').unbind('mousemove');
              // return text selection to default
              $(this).css({
                "-webkit-user-select" : "text",
                "-moz-user-select"    : "text",
                "-ms-user-select"     : "text",
                "user-select"         : "text"
              });
            });
          });

          // use short scrollbar if screen is short (like landscape on an iPhone)
          if ($(window).height() <= 320) {
            truncateScrollbar();
          }
        }

        // handle orientation changes
        $(window).bind('orientationchange', function() {
          if ($('.alphascroll').length > 0 ) {
            $('.alphascroll').unwrap().remove();
            scrollbar = '';
            createScrollbar();
          }
        });

        function truncateScrollbar() {
          $('.alphascroll li').each(function(index, value) {
            if ($.inArray($(this).html().toLowerCase(), shortAlphabet) < 0) {
              $(this).html('&#183;').addClass('truncated');
            }
          });
        }

        // do the scroll
        function alphaScroll(y) {
          $('.alphascroll-item').each( function() {
            if (!(y <= $(this).offset().top || y >= $(this).offset().top + $(this).outerHeight())) {
              var scroll_id = $(this).attr('id'),
                  letter    = scroll_id.split('-'),
                  target    = $('.' + letter[1]),
                  position  = target.position(),
                  header_height;

              // offset scroll-top if header is displayed
              if ($('.ui-page-active [data-role="header"]').hasClass('ui-fixed-hidden')) {
                header_height = 0;
              } else {
                header_height = $('.ui-page-active [data-role="header"]').height();
              }

              // scroll the page
              $.mobile.silentScroll(position.top - header_height);
            }
          });
        }

        // generate scrollbar on invokation
        createScrollbar();
      });
    }
  });

})(jQuery);
