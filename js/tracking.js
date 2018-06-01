require("./cc.js");

window.getCookie = function(name) {
  var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return match[2];
}

window.allowTracking = function(){
  let dnt = true;
  if (window.doNotTrack || navigator.doNotTrack || navigator.msDoNotTrack || 'msTrackingProtectionEnabled' in window.external) {
    if (window.doNotTrack == "1" || navigator.doNotTrack == "yes" || navigator.doNotTrack == "1" || navigator.msDoNotTrack == "1" || window.getCookie('cookieconsent_status') == 'deny' ) {
      dnt = false
    }else if (typeof window.external.msTrackingProtectionEnabled == "function"){
      dnt = !window.external.msTrackingProtectionEnabled();
    }
  }

  return dnt;
}

window.cookieBanner = function(link,mainColor,buttonColor,text,cb){
  cookieconsent.initialise({
    "type": text.refuse ? "opt-out" : "info",
    "palette": {
      "popup": {
        "background": mainColor
      },
      "button": {
        "background": buttonColor
      }
    },
    "law": {
      "regionalLaw": false,
    },
    "theme": "edgeless",
    "content": {
      "message": text.main,
      "dismiss": text.accept,
      "deny": text.refuse ? text.refuse : null,
      "href": link
    },
    "revokable":true,
    onStatusChange: function(status) {
      cb();
    }
  });
}

/**
 * Add google tracking info
 * @param {Object} settings
 * @param {String=} gtag_key - An Optional GTag Key
 * @param {String=} ga_key - An Optional GTag Key
 */
window.googleAnalytics = function(settings){
  /** OLD GA JS **/
  if(settings.ga_key){
    (function(i, s, o, g, r, a, m) {
      i['GoogleAnalyticsObject'] = r;
      i[r] = i[r] || function() {
          (i[r].q = i[r].q || []).push(arguments)
      }, i[r].l = 1 * new Date();
      a = s.createElement(o),
          m = s.getElementsByTagName(o)[0];
      a.async = 1;
      a.src = g;
      m.parentNode.insertBefore(a, m)
    })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

    ga('create', settings.ga_key, 'auto');
    ga('send', 'pageview');
  }

  /** NEW GTAG JS **/
  if(settings.gtag_key){
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer',settings.gtag_key);
  }
}

window.initCookie = function(config){
  if(window.allowTracking()){
    window.googleAnalytics({
      ga_key: config.response.ga_key ? config.response.ga_key : false,
      gtag_key: config.response.gtag_key ? config.response.gtag_key : false
    });
    if(config.response.callback && config.response.callback.length > 0){
      for(let i = 0; i < config.response.callback.length; i++){
        config.response.callback[i]();
      }
    }
  }
}


/**
 * @function getConsent
 * Initiate a cookie consent check
 * @param {Object} config
 * @param {Object} config.cookies
 * @param {String} config.cookies.page - The URL to your cookie policy
 * @param {Object} config.ui
 * @param {Object} config.ui.text
 * @param {String} config.ui.text.main - The main text of your cookie consent bar
 * @param {String} config.ui.text.accept - The accept button text of your cookie consent bar
 * @param {String=} config.ui.text.refuse - The Optional refuse button text of your cookie consent bar
 * @param {String} config.ui.main_color - The main color of your cookie consent bar
 * @param {String} config.ui.button_color - The button color on your cookie consent bar
 * @param {Object} config.response
 * @param {Function[]=} config.response.callback - An optional series of functions to call if cookies are not blocked
 * @param {String=} config.response.ga_key - An optional Google Analytics Key
 * @param {String=} config.response.gtag_key - An optional GTag
 */
window.getConsent = function(config){
  window.addEventListener("load", function(){
    if(window.allowTracking()){
      window.cookieBanner(config.cookies.page,config.ui.main_color,config.ui.button_color, config.ui.text,function(){
        window.initCookie(config);
      });
      if(window.getCookie('cookieconsent_status')){
        window.initCookie(config);
      }
    }
  })
}
