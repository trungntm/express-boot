import { createExpress, Express, registerRoutes } from '@express-boot/starter-web';
import { log } from '@express-boot/starter-log';
import HelloController from './HelloController';
// import { AppConfig } from './app-config';
import {
  // autoBindConfigurations,
  // getBoundConfiguration,
  StandardEnvironment,
} from '@express-boot/starter-core';
// import { ServerProperties } from './server-properties';

const app: Express = createExpress();

const controllers = [HelloController];

const routes = registerRoutes(controllers);

app.use(routes);

const environment = StandardEnvironment.getInstance();
environment.setActiveProfiles(['development']);
environment.load();
console.log('Environment created');

// autoBindConfigurations(environment);

// const serverProperties = getBoundConfiguration(ServerProperties);
// console.log('Server properties bound:', serverProperties);

// const appConfig = getBoundConfiguration(AppConfig);
// console.log('App config bound:', Container.get(ServerProperties));

app.listen(8080, () => {
  log.info('App start');
});
