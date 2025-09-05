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
            <input
              type="password"
              placeholder="••••••••"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Min 6 characters" },
              })}
            />
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
