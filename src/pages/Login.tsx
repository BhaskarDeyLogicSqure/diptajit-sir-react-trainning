import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../styles/global.css";
import useCricketerStore from "../store/crickterStore";

type LoginFormInputs = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const { login } = useCricketerStore();

  const onSubmit = (data: LoginFormInputs) => {
    if (login(data.email, data.password)) {
      console.log("Login successful");
      navigate("/dashboard");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="app-title">Cricketer Selector</h1>
        <p className="header-sub">Sign in to continue</p>

        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div className="form-group">
            <label>Email</label>
            <input
              datatype="email"
              type="email"
              placeholder="you@example.com"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <span style={{ color: "red", fontSize: "0.8rem" }}>
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password */}
          <div className="form-group">
            <label>Password</label>
            <div className="password-toggle">
            <input
              datatype="password"
              type="password"
              placeholder="••••••••"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Min 6 characters" },
              })}
            />
            {/* eye button */}
            <button type="button" className="eye-button" onClick={() => {
              const pwdField = document.querySelector('input[datatype="password"]') as HTMLInputElement;
              if (pwdField) {
                if (pwdField.type === "password") {
                  pwdField.type = "text";
                } else {
                  pwdField.type = "password";
                }
              }
            }}>
              <span role="img" aria-label="Toggle Password Visibility">👁️</span>
            </button>
            </div>
            {errors.password && (
              <span style={{ color: "red", fontSize: "0.8rem" }}>
                {errors.password.message}
              </span>
            )}
          </div>

          <button type="submit" className="btn btn--primary w-full">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
