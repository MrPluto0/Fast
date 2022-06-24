import * as React from 'react';
import { View, StyleSheet, Animated, ViewProps, Easing } from 'react-native';
import { Icon, Text, Button, CheckBox } from '@rneui/base';
import { useTheme } from '@rneui/themed';

interface Props {
  checklist: {
    label: string;
    value: string | number;
  }[];
  onChecked: (value: any) => void;
}

const styles = StyleSheet.create({
  checkboxWrapper: {
    flexDirection: 'row',
  },
});

export const RadioView: React.FC<Props> = props => {
  const [checked, setChecked] = React.useState<boolean[]>(
    new Array(props.checklist.length).fill(false),
  );
  const handleRadio = React.useCallback(
    (index: number) => {
      setChecked(
        checked.map((item, i) => {
          return i === index;
        }),
      );
      props.onChecked(props.checklist[index].value);
    },
    [checked, props],
  );

  return (
    <View style={styles.checkboxWrapper}>
      {props.checklist.map((item, index) => (
        <CheckBox
          key={index}
          containerStyle={{ backgroundColor: 'transparent' }}
          title={item.label}
          checked={checked[index]}
          onPress={() => handleRadio(index)}
        />
      ))}
    </View>
  );
};
