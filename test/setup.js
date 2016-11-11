require('babel-register')({ plugins: [ 'istanbul' ] });

const
  chai = require('chai'),
  chaiEnzyme = require('chai-enzyme'),
  dirtyChai = require('dirty-chai');

global.expect = chai.expect;
chai.should();
chai.use(dirtyChai);
chai.use(chaiEnzyme());
