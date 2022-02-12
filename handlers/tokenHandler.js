const jwt = require('jsonwebtoken')

/**
 * Gets a bearer token from the specified request's authorization header.
 * @param {ApiRequest} request The request containing the token.
 * @returns Returns the bearer token if found, otherwise null.
 */
function getBearerTokenFromRequest(request) {
    let token = null;
    let authorizationHeader = request.get('authorization');
    if (authorizationHeader && authorization.toLowerCase().startsWith('bearer'))
        token = authorization.substring(7);

    return token;
}
module.exports = {
    /**
     * Run a specified action with token validation.
     * @param {ApiRequest} request The request object being utilized in the endpoint.
     * @param {ApiResponse} response The response object being utilized in the endpoint.
     * @param {Callback} action The callback to be invoked when a valid token is found.
     * @returns Returns the response object from the specified callback if the token is valid, otherwise the provided response object with a status code of 401 and an invalid token error message.
     */
    runWithValidation: function(request, response, action) {
        let token = getBearerTokenFromRequest(request);
        let decodedToken = jwt.verify(token, process.env.SECRET)
        if (decodedToken.id)
            return action(decodedToken.id);
        
        return response.status(401).json({ error: 'Invalid token.' });
    }
}