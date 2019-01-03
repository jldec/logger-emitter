/**
 * test-logger-emitter
 * copyright 2015-2019, Jurgen Leschner - github.com/jldec - MIT license
 *
**/

var test = require('tape');

var loggerEmitter = require('../logger-emitter');

test('logger', function(t) {
  t.equal(typeof loggerEmitter().log, 'function');
  t.equal(typeof loggerEmitter(), 'object');
  t.true(loggerEmitter().log.logger instanceof loggerEmitter);
  t.equal(typeof loggerEmitter().log.logger.emit, 'function');
  t.equal(typeof loggerEmitter().log.logger.on, 'function');

  var log = loggerEmitter( { noConsole:true, noErrors:false } ).log;
  log.logger.on('log', function(s) {
    t.equal(s, 'hello 1 - 2 - 3');
    t.end();
  });

  log('hello %s - %s -',1,2,3);
});

test('logger error', function(t) {
  var log = loggerEmitter( { noConsole:true, noErrors:false } ).log;
  log.logger.on('error', function(e) {
    t.equal(e.message,'oops');
    t.end();
  });
  log(new Error('oops'));
});
