import { createExpress, Express, registerRoutes } from '@express-boot/starter-web';
import { log } from '@express-boot/starter-log'
import HelloController from './HelloController';

const app: Express = createExpress();

const controllers = [HelloController];

const routes = registerRoutes(controllers);

app.use(routes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  log.info('App start');
});
