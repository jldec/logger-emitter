/**
 * test-logger-emitter
 * copyright 2015, Jurgen Leschner - github.com/jldec - MIT license
 *
**/

suite('test-logger-emitter');

var loggerEmitter = require('../logger-emitter');
var should = require('should');

test('logger', function(done) {
  loggerEmitter().log.should.be.type('function');
  loggerEmitter().should.be.type('object');
  loggerEmitter().log.logger.should.be.an.instanceOf(loggerEmitter);
  loggerEmitter().log.logger.emit.should.be.type('function');
  loggerEmitter().log.logger.on.should.be.type('function');

  var log = loggerEmitter( { noConsole:true, noErrors:false } ).log;
  log.logger.on('log', function(s) {
    s.should.be.exactly('hello 1 - 2 - 3');
    done();
  });
  log('hello %s - %s -',1,2,3);
});

test('logger error', function(done) {

  var log = loggerEmitter( { noConsole:true, noErrors:false } ).log;
  log.logger.on('error', function(e) {
    e.message.should.be.exactly('oops');
    done();
  });
  log(new Error('oops'));
});























