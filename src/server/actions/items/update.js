export default function (globals) {
  return function updateItem(entity, params, callback) {
    var name = params.name;

    entity.name = name;
    entity.save().then(() => {
      callback(null, entity);
    }).catch((err) => {
      globals.logger.error('DB error items', err);
      callback(err);
    });
  }
}
