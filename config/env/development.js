var port = 1317;    


module.exports = {
    port: port, 
    db: 'mongodb://localhost/ColonizeDB',
    facebook: {
        clientID: '494299357388911',
        clientSecret: '39551e5942d323ad4e6451c7930deaff',
        callbackURL: 'http://localhost:' + port + '/oauth/facebook/callback'
    },
    twitter: {
        clientID: 'ch1HxUtPzcCSiVGx6jM3nCzAQ',
        clientSecret: 'a5BqkI6a5cz68ofxNZr2padNUReGXM4jX26nDvuB7irhtxxbPQ',
        callbackURL: 'http://localhost:' + port + '/oauth/twitter/callback'
    }
};