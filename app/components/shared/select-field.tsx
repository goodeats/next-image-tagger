'use client';

import React, { useId } from 'react';
import {
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui';
import { Errors, ListOfErrors } from './errors';
// import { cn } from '@/app/lib/utils';
import { SelectViewport } from '@radix-ui/react-select';

type SelectItem = {
  label: string;
  value: string;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
};

export function SelectField({
  labelProps,
  selectProps,
  items,
  errors,
  className,
}: {
  labelProps: React.LabelHTMLAttributes<HTMLLabelElement>;
  selectProps: React.InputHTMLAttributes<HTMLSelectElement>;
  items: SelectItem[];
  errors?: ListOfErrors;
  className?: string;
}) {
  const fallbackId = useId();
  const id = selectProps.id ?? fallbackId;
  const errorId = errors?.length ? `${id}-error` : undefined;

  // a quick and dirty hack to get defaultChecked removed if it's null
  // this way the placeholder will be shown instead
  const { defaultValue, ...otherSelectProps } = selectProps;
  const safeSelectProps = { ...otherSelectProps };

  const SelectItems = () => {
    return items.map(({ label, value, ...otherProps }, i) => {
      return (
        <SelectItem key={i} value={value} {...otherProps}>
          {label}
        </SelectItem>
      );
    });
  };

  const NoSelectItems = () => {
    return (
      <SelectViewport>
        <div>There are no items</div>
      </SelectViewport>
    );
  };

  return (
    <div className={className}>
      <Label htmlFor={id} {...labelProps} />
      <Select
        id={id}
        aria-invalid={errorId ? true : undefined}
        aria-describedby={errorId}
        defaultValue={defaultValue ?? undefined}
        {...(safeSelectProps as any)}
      >
        <SelectTrigger>
          <SelectValue placeholder={selectProps.placeholder ?? 'Select'} />
        </SelectTrigger>
        <SelectContent>
          {items.length > 0 ? <SelectItems /> : <NoSelectItems />}
        </SelectContent>
      </Select>
      {errors?.length ? <Errors errorId={errorId} errors={errors} /> : null}
    </div>
  );
}
