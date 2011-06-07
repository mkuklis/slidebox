/**
 * slidebox - Simple Zepto plugin which turns your checkboxes into iPhone like slideboxes
 * version: 0.1
 * dependecies:
 * - zepto.js framework http://zeptojs.com
 * 
 * Copyright(c) 2011 Michal Kuklis <michal.kuklis@gmail.com>
 * MIT Licensed
 */

(function($) {
  $.fn.slidebox = function (options) {
    var TMPL = '<label class="slidebox"><span></span></label>';
    // default settings
    var settings = {
      change: function (el, onOff, key, value) {}, // change callback
      speed: 0.2 // toggle speed
    };
    
    settings = $.extend(settings, options);
    // toggle element
    var toggle = function (e) {
      var label = $(this)
        , checkbox = label.prev()
        , checked = checkbox.attr('checked');
      
      label.anim({backgroundPosition:'100%'}, settings.speed)
        .toggleClass('onoff');

      if (checked) {
        checkbox.removeAttr('checked'); 
      }
      else {
        checkbox.attr('checked', true); 
      }
      // execute callback in the context of the checkbox
      settings.change.call(checkbox, checkbox, !checked);
    }
    
    this.each(function (el) {
      var checkbox = $(this)
        , box = $(TMPL);
      checkbox.after(box);
      box.bind('tap').bind('click', toggle).bind('swipe', toggle);
      if (!checkbox.attr('checked')) {
        box.addClass('onoff'); 
      }
      checkbox.hide();
    }); 
  }
})(Zepto);
