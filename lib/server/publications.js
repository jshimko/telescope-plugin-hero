
Meteor.publish('hero-settings', function() {
  return HeroSettings.find();
});
