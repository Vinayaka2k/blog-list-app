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
/**
 * Generates a validation response object.
 * @param {Boolean} isValid Is the token considered valid?
 * @param {Integer} status What status code should the consumer provide their response object?
 * @param {String} message What message should the consumer provide their response object?
 * @returns Returns a validation response object containing the validation result and appropriate response data.
 */
function generateValidationResult(isValid, status, message) {
    return {
        isValid: isValid,
        responseData: {
            status: status,
            message: message
        }
    }
}
module.exports = {
    /**
     * Validates the authentication token for a specified request object.
     * @param {apiRequest} request The request requiring token validation.
     * @returns Returns a validation response object containing the validation result and appropriat4e response data.
     */
    validateToken: function(request) {
        let token = getBearerTokenFromRequest(request);
        let decodedToken = jwt.verify(token, process.env.SECRET)
        if (decodedToken.id)
            return generateValidationResult(true, 200, 'The provided token is valid.');
        else
            return generateValidationResult(false, 401, 'Invalid token.')
    }
}