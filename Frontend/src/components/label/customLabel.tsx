import React from 'react';
import { Typography } from 'antd';
import clsx from 'clsx';

interface labelProps {
  children: React.ReactNode;
  variant: 'text' | 'title';
  titleLevel?: 1 | 2 | 3 | 4 | 5;
  disabled?: boolean;
  textType?: 'secondary' | 'success' | 'warning' | 'danger';
  classes?: string;
}

const { Title, Text } = Typography;
export default function CustomLabel({
  children,
  variant = 'text',
  titleLevel,
  disabled,
  textType,
  classes,
}: labelProps) {
  return variant === 'text' ? (
    <Text className={clsx(classes)} type={textType}>
      {children}
    </Text>
  ) : (
    <Title level={titleLevel} className={clsx(classes)} disabled={disabled}>
      {children}
    </Title>
  );
}
