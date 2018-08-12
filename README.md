# logger-emitter

Minimal api for logging to console and/or eventEmitter

### usage:

```javascript
var loggerEmitter = require('logger-emitter');

// new is optional
// usually all you want is a standalone log() function
var log = loggerEmitter(opts).log;

// simply call log() without object. prefix
// supports util.format() args, returns formatted string

log(s...);

// log error with stack trace

log(new Error(...));

// access the logger object
log.logger.noConsole = true;
log.logger.noErrors = true

// to add listeners
log.logger.on('log', logHandler);
log.logger.on('error', errHandler);
```

#### opts.noConsole
- suppresses console logging

#### opts.noErrors
- emits only 'log' events instead of 'log' and 'error' events
- if you don't listen for `errors`, eventEmitter will throw on 'error'

#### license
(c) 2015-2018 Jürgen Leschner, [MIT](http://opensource.org/licenses/MIT) license