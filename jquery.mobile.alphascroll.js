(function($) {

  $.fn.extend({

    alphascroll: function() {

      return this.each(function() {

        var content         = $(this),
            alphabet        = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
            shortAlphabet   = ['a','c','e','g','i','k','m','o','q','s','u','w','y'],
            dividers        = [],
            dividerClass,
            scrollbar       = '';

        // attach classes to list autodividers
        $(content).find('li[data-role="list-divider"]').each( function() {
          dividerClass = $(this).html().toLowerCase();
          dividers.push(dividerClass.trim());
          $(this).addClass(dividerClass);
        });

        // create and display the scrollbar
        function createScrollbar() {
          // generate scrollbar HTML
          $(alphabet).each(function(index, value) {
            // attach the alphascroll-item class to each letter if there is a corresponding divider (acts as a link)
            if ($.inArray(value, dividers) > -1) {
              scrollbar += '<li data-letter="' + value + '" class="alphascroll-item" unselectable="on">' + value.toUpperCase() + '</li>';
            } else {
              scrollbar += '<li data-letter="' + value + '" unselectable="on">' + value.toUpperCase() + '</li>';
            }
          });

          var $wrapper = $('body');
          $wrapper.append('<ul id="alphascroll">' + scrollbar + '</ul>');
          var alphascroll = $wrapper.children('#alphascroll');

          // bind touch event to scrollbar (for touch devices)
          $(alphascroll).bind('touchmove', function(e) {
            e.preventDefault();
            if (e.originalEvent) {
              var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
              // scroll to divider position
              alphaScroll(touch.pageY);
            }
          });

          // clicking on existing content navigation link
          $(alphascroll).on('click', 'li.alphascroll-item', function() {
            var letter    = $(this).data('letter'),
                target    = $('li.' + letter),
                offset    = target.offset();

            $('body').scrollTo(offset.top);
          });

          // clicking on non-existing content navigation link should lead to previous letter's last item
          $(alphascroll).on('click', 'li:not(.alphascroll-item)', function() {
            var previous    = $(this).prevAll('.alphascroll-item').first();

            if (previous.length) {
              var letter    = previous.data('letter'),
                  target    = $('li[data-first-letter=' + letter + ']').last(),
                  y         = target.offset().top;
            } else {
              var y         = 0;
            }

            $('body').scrollTo(y);
          });

          // bind mouse events to scrollbar (for desktop browsers)
          $(alphascroll).bind('mousedown', function() {
            $('body').bind('mousemove', function(e) {
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
            $('body').bind('mouseup', function() {
              // release mousemove event control
              $('body').unbind('mousemove');
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
          if ($(window).height() <= 326) {
            truncateScrollbar();
          }
        }

        // handle orientation changes
        $(window).bind('orientationchange', function() {
          changeOrientation();
        });

        function changeOrientation() {
          if (($('#alphascroll').length > 0 ) && $('.alphascroll').is(':visible')) {
            $('#alphascroll').unwrap().remove();
            scrollbar = '';
            createScrollbar();
          }
        }

        function truncateScrollbar() {
          $('#alphascroll > li').each(function(index, value) {
            if ($.inArray($(this).html().toLowerCase(), shortAlphabet) < 0) {
              $(this).html('&#183;').addClass('truncated');
            }
          });
        }

        // do the scroll
        function alphaScroll(y) {
          $('#alphascroll li').each( function() {
            if (!(y <= $(this).offset().top || y >= $(this).offset().top + $(this).outerHeight())) {
              var letter    = $(this).data('letter'),
                  target    = $('.' + letter),
                  offset    = target.offset(),
                  header_height;

              if ($.inArray(letter, dividers)  > -1) {
                $('html, body').scrollTo(offset.top);
                return false;
              } else if (letter == 'a') {
                $('html, body').scrollTo(0);
                return false;
              }
            }
          });
        }

        // generate scrollbar on invokation
        createScrollbar();
      });
    }
  });

})(jQuery);

$.fn.scrollTo = function( target, options, callback ){
  if(typeof options == 'function' && arguments.length == 2){ callback = options; options = target; }
  var settings = $.extend({
    scrollTarget  : target,
    offsetTop     : 50,
    duration      : 0,
    easing        : 'swing'
  }, options);
  return this.each(function(){
    var scrollPane = $(this);
    var scrollTarget = (typeof settings.scrollTarget == "number") ? settings.scrollTarget : $(settings.scrollTarget);
    var scrollY = (typeof scrollTarget == "number") ? scrollTarget : scrollTarget.offset().top + scrollPane.scrollTop() - parseInt(settings.offsetTop);
    scrollPane.animate({scrollTop : scrollY }, parseInt(settings.duration), settings.easing, function(){
      if (typeof callback == 'function') { callback.call(this); }
    });
  });
}
