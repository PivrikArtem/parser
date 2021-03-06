import {expect} from 'chai';
import {DataBase} from "../app";
import {data} from "../parser";
import {config} from "../config";
import {db} from "../db";

describe('DataBase', () => {
    it('can be initialized new Object of DataBase', () => {
        const s = new DataBase(db);
        expect(s instanceof DataBase).to.equal(true);
    });

    it('can be validation Of DataBase', () => {
        const s = new DataBase(db);
        const csv = s.validationOfData(data, config);
        expect(csv.length).to.equal(9);
    });
    it('can be add data to DataBase', () => {
        const s = new DataBase(db);
        s.addDataToBase(data);

        const count = s.db.get(`SELECT * FROM users;`).mode

        expect(count).to.equal(2);
    });
    it('can be add data to DataBase', () => {
        const s = new DataBase(db);
        s.addDataToBase(data);

        const count = s.db.get(`SELECT * FROM users;`).mode

        expect(count).to.equal(2);
    });
});
