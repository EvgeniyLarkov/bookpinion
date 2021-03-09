import axios from 'axios';
import paths from '../paths';
import { MetaGetResponse, ServerSuccessResponse } from './types';

const fetchMetaData = async (): Promise<ServerSuccessResponse<MetaGetResponse>> => {
  const data = await axios
    .get<ServerSuccessResponse<MetaGetResponse>>(paths.metaPath())
    .then((response) => response.data);
  return data;
};

// eslint-disable-next-line import/prefer-default-export
export { fetchMetaData };
