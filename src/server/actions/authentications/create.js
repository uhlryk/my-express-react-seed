import jwt from 'jsonwebtoken';
import Promise from 'bluebird';

export default function (globals) {
  return function updateItem(entity, params, callback) {
    var signToken = Promise.promisify(jwt.sign);

    signToken({ id: user.id },
      globals.config.jwtToken.secret, { expiresIn: globals.config.jwtToken.expiration }
    ).then((token) => {
      callback(null, {
        token: token
      });
    });
  }
}
