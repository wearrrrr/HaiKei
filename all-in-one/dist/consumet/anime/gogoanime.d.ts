import { FastifyInstance, RegisterOptions } from 'fastify';
declare const routes: (fastify: FastifyInstance, options: RegisterOptions) => Promise<void>;
export default routes;
