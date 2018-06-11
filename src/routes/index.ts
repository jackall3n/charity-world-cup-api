import {TeamController} from "./teams.controller";
import {FixturesController} from "./fixtures.controller";

let routes: any[] = [{
    path: "/teams",
    controller: TeamController
},{
    path: "/fixtures",
    controller: FixturesController
}];

export default routes;