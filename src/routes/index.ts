import {TeamController} from "./teams.controller";
import {FixturesController} from "./fixtures.controller";
import {GroupsController} from "./groups.controller";

let routes: any[] = [{
    path: "/teams",
    controller: TeamController
},{
    path: "/fixtures",
    controller: FixturesController
},{
    path: "/groups",
    controller: GroupsController
}];

export default routes;