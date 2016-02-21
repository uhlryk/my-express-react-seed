import validator from 'validator';

export default function (globals) {
  return function deleteEntity(entity, callback) {
    entity.destroy().then(() => {
      callback(null);
    }).catch((err) => {
      globals.logger.error('DB error entities', err);
      callback(err);
    });

  }
}
