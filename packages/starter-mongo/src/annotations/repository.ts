import 'reflect-metadata';

import { Container, Service } from '@express-boot/starter-core';
import { MongoClient } from 'mongodb';

// Decorator that will only initialize the repository when MongoClient is available
export function Repository(collectionName: string) {
  return function (target: any) {
    // Store the MongoDB collection name in the class metadata
    Reflect.defineMetadata('mongodb:collectionName', collectionName, target);

    // Create a factory function to initialize the repository later
    const factory = async () => {
      const client = await Container.get(MongoClient); // Ensure client is fetched from the container asynchronously

      if (!client) {
        throw new Error('MongoClient not found in container');
      }

      const collection = client.db().collection(collectionName);

      // Return an instance of the repository with the MongoDB collection
      return new target(collection);
    };

    // Instead of directly initializing, store the factory
    Service()(target); // Ensure class is registered in container
    Reflect.defineMetadata('mongodb:factory', factory, target);
  };
}
