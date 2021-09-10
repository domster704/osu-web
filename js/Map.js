// export default class Map {
class Map {
    constructor(...arg) {
        this.mapParams = {
            cs: 4.0,
            ar: 8.0,
            hp: 3.5,
            od: 8.0
        };
        if (arg.length > 0) {
            for (let i in arg) {
                this.mapParams[Object.keys(this.mapParams)[i]] = arg[i];
            }
        }

        this.listNotes = [];
    }
}