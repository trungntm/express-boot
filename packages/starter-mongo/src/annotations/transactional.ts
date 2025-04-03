import 'reflect-metadata';

import { Container } from 'typedi';
import { MongoClient } from 'mongodb';
import { log } from '@express-boot/starter-log';

const { debug, error } = log.scope('transaction');

export function Transactional(): MethodDecorator {
  return function (_target: any, _propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      // Retrieve MongoClient from the container
      const client = await Container.get(MongoClient); // Ensure client is initialized
      if (!client) {
        throw new Error('MongoClient not found in container');
      }
      // Start a new session
      const session = client.startSession();
      debug('Starting transaction session', session.id);
      try {
        let result;
        await session.withTransaction(async () => {
          // Pass the session to the method as the last argument
          result = await originalMethod.apply(this, [...args, session]);
        });
        return result;
        // eslint-disable-next-line no-useless-catch
      } catch (err) {
        error('Transaction exception', err);
        throw err; // Transaction will be rolled back automatically
      } finally {
        debug('Transaction completed successfully', session.id);
        await session.endSession();
      }
    };

    return descriptor;
  };
}
