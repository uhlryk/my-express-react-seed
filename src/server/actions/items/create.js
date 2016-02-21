export default function (globals) {
  return function createEntity(inserObject, callback) {
    globals.models.item.create(inserObject).then((entity) => {
      callback(null, entity);
    }).catch((err) => {
      globals.logger.error('DB error entities', err);
      callback(err);
    });
  }
}
