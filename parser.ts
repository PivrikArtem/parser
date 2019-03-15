import {parse} from 'papaparse';
import {readFileSync} from 'fs';

const file = readFileSync('./Users.csv', 'utf8');
const csvData = parse(file, {
        complete: (result) => result.data
    }
);
export const csv = csvData.data.map((t) => {
    return t.slice(0, 6)
}).map((t: string[]) => {
    return {...t}
})

let propNames =csv[0];
let resultArray = [];
for (let i=1;i<csv.length;i++) {
    let newItem = {};
    let itemFromArray = csv[i];
    Object.keys(propNames).forEach(key => {
        newItem[propNames[key]] = itemFromArray[key];
    });
    resultArray.push(newItem);
}

console.dir(resultArray)