// import { useState, useEffect } from "react";
// import { getSession } from "next-auth/client";
import router, { useRouter } from "next/router";

import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";

function UserProfile() {
  // Redirect away if NOT auth
  // const router = useRouter();
  // const [isLoading, setIsLoading] = useState(true);
  // const [loadedSession, setLoadedSession] = useState();

  // useEffect(() => {
  //   const getSessionHandler = async () => {
  //     const result = await getSession();
  //     if (!result) {
  //       router.replace("/auth");
  //     } else {
  //       setIsLoading(false);
  //     }
  //     setLoadedSession(result);
  //   };
  //   getSessionHandler();
  // }, []);

  // if (isLoading) {
  //   return <p className={classes.profile}>Loading....</p>;
  // }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
}

export default UserProfile;
