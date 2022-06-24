import { ChargeMode } from '../store/user';
import { transformCamel } from '../utils/transform';
import { GeneralReq, GeneralRes, service } from './base';

interface ChargeRequestReq {
  userId: number;
  chargeCapacity: number;
  chargeRule: ChargeMode;
}

export async function ChargeRequest(data: ChargeRequestReq) {
  let res = await service.post('/charge/request', data);
  return res;
}

export async function CheckChargePool(data: GeneralReq) {
  let res = await service.post('/charge/charge_pool', data);
  return {
    status: res.status,
    data: transformCamel(res.data) as GeneralRes,
  };
}

export async function CheckChargeBegin(data: GeneralReq) {
  let res = await service.post('/charge/charge_pile', data);
  return {
    status: res.status,
    data: transformCamel(res.data) as GeneralRes,
  };
}
