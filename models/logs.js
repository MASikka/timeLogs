const fs = require('fs');
const path = require('path');

const pathToFile = path.join(path.dirname(require.main.filename), 'data', 'logs.json');

module.exports = class Log {
    constructor(date){
        this.date = date;
    }

     saveLog(){
        fs.readFile(pathToFile, (error, fileContent) =>{
            let logs = [];

            if(!error){
                logs = JSON.parse(fileContent);
                
            } else {
                console.log(error);
            }

            logs.push(this);

            fs.writeFile(pathToFile, JSON.stringify(logs), (error) => {
                if(error){console.log('Error', error);
            }
            
            });
            
    })
    }

    static fetchLogs(callBack){
        fs.readFile(pathToFile, (error, fileContent)=>{
            if(error){
                callBack([]);
            };

            callBack(JSON.parse(fileContent));
        });
    }

}