import * as Hapi from '@hapi/hapi';
import getRoutes from './routes';
import Mongoose from 'mongoose';
import validate from './auth/validation';
import { options } from './config';
import { seedAdminUser } from './seed';

const keys = require('./keys/keys');

const HOST = process.env.host || '0.0.0.0';
const PORT = process.env.port || 5000;
const DATABASE = process.env.database || keys.mongoUri;

let mongoSslOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
};

const connectToMongo = async () => {
  console.log('Datatase URL:', DATABASE);
  const dbConnection = await Mongoose.connect(DATABASE, mongoSslOptions);
  if (dbConnection) {
    console.log('Connected to database');
  }
};

const server: Hapi.Server = new Hapi.Server({
  host: HOST,
  port: PORT,
  routes: {
    cors: true
  }
});

async function start(): Promise<void> {
  try {
    await server.register({
      plugin: require('good'),
      options
    });

    await server.register({
      plugin: require('hapi-pino'),
      options: {
        prettyPrint: process.env.NODE_ENV !== 'production',
        redact: ['req.headers.authorization']
      }
    });

    await server.register([require('hapi-auth-jwt2')]);
    server.auth.strategy('jwt', 'jwt', {
      key: keys.jwtSecretKey,
      validate
    });

    server.auth.default('jwt');

    getRoutes(server);

    await connectToMongo();

    await seedAdminUser();

    await server.start();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server running @ ${server.info.uri}`);
}

start();
