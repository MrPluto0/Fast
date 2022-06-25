import { IChargeRecord, IDate, IPileReport, IReport } from '../types/general';
import { GeneralReq, service } from './base';

interface GetTimerRes {
  Date: IDate;
}

interface GetReportsRes {
  Date: IDate;
}

interface GetChargeInfoRes {
  chargeCapacity: number;
  chargeFee: number;
}

interface GetWaitingRestRes {
  waitingRest: number;
}

interface GetWaitingNoRes {
  callNumber: number;
}

export async function GetTimer() {
  let res = await service.post('/data/timer');
  if (res.status === 200) {
    return res.data as GetTimerRes;
  }
}

export async function GetChargeRecords(data: GeneralReq) {
  let res = await service.post('/data/record', data);
  if (res.status === 200) {
    return (res.data.records ?? []) as IChargeRecord[];
  } else {
    return [];
  }
}

export async function GetChargeInfo(data: GeneralReq) {
  let res = await service.post('/data/charge_info', data);
  if (res.status === 200) {
    return res.data as GetChargeInfoRes;
  } else {
    return {} as GetChargeInfoRes;
  }
}

export async function GetWaitingNo(data: GeneralReq) {
  let res = await service.post('/waiting/query_call', data);
  if (res.status === 200) {
    return (res.data as GetWaitingNoRes).callNumber;
  } else {
    return 0;
  }
}

export async function GetWaitingRest(data: GeneralReq) {
  let res = await service.post('/waiting/query_rest', data);
  if (res.status === 200) {
    return (res.data as GetWaitingRestRes).waitingRest;
  } else {
    return 0;
  }
}

export async function GetReports(data: IDate) {
  let res = await service.post('/data/report', data);
  if (res.status === 200) {
    return (res.data.reports ?? []) as IReport[];
  } else {
    return [];
  }
}

export async function GetPileInfo(data: GeneralReq) {
  let res = await service.post('/data/pile_status', data);
  if (res.status === 200) {
    return (res.data.pileReports ?? []) as IPileReport[];
  } else {
    return [];
  }
}
