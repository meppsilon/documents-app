import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import SearchInput from './SearchInput';

configure({ adapter: new Adapter() });

const props = {
  id: 'upload-test',
  value: 'test value',
  onChange: () => {}
};

describe('<SearchInput />', () => {
  it('renders itself', () => {
    const wrapper = shallow(<SearchInput {...props} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders value', () => {
    const wrapper = mount(<SearchInput {...props} />);
    const input = wrapper.find('input');
    expect(input.getDOMNode().value).toBe('test value');
  });

  it('calls onChange prop on input change event', () => {
    const onChangeSpy = sinon.spy();
    const wrapper = mount(<SearchInput {...props} onChange={onChangeSpy} />);
    const input = wrapper.find('input');
    input.simulate('change', { target: { value: 'new input' } });
    expect(onChangeSpy.calledOnce).toBe(true);
    expect(onChangeSpy.getCall(0).args[0].target.value).toBe('new input');
  });
});

// renders itself
// renders value
// calls onChange
