import stampit from 'stampit';
import net from 'net';

//console.log('Debug:', debug);

let Whois = stampit.init(function({host = this.host, port = this.port}, {stamp}) {
    let backends = [];

    const query_to_req = (query) => {
	let ip = /[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+/;
	let host = /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/;

	if (query.match(ip)) {
	    if (query.indexOf('/') == -1)
		return {type: 'ip', query};
	    return {type: 'net', query};

	} else if(query.match(host)) {
	    return {type: 'host', query};
	}

	return query;
    };

    const process_request = (req, sock) => {
	let proms = backends.map((backend) => {
	    return backend[req.type](req.query)
		.then(result => {
		    return {backend: backend.name, status: 'ok', result};
		})
		.catch(err => {
		    return {backend: backend.name, status: 'error', message: err.message};
		});
	});

	Promise
	    .all(proms)
	    .then((results) => {
		let result = results
			.filter((result) => result.status == 'ok')
			.reduce((str, result) => str += `${result.backend}:\n${result.result}\n\n`, '');

		if(result.length) {
		    //this.debug('Result:', JSON.stringify(results, null, ' '));
		    sock.end(result);
		} else {
		    let err = results.reduce((str, result) => str += `${result.backend}:\n${result.message}\n\n`, '');
		    //this.debug('Error:', JSON.stringify(results, null, ' '));
		    sock.end(err);
		}
	    });
    };

    const request_callback = (sock) => {
	sock.on('data', (chunk) => {
	    let query = chunk.toString().replace('\r\n', '');
	    let req = query_to_req(query);

	    process_request(req, sock);
	});
    };

    this.listen = () => {
	if (!backends.length)
	    throw new Error('No backend registered');

	let port = stamp.compose.configuration.port || port;
	let host = stamp.compose.configuration.host || host;

	net.createServer(request_callback).listen(port, host, () => {
	    this.debug(`Listening on ${host}:${port}`);
	});
    };

    this.register = backend => {
	backends.push(backend);
    };
}).props({
    host: '127.0.0.1',
    port: 4343
});

export default Whois;
