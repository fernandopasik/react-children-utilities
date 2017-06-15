import React, { cloneElement } from 'react';
import Children from '../src/index.js';
import PropTypes from 'prop-types';
import { shallow } from 'enzyme';

describe('Children', () => {

  it('filter', () => {
    const Filtered = props => <div>{ Children.filter(props.children, item => item.type === 'span') }</div>;
    Filtered.propTypes = { children: PropTypes.node };
    const wrapper = shallow(<Filtered><span>1</span><span>2</span><strong>3</strong></Filtered>);
    expect(wrapper.find('span')).toBePresent();
    expect(wrapper.find('span')).toHaveLength(2);
    expect(wrapper.find('strong')).not.toBePresent();
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
    expect(wrapper.find('.spans b')).toBePresent();
    expect(wrapper.find('.spans b')).toHaveLength(2);
    expect(wrapper.find('.spans strong')).toBeEmpty();
    expect(wrapper.find('.rest span')).toBeEmpty();
    expect(wrapper.find('.rest strong')).toBePresent();
    expect(wrapper.find('.rest strong')).toHaveLength(1);
    expect(wrapper.find('.empty *')).toBeEmpty();
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
    expect(wrapper.find('.mapped')).toBePresent();
    expect(wrapper.find('.mapped')).toHaveLength(4);
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
    expect(texts).toEqual([ '1', '2', '3', '4' ]);
  });

  it('deep find', () => {
    const DeepFound = props => (<div>{ Children.deepFind(props.children, child => child.type === 'i') }</div>);
    DeepFound.propTypes = { children: PropTypes.node };
    const wrapper = shallow(<DeepFound><b>1</b><b>2</b><span><i>3</i></span><i>4</i></DeepFound>);
    expect(wrapper.find('i')).toBePresent();
    expect(wrapper.find('i')).toHaveLength(1);
    expect(wrapper).toHaveText('3');
  });

  it('only text', () => {
    const OnlyText = props => (<div>{ Children.onlyText(props.children) }</div>);
    OnlyText.propTypes = { children: PropTypes.node };
    const wrapper = shallow(
      <OnlyText><span>0</span><b>1</b><span><i>2</i></span><i>3</i></OnlyText>
    );
    expect(wrapper.find('i')).toBeEmpty();
    expect(wrapper.find('b')).toBeEmpty();
    expect(wrapper.find('span')).toBeEmpty();
    expect(wrapper).toHaveText('0123');
  });
});
