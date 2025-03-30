import { GetMapping, RestController } from '@express-boot/starter-web';
import { ServerProperties } from './server-properties';
import { Inject, Value } from '@express-boot/starter-core';

@RestController('/hello')
export default class HelloController {
  @Inject()
  private readonly serverProperties: ServerProperties;

  @Value('server.port')
  private readonly portNumber: number;

  @GetMapping('')
  async sayHello() {
    console.log('serverProperties', this.serverProperties);
    console.log('portNumber', this.portNumber);
    return 'Hello world';
  }
}
