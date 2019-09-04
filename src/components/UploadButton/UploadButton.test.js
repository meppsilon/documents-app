import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import UploadButton from './UploadButton';

configure({ adapter: new Adapter() });

const props = {
  id: 'upload-test',
  onChange: () => {}
};

describe('<UploadButton />', () => {
  it('renders itself', () => {
    const wrapper = shallow(<UploadButton {...props}>Test</UploadButton>);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders children', () => {
    const wrapper = mount(
      <UploadButton {...props}>
        <div id="test-child">Test</div>
      </UploadButton>
    );
    const child = wrapper.find('#test-child');
    expect(child.exists()).toBe(true);
  });

  it('calls onChange prop on input change event', () => {
    const onChangeSpy = sinon.spy();
    const wrapper = mount(<UploadButton {...props} onChange={onChangeSpy}>Test</UploadButton>);
    const input = wrapper.find(`#${props.id}-input`);
    input.simulate('change');
    expect(onChangeSpy.calledOnce).toBe(true);
    expect(onChangeSpy.getCall(0).args[0].current.files).toBeTruthy();
  });
});
