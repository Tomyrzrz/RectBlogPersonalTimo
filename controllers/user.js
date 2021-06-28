const bcrypt = require('bcrypt-nodejs');
const User = require('../models/user');
const jwt = require('../services/jwt');

function signUp(req, res) {
    const user = new User();
    const {name, lastname, email, password, repeatPassword} = req.body;
    user.email = email.toLowerCase();
    user.name = name;
    user.lastname = lastname;
    user.role = 'admin';
    user.active = true;
    if(!password || !repeatPassword){
        res.status(404).send({message: 'Las contraseñas deben estar iguales'});
    }else{
        if(password !== repeatPassword){
            res.status(404).send({message: 'Las contraseñas NO son iguales'});
        }else{
            
            bcrypt.hash(password, null, null, function(err, hash){
                if(err){
                    res.status(500).send({message: 'Error al encriptar password.'})
                }else{
                    user.password = hash;
                    user.save((err, userStored) => {
                        if(err){
                            res.status(500).send({message: "El usuario ya existe."});
                        }else{
                            if(!userStored){
                                res.status(404).send({message: 'Error al crear el usuario.'})
                            }else{
                                res.status(200).send({user: "Usuario creado."});
                            }
                        }
                    });
                }
            });
            //res.status(200).send({message: 'Usuario creado.'});
        }
    }
    user.password = password;
}

function signIn(req, res){
    const params = req.body;
    const email = params.email.toLowerCase();
    const password = params.password;
    User.findOne({email}, (err, userStored) => {
        if(err){
            res.status(500).send({message: "Error del servidor ."});
        }else{
            if(!userStored){
                res.status(404).send({message:"Usuario no encontrado"})
            }else{
                bcrypt.compare(password, userStored.password, (err, check) => {
                    if(err){
                        res.status(500).send({message: "Error del servidor."});
                    }else if(!check){
                        res.status(404).send({message: "Error contraseña no correcta"});
                    }else{
                        if(!userStored.active){
                            res.status(200).send({code: 200, message:"El usuario no se ha activado."});
                        }else{
                            res.status(200).send({
                                accessToken: jwt.createAccessToken(userStored),
                                refreshToken: jwt.createRefreshToken(userStored)
                            });
                        }
                    }
                });
            }
        }
    });
}

module.exports = {
    signUp,
    signIn
};
