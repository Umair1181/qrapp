const bcrypt = require("bcryptjs");

const PrepPassword = async (data) => {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(data, salt);

    if( hash ){
        return hash;
    }else{
        return false;
    }
}
const ComparePassword = async (inPassword, hash ) => {
    let resp = await bcrypt.compare(`${inPassword}`, `${hash}`); // true
    console.log( "resp: ", resp )
    if( resp ){
        return true;
    }else{
        return false;
    }
}

module.exports = { GeneralConrtller : {PrepPassword, 
    ComparePassword
} }
