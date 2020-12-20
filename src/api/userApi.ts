import axios from 'axios';
import { ProfileInfo } from '../redux/reducers/types';
import routes from '../routes';
import { BaseUserInfo, ServerSuccessResponse, ExtendedUserInfo } from './types';

const login = async (userdata: BaseUserInfo): Promise<ServerSuccessResponse<ProfileInfo>> => {
  const data = await axios.post<ServerSuccessResponse<ProfileInfo>>(routes.authPath(), userdata)
    .then((response) => response.data);
  return data;
};

const register = async (
  userdata: ExtendedUserInfo,
): Promise<ServerSuccessResponse<ProfileInfo>> => {
  const data = await axios.post<ServerSuccessResponse<ProfileInfo>>(routes.profilePath(), userdata)
    .then((response) => response.data);
  return data;
};

export { login, register };
