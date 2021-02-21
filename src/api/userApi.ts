import axios from 'axios';
import i18n from 'i18next';
import { ProfileInfo } from '../redux/ducks/types';
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

// TO-DO
// Прикрутить ошибки смены языка

const changeUserLanguage = async (language: string) : Promise<string> => {
  await i18n.changeLanguage(language);
  return i18n.language;
};

export { login, register, changeUserLanguage };
