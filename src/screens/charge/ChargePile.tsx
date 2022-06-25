import * as React from 'react';
import { Card, Text } from '@rneui/base';
import { ScrollView, View } from 'react-native';
import { useRecoilState } from 'recoil';
import { userState } from '../../store/user';
import { IPileReport } from '../../types/general';
import { GetPileInfo } from '../../apis/data';

export function ChargePile() {
  const [user, setUser] = useRecoilState(userState);
  const [pileReports, setPileReports] = React.useState<IPileReport[]>([]);

  React.useEffect(() => {
    GetPileInfo({
      userId: user.userId,
    }).then(res => {
      console.log(res);
      setPileReports(res);
    });
  }, []);

  return (
    <View>
      <ScrollView>
        {pileReports.length > 0 &&
          pileReports.map((report, index) => (
            <Card key={index}>
              <Card.Title>充电桩信息</Card.Title>
              <Card.Divider />
              <View>
                <Text>充电桩ID：{report.pileId}</Text>
                <Text>充电时间: {report.totalMin}</Text>
                <Text>充电量：{report.chargeCapacity}</Text>
                <Text>充电次数：{report.chargeNum}</Text>
                <Text>可用性：{report.enable ? '可用' : '不可用/故障'}</Text>
              </View>
            </Card>
          ))}
      </ScrollView>
      {pileReports.length === 0 && (
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
