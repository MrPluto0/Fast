import * as React from 'react';
import { Card, Text } from '@rneui/base';
import { ScrollView, View } from 'react-native';
import { GetChargeRecords } from '../../apis/data';
import { useRecoilState } from 'recoil';
import { ChargeMode, userState } from '../../store/user';
import { IChargeRecord } from '../../types/general';
import { transformDate } from '../../utils/transform';

export function ChargeRecord() {
  const [user, setUser] = useRecoilState(userState);
  const [chargeRecords, setChargeRecords] = React.useState<IChargeRecord[]>([]);

  React.useEffect(() => {
    GetChargeRecords({
      userId: user.userId,
    }).then(res => {
      setChargeRecords(res);
    });
  }, []);

  return (
    <View>
      <ScrollView>
        {chargeRecords.length > 0 &&
          chargeRecords.map((record, index) => (
            <Card key={index}>
              <Card.Title>充电信息</Card.Title>
              <Card.Divider />
              <View>
                <Text>开始时间：{transformDate(record.startDate)}</Text>
                <Text>结束时间：{transformDate(record.endDate)}</Text>
                <Text>充电时间: {record.totalMin}</Text>
                <Text>充电量：{record.chargeCapacity}</Text>
                <Text>充电费用：{record.chargeFee.toFixed(2)}</Text>
                <Text>服务费用：{record.serviceFee.toFixed(2)}</Text>
                <Text>总费用：{record.totalFee.toFixed(2)}</Text>
              </View>
            </Card>
          ))}
      </ScrollView>
      {chargeRecords.length === 0 && (
        <View
          style={{
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>您暂无充电详单</Text>
        </View>
      )}
    </View>
  );
}
