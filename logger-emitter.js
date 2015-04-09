/**
 * logger-emitter.js
 *
 * usage:
 * var log = loggerEmitter(opts).log;  // new logger-emitter with log method
 * log(s...)                           // supports util.format() style args
 * log(new Error(...))                 // log with stack trace, return string
 * log.logger.on('log', logHandler)
 * log.logger.on('error', errHandler)
 *
 * opts.noConsole - no auto-log to console
 * opts.noErrors  - no 'error' events which throw if unhandled, just 'log' events
 *
 * copyright 2015, Jurgen Leschner - github.com/jldec - MIT license
 *
**/

var events = require('events');
var util = require('util');
util.inherits(loggerEmitter, events.EventEmitter);

module.exports = loggerEmitter;

//--//--//--//--//--//--//--//--//

function loggerEmitter(opts) {

  if (!(this instanceof loggerEmitter)) return new loggerEmitter(opts); // new is optional
  events.EventEmitter.call(this);
  opts = opts || {}
  var logger = this;

  logger.noConsole   = opts.noConsole || false;
  logger.noErrors    = opts.noErrors  || false;
  logger.log         = log;
  logger.log.logger  = logger;
  logger.log.inspect = inspect;

  function log(x) {
    var msg;
    if (util.isError(x)) {
      msg = x.stack || x.message;
      if (!logger.noErrors) {
        logger.emit('error', x); // throws if no listener
      }
      else {
        logger.emit('log', msg);
      }
    }
    else {
      msg = util.format.apply(logger, arguments);
      logger.emit('log', msg);
    }

    if (!logger.noConsole) {
      console.log(msg);
    }

    return msg;
  }

  function inspect() { return 'logger-emitter' }
}

