// @flow
import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { deepFilter, deepFind, deepForEach, deepMap, filter, groupByType, onlyText } from '..';

Enzyme.configure({ adapter: new Adapter() });

describe('Children', () => {
  test('filter', () => {
    const Filtered = ({ children }) => (
      <div>{filter(children, (item) => item.type === 'span')}</div>
    );
    Filtered.propTypes = { children: PropTypes.node.isRequired };
    const wrapper = shallow(
      <Filtered>
        <span>1</span>
        <span>2</span>
        <strong>3</strong>
      </Filtered>,
    );
    expect(wrapper.find('span')).toExist();
    expect(wrapper.find('span')).toHaveLength(2);
    expect(wrapper.find('strong')).not.toExist();
  });

  test('deep filter', () => {
    const DeepFiltered = ({ children }) => (
      <div>{deepFilter(children, (item) => item.type === 'span')}</div>
    );
    DeepFiltered.propTypes = { children: PropTypes.node.isRequired };
    const wrapper = shallow(
      <DeepFiltered>
        <span>1</span>
        <span>2</span>
        <span>
          <strong>3</strong>
          <span>
            <strong>4</strong>
            <span>5</span>
          </span>
        </span>
      </DeepFiltered>,
    );
    expect(wrapper.find('span')).toExist();
    expect(wrapper.find('span')).toHaveLength(5);
    expect(wrapper.find('strong')).not.toExist();
  });

  test('group by type', () => {
    const Grouped = ({ children }) => (
      <div>
        <div className="spans">{groupByType(children, ['span', 'i'], 'rest').span}</div>
        <div className="rest">{groupByType(children, ['span', 'i'], 'rest').rest}</div>
        <div className="empty">{groupByType(children, ['span', 'i'], 'rest').i}</div>
      </div>
    );
    Grouped.propTypes = { children: PropTypes.node.isRequired };
    const wrapper = shallow(
      <Grouped>
        <span>
          <b>1</b>
        </span>
        <span>
          <b>2</b>
        </span>
        <strong>3</strong>
      </Grouped>,
    );
    expect(wrapper.find('.spans b')).toExist();
    expect(wrapper.find('.spans b')).toHaveLength(2);
    expect(wrapper.find('.spans strong')).not.toExist();
    expect(wrapper.find('.rest span')).not.toExist();
    expect(wrapper.find('.rest strong')).toExist();
    expect(wrapper.find('.rest strong')).toHaveLength(1);
    expect(wrapper.find('.empty').children()).not.toExist();
  });

  test('deep map', () => {
    const DeepMapped = ({ children }) => (
      <div>
        {deepMap(children, (child) => {
          if (child && child.type === 'b') {
            return cloneElement(child, { ...child.props, className: 'mapped' });
          }
          return child;
        })}
      </div>
    );
    DeepMapped.propTypes = { children: PropTypes.node.isRequired };
    const wrapper = shallow(
      <DeepMapped>
        <b>1</b>
        <b>2</b>
        <span>
          <b>3</b>
        </span>
        <div>
          <div>
            <b>4</b>
          </div>
        </div>
        {null && <div>will not show up</div>}
        {false && <div>will not show up</div>}
        {undefined && <div>will not show up</div>}
      </DeepMapped>,
    );
    expect(wrapper.find('.mapped')).toExist();
    expect(wrapper.find('.mapped')).toHaveLength(4);
  });

  test('deep each', () => {
    const texts = [];
    const DeepForEached = ({ children }) => (
      <div>
        {deepForEach(children, (child) => {
          if (child && child.type === 'b') {
            texts.push(child.props.children);
          }
        })}
      </div>
    );
    DeepForEached.propTypes = { children: PropTypes.node.isRequired };
    shallow(
      <DeepForEached>
        <b>1</b>
        <b>2</b>
        <span>
          <b>3</b>
        </span>
        <div>
          <div>
            <b>4</b>
          </div>
        </div>
        {null && <div>will not show up</div>}
        {false && <div>will not show up</div>}
        {undefined && <div>will not show up</div>}
      </DeepForEached>,
    );
    expect(texts).toStrictEqual(['1', '2', '3', '4']);
  });

  test('deep find', () => {
    const DeepFound = ({ children }) => (
      <div>{deepFind(children, (child) => child.type === 'i')}</div>
    );
    DeepFound.propTypes = { children: PropTypes.node.isRequired };
    const wrapper = shallow(
      <DeepFound>
        <b>1</b>
        <b>2</b>
        <span>
          <i>3</i>
        </span>
        <i>4</i>
        {null && <div>will not show up</div>}
        {false && <div>will not show up</div>}
        {undefined && <div>will not show up</div>}
      </DeepFound>,
    );
    expect(wrapper.find('i')).toExist();
    expect(wrapper.find('i')).toHaveLength(1);
    expect(wrapper.find('span')).not.toExist();
    expect(wrapper).toHaveText('3');
  });

  test('only text', () => {
    const OnlyText = ({ children }) => <div>{onlyText(children)}</div>;
    OnlyText.propTypes = { children: PropTypes.node.isRequired };
    const wrapper = shallow(
      <OnlyText>
        <span>0</span>
        <b>1</b>
        <span>
          <i>2</i>
        </span>
        <i>3</i>
      </OnlyText>,
    );
    expect(wrapper.find('i')).not.toExist();
    expect(wrapper.find('b')).not.toExist();
    expect(wrapper.find('span')).not.toExist();
    expect(wrapper).toHaveText('0123');
  });
});
