import React from 'react';
import { ResolveTokenValuesResult } from '@/plugin/tokenHelpers';
import DownshiftInput from './DownshiftInput';
import { getLabelForProperty } from '@/utils/getLabelForProperty';

const mapTypeToPlaceHolder = {
  color: 'Border color',
  width: 'Border width',
  style: 'solid | dashed',
};

export default function BorderTokenDownShiftInput({
  name,
  value,
  type,
  resolvedTokens,
  handleChange,
  setInputValue,
  handleToggleInputHelper,
}: {
  name: string,
  value: string;
  type: string;
  resolvedTokens: ResolveTokenValuesResult[];
  handleChange: React.ChangeEventHandler;
  setInputValue: (newInputValue: string, property: string) => void;
  handleToggleInputHelper?: () => void;
}) {
  const onChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => handleChange(e), [handleChange]);
  const handleBorderDownShiftInputChange = React.useCallback((newInputValue: string) => setInputValue(newInputValue, name), [name, setInputValue]);
  const getIconComponent = React.useMemo(() => getLabelForProperty(name), [name]);
  return (
    <DownshiftInput
      name={name}
      value={value}
      type={type}
      label={getIconComponent}
      inlineLabel
      resolvedTokens={resolvedTokens}
      handleChange={onChange}
      setInputValue={handleBorderDownShiftInputChange}
      placeholder={mapTypeToPlaceHolder[name as keyof typeof mapTypeToPlaceHolder]}
      prefix={
        name === 'color' && (
          <button
            type="button"
            className="block w-4 h-4 rounded-sm cursor-pointer shadow-border shadow-gray-300 focus:shadow-focus focus:shadow-primary-400"
            style={{ background: value ?? '#000000', fontSize: 0 }}
            onClick={handleToggleInputHelper}
          >
            {value}
          </button>
        )
      }
      suffix
    />
  );
}
