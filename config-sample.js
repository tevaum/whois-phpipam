module.exports = {
    host: '0.0.0.0',
    port: 43,

    backends: [
	{
	    name: 'backend1',
	    config: {
		uri: 'https://ips.example.org/api',
		appname: 'whois-phpipam',
		username: 'username',
		password: 'password'
	    }
	},
	{
	    name: 'backend2',
	    config: {
		uri: 'https://example.com/phpipam/api',
		appname: 'whois-server',
		username: 'username',
		password: 'password'
	    }
	}
    ]
};
