import {TeamController} from "./teams.controller";
import {MatchesController} from "./matches.controller";
import {GroupsController} from "./groups.controller";
import { AuthController } from "./auth.controller";
import {MeController} from "./me.controller";
import {DonationsController} from "./donations.controller";

let routes: any[] = [{
    path: "/me",
    controller: MeController
},{
    path: "/auth",
    controller: AuthController
},{
    path: "/teams",
    controller: TeamController
},{
    path: "/matches",
    controller: MatchesController
},{
    path: "/groups",
    controller: GroupsController
},{
    path: "/donations",
    controller: DonationsController
}];

export default routes;