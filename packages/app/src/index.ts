import swaggerUi from 'swagger-ui-express';

import { createExpress, Express, registerRoutes } from '@express-boot/starter-web';
import { log } from '@express-boot/starter-log';

import HelloController from './HelloController';
// import { AppConfig } from './app-config';
import {
  // autoBindConfigurations,
  // getBoundConfiguration,
  StandardEnvironment,
} from '@express-boot/starter-core';
import { generateSwaggerSpec } from '@express-boot/starter-swagger';
// import { ServerProperties } from './server-properties';

const app: Express = createExpress();

const controllers = [HelloController];

const routes = registerRoutes(controllers);

app.use(routes);

const swaggerSpec = generateSwaggerSpec(controllers);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const environment = StandardEnvironment.getInstance();
environment.setActiveProfiles([process.env.NODE_ENV || 'default']);
environment.load();

const serverPort = environment.getProperty('server.port');

app.listen(serverPort, () => {
  log.info(
    `Application started on ${serverPort} with profiles: ${environment.getActiveProfiles()}`
  );
});
