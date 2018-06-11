import * as e from "express"
import {Controller} from "../llama";
import {Get} from "../llama/get";
import Match from "../db/match";
import {Post} from "../llama/post";
import Team from "../db/team";

@Controller()
export class MatchesController {

    @Get({path: "/"})
    getAll(request: e.Request, response: e.Response): void {
        Match.find({}, (error, fixtures) => {
            if (error) {
                response.send(error);
                return;
            }

            response.send(fixtures);
        })
    }

    @Post({path: "/add"})
    add(request: e.Request, response: e.Response): void {

        let {
            home,
            away,
            date,
            time
        } = request.body;

        Promise.all([
            Team.find({name: home}),
            Team.find({name: away})
        ]).then(teams => {
            response.send(teams);
        });
    }
}