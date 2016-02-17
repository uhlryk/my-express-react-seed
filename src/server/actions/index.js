import itemsCreate from './items/create';
import itemsList from './items/list';
import itemsUpdate from './items/update';
import itemsDelete from './items/delete';

import usersCreate from './users/create';
import usersList from './users/list';
import usersUpdate from './users/update';
import usersSendActivationLink from './users/sendActivationLink';
import usersCreateActivationToken from './users/createActivationToken';
import usersVerifyActivationToken from './users/verifyActivationToken';

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
      update: usersUpdate(globals),
      sendActivationLink: usersSendActivationLink(globals),
      createActivationToken: usersCreateActivationToken(globals),
      verifyActivationToken: usersVerifyActivationToken(globals),
    },
    authentications: {
      createToken: createToken(globals),
      comparePassword: comparePassword(globals),
      verifyToken: verifyToken(globals)
    }
  }
}
