import { ConfigurationProperties } from '@express-boot/starter-core';

export class MongoDataOptions {
  useNewUrlParser: boolean = true;
  useUnifiedTopology: boolean = true;
}

@ConfigurationProperties('express.data.mongodb')
export class MongoDataProperties {
  uri: string = '';
  database: string = '';
  username: string = '';
  password: string = '';
  options: MongoDataOptions = new MongoDataOptions();
}
