import stampit from 'stampit';
import Backend from './backend';

let IPAMBackend = stampit({
    init() {
	this.host = host => {
	    return this
		.get(`addresses/search_hostname/${host}`)
		.then((results) => {
		    let result = results.map((result) => {
			return `${host} has ip ${result.ip}`;
		    });

		    return result.join('\n');
		});
	};

    	this.net = net => {
	    return this
		.get(`subnets/cidr/${net}`)
		.then((results) => {
		    let result = results.map((result) => {
			return `${net}: (${result.description})`;
		    });

		    return result.join('\n');
		});
	};

    	this.ip = ip => {
	    return this
		.get(`addresses/search/${ip}`)
		.then((results) => {
		    let result = results.map((result) => {
			return `${ip} has hostname ${result.hostname} (${result.description})`;
		    });

		    return result.join('\n');
		});
	};
    }
});

export default Backend.compose(IPAMBackend);
