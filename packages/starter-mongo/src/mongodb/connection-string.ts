import { MongoDataOptions } from '../properties/mongo-properties';
import { MongoCredentials } from './mongo-credentials';

export class ConnectionString {
  private _uri: string;
  private _database: string;
  private _credentials: MongoCredentials | undefined;
  private _options: MongoDataOptions;

  constructor(
    uri: string,
    database: string,
    credentials: MongoCredentials | undefined,
    options: MongoDataOptions
  ) {
    this._uri = uri;
    this._database = database;
    this._credentials = credentials;
    this._options = options;
  }

  get uri(): string {
    return this._uri;
  }
  set uri(value: string) {
    this._uri = value;
  }
  get database(): string {
    return this._database;
  }
  set database(value: string) {
    this._database = value;
  }
  get credentials(): MongoCredentials | undefined {
    return this._credentials;
  }
  set credentials(value: MongoCredentials | undefined) {
    this._credentials = value;
  }
  get options(): MongoDataOptions {
    return this._options;
  }
  set options(value: MongoDataOptions) {
    this._options = value;
  }
}
