import * as e from "express"
import {Controller} from "../llama";
import {Get} from "../llama/get";
import Fixture from "../db/fixture";

@Controller()
export class FixturesController {

    @Get({path: "/"})
    getAll(request: e.Request, response: e.Response): void {
        Fixture.find({}, (error, fixtures) => {
            if (error) {
                response.send(error);
                return;
            }

            response.send(fixtures);
        })
    }
}