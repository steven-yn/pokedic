import { useRouter } from 'next/router';
import React, { PropsWithChildren } from 'react';
import useNumberFilter from '@/store/useNumberFilter';

const NumberFilter = ({ children }: PropsWithChildren) => {
  return <div>{children}</div>;
};

const StartInput = () => {
  const { startNumberInput, setStartNumberInput } = useNumberFilter();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartNumberInput(Number(e.target.value));
  };
  return <Input value={startNumberInput} onChange={onChange} />;
};

const EndInput = () => {
  const { endNumberInput, setEndNumberInput } = useNumberFilter();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndNumberInput(Number(e.target.value));
  };
  return <Input value={endNumberInput} onChange={onChange} />;
};

interface InputProps {
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ value, onChange }: InputProps) => {
  return (
    <input type="number" value={value || ''} onChange={onChange} min={1} />
  );
};

const Submit = () => {
  const {
    startNumberInput,
    endNumberInput,
    setStartNumberInput,
    setEndNumberInput,
  } = useNumberFilter();

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push({
      query: {
        start: startNumberInput,
        end: endNumberInput,
      },
    });
    setStartNumberInput(startNumberInput);
    setEndNumberInput(endNumberInput);
  };

  return (
    <button type="submit" onClick={handleSubmit}>
      검색
    </button>
  );
};

NumberFilter.StartInput = StartInput;
NumberFilter.EndInput = EndInput;
NumberFilter.Input = Input;
NumberFilter.Submit = Submit;

export default NumberFilter;
