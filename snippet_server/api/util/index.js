const queryToBoolean = (str) => {
    return str && str.toLowerCase() === 'true' ? true : false;
};

module.exports = {
    queryToBoolean
};
