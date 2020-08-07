import UserModel from '@/models/user.model';
import router from '@/router';
import { ApiService } from '@/services/api.service';
import { setAuthToken, setUserData } from '@/services/auth.service';
import {
  GET_USER, LOGIN_USER, LOGOUT_USER, UPDATE_USER,
} from '@/store/user/actions.type';
import { SET_TOKEN, SET_USER, SET_USER_ERROR } from '@/store/user/mutations.type';

interface State {
  user: UserModel | null;
  errors: any;
  token: string | null;
}

const store: State = {
  user: null,
  errors: null,
  token: null,
};

const getters = {
  user(state: State) {
    return state.user;
  },
  userErrors(state: State) {
    return state.errors;
  },
  token(state: State) {
    return state.token;
  },
};

const actions = {
  [LOGIN_USER]: (context: any, user: UserModel) => {
    ApiService.post('/login', user)
      .then((response) => {
        setUserData(context, response.data);
        router.push('/profile');
      })
      .catch(({ response }) => {
        context.commit(SET_USER_ERROR, response.data);
      });
  },
  [LOGOUT_USER]: (context: any) => {
    localStorage.removeItem('auth-token');
    setAuthToken();
    context.commit(SET_USER, null);
    context.commit(SET_TOKEN, null);
    router.push('/login');
  },
  [GET_USER]: (context: any, token: string) => {
    ApiService.get('/me')
      .then((response) => {
        context.commit(SET_USER, response.data);
        context.commit(SET_TOKEN, token);
      })
      .catch(({ response }) => {
        context.commit(SET_USER_ERROR, response.data);
      });
  },
  [UPDATE_USER]: (context: any, user: UserModel) => {
    ApiService.patch('/me', user)
      .then((response) => {
        context.commit(SET_USER, response.data);
      })
      .catch(({ response }) => {
        context.commit(SET_USER_ERROR, response.data);
      });
  },
};

const mutations = {
  [SET_USER](state: State, user: UserModel) {
    state.user = user;
    state.errors = null;
  },
  [SET_USER_ERROR](state: State, errors: any) {
    state.errors = errors;
  },
  [SET_TOKEN](state: State, token: string | null) {
    state.token = token;
  },
};

export default {
  state: store,
  getters,
  actions,
  mutations,
};
