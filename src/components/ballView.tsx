import * as React from 'react';
import { View, StyleSheet, Animated, ViewProps, Easing } from 'react-native';
import { Icon, Text, Button } from '@rneui/base';
import { useTheme } from '@rneui/themed';

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    borderRadius: 50,
    borderWidth: 2,
    width: 100,
    height: 100,
    padding: 3,
  },
  inner: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    borderRadius: 50,
    overflow: 'hidden',
  },
  water: {
    position: 'absolute',
    width: 200,
    height: 200,
    left: '-50%',
    borderRadius: 70,
    top: '60%',
    zIndex: 10,
  },
});

interface Props extends ViewProps {
  title?: string;
}

export const BallView: React.FC<Props> = props => {
  const { theme } = useTheme();

  const startVal = React.useRef(new Animated.Value(0)).current;
  const endVal = 100;

  React.useEffect(() => {
    Animated.loop(
      Animated.timing(startVal, {
        toValue: endVal,
        duration: 15000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, [startVal]);

  const rotate = startVal.interpolate({
    inputRange: [0, endVal],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={{ ...styles.wrapper, borderColor: theme.colors.primary }}>
      <View style={styles.inner}>
        <Text style={{ color: theme.colors.black }}>{props.title}</Text>
        <Animated.View
          style={[
            styles.water,
            {
              transform: [{ rotate }, { translateY: 5 }],
              backgroundColor: theme.colors.primary,
              opacity: 0.2,
            },
          ]}
        />
        <Animated.View
          style={[
            styles.water,
            {
              transform: [{ rotate }],
              backgroundColor: theme.colors.primary,
              opacity: 0.4,
            },
          ]}
        />
      </View>
    </View>
  );
};
