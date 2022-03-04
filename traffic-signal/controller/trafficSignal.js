const utils = require('../helper/utils')
const Controller = {};


Controller.startTrafficSignal = async () => {
    console.log('Signal started');
    let timer = 60;
    while (timer > 0) {
        timer = await utils.startLight('red', timer, 3);
        timer = await utils.startLight('green', timer, 5);
        timer = await utils.startLight('yellow', timer, 2);
    }
    console.log('Signal stopped');
};

module.exports = Controller;