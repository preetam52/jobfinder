let fs = require('fs');
let rootDir = './public/'

const step1 = (req, res) => {
    if(req.body && req.params.id) {
        let dir = `${rootDir}${req.params.id}`;

        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        fs.readFile(`${dir}/info.json`, 'utf8', (err, data) => {
            if(err) {
                console.log({err});
                let obj = req.body;
                let json = JSON.stringify(obj);
                console.log({json});
                fs.writeFile(`${dir}/info.json`, json, 'utf8', (err, data) => {
                    if (err) {
                        console.log({err});
                        res.status(400).send({message: "Something went wrong", error: err})
                    } else {
                        res.status(200).send({data : obj})
                    }
                });
            }
            else {
                // obj = JSON.parse(data);
                // console.log({obj});
                res.status(400).send("User data already submitted")
            }
        })


    } else {
        res.status(400).send({error: "Data are missing"})
    }
}

const step2 = (req, res) => {
    if(req.body && req.params.id) {
        let dir = `${rootDir}${req.params.id}`;

        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        fs.readFile(`${dir}/info.json`, 'utf8', (err, data) => {
            if(err) {
                res.status(400).send({message: "Something went wrong", error: err})
            }
            else {
                let obj = JSON.parse(data);
                console.log({obj});
                let myObj = req.body;
                obj = {...obj, ...myObj};
                let json = JSON.stringify(obj);

                fs.writeFile(`${dir}/info.json`, json, 'utf8', (err, data) => {
                    if (err) {
                        console.log({err});
                        res.status(400).send({message: "Something went wrong", error: err})
                    } else {
                        res.status(200).send({data : obj})
                    }
                });
            }
        })


    } else {
        res.status(400).send({error: "Data are missing"})
    }
}



module.exports = {
    step1, step2
}