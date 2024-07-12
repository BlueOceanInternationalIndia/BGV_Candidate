function authServerToken_Authenticate(req, res, next) {
    const authHeader = req.headers['authorization'];
    //If we have an authHeader then split and get the TOKEN
    const token = authHeader && authHeader.split(' ')[1];
    if(!token){
        return res.status(401).json({
            message: 'No token in header',
            constructor: {
                authorization: 'Bearer TOKEN'
            }
        });  
    } else {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, tokenObj) => {
            if(err) {
                return res.status(403).json({
                    message: 'Token Invalid',
                });  
            } else {
                req.user = user
                next();
            }
        });
    }
    
}

export default authServerToken_Authenticate;