import { ConfigurationProperties } from '../env/annotation';

@ConfigurationProperties('server')
export class ServerProperties {
  port: number = 3000;
}
