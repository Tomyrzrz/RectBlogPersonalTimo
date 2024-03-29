
const mongoose = require("mongoose");
const app = require("./app");
const port = process.env.PORT || 3977;
const { API_VERSION, IP_SERVER, PORT_BD } = require('./config');

mongoose.set("useFindAndModify", false);

mongoose.connect(`mongodb://${IP_SERVER}:${PORT_BD}/timoruizbd`, {useNewUrlParser: true, useUnifiedTopology: true}, (err, res) => {
    if(err){
        throw err;
    }else 
        console.log("La conexion es correct.");

        app.listen(port, () => {
            console.log("API REST");
            console.log(`http://${IP_SERVER}:${port}/api/${API_VERSION}/`);
        }); 
    }
);