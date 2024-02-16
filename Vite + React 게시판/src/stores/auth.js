import {atom, selector} from 'recoil'

export const userInfoState = atom({
    key: 'auth/user',
    default: null
  });

export const userState = selector({
    key: 'fontSizeLabelState',
    get: ({get}) => {
      const userInfo = get(userInfoState);
      if (!userInfo){
        // persist 
      }
      return userInfo;
    },
    
});