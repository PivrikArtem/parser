import {expect} from 'chai';
import {CsvData} from "../parser";

describe('CsvData', () => {
    it('can be initialized new Object of CsvData', () => {
        const s = new CsvData('./Users.csv', 'utf8');
        expect(s.resultArray).to.equal(null);
    });

    it('can be parsed scv data', () => {
        const s = new CsvData('./Users.csv', 'utf8');
        const csv = s.getCsvData();
        expect(csv.length).to.equal(9);
    });
});
