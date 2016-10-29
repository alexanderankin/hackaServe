'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _writeYaml = require('write-yaml');

var _writeYaml2 = _interopRequireDefault(_writeYaml);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var handler = function handler(name, options) {
    if (_fs2.default.existsSync(_path2.default.join(process.cwd(), name))) {
        console.log('Directory already exists, terminating...');
        process.exit(1);
    }
    console.log("Creating a new directory...");
    _fs2.default.mkdirSync(_path2.default.join(process.cwd(), name));
    var info = {
        name: name,
        description: '',
        twilio_api_key: options.twilio_key,
        messages: [{
            name: 'first_message',
            text: 'Your first message here',
            sendtime: Date.now(),
            group: 'all'
        }]
    };
    _writeYaml2.default.sync(_path2.default.join(name, 'hackathon.yml'), info);
    if (options.example_yml) {
        var userInfo = [{
            name: 'Adam Green',
            telephone: '07545771492',
            email: 'adie9@btinternet.com',
            groups: ['attendee', 'gluten-intolerant']
        }];
        _writeYaml2.default.sync(_path2.default.join(name, 'attendees.yml'), userInfo);
    }
};

exports.default = handler;