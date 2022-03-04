const utils = {};
utils.startLight = async (color, timer, time) => {
    console.log(`Started ${color} light for ${time} secs`);
    await utils.sleep(time * 1000);
    timer = timer - time;
    return timer;
};
  
utils.sleep = (time) => {
    return new Promise((resolve) => {
      setTimeout(resolve, time);
    })
};

module.exports = utils;