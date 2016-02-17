export default function (globals) {
  return function createItem(params, callback) {

    globals.models.item.create({
      name: params.name
    }).then((item) => {
      callback(null, item);
    }).catch((err) => {
      globals.logger.error('DB error items', err);
      callback(err);
    });
  }
}
