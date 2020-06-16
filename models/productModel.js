const fs=require('fs');
const path=require('path');
const rootDir =require('../util/path');


module.exports=class Product{
    constructor(title,){
        this.title=title;
    }
    save(){
        const locPath=path.join(rootDir,'data','products.json');
        fs.readFile(locPath, (err, fileData)=>{
            let products=[];
            if(!err){
                products =JSON.parse(fileData);
            }
            products.push(this);
            fs.writeFile(locPath,JSON.stringify(products), (err)=>{
                console.log(err);
            });
        });
    }
    static fetchAll(callBack){
        const locPath=path.join(rootDir,'data','products.json');
        fs.readFile(locPath, (err, fileData)=>{
            if(err){
                return callBack([]);
            }
            return callBack(JSON.parse(fileData));
        });
    }
}