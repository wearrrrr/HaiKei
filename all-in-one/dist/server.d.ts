declare class Server {
    consumet?: boolean;
    animeez?: boolean;
    port?: number;
    host?: string;
    logging?: boolean;
    constructor({ consumet, animeez, port, host, logging, }: {
        consumet?: boolean;
        animeez?: boolean;
        port?: number;
        host?: string;
        logging?: boolean;
    });
    start(): Promise<void>;
}
export default Server;
