
// Add the hero template as the first hero module
heroModules.unshift({
  template: 'hero'
});


// Subscribe to HeroSettings publication
Template[getTemplate('hero')].onCreated(function () {
  this.subscribe('hero-settings');
});

Template[getTemplate('hero_config_overlay')].onCreated(function () {
  this.subscribe('hero-settings');
});


Template[getTemplate('hero')].helpers({
  showHero: function () {
    // Routes to include the hero on
    var heroRoutes = [
      'posts_default',
      'posts_top',
      'posts_best',
      'posts_new',
      'posts_digest',
      'postsDaily'
    ];

    // Current route
    var route = Router.current().route.getName();

    if (getHeroSetting('heroOn')) {
      // Check if we should display the hero on this route
      for (i in heroRoutes) {
        if (heroRoutes[i] === route) {
          Session.set('showHero', true);
          return true;
        }
      }
    }
    Session.set('showHero', false);
    return false;
  },

  heroData: function() {
    var s = HeroSettings.findOne();
    return {
      title: s.heroTitle,
      subheading: s.heroSubheading,
      extraHtml: s.extraHtml,
      extraCss: s.extraCss,
      heroImage: s.heroImage
    };
  }
});


Template[getTemplate('hero_config_overlay')].helpers({
  heroSettings: function() {
    return HeroSettings.findOne();
  },
  switchState: function() {
    // Return .off class if hero state is off
    var s = HeroSettings.findOne();

    if (s && s.heroOn)
      return 'on';

    return;
  }
});


Template[getTemplate('hero_config_overlay')].events({
  'click .hero-config-toggle': function (e, t) {
    // Open/close config overlay
    t.$('.hero-config').toggleClass('active');

    // Toggle the overlay arrow direction
    t.$('.hero-config-toggle').text(function(i, text){
      return text === '❮' ? '❯' : '❮';
    })
  },
  'click input#heroOn': function(e, t) {
    // Toggle hero state when toggling on/off switch
    var s = HeroSettings.findOne();
    HeroSettings.update({ _id: s._id }, { $set: { heroOn: !s.heroOn }});
  }
});


/*
*  CodeMirror inputs
*/

var initCodeMirror = function(t) {
  // Grab the HTML and CSS fields
  var html = t.find("textarea[data-schema-key='extraHtml']");
  var css = t.find("textarea[data-schema-key='extraCss']");

  // Init CodeMirror
  CodeMirror.fromTextArea(html, {
    lineNumbers: false,
    mode: "htmlmixed"
  });
  CodeMirror.fromTextArea(css, {
    lineNumbers: false,
    mode: "css"
  });
};

Template[getTemplate('hero_config_overlay')].rendered = function () {
  var self = this;

  self.autorun(function() {
    var isReady = Template.instance().subscriptionsReady();
    if (isReady) {
      Meteor.setTimeout(function() {
        initCodeMirror(self);
      }, 500); // Give Autoform 500ms to render
    }
  });
};

AutoForm.hooks({
  updateHeroForm: {
    onSuccess: function() {
      var self = this;
      Meteor.setTimeout(function() {
        initCodeMirror(self.template);
      }, 50); // Give input 50ms to re-render after submit
    }
  }
});
