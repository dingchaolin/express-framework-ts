/**
 * Created by chaolinding on 2017/10/17.
 */
import {BaseModel} from "../core/baseModel";

export class IndexModel extends BaseModel{
    constructor(){
        super();
        this.tableName = "student";
    }

    async getList(){
        return await this.fetchList( this.DB, this.tableName, "*", {});
    }
}
