import { Inject, Service } from '@express-boot/starter-core';
import { MessageRepository } from '../../repository/message-repository';
import { MessageService } from './message-service';
import { Message } from '../../domain/message';
import { Page, PageRequest } from '@express-boot/starter-mongo';

@Service()
export class MessageServiceImpl implements MessageService {
  constructor(@Inject() private readonly messageRepo: MessageRepository) {}

  async create(message: Message): Promise<any> {
    return this.messageRepo.save(message);
  }

  async findAll(): Promise<Message[]> {
    return this.messageRepo.findAll();
  }

  async paginate(page: number, size: number): Promise<Page<Message>> {
    return this.messageRepo.findAllWithPaging({}, PageRequest.ofPageAndLimit(page, size));
  }
}
