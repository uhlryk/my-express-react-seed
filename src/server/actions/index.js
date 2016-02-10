import itemsCreate from './items/create';
import itemsList from './items/list';
import itemsUpdate from './items/update';


export default function(globals){
  return {
    items: {
      create: itemsCreate(globals),
      list: itemsList(globals),
      update: itemsUpdate(globals)
    }
  }
}
