const paidAuth = (req, res, next) => {
    const paidKey = req.header('Paid-Secret-Key');
    if (paidKey && paidKey === process.env.PAID) {
        next();
    } else {
        res.status(401).json({ message: "Unauthorized access." });
    }
};

module.exports = paidAuth;
