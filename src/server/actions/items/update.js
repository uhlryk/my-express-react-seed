import validator from 'validator';

export default function (globals) {
  return function createItem(entity, params, callback) {
    var name = params.name;

    if(name && validator.isLength(name, {min:0, max:60})) {

      entity.name = name;
      entity.save().then(() => {
        callback(null, entity);
      }).catch((err) => {
        globals.logger.error('DB error items', err);
        callback(err);
      });
    } else {
      callback({ type: 'VALIDATION'});
    }
  }
}
