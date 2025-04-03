import { MongoRepository, MongoRepositoryImpl, Repository } from '@express-boot/starter-mongo';
import { Message } from '../domain/message';

@Repository('message')
export class MessageRepository
  extends MongoRepositoryImpl<Message>
  implements MongoRepository<Message> {}
