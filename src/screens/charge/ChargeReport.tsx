import * as React from 'react';
import { Card, Text } from '@rneui/base';
import { ScrollView, View } from 'react-native';
import { SearchBar } from '@rneui/themed';
import { IReport } from '../../types/general';
import { GetReports } from '../../apis/data';

export function ChargeReport() {
  const [date, setDate] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [reports, setReports] = React.useState<IReport[]>([]);

  const search = React.useCallback(async () => {
    setLoading(true);
    let segs = date.split('/');
    let res = await GetReports({
      month: parseInt(segs[0], 10),
      day: parseInt(segs[1], 10),
      hour: 0,
      min: 0,
    });
    setReports(res);
    setLoading(false);
  }, [date]);

  return (
    <View>
      <SearchBar
        value={date}
        onChangeText={setDate}
        onCancel={search}
        showLoading={loading}
        platform="android"
        placeholder="输入日期，格式为6/12"
      />
      <ScrollView>
        {reports.length > 0 &&
          reports.map((report, index) => (
            <Card key={index}>
              <Card.Title>充电报告</Card.Title>
              <Card.Divider />
              <View>
                <Text>充电桩ID: {report.pileId}</Text>
                <Text>充电次数: {report.chargeNum}</Text>
                <Text>充电时间: {report.totalMin}</Text>
                <Text>充电总量：{report.chargeCapacity}</Text>
                <Text>充电费用：{report.chargeFee.toFixed(2)}</Text>
                <Text>服务费用：{report.serviceFee.toFixed(2)}</Text>
                <Text>总费用：{report.totalFee.toFixed(2)}</Text>
              </View>
            </Card>
          ))}
        {reports.length === 0 && (
          <View
            style={{
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>您暂无充电详单</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
