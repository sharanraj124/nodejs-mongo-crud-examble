'use strict';

module.exports = function CustomError(message, extra) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = message;
  this.extra = extra;
};

require('util').inherits(module.exports, Error);




// 1. install debian then upgrde the agent --> not working
// 2. Added message in install script
//     Uninstalled Atatus PHP Agent Successfully (add below line to current message line)

//     Please restart your web service (nginx/apache/fpm) to complete the uninstall process.

//     add empty line in install and uninstall
// 3. add systemd script
// 4. install script change 777 to 666
// 5. collector should remove excute permission for atatus.sock