const fs = require('fs');
const path = require('path');

module.exports = class Product {
    constructor(t) {
        this.title = t
    }

    save() {
        const p = path.join(path.dirname(process.mainModule.filename), 'data', 'product.json');
        fs.readFile(p, (err, fileContent) => {
            let products = []
            if (!err) {
                products = JSON.parse(fileContent);
            }
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    }

    //Using  static allows us not to create a new instance of product with a dummy data
    static fetchAll(cb) {
        const p = path.join(path.dirname(process.mainModule.filename), 'data', 'product.json');
        fs.readFile(p, (err, fileContent) => {
            if(err) {
                cb([]);
            }
                cb(JSON.parse(fileContent));
        })
    }
}