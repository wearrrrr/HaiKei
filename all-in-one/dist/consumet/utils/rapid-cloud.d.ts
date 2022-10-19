import { FastifyInstance, RegisterOptions } from "fastify";
declare class RapidCloud {
    private readonly baseUrl;
    private socket;
    sId: undefined;
    constructor();
    returnSID: (fastify: FastifyInstance, options: RegisterOptions) => Promise<void>;
}
export default RapidCloud;
