import { verify, sign } from 'jsonwebtoken';

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split('')[1];  //token from the rquest

    if(token == null) return res.sendStatus(401);

    verify(token, "Snippet_SceretKEY", (err, user)=> {
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

//this fun is called login api
function genertaeAccessToken(username) {
    return sign({data: username}, "Snippet_ScereteKEY", {
        expireIn: "1h",
    });
}

modules.exports = {
    authenticateToken,
    genertaeAccessToken,
};