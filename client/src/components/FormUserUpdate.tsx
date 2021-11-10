import React from "react";
import ButtonCancel from "./ButtonCancel";
import ButtonSave from "./ButtonSave";
import TextFieldBase from "./TextFieldBase";
import { User } from "./UserContext";

interface props {
  user?: User;
  viewMode: boolean;
  save(u: User): void;
  cancel(): void;
}

const FormUserUpdate: React.FC<props> = ({ user, viewMode, cancel, save }) => {
  const [userEdits, setUserEdits] = React.useState<User>({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    birthYear: "",
    favoriteColor: "",
    _id: ""
  });

  React.useEffect(() => {
    if (user) {
      setUserEdits(user);
    }
  }, [user]);

  return (
    <div style={{ maxWidth: "300px", margin: "auto" }}>
      <TextFieldBase
        label="Username"
        value={userEdits?.username || ""}
        onChange={e => setUserEdits({ ...userEdits, username: e.target.value })}
        disabled={viewMode}
      />
      <TextFieldBase
        label="Email"
        value={userEdits?.email || ""}
        onChange={e => setUserEdits({ ...userEdits, email: e.target.value })}
        disabled={viewMode}
      />
      <TextFieldBase
        label="First Name"
        value={userEdits?.firstName || ""}
        onChange={e =>
          setUserEdits({ ...userEdits, firstName: e.target.value })
        }
        disabled={viewMode}
      />
      <TextFieldBase
        label="Last Name"
        value={userEdits?.lastName || ""}
        onChange={e => setUserEdits({ ...userEdits, lastName: e.target.value })}
        disabled={viewMode}
      />
      <TextFieldBase
        label="Birth Year"
        value={userEdits?.birthYear || 2000}
        type="number"
        disabled={viewMode}
        InputProps={{ inputProps: { min: 1900, max: 2100 } } || ""}
        onChange={e =>
          setUserEdits({ ...userEdits, birthYear: e.target.value })
        }
      />
      <TextFieldBase
        label="Favorite Color"
        value={userEdits?.favoriteColor || ""}
        onChange={e =>
          setUserEdits({ ...userEdits, favoriteColor: e.target.value })
        }
        disabled={viewMode}
      />
      {viewMode ? null : (
        <div
          style={{
            maxWidth: "60%",
            margin: "10px auto",
            display: "flex",
            justifyContent: "space-around"
          }}
        >
          <ButtonCancel onClick={() => cancel()} />
          <ButtonSave onClick={() => (userEdits ? save(userEdits) : null)} />
        </div>
      )}
    </div>
  );
};
export default FormUserUpdate;
