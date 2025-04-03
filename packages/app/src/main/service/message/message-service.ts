import { Page } from '@express-boot/starter-mongo';
import { Message } from '../../domain/message';

export interface MessageService {
  create: (message: Message) => Promise<Message>;
  findAll: () => Promise<Message[]>;
  paginate: (page: number, size: number) => Promise<Page<Message>>;
}
