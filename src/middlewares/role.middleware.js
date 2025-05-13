const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Você não tem permissão para acessar este recurso.' });
        }
        next();
    }
}

module.exports = authorizeRoles;