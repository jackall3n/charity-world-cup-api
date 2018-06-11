import * as e from "express"
import {Controller} from "../llama";
import {Get} from "../llama/get";
import Group from "../db/group";

@Controller()
export class GroupsController {

    @Get({path: "/"})
    getAll(request: e.Request, response: e.Response): void {
        Group.find({}, (error, groups) => {
            if (error) {
                response.send(error);
                return;
            }

            response.send(groups);
        })
    }
}