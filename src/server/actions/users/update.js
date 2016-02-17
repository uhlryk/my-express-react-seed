import validator from 'validator';
import ValidationError from '../../errors/ValidationError';

export default function (globals) {
  return function updateUser(entity, params, callback) {
    if(params.status) {
      entity.status = params.status;
    }
    entity.save().then(() => {
      callback(null, entity);
    }).catch((err) => {
      globals.logger.error('DB error update users', err);
      callback(err);
    });
  }
}
