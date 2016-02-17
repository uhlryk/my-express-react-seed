import bcrypt from 'bcrypt';
import Promise from 'bluebird';

export default function (globals) {
  return function createUser(params, callback) {
    var email = params.email;
    var password = params.password;

    var genSalt = Promise.promisify(bcrypt.genSalt);
    var createHash = Promise.promisify(bcrypt.hash);

    genSalt(10).then((salt) => {
      return createHash(password, salt);
    }).then((hash) => {
      return globals.models.user.create({
        email: email,
        password: hash,
        status: params.status
      });
    }).then((item) => {
      callback(null, item);
    }).catch((err) => {
      globals.logger.error('DB error users', err);
      callback(err);
    });
  }
}
