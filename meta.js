module.exports = {
  "prompts": {
    "name": {
      "type": "string",
      "required": true,
      "message": "Project name"
    },
    "description": {
      "type": "string",
      "required": false,
      "message": "Project description",
      "default": "A boilerplate Vue.js project based on brock-haugen/boilerplate"
    },
    "author": {
      "type": "string",
      "message": "Author"
    },
    "api": {
      "type": "list",
      "message": "Which backend calls will be used?",
      "choices": [
        {
          "name": "Firebase - a complete BaaS provided by Google with advanced sync and permissions OOTB",
          "value": "firebase",
          "short": "Firebase"
        },
        {
          "name": "Standard AJAX - setup Axios for traditional backend calls (recommended for most)",
          "value": "ajax",
          "short": "Ajax"
        }
      ]
    },
    "auth0": {
      "type": "confirm",
      "message": "Use Auth0 to setup instant authentication?"
    },
    "tests": {
      "type": "confirm",
      "message": "Setup unit and e2e test files?"
    }
  },
  "filters": {
    "src/api/*": "api == 'ajax'",
    ".firebaserc": "api == 'firebase'",
    "firebase.json": "api == 'firebase'",
    "src/firebase/*": "api == 'firebase'",
    "build/webpack.test.conf.js": "tests",
    "config/test.env.js": "tests",
    "test/unit/**/*": "tests",
    "test/e2e/**/*": "tests"
  },
  "completeMessage": "To get started:\n\n  {{^inPlace}}cd {{destDirName}}\n  {{/inPlace}}npm install\n  npm run dev",
  complete (data) {
    console.log(data)
    if (!data.inPlace) {
      console.log(`cd ${data.destDirName}`)
    }
    console.log(`ls -l`)
  }
};
