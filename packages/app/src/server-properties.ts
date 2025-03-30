import { ConfigurationProperties } from '@express-boot/starter-core';

@ConfigurationProperties('server')
export class ServerProperties {
  port: number = 3000;

}
