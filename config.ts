export const config = {
    FileInfo: {
        tableName: 'users',
    },
    Name: {
        name: 'Name',
        type: 'string',
        pattern: new RegExp(/^[а-яА-ЯёЁa-zA-Z]{2,20}$/),
        validate: true
    },
    Surname: {
        name: 'Surname',
        type: 'string',
        pattern: new RegExp(/^[а-яА-ЯёЁa-zA-Z]{2,20}$/),
        validate: true
    },
    Mail: {
        name: 'Mail',
        type: 'string',
        pattern: new RegExp(/^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/),
        validate: true
    },
    'Date of registration': {
        name: 'Date_of_registration',
        type: 'DATE',
        dateFormat: 'DD MM YYYY',
        delimiter: [',', ':', '/', '-'],
        conversion: '.',
        validate: true
    },
    Phone: {
        name: 'Phone',
        type: 'number',
        pattern: new RegExp(/^375 (29|25|33|44) [\d]{7}$/),
        validate: true
    },
    ID: {
        validate: false
    }
};
