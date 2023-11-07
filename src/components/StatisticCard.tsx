import React, {FC} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {Card, Title, Text} from 'react-native-paper';

interface StatisticCardProps {
  title: string;
  count: number;
  style?: StyleProp<ViewStyle>;
}

const StatisticCard: FC<StatisticCardProps> = ({title, count, style}) => {
  return (
    <Card style={style}>
      <Card.Content>
        <Title>{count}</Title>
        <Text>{title}</Text>
      </Card.Content>
    </Card>
  );
};

export default StatisticCard;
