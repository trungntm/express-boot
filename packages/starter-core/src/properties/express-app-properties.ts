import { ConfigurationProperties, NestedConfigurationProperties } from '../env/annotation';

class ApplicationProperties {
  name: string = 'Express Boot Starter';
  version: string = '1.0.0';
  description: string = 'A starter for building Express applications';
}

@ConfigurationProperties('express')
export class ExpressAppProperties {
  @NestedConfigurationProperties()
  application: ApplicationProperties = new ApplicationProperties();
}
