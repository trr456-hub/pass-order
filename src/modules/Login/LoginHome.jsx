/* 액션 타입 선언 */
const LOGIN_REQUEST = "login/LOGIN_REQUEST";
const LOGIN_SUCCESS = "login/LOGIN_SUCCESS";
const LOGIN_FAILURE = "login/LOGIN_FAILURE";

/* 액션 함수 정의 */
export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});
export const loginSuccess = () => ({
  type: LOGIN_SUCCESS,
});
export const loginFailure = () => ({
  type: LOGIN_FAILURE,
});

/* 초기 상태 정의 */
const initialState = {
  loading: false,
  error: false,
};

/* reducer 정의 */
const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

export default loginReducer;
