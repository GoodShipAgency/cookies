require('./tracking.js');

getConsent({
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
        console.log('has cookies enabled')
      }
    ]
  }
})
