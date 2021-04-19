module.exports = (req, res, next) => {  // Middleware used in billingRoutes.js to ensure a user is
    if (!req.user) {                    // logged in to Emaily to purchase credits
        return res.status(401).send({ error: "You must be logged in." });
    }
    next();
};