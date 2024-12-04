import { atom } from 'recoil';

export const loginState = atom({
  key: 'loginState', // 고유한 키를 설정
  default: false, // 초기값
});