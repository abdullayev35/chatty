import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Chatty</span>
        <span className="title">Daxil ol</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="E-poçt" />
          <input type="password" placeholder="Şifrə" />
          <button>Daxil ol</button>
          {err && <span>Xəta baş verdi!</span>}
        </form>
        <p>
          Hesabınız yoxdur? <Link to="/register">Qeydiyyat</Link>
        </p>
      </div>
    </div>
  );
};
export default Login;
