import debug from 'debug';

let Utils = {
    debug: {
	log: debug('whois:log'),
	server: debug('whois:server')
    }
};

export default Utils;
