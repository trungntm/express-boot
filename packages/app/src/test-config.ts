import { ConfigurationProperties, ExpressAppProperties } from '@express-boot/starter-core';

@ConfigurationProperties('express')
export class TestConfig extends ExpressAppProperties {
  demo: string = 'test';
}
