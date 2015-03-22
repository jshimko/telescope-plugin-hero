
getHeroSetting = function(setting, defaultValue){
  var heroSettings = HeroSettings.find().fetch()[0];

  if(heroSettings && (typeof heroSettings[setting] !== 'undefined')) { // look in HeroSettings collection
    return heroSettings[setting];

  } else if (typeof defaultValue !== 'undefined') { // fallback to default
    return  defaultValue;

  } else { // or return undefined
    return undefined;
  }

};
