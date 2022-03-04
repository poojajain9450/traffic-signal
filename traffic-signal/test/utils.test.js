const utils = require('../helper/utils');
const sinon = require('sinon');
const chai = require('chai');


describe("Tests for startLight", ()=> {
  let logSpy;
  beforeEach(() => {
    logSpy = sinon.spy(console, 'log');
    sleepStub = sinon.stub(utils, 'sleep').callsFake((time) => {
            return new Promise((resolve) => {
                console.log('sleep stub time: ', time);
                resolve(time);
            })
        }
    );
  });

  afterEach(() => {
    console.log.restore();
    utils.sleep.restore();
  });

  it("Starts red light for 3sec", async () => {
    const result = await utils.startLight('red', 60, 3)
    chai.expect(result).to.equal(57);
    sinon.assert.calledWith(logSpy, 'Started red light for 3 secs');
    sinon.assert.calledWith(sleepStub, 3000);
  });
});