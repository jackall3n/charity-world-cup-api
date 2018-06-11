import * as e from "express"
import {Controller} from "../llama";
import {Get} from "../llama/get";
import Match from "../db/match";
import {Post} from "../llama/post";
import Team from "../db/team";
import * as moment from "moment";

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
        ]).then((teams : any[]) => {
            let match = new Match();

            let home_team = teams[0];
            let away_team = teams[1];

            match.home_team = home_team._id;
            match.away_team = away_team._id;

            match.date = moment(`${date}/2018 ${time}:00`, 'DD/MM/YYYY HH:mm').toDate();

            match.save().then(match => {
                response.send(match);
            })
        });
    }
}