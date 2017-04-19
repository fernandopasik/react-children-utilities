import React, { cloneElement } from 'react';
import Children from '../src/index.js';
import PropTypes from 'prop-types';
import { shallow } from 'enzyme';

describe('Children', () => {

  it('filter', () => {
    const Filtered = props => <div>{ Children.filter(props.children, item => item.type === 'span') }</div>;
    Filtered.propTypes = { children: PropTypes.node };
    const wrapper = shallow(<Filtered><span>1</span><span>2</span><strong>3</strong></Filtered>);
    expect(wrapper).to.have.exactly(2).descendants('span');
    expect(wrapper).to.not.have.descendants('strong');
  });

  it('group by type', () => {
    const Grouped = props => (
      <div>
        <div className="spans">{ Children.groupByType(props.children, [ 'span', 'i' ], 'rest').span }</div>
        <div className="rest">{ Children.groupByType(props.children, [ 'span', 'i' ], 'rest').rest }</div>
        <div className="empty">{ Children.groupByType(props.children, [ 'span', 'i' ], 'rest').i }</div>
      </div>
    );
    Grouped.propTypes = { children: PropTypes.node };
    const wrapper = shallow(
      <Grouped><span><b>1</b></span><span><b>2</b></span><strong>3</strong></Grouped>
    );
    expect(wrapper.find('.spans')).to.have.exactly(2).descendants('b');
    expect(wrapper.find('.spans')).to.not.have.descendants('strong');
    expect(wrapper.find('.rest')).to.not.have.descendants('span');
    expect(wrapper.find('.rest')).to.have.exactly(1).descendants('strong');
    expect(wrapper.find('.empty')).to.be.blank();
  });

  it('deep map', () => {
    const DeepMapped = props => (
      <div>
        { Children.deepMap(props.children,
          child => child.type === 'b'
            ? cloneElement(child, { ...child.props, className: 'mapped' })
            : child
        ) }
      </div>
    );
    DeepMapped.propTypes = { children: PropTypes.node };
    const wrapper = shallow(
      <DeepMapped><b>1</b><b>2</b><span><b>3</b></span><div><div><b>4</b></div></div></DeepMapped>
    );
    expect(wrapper).to.have.exactly(4).descendants('.mapped');
  });

  it('deep each', () => {
    const texts = [];
    const DeepForEached = props => (
      <div>
        { Children.deepForEach(props.children, child => {
          if (child.type === 'b') {
            texts.push(child.props.children);
          }
        }) }
      </div>
    );
    DeepForEached.propTypes = { children: PropTypes.node };
    shallow(
      <DeepForEached><b>1</b><b>2</b><span><b>3</b></span><div><div><b>4</b></div></div></DeepForEached>
    );
    expect(texts).to.eql([ '1', '2', '3', '4' ]);
  });

  it('deep find', () => {
    const DeepFound = props => (<div>{ Children.deepFind(props.children, child => child.type === 'i') }</div>);
    DeepFound.propTypes = { children: PropTypes.node };
    const wrapper = shallow(<DeepFound><b>1</b><b>2</b><span><b>3</b></span><i>4</i></DeepFound>);
    expect(wrapper).to.have.exactly(1).descendants('i');
    expect(wrapper).to.have.text('4');
  });

  it('only text', () => {
    const OnlyText = props => (<div>{ Children.onlyText(props.children) }</div>);
    OnlyText.propTypes = { children: PropTypes.node };
    const wrapper = shallow(
      <OnlyText><span>0</span><b>1</b><span><i>2</i></span><i>3</i></OnlyText>
    );
    expect(wrapper).to.not.have.descendants('i');
    expect(wrapper).to.not.have.descendants('b');
    expect(wrapper).to.not.have.descendants('span');
    expect(wrapper).to.have.text('0123');
  });
});
