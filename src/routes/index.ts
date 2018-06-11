import {TeamController} from "./teams.controller";
import {MatchesController} from "./matches.controller";
import {GroupsController} from "./groups.controller";
import { AuthController } from "./auth.controller";

let routes: any[] = [{
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
}];

export default routes;