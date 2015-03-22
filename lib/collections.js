
/***********************
* HeroSettings Schema  *
***********************/

var heroSettingsSchema = new SimpleSchema({
  heroOn: {
    type: Boolean,
    optional: true,
    defaultValue: false,
    label: 'Hero On?'
  },
  heroTitle: {
    type: String,
    optional: true,
    label: 'Title'
  },
  heroSubheading: {
    type: String,
    optional: true,
    label: 'Subheading'
  },
  heroImage: {
    type: String,
    optional: true,
    label: 'Background Image'
  },
  extraHtml: {
    type: String,
    optional: true,
    label: 'Extra HTML',
    autoform: {
      rows: 6
    }
  },
  extraCss: {
    type: String,
    optional: true,
    label: 'Extra CSS',
    autoform: {
      rows: 6
    }
  }
});

HeroSettings = new Mongo.Collection("hero-settings");
HeroSettings.attachSchema(heroSettingsSchema);


var isAdminById = function(userId) {
  var user = Meteor.users.findOne(userId);
  return !!(user && isAdmin(user));
};

HeroSettings.allow({
  insert: isAdminById,
  update: isAdminById,
  remove: isAdminById
});


// Create sample hero settings if none exist
if (Meteor.isServer) {
  Meteor.startup(function() {
    if (HeroSettings.find().count() < 1) {
      HeroSettings.insert({
        heroOn: true,
        heroTitle: 'Awesome Thing About My Website',
        heroSubheading: 'Another thing about my brand',
        heroImage: 'http://cloudline.io.s3.amazonaws.com/images/outer-space-hd-wallpaper.jpg',
        extraHtml: '<a class=\"button\" href=\"/submit\">\n  Submit a Post!\n</a>\n<div class=\"learn-more\">\n  <a href=\"#\">Learn more</a> about this site.\n</div>',
        extraCss: '/* Sample styles for HTML above */\n\n.hero .copy .button {\n  background: #de3314;\n  color: #fff;\n  font-size: 1.8em;\n  font-weight: 300;\n  margin: 2em auto 1.2em auto;\n  border-radius: 0;\n  -webkit-transition: background 1s;\n  transition: background 1s;\n}\n\n.hero .copy .button:hover {\n  background: #af2810;\n}\n\n.hero .learn-more {\n  font-size: 1.5em;\n  font-weight: 300;\n}\n\n.hero .learn-more a {\n  outline: none;\n  color: #fff;\n  font-size: 1.1em;\n  font-weight: bold;\n  text-decoration: none;\n}'
      });
    };
  });
};
