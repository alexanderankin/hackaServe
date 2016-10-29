'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _init = require('./handlers/init');

var _init2 = _interopRequireDefault(_init);

var _send = require('./handlers/send');

var _send2 = _interopRequireDefault(_send);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.version('0.0.1').command('init [name]').description('initialise a new hackathon').option("-x, --example_yml", "generate example yaml that shows how to add attendees").option("-t, --twilio_key <key>", "A twilio key is required in order to send text messages").action(_init2.default);

_commander2.default.version('0.0.1').command('send [message_name]').description('initialise a new hackathon').option("-x, --example_yml", "generate example yaml that shows how to add attendees").option("-t, --twilio_key <key>", "A twilio key is required in order to send text messages").action(_send2.default);

_commander2.default.parse(process.argv);

if (!_commander2.default.args.length) _commander2.default.help();