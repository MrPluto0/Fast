import React from 'react';
import { Icon } from '@rneui/themed';

interface Props {
  focused: boolean;
  color: string;
  size: number;
}

export default function tabIcon(name: string, type?: string) {
  return (props: Props) => {
    return (
      <Icon
        name={name}
        type={type || 'material'}
        color={props.color}
        size={props.size}
      />
    );
  };
}
