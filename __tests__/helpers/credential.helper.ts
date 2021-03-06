import NodeCache from "node-cache";
import { Context } from "@loopback/context";
import { CredentialAuthBindings } from "../../index";
import _ from "lodash";
import { Application } from "@loopback/core";
import { v4 as uuidv4 } from 'uuid';

export class CredentialHelper extends Context {

    private app: Application;

    private insertObjects: Array<{ id: string; key: string; }> = [];

    constructor(app: Application) {
        super();
        this.app = app;
    }

    public async getNodeCache(): Promise<NodeCache> {
        return await this.get(CredentialAuthBindings.NODE_CACHE);
    }

    public async insertFromNodeCache(key: string, val: any): Promise<string> {
        let insertId = uuidv4();
        let nodeCacheObject = await this.app.get(CredentialAuthBindings.NODE_CACHE);
        nodeCacheObject.set(key, val);
        this.insertObjects.push({ id: insertId, key });
        return insertId;
    }

    public async rollbackFromNodeCache(insertId: string): Promise<void> {
        let index = this.insertObjects.findIndex(t => t.id === insertId);
        if (index !== -1) {
            let insertObject = this.insertObjects[index];
            let nodeCacheObject = await this.app.get(CredentialAuthBindings.NODE_CACHE);
            nodeCacheObject.del(insertObject.key);
            this.insertObjects.splice(index, 1);
        }
    }

}
