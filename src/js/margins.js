const fs = require('fs');

let margins = {
    'auto': 'auto',
    'px': '1px',
    '0': '0',
    '6': '0.6rem',
    '9': '0.9rem',
    '12': '1.2rem',
    '16': '1.6rem',
    '18': '1.8rem',
    '21': '2.1rem',
    '24': '2.4rem',
    '27': '2.7rem',
}

for (key in margins) {
    console.log(`
        .ml-${key} {
            margin-left: ${margins[key]};
        }
    `);
}

console.log(margins);

fs.writeFile("text.md", "Hey there!!!", function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 