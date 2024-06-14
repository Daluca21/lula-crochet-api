const capture = (callback) =>
    async (req, res, next) => {
        try {
            return await callback(req, res, next);

        }
        catch (err) {
            errorPrint(err, req, res, next);
        }
    };
const errorPrint = (err, req, res, next) => {
    console.error(err.stack);

    if (res.headersSent) {
        return next(err);
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(400).json({ error: err.message });

};
const printErrorValidator = (err, req, res, next) => {
    console.error(err.message);
    if (res.headersSent) {
        return next(err);
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(400).json({ error: err.message });
};

module.exports = {
    capture,
    errorPrint,
    printErrorValidator
}