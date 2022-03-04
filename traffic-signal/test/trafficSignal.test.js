const utils = require('../helper/utils');
const sinon = require('sinon');
const chai = require('chai');
const trafficSignalController = require('../controller/trafficSignal');


describe("Traffic Signal", ()=> {
  let logSpy;
  let trafficLightStub;
  beforeEach(() => {
    logSpy = sinon.spy(console, 'log');

    trafficLightStub = sinon.stub(utils, 'startLight').callsFake((color, timer, time) => {
      return timer - time;
    })
  });

  afterEach(() => {
    console.log.restore();
    utils.startLight.restore();
  });

  it("Alerts the user when power button is on:", async () => {
    await trafficSignalController.startTrafficSignal();
    sinon.assert.calledWith(logSpy, 'Signal started');
  });

  it("Checks red light is on 3secs followed by green light for 5 secs and then yellow light for 2secs until timer of 60 secs is completed", async () => {
    await trafficSignalController.startTrafficSignal();
    sinon.assert.calledWith(trafficLightStub, 'red', 60, 3);
    sinon.assert.calledWith(trafficLightStub, 'green', 57, 5);
    sinon.assert.calledWith(trafficLightStub, 'yellow', 52, 2);
  });

  it('Checks that signals should continue looping for 60 secs', async () => {
    await trafficSignalController.startTrafficSignal();
    sinon.assert.callCount(trafficLightStub, 18);
  });
});