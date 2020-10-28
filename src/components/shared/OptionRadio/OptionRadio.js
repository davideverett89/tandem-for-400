import React from 'react';

import './OptionRadio.scss';

const OptionRadio = ({
  option,
  selectedOptionId,
  setSelectedOptionId,
  revealAnswer,
}) => {
  const borderColor = () => {
    if (revealAnswer && option.is_correct) {
      return 'border border-success';
    } if (revealAnswer && option.is_correct === false) {
      return 'border border-danger';
    }
    return '';
  };

  return (
    <div className="OptionRadio m-3">
        <div className={`form-check ${borderColor()} option-radio`}>
            <input
                className="form-check-input text-dark"
                type="radio"
                name="optionRadios"
                id={option.id}
                value={option.id}
                checked={option.id === selectedOptionId}
                onChange={(e) => setSelectedOptionId(e.target.value)}
                disabled={revealAnswer}
            />
            <label className="form-check-label" htmlFor="exampleRadios1">{option.text}</label>
        </div>
    </div>
  );
};

export default OptionRadio;
