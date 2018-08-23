import stampit from 'stampit';

import IPAMProxy from 'node-phpipam';

import IPAMBackend from './ipambackend';
import Whois from './whois';
import Utils from './utils';

let IPAMWhois = stampit.init(function(options = {}, {stamp}) {
    let config = stamp.compose.configuration;

    config.backends.forEach((backend) => {
	let Backend = stampit.compose(IPAMProxy(backend.config), IPAMBackend);
	this.register(Backend({name: backend.name}));
    });

    this.debug(`IPAM Backends configured: ${config.backends.length}`);
});

export default Whois.compose(IPAMWhois).props({debug: Utils.debug.server});
