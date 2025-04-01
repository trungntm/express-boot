import { GetMapping, RestController } from '@express-boot/starter-web';
import { Container, Value, Inject, ServerProperties } from '@express-boot/starter-core';
import { HelloWorldService } from '../service/HelloWorldService';
import { HelloWorldServiceImpl } from '../service/HelloWorldServiceImpl';
// import { TestConfig } from '../../test-config';
import { ApiModel, ApiOperation, ApiParam, ApiResponses, Tag } from '@express-boot/starter-swagger';
import { log } from '@express-boot/starter-log';
import {
  PathVariable,
  PostMapping,
  RequestBody,
} from '@express-boot/starter-web/dist/web/annotation';
import { HelloDTO } from '../dto/HelloDTO';

@RestController('/hello')
@Tag('HelloWorld')
export default class HelloController {
  @Inject()
  private readonly serverProperties: ServerProperties;

  // @Inject()
  // private readonly expressApp: TestConfig;

  @Inject(() => HelloWorldServiceImpl)
  private readonly helloWorldService: HelloWorldService;

  @Value('server.port')
  private readonly portNumber: number;

  private readonly logger = log.scope('HelloController');

  @GetMapping('/:name')
  @ApiOperation('Hello world API', 'Hello world API')
  @ApiParam('name', 'path', 'Name of the person to greet')
  @ApiResponses(
    { status: 201, description: 'Created' },
    { status: 401, description: 'Unauthorized' },
    { status: 404, description: 'Not Found' }
  )
  async sayHello(@PathVariable('name') name: string): Promise<string> {
    this.logger.info('sayHello', name);
    console.log(name);
    console.log('serverProperties', this.serverProperties);
    console.log('portNumber', Container.get(ServerProperties).port);
    console.log('portNumber value', this.portNumber);
    return this.helloWorldService.helloWorld();
  }

  @PostMapping('/say')
  @ApiOperation('Hello world API', 'Hello world API')
  @ApiModel('HelloDTO', HelloDTO)
  @ApiResponses(
    { status: 201, description: 'Created' },
    { status: 401, description: 'Unauthorized' },
    { status: 404, description: 'Not Found' }
  )
  async sayHelloPost(@RequestBody() message: HelloDTO): Promise<HelloDTO> {
    this.logger.info('sayHelloPost', message);
    return message;
  }
}
