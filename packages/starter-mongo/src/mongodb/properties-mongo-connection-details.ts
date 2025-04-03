import { Service } from '@express-boot/starter-core';
import { MongoDataProperties } from '../properties/mongo-properties';
import { ConnectionString } from './connection-string';
import { MongoCredentials } from './mongo-credentials';

@Service()
export class PropertiesMongoConnectionDetails {
  private readonly mongoProperties: MongoDataProperties;

  constructor(mongoProperties: MongoDataProperties) {
    this.mongoProperties = mongoProperties;
  }

  getConnectionString(): ConnectionString {
    const uri = this.mongoProperties.uri;
    const database = this.mongoProperties.database;
    const options = this.mongoProperties.options;

    if (!uri || !database) {
      throw new Error('MongoDB URI & database are not configured.');
    }

    const username = this.mongoProperties.username;
    const password = this.mongoProperties.password;

    let credentials = undefined;
    if (username && password) {
      credentials = new MongoCredentials(username, password);
    }

    return new ConnectionString(uri, database, credentials, options);
  }
}
