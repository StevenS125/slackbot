'use strict';

const slackClient = require('../server/slackClient');
const service = require('../server/service');
const http = require('http');
const server = http.createServer(service);

const witToken = 'LVGMES2BITPABRRJ5SULTXA2LTU2HQSE';
const witClient = require('../server/witClient')(witToken);

const slackToken = 'xoxb-303657438502-FlvMVnXCwlxi61FmIBx5QrWp';
const slackLogLevel = 'verbose';

const rtm = slackClient.init(slackToken, slackLogLevel, witClient);
rtm.start();

slackClient.addAuthenticatedHandler(rtm, () => server.listen(3000));

server.on('listening', function() {
    console.log(`IRIS is listening on ${server.address().port} in ${service.get('env')} mode.`);
});