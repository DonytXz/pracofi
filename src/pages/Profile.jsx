import { useState, useEffect } from "react";
import { HeaderUser } from "../components/global/";
import { ProfileForm } from "../components/profile/";
import { getToken, RegisterProfileData } from "../services/";
import { useHistory } from "react-router-dom";
import { notPresentToken } from "../helpers";

const Profile = () => {
  const history = useHistory();

  useEffect(() => {
    if (!getToken()) {
      notPresentToken();
      history.push("/login");
    }
  }, [getToken()]);
  return (
    
    <>
      <div className="">
        <HeaderUser />
        <ProfileForm />
      </div>
    </>
  );
};

export default Profile;
