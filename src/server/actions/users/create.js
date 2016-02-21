import bcrypt from 'bcrypt';
import Promise from 'bluebird';

export default function (globals) {
  return function createUser(inserObject, callback) {

    globals.models.user.create(inserObject).then((user) => {
      callback(null, user);
    }).catch((err) => {
      globals.logger.error('DB error users', err);
      callback(err);
    });
  }
}
