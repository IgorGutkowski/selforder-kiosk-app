const adminAuth = (req, res, next) => {
    const adminKey = req.header('Admin-Secret-Key');
    if (adminKey && adminKey === process.env.ADMIN_SECRET_KEY) {
        next();
    } else {
        res.status(401).json({ message: "Unauthorized access." });
    }
};

module.exports = adminAuth;