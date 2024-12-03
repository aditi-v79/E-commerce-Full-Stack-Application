import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.user = decoded; // Attach decoded token data to `req.user`
    next();
  } catch (err) {
    res.status(401).json({ error: 'Please authenticate.' });
  }
};

export const isAdmin = (req, res, next) => {
  try {
    if (!req.user?.is_admin) {
      return res.status(403).json({ error: 'Access denied. Admins only.' });
    }
    next();
  } catch (err) {
    res.status(403).json({ error: 'Access denied.' });
  }
};
