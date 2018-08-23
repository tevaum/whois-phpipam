import stampit from 'stampit';

let Backend = stampit.init(function({name=this.name}) {
    this.name = name;

    this.host = host => Promise.reject(new Error('Retrieving network info is not implemented'));

    this.net = net => Promise.reject(Error('Retrieving network info is not implemented'));

    this.ip = ip => Promise.reject(Error('Retrieving ip info is not implemented'));
}).props({
	name: 'backend'
});

export default Backend;
