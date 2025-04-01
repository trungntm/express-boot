import { ConfigurationProperties, NestedConfigurationProperties } from '@express-boot/starter-core';

class SwaggerInfo {
  title: string = 'API Documentation';
  version: string = '1.0.0';
  description: string = 'Generated Swagger documentation';
}

@ConfigurationProperties('swagger')
export class SwaggerProperties {
  openApiVersion: string = '3.0.0';
  @NestedConfigurationProperties()
  info: SwaggerInfo = new SwaggerInfo();
}
