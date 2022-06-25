import { UserType } from '../store/user';
import { GeneralReq, service } from './base';

interface RegisterUserReq {
  userName: string;
  userPassword: string;
  userType: UserType;
}

interface LoginUserReq {
  userName: string;
  userPassword: string;
}

interface LoginUserRes {
  userId: number;
  userType: number;
}

export async function RegisterUser(data: RegisterUserReq) {
  let res = await service.post('/user/register', data);
  return res;
}

export async function LoginUser(data: LoginUserReq) {
  let res = await service.post('/user/login', data);
  return {
    status: res.status,
    data: res.data as LoginUserRes,
  };
}

export async function LogoutUser(data: GeneralReq) {
  let res = await service.post('/user/logout', data);
  return res;
}
