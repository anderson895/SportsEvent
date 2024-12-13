import React from 'react';
import { Button } from 'antd';
import { type ButtonType } from 'antd/es/button';
import clsx from 'clsx';

interface IBtnProps {
  children: React.ReactNode;
  onClick?: () => void;
  classes?: string;
  type?: ButtonType;
  htmlType?: 'button' | 'submit' | 'reset';
  loading?: boolean;
  size?: 'large' | 'small';
  icon?: React.ReactNode;
  danger?: boolean;
  block?: boolean;
  link?: string;
}

export const CustomButton = (props: IBtnProps) => {
  return (
    <Button
      {...props}
      block={props.block}
      danger={props.danger}
      size={props.size}
      icon={props.icon}
      loading={props.loading}
      htmlType={props.htmlType}
      href={props.link}
      type={props.type}
      onClick={props.onClick}
      className={clsx(
        props.classes,
        'custom-button'
      )}
      style={{
        backgroundColor: '#6a040f',
        color: 'white',
        border: '2px solid #6a040f',
      }}
    >
      {props.children}
    </Button>
  );
};
