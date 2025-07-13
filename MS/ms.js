const fs = require('fs')

const data = fs.readFileSync('./MS/exec', 'utf-8', (err=>{
    if (err){
        return err
    }
}))

let object = JSON.parse(data).d

formattedObj = object.split('/n')[0].split(`,{"`)


console.log(formattedObj[15].split(','))