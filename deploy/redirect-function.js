function handler(event) {
    var request = event.request;
    var host = request.headers.host.value;
    
    // Redirect non-www to www
    if (host === 'scimigo.com') {
        return {
            statusCode: 301,
            statusDescription: 'Moved Permanently',
            headers: {
                location: { value: 'https://www.scimigo.com' + request.uri }
            }
        };
    }
    
    return request;
}