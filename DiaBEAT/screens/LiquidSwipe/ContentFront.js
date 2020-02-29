import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Rect, Text, Image, TSpan } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  title1: {
    fontSize: 48,
    fontWeight: '300'
  },
  title2: {
    fontSize: 48,
    fontWeight: '600'
  },
  description: {
    opacity: 0.5,
    fontSize: 16
  }
});

export default ({ color, backgroundColor, source, title1, title2 }) => {
  return (
    <>
      <Rect
        x={0}
        y={0}
        {...{ width, height }}
        fill={backgroundColor}
        clipPath='url(#mask)'
      />
      <Image x={0} y={0} width={width} href={source} clipPath='url(#mask)' />
      <Text
        x={16}
        y={height / 2 + 100}
        fontSize={48}
        fontWeight={300}
        fill={color}
        clipPath='url(#mask)'
      >
        {title1}
      </Text>
      <Text
        x={16}
        y={height / 2 + 100 + 48}
        fontSize={48}
        fontWeight={600}
        fill={color}
        clipPath='url(#mask)'
      >
        {title2}
      </Text>
      <Text
        y={height / 2 + 100 + 48 * 2}
        fontSize={20}
        fill={color}
        clipPath='url(#mask)'
      >
        <TSpan x={16} dy={0}>
          Avail special benefits accross
        </TSpan>
        <TSpan x={16} dy={16 + 6}>
          all Airports in India
        </TSpan>
        <TSpan x={16} dy={16 + 6}>
          upgrade to PRIME now!
        </TSpan>
      </Text>
    </>
  );
};
