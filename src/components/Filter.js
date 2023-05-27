import React from 'react';
import PropTypes from 'prop-types';
import '../style/Filter.css';

const Filter = ({ value, onChange }) => (
  <div className="filter-container">
    <p className="filter-label">Filter by Temperature:</p>
    <select className="filter-select" value={value} onChange={onChange}>
      <option className="filter-option" value="">All</option>
      <option className="filter-option" value="cold">Cold (&lt;= 10°C)</option>
      <option className="filter-option" value="moderate">Moderate (10°C - 20°C)</option>
      <option className="filter-option" value="hot">Hot (&gt; 20°C)</option>
    </select>
  </div>
);

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;
