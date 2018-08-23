import ConfIPAMWhois from './index';

import config from '../config.js';

let IPAMWhois = ConfIPAMWhois.conf(config);

let server = IPAMWhois();
server.listen();
