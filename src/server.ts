import * as express from "express"
import * as logger from "morgan"
import * as bodyParser from "body-parser";
import AppModule from "./app.module";
import RouteService from "./services/route.service";

export default class ApiServer {
    public app: express.Application;
    public mainModule: AppModule = new AppModule();

    public static bootstrap(): ApiServer {
        return new ApiServer();
    }

    constructor() {
        this.app = express();

        this.config();
        this.initialize();
    }

    config() {
        this.app.use(logger('dev'));

        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));

        this.app.use((error: any, request: express.Request, response: express.Response, next: express.NextFunction) => {
            error.status = 404;
            next(error)
        });
    }

    initialize() {
        let baseRouter = RouteService.init(AppModule);

        this.app.all('/', (request : express.Request, response : express.Response, next : express.NextFunction) => {
            response.header("Access-Control-Allow-Origin", "*");
            response.header("Access-Control-Allow-Headers", "X-Requested-With");
            next();
        });

        this.app.use("/", baseRouter)
    }
}