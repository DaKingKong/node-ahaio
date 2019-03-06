Aha.io API Wrapper for Javascript
----

NPM package for interacting with the [AHA.io](https://aha.io) API.

A special thanks to Matt McClure ([@mmcc](https://github.com/mmcc)) and Ryan Faerman ([@ryanfaerman](https://github.com/ryanfaerman)). This code was heavily inspired, based on and out-right copied from their (super clean and amazing) Zencoder API wrapper.

## Getting Started

Install the NPM package

```bash
$ npm install aha-io --save
```

Require the package in your application:

```javascript
var AhaIo = require('aha-io');
```

Instantiate a new client.

```javascript
// If you want to specify an API key when creating a client
var client = AhaIO('username', 'password', 'subdomain');
```

## Authentication

This library supports two different authentication modes: username/password (HTTP Basic Auth), and token-based (Bearer). To use Basic auth, one can instantiate a client in one of two ways:

```javascript
var client1 = AhaIO('username', 'password', 'subdomain');
// or...
var client2 = AhaIO({
    'username': 'username',
    'password': 'password',
    'subdomain': 'subdomain'
});
```

Bearer style authentication requires you to instantiate the client using an argmap (or array):

```javascript
var client = AhaIO({
    'token': 'token',
    'subdomain': 'subdomain'
});
```

## Custom Subdomains

You can also use AHA's `secure.aha.io`. The subdomain is *always* required for authentication purposes. You may toggle on/off the use of custom subdomain by passing in the optional `options` parameter to the constructor like so:

```javascript
var client1 = AhaIO('username', 'password', 'subdomain', { useSubdomain: false });
// or...
var client2 = AhaIO({
    'username': 'username',
    'password': 'password',
    'subdomain': 'subdomain',
    'options': { useSubdomain: false }
});
```

### This is still a work in progress, and pull requests are appreciated

[Routes Implemented](./implemented-routes.md)
