/*global window*/
(function(reveal,$) {

  reveal.initialize({

      // Display controls in the bottom right corner
      controls: true,

      // Display a presentation progress bar
      progress: true,

      // Display the page number of the current slide
      slideNumber: true,

      // Push each slide change to the browser history
      history: true,

      // Enable keyboard shortcuts for navigation
      keyboard: true,

      // Enable the slide overview mode
      overview: true,

      // Vertical centering of slides
      center: true,

      // Enables touch navigation on devices with touch input
      touch: true,

      // Loop the presentation
      loop: false,

      // Change the presentation direction to be RTL
      rtl: false,

      // Turns fragments on and off globally
      fragments: true,

      // Flags if the presentation is running in an embedded mode,
      // i.e. contained within a limited portion of the screen
      embedded: false,

      // Flags if we should show a help overlay when the questionmark
      // key is pressed
      help: true,

      // Number of milliseconds between automatically proceeding to the
      // next slide, disabled when set to 0, this value can be overwritten
      // by using a data-autoslide attribute on your slides
      autoSlide: 0,

      // Stop auto-sliding after user input
      autoSlideStoppable: true,

      // Enable slide navigation via mouse wheel
      mouseWheel: true,

      // Hides the address bar on mobile devices
      hideAddressBar: true,

      // Opens links in an iframe preview overlay
      previewLinks: false,

      // Transition style
      transition: 'slide', // none/fade/slide/convex/concave/zoom

      // Transition speed
      transitionSpeed: 'default', // default/fast/slow

      // Transition style for full page slide backgrounds
      backgroundTransition: 'default', // none/fade/slide/convex/concave/zoom

      // Number of slides away from the current that are visible
      viewDistance: 3,

      // Parallax background image
      // parallaxBackgroundImage: 'https://s3.amazonaws.com/hakim-static/reveal-js/reveal-parallax-1.jpg', // e.g. "'https://s3.amazonaws.com/hakim-static/reveal-js/reveal-parallax-1.jpg'"

      // Parallax background size
      // parallaxBackgroundSize: '2100px 900px' // CSS syntax, e.g. "2100px 900px"


  });

  var Hours = function(_$,rate,attr_hours,attr_total,attr_container,odesk) {
    if(!(this instanceof Hours)) {return new Hours(_$,rate,attr_hours,attr_total,attr_container,odesk);}
    this.rate = rate || 20;
    this.$ = _$ || $;
    this.attr_hours = attr_hours || 'data-hours';
    this.attr_total = attr_total || 'data-hours-total';
    this.attr_container = attr_container || 'data-hours-container';
    this.odesk = odesk || 0.1;
  };

  Hours.prototype.template = function(hours, suffix) {
    if(suffix) { suffix = '-'+suffix; }
    else { suffix = ''}
    return this.$('<span data-hours'+suffix+'="' + hours + '">' + hours + 'hrs ('+this.format_dollars(hours)+')</span>');
  };

  Hours.prototype.format_dollars = function(hours) {
    var amt = hours * this.rate;
    amt *= 1 + this.odesk;
    amt = Math.ceil(amt);
    return '$' + amt;
  };

  Hours.prototype.$attr = function(attr) {
    return this.$('[' + attr + ']');
  };

  Hours.prototype.replace_all_tags = function() {
    var self = this;
    self.$('[' + self.attr_hours + ']').each(function(){
      var $e = self.$(this);
      var hours = self.get_hours_from_tag($e);
      $e.replaceWith(self.template(hours));
    });

    // each: data-total-hours
    self.$('[' + self.attr_total + ']').each(function(){
      var $e = self.$(this);
      var $set = $e.parents('['+self.attr_container+']').first();


      var total = 0;
      total = self.sum_of_hours_within($set);
      // $set.find('['+ self.attr_hours + ']').each(function() {
      //   var $e = self.$(this);
      //   total += self.get_hours_from_tag($e);
      // });

      $e.replaceWith(self.template(total, 'total'));
    });
  };

  Hours.prototype.sum_of_hours_within = function(base) {
    var self = this;
    var sum = 0;

    self.$(base).find( '['+self.attr_hours+']').each(function() {
      sum += self.get_hours_from_tag(this);
    });

    return sum;
  };

  Hours.prototype.get_hours_from_tag = function(tag) {
    if(!tag.hours) {
      tag.hours = parseFloat(this.$(tag).attr(this.attr_hours));
    }
    return tag.hours;
  };

  reveal.addEventListener( 'ready', function( ) {
    var hours = Hours();
    hours.replace_all_tags();
  });




})(window.Reveal, window.jQuery);
