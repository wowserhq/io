let fs;
if (typeof process !== 'undefined' && process?.versions?.node !== null) {
  fs = require('fs');
}

module.exports = fs;
