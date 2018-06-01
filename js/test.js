require('./tracking.js');

window['ga-disable-ID'] = true

window.getConsent({
  cookies: {
    page: "/cookies"
  },
  ui: {
    main_color: "#242424",
    button_color: "#424242",
    text: {
      accept: "",
      refuse: "",
      main: ""
    }
  },
  response: {
    ga_key: null,
    gtag_key: null,
    callback:[
      function() {
        window['ga-disable-ID'] = false
      }
    ]
  }
})
