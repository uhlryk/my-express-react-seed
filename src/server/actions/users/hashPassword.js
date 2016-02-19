import bcrypt from 'bcrypt';
import Promise from 'bluebird';

export default function (globals) {
  return function hashPassword(password, callback) {

    var genSalt = Promise.promisify(bcrypt.genSalt);
    var createHash = Promise.promisify(bcrypt.hash);

    genSalt(10).then((salt) => {
      return createHash(password, salt);
    }).then((hash) => {
      callback(null, hash);
    }).catch((err) => {
      globals.logger.error('DB error users', err);
      callback(err);
    });
  }
}
