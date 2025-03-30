import { Express } from 'express';

import {
  RestController,
  GetMapping,
  PostMapping,
  PutMapping,
  DeleteMapping,
  PatchMapping,
} from './web/annotation';
import { Container, Service } from '@express-boot/starter-core';
import { registerRoutes } from './web/handler/route-handler';

import { createExpress } from './express/create-express';

export type { Express };

export {
  Container,
  Service,
  GetMapping,
  PostMapping,
  PutMapping,
  DeleteMapping,
  PatchMapping,
  RestController,
  registerRoutes,
  createExpress,
};
