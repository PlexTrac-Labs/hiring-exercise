import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { AuthContext, LoginPayload } from "../components/AuthContext";

const Login: React.FC = () => {
  const auth = React.useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { from: Location };
  const from = state ? state.from.pathname : "/";

  useEffect(() => {
    if (auth?.auth_token) {
      navigate(from, { replace: true });
    }
  }, [auth?.auth_token, from, navigate]);

  const [form, setForm] = React.useState<LoginPayload>({
    username: "clint",
    password: "123456"
  });

  const login = (f: LoginPayload) => {
    auth?.authenticate(f);
  };

  return (
    <div>
      <p>
        Username:
        <input
          value={form.username}
          onChange={e => setForm({ ...form, username: e.target.value })}
        />
      </p>
      <p>
        Password:
        <input
          onChange={e => setForm({ ...form, password: e.target.value })}
          value={form.password}
          type="password"
        />
      </p>
      {auth?.error ? <p style={{ color: "red" }}>{auth.error}</p> : null}
      <button onClick={() => login(form)}>Login</button>
    </div>
  );
};
export default Login;
