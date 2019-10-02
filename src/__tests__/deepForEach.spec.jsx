import React from 'react';
import { shallow } from 'enzyme';

import deepForEach from '../deepForEach';

describe('deepForEach', () => {
  it('deep each', () => {
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
});
