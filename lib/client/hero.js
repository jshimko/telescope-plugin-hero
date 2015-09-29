
// Add the hero template as the first hero module
Telescope.modules.add('hero', {
    template: 'hero',
    order: 1,
    only: ['postsDefault']
  }
);


// Subscribe to HeroSettings publication
Template.hero.onCreated(function () {
  this.subscribe('hero-settings');
});

Template.hero_config_overlay.onCreated(function () {
  this.subscribe('hero-settings');
});


Template.hero.helpers({
  showHero: function () {
    return HeroSettings.get('heroOn');
  },
  heroData: function() {
    var s = HeroSettings.findOne();
    if (s) {
      return {
        title: s.heroTitle,
        subheading: s.heroSubheading,
        extraHtml: s.extraHtml,
        extraCss: s.extraCss,
        heroImage: s.heroImage
      }
    }
  }
});


Template.hero_config_overlay.helpers({
  heroSettings: function() {
    return HeroSettings.findOne();
  },
  switchState: function() {
    // Return .on class if hero state is on
    var s = HeroSettings.findOne();

    if (s && s.heroOn)
      return 'on';

    return;
  }
});


Template.hero_config_overlay.events({
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

Template.hero_config_overlay.onRendered(function () {
  var self = this;

  self.autorun(function() {
    var isReady = Template.instance().subscriptionsReady();
    if (isReady) {
      Meteor.setTimeout(function() {
        initCodeMirror(self);
      }, 500); // Give Autoform 500ms to render
    }
  });
});

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
