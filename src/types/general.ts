export type Dict = Record<string, any>;

export type IDate = {
  month: number;
  day: number;
  hour: number;
  min: number;
};

export type IChargeRecord = {
  pileid: number;
  chargeCapacity: number;
  totalMin: number;
  startDate: IDate;
  endDate: IDate;
  chargeFee: number;
  serviceFee: number;
  totalFee: number;
};

export type IReport = {
  pileId: number;
  chargeCapacity: number;
  chargeNum: number;
  chargeFee: number;
  serviceFee: number;
  totalMin: number;
  totalFee: number;
};

export type IPileReport = {
  pileId: number;
  chargeCapacity: number;
  chargeNum: number;
  totalMin: number;
  enable: number;
};
