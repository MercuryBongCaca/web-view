import {
  getEmployee,
  getAreaList,
  getCourseList,
  getPaymentTypeList,
  getContractStatusList,
} from "@/api/base";
const state = {
  employeeList: [],
  areaList: [],
  courseList: [],
  paymentTypeList: [],
  contractStatusList: [],
};
const mutations = {
  SET_EMPLOYEELIST: (state, employeeList) => {
    state.employeeList = employeeList;
  },
  SET_AREALIST: (state, areaList) => {
    state.areaList = areaList;
  },
  SET_COURSELIST: (state, courseList) => {
    state.courseList = courseList;
  },
  SET_PAYMENTTYPELIST: (state, paymentTypeList) => {
    state.paymentTypeList = paymentTypeList;
  },
  SET_CONTRACTSTATUSLIST: (state, contractStatusList) => {
    state.contractStatusList = contractStatusList;
  },
};
const actions = {
  setEmployeeList({ commit }) {
    return new Promise((resolve) => {
      getEmployee()
        .then((res) => {
          commit("SET_EMPLOYEELIST", res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  setAreaList({ commit }) {
    return new Promise((resolve) => {
      getAreaList()
        .then((res) => {
          commit("SET_AREALIST", res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  setCourseList({ commit }) {
    return new Promise((resolve) => {
      getCourseList()
        .then((res) => {
          commit("SET_COURSELIST", res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  setPaymentTypeList({ commit }) {
    return new Promise((resolve) => {
      getPaymentTypeList()
        .then((res) => {
          commit("SET_PAYMENTTYPELIST", res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  setContractStatusList({ commit }) {
    return new Promise((resolve) => {
      getContractStatusList()
        .then((res) => {
          commit("SET_CONTRACTSTATUSLIST", res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
export default { namespaced: true, state, mutations, actions };
