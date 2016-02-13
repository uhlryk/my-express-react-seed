import itemsCreate from './items/create';
import itemsList from './items/list';
import itemsUpdate from './items/update';
import itemsDelete from './items/delete';

import usersCreate from './users/create';
import usersList from './users/list';

import createToken from './authentications/createToken';
import comparePassword from './authentications/comparePassword';

export default function(globals){
  return {
    items: {
      create: itemsCreate(globals),
      list: itemsList(globals),
      update: itemsUpdate(globals),
      delete: itemsDelete(globals)
    },
    users: {
      create: usersCreate(globals),
      list: usersList(globals)
    },
    authentications: {
      createToken: createToken(globals),
      comparePassword: comparePassword(globals)
    }
  }
}
