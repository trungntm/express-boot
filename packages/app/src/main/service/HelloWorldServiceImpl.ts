import { Service } from '@express-boot/starter-web';
import { HelloWorldService } from './HelloWorldService';

@Service()
export class HelloWorldServiceImpl implements HelloWorldService {
  helloWorld(): string {
    return 'Hello World';
  }
}
