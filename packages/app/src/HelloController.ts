import { GetMapping, RestController } from '@express-boot/starter-web';

@RestController('/hello')
export default class HelloController {
  @GetMapping('')
  async sayHello() {
    return 'Hello world';
  }
}
