export const UItests = [
  {
    component: "Welcome",
    elements: [
      {
        name: "welcome_username_field",
        type: "text-input"
      },
      {
        name: "welcome_password_field",
        type: "text-input"
      },
      {
        name: "welcome_register_button",
        type: "button"
      },
      {
        name: "welcome_changePassword_button",
        type: "button"
      },
      {
        name: "welcome_login_button",
        type: "button",
        attributes: [
          {
            name: "disabled",
            expectedValue: "true"
          }
        ]
      }
    ]
  },
  {
    component: "UserDialog",
    elements: [
      {
        name: "user_closeDialog_button",
        type: "button"
      },
      {
        name: "user_cancel_button",
        type: "button"
      },
      {
        name: "user_action_button",
        type: "button",
        attributes: [
          {
            name: "disabled",
            expectedValue: "true"
          }
        ]
      }
    ]
  },
  {
    component: "CreateUpdateUser",
    props: {
      context: "Create"
    },
    elements: [
      {
        name: "create_username_field",
        type: "text-input"
      },
      {
        name: "create_password_field",
        type: "text-input"
      },
      {
        name: "create_confirmPassword_field",
        type: "text-input"
      },
      {
        name: "create_email_field",
        type: "text-input"
      },
      {
        name: "create_firstname_field",
        type: "text-input"
      },
      {
        name: "create_lastname_field",
        type: "text-input"
      },
      {
        name: "create_birthyear_field",
        type: "autocomplete"
      },
      {
        name: "create_favoriteColor_field",
        type: "color-picker"
      }
    ]
  },
  {
    component: "CreateUpdateUser",
    props: {
      context: "Update"
    },
    elements: [
      {
        name: "update_username_field",
        type: "text-input"
      },
      {
        name: "update_email_field",
        type: "text-input"
      },
      {
        name: "update_firstname_field",
        type: "text-input"
      },
      {
        name: "update_lastname_field",
        type: "text-input"
      },
      {
        name: "update_birthyear_field",
        type: "autocomplete"
      },
      {
        name: "update_favoriteColor_field",
        type: "color-picker"
      },
      {
        name: "update_changePassword_button",
        type: "button"
      }
    ]
  },
  {
    component: "Dashboard",
    elements: [
      {
        name: "dashboard_logout_button",
        type: "button"
      },
      {
        name: "dashboard_createUser_button",
        type: "button"
      }
    ]
  },
  {
    component: "ChangePassword",
    elements: [
      {
        name: "password_userId_field",
        type: "text-input"
      },
      {
        name: "password_oldPassword_field",
        type: "text-input"
      },
      {
        name: "password_newPassword_field",
        type: "text-input"
      },
      {
        name: "password_confirmNewPassword_field",
        type: "text-input"
      },
      {
        name: "password_cancel_button",
        type: "button"
      },
      {
        name: "password_change_button",
        type: "button",
        attributes: [
          {
            name: "disabled",
            expectedValue: "true"
          }
        ]
      }
    ]
  },
  {
    component: "DeleteUser",
    data: {
      currentUsers: [
        {
          _id: 1,
          username: "",
          password: "",
          email: "",
          firstName: "",
          lastName: "",
          birthYear: "",
          favoriteColor: "#7F50F1FF"
        }
      ]
    },
    elements: [
      {
        name: "deleteUser_chip",
        type: "chip"
      }
    ]
  }
];
