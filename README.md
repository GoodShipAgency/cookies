## Usage
All options are below
```javascript
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
 * @param {String} config.ui.text.refuse - The refuse button text of your cookie consent bar
 * @param {String} config.ui.main_color - The main color of your cookie consent bar
 * @param {String} config.ui.button_color - The button color on your cookie consent bar
 * @param {Object} config.response
 * @param {Function[]=} config.response.callback - An optional series of functions to call if cookies are not blocked
 * @param {String=} config.response.ga_key - An optional Google Analytics Key
 * @param {String=} config.response.gtag_key - An optional GTag
 */
```

### Example
```javascript
require('path_to_module/js/tracking.js');

window.getConsent({
  cookies: {
    page: "/cookies"
  },
  ui: {
    main_color: "#242424",
    button_color: "#424242",
    text: {
      accept: "Allow cookies",
      refuse: "No cookies",
      main: "We use cookies is that ok?"
    }
  },
  response: {
    ga_key: null,
    gtag_key: null,
    callback:[
      function() {
        console.log('has cookies enabled')
      }
    ]
  }
})
```

### Include css
```scss
@import 'path_to_module/scss/main';
```
