import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired
};

const DocumentCard = ({ id, name, size, onDelete }) => (
  <div
    id={id}
    className="border border-gray-500 p-6 m-4"
    style={{ minWidth: 240 }}
  >
    <h3 id={`${id}-name`} className="truncate">
      {name}
    </h3>
    <div className="flex items-center">
      <div id={`${id}-size`} className="flex-1">
        {size}
      </div>
      <button
        id={`${id}-button`}
        className="btn btn-thin px-4"
        onClick={onDelete}
      >
        delete
      </button>
    </div>
  </div>
);

DocumentCard.propTypes = propTypes;

export default DocumentCard;
