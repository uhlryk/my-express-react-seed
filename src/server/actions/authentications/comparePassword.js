import Promise from 'bluebird';
import bcrypt from 'bcrypt';

export default function (globals) {
  return function comparePassword(referencePassword, hash, callback) {
    var compare = Promise.promisify(bcrypt.compare);

    compare(referencePassword, hash).then((response) => {
      callback(null, response);
    });
  }
}
