const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
import setting from '../config/setting';

// Authentication middleware. When used, the
// access token must exist and be verified against
// the Auth0 JSON Web Key Set
const checkJwt = jwt({
  // Dynamically provide a signing key
  // based on the kid in the header and 
  // the singing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: setting.AUTH0_API_JWKS_URL
  }),

  // Validate the audience and the issuer.
  audience: setting.AUTH0_API_AUD,
  issuer: setting.AUTH0_API_ISSUER,
  algorithms: ['RS256']
});

module.exports = {
  checkJwt
}