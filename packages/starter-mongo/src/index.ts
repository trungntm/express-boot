import { Container } from '@express-boot/starter-core';
import { MongoAutoConfiguration } from './MongoAutoConfiguration';
import { log } from '@express-boot/starter-log';

export * from './annotations';
export * from './repository';
export * from './model';
export * from './domain';
export * from './utils';

// Automatically initialize MongoAutoConfiguration when the module is imported
const { info, error } = log.scope('MongoAutoConfiguration');
(async () => {
  try {
    const mongoAutoConfiguration = Container.get(MongoAutoConfiguration);
    await mongoAutoConfiguration.initialize();
    info('MongoAutoConfiguration initialized successfully.');
  } catch (err) {
    error('Failed to initialize MongoAutoConfiguration:', err);
  }
})();
