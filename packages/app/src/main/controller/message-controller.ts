import { Inject } from '@express-boot/starter-core';
import { log } from '@express-boot/starter-log';
import { MessageServiceImpl } from '../service/message/message-service-impl';
import { MessageService } from '../service/message/message-service';
import { Message } from '../domain/message';
import { GetMapping, PostMapping, RestController } from '@express-boot/starter-web';
import { ApiOperation, ApiParam, ApiResponses, Tag } from '@express-boot/starter-swagger';
import { RequestParam } from '@express-boot/starter-web/dist/web/annotation';
import { Page } from '@express-boot/starter-mongo';

@RestController('/api/message')
@Tag('Message')
export class MessageController {
  private readonly logger = log.scope('MessageController');

  constructor(@Inject(() => MessageServiceImpl) private readonly messageService: MessageService) {
    // Initialize the message controller
  }

  @PostMapping('')
  @ApiOperation('Create message', '')
  @ApiResponses(
    { status: 201, description: 'Created' },
    { status: 401, description: 'Unauthorized' },
    { status: 404, description: 'Not Found' }
  )
  async createMessage(): Promise<Message> {
    // Logic to create a message
    const message = {
      from: 'test',
      to: 'test',
      subject: 'test',
      text: 'test',
    } as Message;
    this.logger.info('Creating message', message);
    return await this.messageService.create(message);
  }

  @GetMapping('')
  @ApiOperation('Get all messages', '')
  @ApiResponses(
    { status: 200, description: 'OK' },
    { status: 401, description: 'Unauthorized' },
    { status: 404, description: 'Not Found' }
  )
  async getAllMessages(): Promise<Message[]> {
    // Logic to get all messages
    this.logger.info('Getting all messages');

    return await this.messageService.findAll();
  }

  @GetMapping('/paging')
  @ApiOperation('Test message', '')
  @ApiResponses(
    { status: 200, description: 'OK' },
    { status: 401, description: 'Unauthorized' },
    { status: 404, description: 'Not Found' }
  )
  @ApiParam('page', 'query', 'Page number')
  @ApiParam('limit', 'query', 'Limit number')
  async pagingMessage(
    @RequestParam('page') page: number,
    @RequestParam('limit') limit: number
  ): Promise<Page<Message>> {
    // Logic to get paginated messages
    this.logger.info('Getting paginated messages', page, limit);

    return await this.messageService.paginate(page, limit);
  }
}
