import { action, makeObservable, observable } from 'mobx';
import * as _ from 'lodash';

export type HSCode = {
    code: string;
    description_vi: string;
    unit: string;
};

class GlobalDataStore {
    datas: any = [];

    constructor() {
        makeObservable(this, {
            datas: observable,

            init: action
        });
    }

    init = () => {};
}

export default new GlobalDataStore();
