import jwt from 'jsonwebtoken';

function rTa_Verify(req, res, next) {
    const authHeader = req.body.auth;
    //If we have an authHeader then split and get the TOKEN
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null){
        return res.status(400).json({
            message: 'No token in header'
            // constructor: {
            //     auth: 'Bearer TOKEN'
            // }
        });  
    }
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, tokenObj) => {
        if(err) {
            console.log('Token Error -> ', err);
            req.valid = false;
        } else {
            // console.log('TOKEN OBJ->', tokenObj);
            req.valid = true;
            req.user = {
                uid: tokenObj.uid,
                id: tokenObj.id,
                name: tokenObj.user
            }
        }

        next();
    });
}

export default rTa_Verify;