export default {
  apiUrl: 'http://localhost:8080',
  {{#if auth0}}auth0: {
    clientID: '2kyJXDrtqChOgjFQxaxRw9J0v2S5sVB1',
    domain: 'brock-haugen.auth0.com'
  },
  {{/if}}authAccessToken: 'auth_access_token',
  authToken: 'auth_token',
  authProfile: 'profile'{{#if_eq api "firebase"}},
  firebase: {
    apiKey: 'AIzaSyBR-HDOd6DSMlyqdVF8dB3UWgbnvsmMj04',
    authDomain: 'test-project-27cf2.firebaseapp.com',
    databaseURL: 'https://test-project-27cf2.firebaseio.com',
    storageBucket: 'test-project-27cf2.appspot.com',
    messagingSenderId: '584354625256'
  }{{/if_eq}}
}
