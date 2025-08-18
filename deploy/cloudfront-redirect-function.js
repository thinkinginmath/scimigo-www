function handler(event) {
    var request = event.request;
    var host = request.headers.host.value;
    
    // Check if the host is the non-www version
    if (host === 'scimigo.com') {
        // Redirect to www version
        var response = {
            statusCode: 301,
            statusDescription: 'Moved Permanently',
            headers: {
                'location': { value: 'https://www.scimigo.com' + request.uri }
            }
        };
        return response;
    }
    
    // Continue with the request for www.scimigo.com
    return request;
}