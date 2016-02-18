import bcrypt from 'bcrypt';
import Promise from 'bluebird';

export default function (globals) {
  return function updatePassword(entity, params, callback) {
    var password = params.password;

    var genSalt = Promise.promisify(bcrypt.genSalt);
    var createHash = Promise.promisify(bcrypt.hash);

    genSalt(10).then((salt) => {
      return createHash(password, salt);
    }).then((hash) => {
      entity.password = hash;
      return entity.save();
    }).then((item) => {
      callback(null, item);
    }).catch((err) => {
      globals.logger.error('DB error users', err);
      callback(err);
    });
  }
}
