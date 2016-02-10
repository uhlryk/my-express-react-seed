import itemsCreate from './items/create';
import itemsList from './items/list';
import itemsUpdate from './items/update';
import itemsDelete from './items/delete';


export default function(globals){
  return {
    items: {
      create: itemsCreate(globals),
      list: itemsList(globals),
      update: itemsUpdate(globals),
      delete: itemsDelete(globals)
    }
  }
}
