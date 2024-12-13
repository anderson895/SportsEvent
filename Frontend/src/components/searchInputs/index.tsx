import React from 'react';
import { Button, Input } from 'antd';

interface GlobalSearchProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  allowClear?: boolean;
  enterButton?: React.ReactNode;
  size?: 'large' | 'middle' | 'small';
}

const GlobalSearch: React.FC<GlobalSearchProps> = ({
  placeholder = 'Search...',
  onSearch,
  onChange,
  value,
  allowClear = true,
}) => {
  return (
    <Input.Search
      placeholder={placeholder}
      allowClear={allowClear}
      enterButton={
        <Button
          type="primary"
          style={{
            backgroundColor: '#6a040f', // Customize the background color
            borderColor: '#6a040f',     // Customize the border color if needed
            color: 'white',              // Customize the text color
          }}
        >
          Search
        </Button>
      }
      size='middle'
      value={value}
      onChange={onChange}
      onSearch={onSearch}
      style={{ maxWidth: 400 }}
    />
  );
};

export default GlobalSearch;
