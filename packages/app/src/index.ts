import { createExpress, Express, registerRoutes } from '@express-boot/starter-web';
import { log } from '@express-boot/starter-log';
import HelloController from './HelloController';
// import { ServerProperties } from './server-properties';
import { ConfigurationBinder, StandardEnvironment } from '@express-boot/starter-core';
import { ServerProperties } from './server-properties';
// import { ConfigurationBinder } from '@express-boot/starter-core';

const app: Express = createExpress();

const controllers = [HelloController];

const routes = registerRoutes(controllers);

app.use(routes);

const environment = StandardEnvironment.getInstance();
environment.setActiveProfiles(['development']);
environment.load();
console.log('Environment created');

const serverProperties = ConfigurationBinder.bind(ServerProperties, environment);
// const serverProperties = new ServerProperties();
console.log('Server properties bound:', serverProperties);

const port = serverProperties.port;
console.log('Port value:', port);

app.listen(serverProperties.port, () => {
  log.info('App start');
});
