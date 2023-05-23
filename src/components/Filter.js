import React from 'react';
import PropTypes from 'prop-types';

const Filter = ({ value, onChange }) => (
  <select value={value} onChange={onChange}>
    <option value="">All</option>
    <option value="cold">Cold (&lt;= 10°C)</option>
    <option value="moderate">Moderate (10°C - 20°C)</option>
    <option value="hot">Hot (&gt; 20°C)</option>
  </select>
);

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;
