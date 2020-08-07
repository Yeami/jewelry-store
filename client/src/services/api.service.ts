import Vue from 'vue';

export const ApiService = {
  get(resource: string, options?: any) {
    return Vue.axios.get(resource, options);
  },
  post(resource: string, value: any) {
    return Vue.axios.post(resource, value);
  },
  patch(resource: string, value: any) {
    return Vue.axios.patch(resource, value);
  },
  delete(resource: string) {
    return Vue.axios.delete(resource);
  },
};
