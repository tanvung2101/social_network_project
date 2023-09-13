import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal } from "antd";
import Link from "next/link";
import { SyncOutlined } from "@ant-design/icons";
import AuthForm from "../components/forms/AuthForm";
import { useRouter } from "next/router";
import { UserContext } from "../context";

const Login = () => {
  const [email, setEmail] = useState("vung123@donga.edu.vn");
  const [password, setPassword] = useState("1111111");
  const [loading, setLoading] = useState(false);

  const [state, setState] = useContext(UserContext);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`/login`, {
        email,
        password,
      });
      if (data.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        // update context
        setState({
          user: data.user,
          token: data.token,
        });
        // save in local storage
        window.localStorage.setItem("auth", JSON.stringify(data));
        router.push("/user/dashboard");
      }
    } catch (error) {
      toast.error(error.response?.data);
      setLoading(false);
    }
  };

  if (state && state.token) router.push("/");
  return (
    <div className="container-fluid">
      <div className="row py-5 text-light bg-default-image">
        <div className="col text-center">
          <h1>Login</h1>
        </div>
      </div>

      <div className="row py-5">
        <div className="col-md-6 offset-md-3">
          <AuthForm
            handleSubmit={handleSubmit}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            loading={loading}
            page="login"
          />
        </div>
      </div>

      <div className="row">
        <div className="col">
          <p className="text-center">
            Not yet registered? <Link href="/register">Register</Link>
          </p>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <p className="text-center">
            <Link href="/forgot-password">
              <span className="text-danger">Forgot password</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
