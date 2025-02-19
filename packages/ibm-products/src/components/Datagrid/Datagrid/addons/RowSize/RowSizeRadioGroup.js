/**
 * Copyright IBM Corp. 2021, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { RadioButtonGroup, RadioButton } from '@carbon/react';
import isArray from 'lodash/isArray';
import { pkg } from '../../../../../settings';

const blockClass = `${pkg.prefix}--datagrid__row-size`;

const RowSizeRadioGroup = ({
  rowSizes,
  selectedOption,
  datagridName,
  onChange,
  legendText,
  rowSizeLabels = {
    xl: 'Extra large',
    lg: 'Large (default)',
    md: 'Medium',
    sm: 'Small',
    xs: 'Extra small',
  },
}) => {
  return (
    <div className={`${blockClass}-dropdown`} role="presentation">
      <RadioButtonGroup
        legendText={legendText}
        name="row-height-group"
        orientation="vertical"
        defaultSelected={getBackwardCompatibleRowSize(selectedOption)}
        onChange={onChange}
      >
        {rowSizes &&
          isArray(rowSizes) &&
          rowSizes.map((option) => {
            let labelText;
            try {
              labelText = option.labelText || rowSizeLabels[option.value];
            } catch (e) {
              labelText = option.value;
            }
            return (
              <RadioButton
                className={`${blockClass}-radio-button`}
                key={option.value}
                labelText={labelText}
                value={option.value}
                id={`${datagridName || 'datagrid'}--row-density--${
                  option.value
                }`}
              />
            );
          })}
      </RadioButtonGroup>
    </div>
  );
};
const getBackwardCompatibleRowSize = (rowSize) => {
  // TODO: deprecate this function in next major release (v8) on carbon-components-react
  const rowSizeMap = {
    tall: 'xl',
    normal: 'lg',
    short: 'sm',
    compact: 'xs',
    // md is a new value
  };
  return rowSizeMap[rowSize] || rowSize;
};

RowSizeRadioGroup.defaultProps = {
  rowSizes: [
    {
      value: 'xl', // 64
    },
    {
      value: 'lg', // 48
    },
    {
      value: 'md', // 40
    },
    {
      value: 'sm', // 32
    },
    {
      value: 'xs', // 24
    },
  ],
  selectedOption: 'lg',
};

RowSizeRadioGroup.propTypes = {
  datagridName: PropTypes.string,
  legendText: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  rowSizeLabels: PropTypes.object,
  rowSizes: PropTypes.array.isRequired,
  selectedOption: PropTypes.string.isRequired,
};

export default RowSizeRadioGroup;
