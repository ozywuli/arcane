module.exports = function() {
    return function({ addUtilities, config }) {
        const newUtilities = {};
        const orders = config('order', []);

        for (let key in orders) {
            newUtilities[`.order-${key}`] = {
                order: `${orders[key]}`,
            };
        }

        addUtilities(newUtilities);
    };
};