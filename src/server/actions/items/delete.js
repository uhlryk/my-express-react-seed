import validator from 'validator';

export default function (globals) {
  return function deleteItem(entity, callback) {
    entity.destroy().then(() => {
      callback(null);
    }).catch((err) => {
      globals.logger.error('DB error items', err);
      callback(err);
    });

  }
}
