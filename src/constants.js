import {Alert, Spin} from 'antd/lib/index'

export const API_ROOT = 'https://around-75015.appspot.com/api/v1';
export const GEO_OPTIONS = {
  enableHighAccuracy:true,
  maximumAge: 3600000,
  timeout:27000
}

export const AUTH_PREFIX = "Bearer";