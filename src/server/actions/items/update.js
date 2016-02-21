export default function (globals) {
  return function updateEntity(entity, updateObject, callback) {

    entity.update(updateObject).then(() => {
      callback(null, entity);
    }).catch((err) => {
      globals.logger.error('DB error entities', err);
      callback(err);
    });
  }
}
