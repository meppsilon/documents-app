import React, { useRef } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onChange: PropTypes.func.isRequired
};

const UploadButton = ({ id, children, onChange }) => {
  const inputEl = useRef(null);
  return (
    <label id={id} className="btn w-full mb-6 md:w-auto md:m-0">
      <input
        id={`${id}-input`}
        type="file"
        className="upload-button-file"
        accept="image/png, image/jpeg"
        multiple
        ref={inputEl}
        onChange={() => onChange(inputEl)}
      />
      {children}
    </label>
  );
};

UploadButton.propTypes = propTypes;

export default UploadButton;
