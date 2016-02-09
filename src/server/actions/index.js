import itemsCreate from './items/create';


export default function(globals){
  return {
    items: {
      create: itemsCreate(globals)
    }
  }
}
