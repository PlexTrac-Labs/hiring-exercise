import { expect } from "chai";
import { shallowMount, config } from "@vue/test-utils";
import { UItests } from "../tests";
import Vue from "vue";
import store from "../testStore";

// Components
import Welcome from "@/components/Welcome.vue";
import UserDialog from "@/components/UserDialog.vue";
import CreateUpdateUser from "@/components/UserDialogContainers/CreateUpdateUser.vue";
import Dashboard from "@/components/Dashboard.vue";
import ChangePassword from "@/components/ChangePassword.vue";
import DeleteUser from "@/components/UserDialogContainers/DeleteUser.vue";

const componentDict = {
  Welcome: Welcome,
  UserDialog: UserDialog,
  CreateUpdateUser: CreateUpdateUser,
  Dashboard: Dashboard,
  ChangePassword: ChangePassword,
  DeleteUser: DeleteUser
};

config.mocks.$store = store;

UItests.forEach(test => {
  describe(`Verifies the ${test.component} and its elements render`, () => {
    test.elements.forEach(element => {
      // This is to simulate the eventPool used in the app
      Vue.prototype.$eventPool = new Vue();

      it(`${element.name} is rendered correctly`, () => {
        const wrapper = shallowMount(componentDict[test.component]);

        switch (test.component) {
          case "CreateUpdateUser": {
            wrapper.setProps({
              context: test.props.context
            });
            wrapper.vm.$nextTick(() => {
              const el = wrapper.find(`#${element.name}`);

              expect(el.exists()).to.equal(true);

              if (element.type === "text-input") {
                expect(el.text()).to.contain("");
              }
            });
            break;
          }
          case "DeleteUser": {
            wrapper.setData({
              currentUsers: test.data.currentUsers
            });
            wrapper.vm.$nextTick(() => {
              const el = wrapper.find(`.${element.name}`);

              expect(el.exists()).to.equal(true);
            });
            break;
          }
          default: {
            const el = wrapper.find(`#${element.name}`);

            expect(el.exists()).to.equal(true);

            if (element.type === "text-input") {
              expect(el.text()).to.contain("");
            }

            if (element.attributes) {
              element.attributes.forEach(attr => {
                expect(el.attributes(attr.name)).to.equal(attr.expectedValue);
              });
            }
          }
        }
      });
    });
  });
});
