import itemsCreate from './items/create';
import itemsList from './items/list';
import itemsUpdate from './items/update';
import itemsDelete from './items/delete';

import usersCreate from './users/create';
import usersList from './users/list';
import usersSendActivationLink from './users/sendActivationLink';
import usersCreateActivationToken from './users/createActivationToken';

import createToken from './authentications/createToken';
import comparePassword from './authentications/comparePassword';
import verifyToken from './authentications/verifyToken';

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
      list: usersList(globals),
      sendActivationLink: usersSendActivationLink(globals),
      createActivationToken: usersCreateActivationToken(globals)
    },
    authentications: {
      createToken: createToken(globals),
      comparePassword: comparePassword(globals),
      verifyToken: verifyToken(globals)
    }
  }
}
