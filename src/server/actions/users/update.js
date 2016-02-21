export default function (globals) {
  return function updateUser(entity, updateObject, callback) {

    entity.update(updateObject).then(() => {
      callback(null, entity);
    }).catch((err) => {
      globals.logger.error('DB error update users', err);
      callback(err);
    });
  }
}
