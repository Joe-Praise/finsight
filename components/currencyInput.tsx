import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';

interface FormattedNumberInputProps {
  value: number | null;
  onChange: (val: number | null) => void;
  placeholder?: string;
  id?: string;
  name?: string;
  useThousandSeparator?: boolean;
  maxDecimalPlaces?: number;
}

export const FormattedNumberInput = ({
  value,
  onChange,
  placeholder,
  id,
  name,
  useThousandSeparator = true,
  maxDecimalPlaces = 3,
}: FormattedNumberInputProps) => {
  const [displayValue, setDisplayValue] = useState('');

  useEffect(() => {
    if (value !== null && !isNaN(value)) {
      const options: Intl.NumberFormatOptions = {
        minimumFractionDigits: 0,
        maximumFractionDigits: maxDecimalPlaces,
        useGrouping: useThousandSeparator,
      };
      setDisplayValue(value.toLocaleString(undefined, options));
    } else {
      setDisplayValue('');
    }
  }, [value, useThousandSeparator, maxDecimalPlaces]);

  const formatInput = (raw: string) => {
    // Remove everything except numbers and dot
    let cleaned = raw.replace(/[^0-9.]/g, '');

    // Avoid multiple dots
    const parts = cleaned.split('.');
    if (parts.length > 2) {
      cleaned = parts[0] + '.' + parts.slice(1).join('');
    }

    const [intPart, decPart] = cleaned.split('.');
    const formattedInt = useThousandSeparator
      ? intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      : intPart;

    return decPart !== undefined ? `${formattedInt}.${decPart}` : formattedInt;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const formatted = formatInput(raw);
    setDisplayValue(formatted);

    const numeric = parseFloat(formatted.replace(/,/g, ''));
    onChange(!isNaN(numeric) ? numeric : null);
  };

  return (
    <Input
      id={id}
      name={name}
      inputMode='decimal'
      type='text'
      placeholder={placeholder}
      value={displayValue}
      onChange={handleChange}
    />
  );
};
