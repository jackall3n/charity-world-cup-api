import * as e from "express"
import {Controller} from "../llama";
import {Get} from "../llama/get";
import Group from "../db/group";

@Controller()
export class GroupsController {

    @Get({path: "/"})
    getAll(request: e.Request, response: e.Response): void {
        Group.find({}, 'name -_id', {
            sort: {
                letter: 1
            }
        }).populate({
            path: 'teams',
            select: 'name -_id'
        }).exec().then(groups => {
            response.send(groups);
        }).catch(error => {
            response.send(error);
        });
    }
}