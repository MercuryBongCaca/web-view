import { getEmployee, getAreaList, getCourseList } from "@/api/base";
const state = {
  employeeList: [],
  areaList: [],
  courseList: [],
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
};
export default { namespaced: true, state, mutations, actions };
