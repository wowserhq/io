let fs;
if (process?.versions?.node !== null) {
  fs = require('fs');
}

module.exports = fs;
