import { useRef, useState } from "react";

import classes from "./profile-form.module.css";

function ProfileForm() {
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();
  const [passwordChanged, setPasswordChanged] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredOldPassword = oldPasswordRef.current.value;
    const enteredNewPassword = newPasswordRef.current.value;

    try {
      const response = await fetch("/api/auth/user/change-password", {
        method: "PATCH",
        body: JSON.stringify({
          oldPassword: enteredOldPassword,
          newPassword: enteredNewPassword,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Contact the administrator!");
      }
      setPasswordChanged(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPasswordRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="old-password">Old Password</label>
        <input type="password" id="old-password" ref={oldPasswordRef} />
      </div>
      {passwordChanged && <h3>Password changed successfully!</h3>}
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
