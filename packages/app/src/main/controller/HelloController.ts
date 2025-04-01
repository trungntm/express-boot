import { GetMapping, RestController } from '@express-boot/starter-web';
import { Container, Value, Inject, ServerProperties } from '@express-boot/starter-core';
import { HelloWorldService } from '../service/HelloWorldService';
import { HelloWorldServiceImpl } from '../service/HelloWorldServiceImpl';
import { TestConfig } from '../../test-config';
import { ApiOperation, ApiResponses, Tag } from '@express-boot/starter-swagger';
import { log } from '@express-boot/starter-log';

@RestController('/hello')
@Tag('HelloWorld')
export default class HelloController {
  @Inject()
  private readonly serverProperties: ServerProperties;

  @Inject()
  private readonly expressApp: TestConfig;

  @Inject(() => HelloWorldServiceImpl)
  private readonly helloWorldService: HelloWorldService;

  @Value('server.port')
  private readonly portNumber: number;

  private readonly logger = log.scope('HelloController');

  @GetMapping('')
  @ApiOperation('Hello world API', 'Hello world API')
  @ApiResponses(
    { status: 201, description: 'Created' },
    { status: 401, description: 'Unauthorized' },
    { status: 404, description: 'Not Found' }
  )
  async sayHello() {
    console.log('serverProperties', this.serverProperties);
    log.scope('Hello').info('serverProperties');
    console.log('portNumber', Container.get(ServerProperties).port);
    console.log('portNumber value', this.portNumber);
    log.scope('Hello').info('expressApp', this.expressApp);
    this.logger.info('expressApp', this.expressApp);
    return this.helloWorldService.helloWorld();
  }
}
