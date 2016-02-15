import validator from 'validator';
import ValidationError from '../../errors/ValidationError';

export default function (globals) {
  return function createItem(params, callback) {
    var name = params.name;

    if(name && validator.isLength(name, {min:0, max:60})) {

      globals.models.item.create({
        name: params.name
      }).then((item) => {
        callback(null, item);
      }).catch((err) => {
        globals.logger.error('DB error items', err);
        callback(err);
      });
    } else {
      callback(new ValidationError('name'));
    }
  }
}
