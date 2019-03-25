import {data} from "./parser";
import {config} from "./config";

export class DataBase {
    fs: any;
    sqlite3: any;
    moment: any;
    db: any;

    constructor() {
        this.fs = require('fs');
        this.sqlite3 = require('sqlite3').verbose();
        this.moment = require('moment');
        this.db = new this.sqlite3.Database('./db/users.db', this.sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log('Connected to the users database.');
        });
    }

    validationOfData(csv: Array<{}>, config: object): Array<{}> {
        for (let i = 0; i < csv.length; i++) {
            for (let k in csv[i]) {
                if (config[k]) {
                    if (config[k].validate == true) {
                        if (!csv[i][k].match(config[k].pattern)) {
                            console.log(" \nInvalid data: " + JSON.stringify(csv[i]) + ' - \n' + k + ' - ' + csv[i][k] + '\n');
                            this.fs.appendFile("logData.txt",
                                " \nInvalid data: " + JSON.stringify(csv[i]) + ' - \n' + k + ' - ' + csv[i][k] + '\n',
                                function (error) {
                                    if (error) throw error;
                                });

                            csv[i][k] = '-';
                        }
                    }
                }
            }

            if (config['Date of registration'].validate == true) {
                if (!this.moment(csv[i]['Date of registration'], config['Date of registration'].dateFormat).isValid()
                    || this.moment(csv[i]['Date of registration'], config['Date of registration'].dateFormat).isAfter(this.moment())) {
                    console.log(" \nInvalid data: " + JSON.stringify(csv[i]) + ' - \n' + 'date - ' + csv[i]['Date of registration'] + '\n');
                    this.fs.appendFile("logData.txt", "\nInvalid data: " + JSON.stringify(csv[i]) + ' - \n' + 'date - ' + csv[i]['Date of registration'] + '\n', function (error) {
                        if (error) throw error;
                    });
                    csv[i]['Date of registration'] = '-';
                }
            }
        }
        console.log('\n');
        return csv;

    }

    addDataToBase(csvData: Array<{}>):void {
        let task;

        for (let i = 0; i < csvData.length; i++) {
            task = `INSERT INTO ${config.FileInfo.tableName} (`;

            for (let k in config) {
                if (config[k].validate == true) {
                    task += `${config[k].name},`
                }
            }

            task = task.slice(0, task.length - 1);
            task += `) VALUES (`;

            for (let k in csvData[i]) {
                if (config[k].validate == true) {
                    task += `'${csvData[i][k]}',`
                }
            }
            task = task.slice(0, task.length - 1);
            task += ');';

            this.db.serialize(() => {
                this.db.run(`${task}`);
            });
        }

        this.db.close((err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Close the database connection.');
        });
    }
}

let base = new DataBase();
base.validationOfData(data, config);
base.addDataToBase(data);

