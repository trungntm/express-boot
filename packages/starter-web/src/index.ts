import { Express } from 'express';

import {
  RestController,
  GetMapping,
  PostMapping,
  PutMapping,
  DeleteMapping,
  PatchMapping,
} from './web/annotation';
import { Container } from 'typedi';
import { registerRoutes } from './web/handler/route-handler';

import { createExpress } from './express/create-express';

export type { Express };

export {
  Container,
  GetMapping,
  PostMapping,
  PutMapping,
  DeleteMapping,
  PatchMapping,
  RestController,
  registerRoutes,
  createExpress,
};
