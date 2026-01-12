function multiply(a, b) {
     if (isNaN(a) || isNaN(b)) {
        throw new Error('Both arguments must be numbers');
    }

    return Number(a) * Number(b);
}

module.exports = { multiply };