import { AuthState } from "./auth.slice";
import authReducer from './auth.slice'

describe('counter reducer', () => {
  const initialState: AuthState = {
    token: null,
    loading: 'idle',
  };
  it('should handle initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual({
      token: null,
      loading: 'idle',
    });
  });
})