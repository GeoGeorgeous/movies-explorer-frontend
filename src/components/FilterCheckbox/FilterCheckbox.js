import React from 'react';
import PropTypes from 'prop-types';
import './FilterCheckbox.css';

function FilterCheckbox(props) {
  const { identificator, onCheckBoxToggle } = props;
  const [isChecked, setChecked] = React.useState(true);
  FilterCheckbox.propTypes = {
    identificator: PropTypes.string.isRequired,
    onCheckBoxToggle: PropTypes.func.isRequired, // callback
  };

  function onChange(e) {
    onCheckBoxToggle(!isChecked);
    setChecked(e.target.checked);
  }
  return (
    <input
      id={identificator}
      className="checkbox"
      type="checkbox"
      checked={isChecked}
      onChange={(e) => onChange(e)}
    />
  );
}

export default FilterCheckbox;
