import { createLibp2p } from 'libp2p';
import { WebSockets } from '@libp2p/websockets';
import { Noise } from '@chainsafe/libp2p-noise';
import { Mplex } from '@libp2p/mplex';
import { FloodSub } from '@libp2p/floodsub';

const node = await createLibp2p({
  addresses: {
    listen: ['/ip4/127.0.0.1/tcp/8000/ws'],
  },
  transports: [new WebSockets()],
  connectionEncryption: [new Noise()],
  streamMuxers: [new Mplex()],
  pubsub: FloodSub,
});

// start libp2p
await node.start();
console.log('libp2p has started');

const listenAddrs = node.connectionManager.getConnections();
console.log('libp2p is listening on the following addresses: ', listenAddrs);

const advertiseAddrs = node.getMultiaddrs();
console.log('libp2p is advertising the following addresses: ', advertiseAddrs);

// stop libp2p
// await node.stop();
// console.log('libp2p has stopped');
