module.exports = function() {
    return function({ addUtilities, config }) {
        const newUtilities = {};
        const positions = config('position', []);

        for (let key in positions) {
            newUtilities[`.-top-${key}`] = {
                top: `-${positions[key]}`,
            };
            newUtilities[`.-right-${key}`] = {
                right: `-${positions[key]}`,
            };
            newUtilities[`.-bottom-${key}`] = {
                bottom: `-${positions[key]}`,
            };
            newUtilities[`.-left-${key}`] = {
                left: `-${positions[key]}`,
            };
            newUtilities[`.top-${key}`] = {
                top: positions[key],
            };
            newUtilities[`.right-${key}`] = {
                right: positions[key],
            };
            newUtilities[`.bottom-${key}`] = {
                bottom: positions[key],
            };
            newUtilities[`.left-${key}`] = {
                left: positions[key],
            };
        }

        addUtilities(newUtilities);
    };
};