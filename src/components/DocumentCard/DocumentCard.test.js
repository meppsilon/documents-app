import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import DocumentCard from './DocumentCard';

configure({ adapter: new Adapter() });

const props = {
    id: 'document-test',
    name: 'Test',
    size: '100kb',
    onDelete: () => {}
};

describe('<DocumentCard />', () => {
    it('renders itself', () => {
        const wrapper = shallow(<DocumentCard {...props} />);
        expect(wrapper.exists()).toBe(true);
    });

    it('renders name prop', () => {
        const wrapper = mount(<DocumentCard {...props} />);
        const name = wrapper.find(`#${props.id}-name`);
        expect(name.text()).toBe(props.name);
    });

    it('renders size prop', () => {
        const wrapper = mount(<DocumentCard {...props} />);
        const size = wrapper.find(`#${props.id}-size`);
        expect(size.text()).toBe(props.size);
    });

    it('calls onDelete prop when delete button clicked', () => {
        const onDeleteSpy = sinon.spy();
        const wrapper = mount(<DocumentCard {...props} onDelete={onDeleteSpy} />);
        const deleteButton = wrapper.find(`#${props.id}-button`);
        deleteButton.simulate('click');
        expect(onDeleteSpy.calledOnce).toBe(true);
    });
});