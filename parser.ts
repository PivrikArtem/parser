import {parse} from 'papaparse';
import {readFileSync} from 'fs';

const file = readFileSync('./Users.csv', 'utf8');
const csvData = parse(file, {
        complete: (result) => result.data
    }
);
const csv = csvData.data.map((t) => {
    return t.slice(0, 6)
}).map((t: string[]) => {
    return {...t}
})

console.dir(csv);