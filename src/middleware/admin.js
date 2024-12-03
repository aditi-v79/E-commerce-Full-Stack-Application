export const isAdmin = (req, res, next) => {
    try {
        if (!req.user || !req.user.is_admin) {
            return res.status(403).json({ error: 'Access denied. Admins only.' });
        }
        next();
    } catch (err) {
        res.status(500).json({ error: 'Something went wrong!' });
    }
};
