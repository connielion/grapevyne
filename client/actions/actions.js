import * as types from '../constants/actionTypes';

export const getZipCode = (zipCode) => ({
  type: types.GET_ZIP_CODE,
  payload: zipCode,
});

export const getLocalTips = () => ({
  type: types.GET_LOCAL_TIPS,
  payload: null,
});

export const toggleAddTipsButton = () => ({
  type: types.TOGGLE_ADD_TIPS_BUTTON,
  payload: toggleAddTipsButton
})
