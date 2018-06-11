import * as e from "express"
import {Controller} from "../llama";
import {Get} from "../llama/get";
import Team from "../db/team";

@Controller()
export class TeamController {

    @Get({path: "/"})
    getAll(request: e.Request, response: e.Response): void {
        Team.find({}, (error, teams) => {
            if (error) {
                response.send(error);
                return;
            }

            response.send(teams);
        })
    }
}