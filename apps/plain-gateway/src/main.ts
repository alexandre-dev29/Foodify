import Fastify from 'fastify';
import mercurius from 'mercurius';
import fastifyCors from 'fastify-cors';
import mercuriusCache from 'mercurius-cache';

const gateway = Fastify();

gateway.register(fastifyCors, {
  origin: '*',
});

gateway.register(mercurius, {
  graphiql: true,
  gateway: {
    pollingInterval: 5000,
    services: [
      {
        name: 'users',
        url: 'http://localhost:3001/graphql',
        mandatory: true,
      },
      {
        name: 'restaurants',
        url: 'http://localhost:3002/graphql',
        mandatory: true,
      },
    ],
  },
});

gateway.register(mercuriusCache, {
  ttl: 10,
  all: true,
});

gateway.listen(4001).then((r) => {
  console.log('server Launched');
});
