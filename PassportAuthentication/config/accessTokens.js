module.exports = {
    ensureToken: function (req, res, next) {
        // if (req.isAuthenticated()) {
        //     return next()
        // }
        // req.flash('error_msg', 'Token Maybe Expired or ')
        // res.redirect('/users/login')
        const bearerHeader = req.headers['authorization']

        if (typeof bearerHeader !== 'undefined') {
            const bearer = bearereHeader.split(' ')
            //Get token from array

            const bearerToken = bearer[1]
            req.token = bearerToken
            next()
        } else {
            res.sendStatus(403)
        }
    },
}
