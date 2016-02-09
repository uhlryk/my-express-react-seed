import itemsCreate from './items/create';
import itemsList from './items/list';


export default function(globals){
  return {
    items: {
      create: itemsCreate(globals),
      list: itemsList(globals)
    }
  }
}
