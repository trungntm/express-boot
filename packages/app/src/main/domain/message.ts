import { DocumentModel } from '@express-boot/starter-mongo';

export class Message extends DocumentModel {
  from: string;
  to: string;
  subject: string;
  text: string;
}
