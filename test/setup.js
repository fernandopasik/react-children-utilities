import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import dirtyChai from 'dirty-chai';

global.expect = chai.expect;
chai.should();
chai.use(dirtyChai);
chai.use(chaiEnzyme());
