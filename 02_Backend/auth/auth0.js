const ManagementClient = require('auth0').ManagementClient;
const AuthenticationClient = require('auth0').AuthenticationClient;

import setting from '../config/setting';


const auth0 = new ManagementClient({
  domain: setting.AUTH0_DOMAIN,
  clientId: setting.AUTH0_CLIENT_ID,
  clientSecret: setting.AUTH0_CLIENT_SECRET,
});

const authClient = new AuthenticationClient({
    domain: setting.AUTH0_DOMAIN,
    clientId: setting.AUTH0_CLIENT_ID,
    clientSecret: setting.AUTH0_CLIENT_SECRET,
});

module.exports = {
    auth0, authClient
}
