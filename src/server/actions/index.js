import itemsCreate from './items/create';
import itemsList from './items/list';
import itemsUpdate from './items/update';
import itemsDelete from './items/delete';

import hashPassword from './users/hashPassword';
import usersCreate from './users/create';
import usersList from './users/list';
import usersUpdate from './users/update';
import sendActivationEmail from './users/sendActivationEmail';
import sendResetPasswordEmail from './users/sendResetPasswordEmail';
import usersCreateActivationToken from './users/createActivationToken';
import usersCreateResetPasswordToken from './users/createResetPasswordToken';
import usersVerifyActivationToken from './users/verifyActivationToken';
import usersVerifyResetPasswordToken from './users/verifyResetPasswordToken';

import createToken from './authentications/createToken';
import comparePassword from './authentications/comparePassword';
import verifyToken from './authentications/verifyToken';

export default function(globals){
  var actions = {};
  globals = Object.assign(globals, { actions })
  actions.items = {
    create: itemsCreate(globals),
    list: itemsList(globals),
    update: itemsUpdate(globals),
    delete: itemsDelete(globals)
  };
  actions.users = {
    hashPassword: hashPassword(globals),
    create: usersCreate(globals),
    list: usersList(globals),
    update: usersUpdate(globals),
    sendActivationEmail: sendActivationEmail(globals),
    sendResetPasswordEmail: sendResetPasswordEmail(globals),
    createActivationToken: usersCreateActivationToken(globals),
    createResetPasswordToken: usersCreateResetPasswordToken(globals),
    verifyActivationToken: usersVerifyActivationToken(globals),
    verifyResetPasswordToken: usersVerifyResetPasswordToken(globals),
  };
  actions.authentications = {
    createToken: createToken(globals),
    comparePassword: comparePassword(globals),
    verifyToken: verifyToken(globals)
  };
  return actions;
}
