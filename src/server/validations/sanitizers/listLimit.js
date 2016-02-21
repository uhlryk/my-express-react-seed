/**
 * checks if limit value is in correct values list. If no then return undefined and other modules will work with
 * default value
 * example:
 * req.sanitizeQuery('limit').listLimit({values:[10,20,30,40,50]});
 */
export default function listLimit(value, options) {
  if(options.values && options.values.indexOf(parseInt(value)) !== -1) {
    return parseInt(value);
  }
  return undefined;
}
