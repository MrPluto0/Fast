import { ChargeMode } from '../store/user';
import { GeneralReq, GeneralRes, service } from './base';

interface ChargeRequestReq {
  userId: number;
  chargeCapacity: number;
  chargeRule: ChargeMode;
}

interface ChargeChangeReq {
  userId: number;
  chargeCapacity?: number;
  chargeRule?: ChargeMode;
}

export async function ChargeRequest(data: ChargeRequestReq) {
  let res = await service.post('/charge/request', data);
  return {
    status: res.status,
  };
}

export async function CheckChargePool(data: GeneralReq) {
  let res = await service.post('/charge/charge_pool', data);
  return {
    status: res.status,
    data: res.data as GeneralRes,
  };
}

export async function CheckChargeBegin(data: GeneralReq) {
  let res = await service.post('/charge/charge_pile', data);
  return {
    status: res.status,
    data: res.data as GeneralRes,
  };
}

export async function CheckChargeExit(data: GeneralReq) {
  let res = await service.post('/charge/exit', data);
  return {
    status: res.status,
    data: res.data as GeneralRes,
  };
}

export async function ChargeTerminate(data: GeneralReq) {
  let res = await service.post('/charge/terminate', data);
  return {
    status: res.status,
    data: res.data as GeneralRes,
  };
}

export async function ChargeChange(data: ChargeChangeReq) {
  if (!data.chargeCapacity) {
    data.chargeCapacity = 0;
  }
  if (!data.chargeRule) {
    data.chargeRule = ChargeMode.NONE;
  }
  let res = await service.post('/charge/change', data);
  return {
    status: res.status,
  };
}
