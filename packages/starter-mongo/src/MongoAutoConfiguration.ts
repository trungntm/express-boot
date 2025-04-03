import { PropertiesMongoConnectionDetails } from './mongodb/properties-mongo-connection-details';
import { MongoClient } from 'mongodb';
import { Container, Service } from '@express-boot/starter-core';
import { log } from '@express-boot/starter-log';
import { ConnectionString } from './mongodb/connection-string';
import { DataSource } from './mongodb/datasource';

@Service()
class MongoAutoConfiguration {
  private propertiesMongoConnectionDetails: PropertiesMongoConnectionDetails;
  private client: MongoClient | null = null;

  private readonly log = log.scope('MongoAutoConfiguration');

  constructor(propertiesMongoConnectionDetails: PropertiesMongoConnectionDetails) {
    this.propertiesMongoConnectionDetails = propertiesMongoConnectionDetails;
  }

  public async initialize(): Promise<void> {
    const connectionString: ConnectionString =
      this.propertiesMongoConnectionDetails.getConnectionString();
    this.log.info(connectionString);
    if (!connectionString.uri) {
      throw new Error('MongoDB URI is not configured.');
    }

    try {
      this.client = new MongoClient(connectionString.uri, {});
      Container.set(MongoClient, this.client);
      await this.client.connect();
      this.log.info(`Connected to MongoDB at ${connectionString.uri}`);

      if (connectionString.database) {
        DataSource.connect(this.client, connectionString.database);
        this.log.info(`Using database: ${connectionString.database}`);
      }
    } catch (error) {
      this.log.error('Error connecting to MongoDB:', error);
      throw error;
    }
  }

  public getClient(): MongoClient | null {
    return this.client;
  }

  public async close(): Promise<void> {
    if (this.client) {
      await this.client.close();
      this.log.info('MongoDB connection closed.');
    }
  }
}

export { MongoAutoConfiguration };
