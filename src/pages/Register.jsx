import React, { useState } from "react";
import Add from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            setErr(true);
          }
        });
      });
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Chatty</span>
        <span className="title">Qeydiyyat</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Digər istifadəçilərin görəcəyi ad" />
          <input type="email" placeholder="E-poçt" />
          <input type="password" placeholder="Şifrə" />
          <input style={{ display: "none" }} type="file" id="photo" />
          <label htmlFor="photo">
            <img src={Add} alt="add photo" />
            <span>Şəkil əlavə edin</span>
          </label>
          <button>Qeydiyyat</button>
          {err && <span>Xəta baş verdi!</span>}
        </form>
        <p>
          Artıq hesabınız mövcuddur? <Link to="/login">Daxil ol</Link>
        </p>
      </div>
    </div>
  );
};
export default Register;
