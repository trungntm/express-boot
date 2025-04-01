import { ApiModelProperty } from '@express-boot/starter-swagger';

export class HelloDTO {
  @ApiModelProperty('string', 'Hello message')
  message: string;
}
