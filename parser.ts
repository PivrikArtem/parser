import {parse} from 'papaparse';
import {readFileSync} from 'fs';

 export class CsvData {
    file: string;
    resultArray: Array<{}>;
    utf: string;

    constructor(file, utf) {
        this.utf = utf;
        this.file = readFileSync(file, this.utf);
        this.resultArray = null;
    }

    private _parseData() {
        return parse(this.file)
    }

    getCsvData(): Array<{}> {
        const csv = this._parseData().data.map((t) => {
            return t.slice(0, 6)
        }).map((t) => {
            return {...t}
        });

        let propNames = csv[0];
        this.resultArray = [];
        for (let i = 1; i < csv.length; i++) {
            let newItem = {};
            let itemFromArray = csv[i];
            Object.keys(propNames).forEach(key => {
                newItem[propNames[key]] = itemFromArray[key];
            });
            this.resultArray.push(newItem);
        }
        return this.resultArray;
    }
}

const scv = new CsvData('./Users.csv', 'utf8');
export const data: Array<{}> = scv.getCsvData();

console.dir(data);
