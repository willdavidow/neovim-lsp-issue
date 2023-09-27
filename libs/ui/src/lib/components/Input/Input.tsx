'use client';
import { InputHTMLAttributes, forwardRef, useState } from 'react';
import { UseControllerProps, useController } from 'react-hook-form';
import clsx from 'clsx';
import { cn } from '../../utils/css-utils';

type InputProps = {
  /**
   * ID for this input field (required)
   */
  id: string;
  /**
   * Label for input field (required)
   */
  label: string;
} & Pick<
  InputHTMLAttributes<HTMLInputElement>,
  | 'autoFocus'
  | 'tabIndex'
  | 'value'
  | 'name'
  | 'type'
  | 'className'
  | 'onChange'
  | 'onBlur'
  | 'onFocus'
  | 'onInput'
  | 'autoComplete'
>;

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    id,
    className: _className,
    label,
    type = 'text',
    autoComplete = 'on',
    name = id,
    tabIndex = 0,
    onBlur,
    onChange,
    onFocus,
    ...rest
  } = props as InputProps;
  const [inputValue, setInputValue] = useState('');
  const [inputFocus, setInputFocus] = useState(false);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (onBlur) onBlur(e);
    setInputFocus(false);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e);
    setInputValue(e.target.value);
  };
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (onFocus) onFocus(e);
    setInputFocus(true);
  };

  return (
    <div className='relative h-min'>
      <input
        id={id}
        ref={ref}
        name={name}
        type={type}
        className={clsx(
          'w-full pt-4 pb-1 leading-none text-sm font-bold text-blue border-blue peer',
          _className
        )}
        onBlur={handleBlur}
        onChange={handleChange}
        onFocus={handleFocus}
        value={inputValue}
        autoComplete={autoComplete}
        tabIndex={tabIndex}
        {...rest}
      />
      <label
        className={clsx(
          'absolute top-1/2 left-3 transition-transform ease-in-out duration-125 origin-left text-sm font-bold',
          inputFocus || inputValue.length
            ? 'scale-[0.715] -translate-y-[100%] font-semibold'
            : 'scale-1 -translate-y-[40%]',
          'peer-autofill:scale-[0.715] peer-autofill:-translate-y-[100%] peer-autofill:font-semibold'
        )}
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
});

type ValidatableInputProps = Pick<UseControllerProps, 'control' | 'name'> &
  InputProps;

export const ValidatableInput = (props: ValidatableInputProps) => {
  const { control, name } = props;
  const { field, fieldState } = useController({ control, name });

  return (
    <div className={clsx('flex flex-col relative')}>
      <Input
        {...field}
        id={props.id}
        className={cn(
          props.className,
          fieldState.error &&
            '!border-red focus:!ring-red'
        )}
        label={props.label}
        type={props.type}
        autoComplete={props.autoComplete}
      />
      {fieldState.error && (
        <span className='inline-flex items-center gap-1 pt-1 font-semibold text-11 text-red'>
          {fieldState.error.message}
        </span>
      )}
    </div>
  );
};
