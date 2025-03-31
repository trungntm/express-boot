import { GetMapping, RestController } from '@express-boot/starter-web';
import { Container, Value, Inject, ServerProperties } from '@express-boot/starter-core';
import { HelloWorldService } from './main/service/HelloWorldService';
import { HelloWorldServiceImpl } from './main/service/HelloWorldServiceImpl';
import { TestConfig } from './test-config';
import { ApiOperation, ApiResponses, Tag } from '@express-boot/starter-swagger';

@RestController('/hello')
@Tag('HelloWorld')
export default class HelloController {
  @Inject()
  private readonly serverProperties: ServerProperties;

  @Inject()
  private readonly expressApp: TestConfig

  @Inject(() => HelloWorldServiceImpl)
  private readonly helloWorldService: HelloWorldService;

  @Value('server.port')
  private readonly portNumber: number;

  @GetMapping('')
  @ApiOperation('Create wallet API', 'Create Wallet API')
  @ApiResponses(
    { status: 201, description: 'Created' },
    { status: 401, description: 'Unauthorized' },
    { status: 404, description: 'Not Found' }
  )
  async sayHello() {
    console.log('serverProperties', this.serverProperties);
    console.log('portNumber', Container.get(ServerProperties).port);
    console.log('portNumber value', this.portNumber);
    console.log('expressApp', this.expressApp);
    return this.helloWorldService.helloWorld();
  }
}
