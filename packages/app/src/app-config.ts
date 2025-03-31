import 'reflect-metadata';
import { ConfigurationProperties, NestedConfigurationProperties } from '@express-boot/starter-core';

class DatabaseConfig {
  host: string = '';
  port: number = 0;
  username: string = '';
  password: string = '';
}

@ConfigurationProperties('app')
export class AppConfig {
  name: string = '';
  version: string = '';
  @NestedConfigurationProperties()
  database: DatabaseConfig = new DatabaseConfig();
}
