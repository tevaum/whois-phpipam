whois-phpipam
=============

A simple POC of a whois server that exposes information from [phpIPAM](https://phpipam.net).

It uses my [node-phpipam](https://github.com/tevaum/node-phpipam) to retrieve information from one or more phpIPAM instances.

You can also use this project as a library to build your own whois server and format things properly.

To use this server you will need:

* A running phpIPAM (duhh)
* An App ID (that you can create under the *Administration* : *API* menu)
* A valid username and password to retrieve and renew the token

For API details, take a look at the official [API documentation](https://phpipam.net/api/api_documentation/).

It currently implements ip address, network and hostname lookups. Note that hostname lookup depends on an API call implemented only in phpIPAM 1.3.

As usual, bug reports, feature and pull requests are welcome!

Tests are not implemented yet :P

Server Usage
------------

```bash
git clone https://github.com/tevaum/whois-phpipam
cd whois-phpipam
npm install
cp config-sample.js config.js
npm start
```

You should, of course, edit config.js before running `npm start` to configure at least one valid backend.

Library Usage
-------------

Take a look at [src/server.js](https://github.com/tevaum/node-phpipam/blob/master/src/server.js) for an example of how to use this project as a library to build your own whois server.
