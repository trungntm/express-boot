import { Db, MongoClient } from 'mongodb';

export class DataSource {
  static db: Db;

  constructor(client: MongoClient, dbName: string) {
    if (!client || !dbName) {
      throw new Error('Database not connected. Call connectDB first.');
    }
    DataSource.db = client.db(dbName);
  }

  static connect(client: MongoClient, dbName: string): void {
    if (!client || !dbName) {
      throw new Error('Database not connected. Call connectDB first.');
    }
    new DataSource(client, dbName);
  }
}
