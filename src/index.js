/* eslint-disable no-console */

const fs = require('fs');
const { execute } = require('./system');
const validator = require('./validator');
const CONSTANTS = require('./constants');

const INTERVAL = 200;

function watchAndRun({ filename, cmd }) {
    const finalCmd = `${cmd} ${filename}`;
    execute(finalCmd);

    fs.watchFile(filename, { interval: INTERVAL }, () => {
        console.clear();
        console.log(CONSTANTS.executing);
        execute(finalCmd);
    });
}


function main() {
    try {
        const { runner, filename } = validator({
            runner: process.argv[2],
            filename: process.argv[3],
        });

        watchAndRun({
            filename,
            cmd: runner,
        });
    } catch (err) {
        console.log(err.message);
    }
}

main();
