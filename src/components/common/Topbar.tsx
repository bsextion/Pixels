import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useLogoutAccount } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";

const Topbar = () => {
  const { mutate: logOut, isSuccess } = useLogoutAccount();
  const navigate = useNavigate();
  const {user} = useUserContext();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);
  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">
        <Link to="/" className="flex gap-3 items-center">
          <img src="/assets/vite.svg" alt="logo" width={50} height={50} />
        </Link>
        <div className="flex gap-4">
          <Button
            variant="ghost"
            className="shad-button_ghost"
            onClick={() => logOut()}
          >
            <img src="/assets/icons/logout.svg" alt="logout" />
          </Button>
          <Link to={`/profile/${user.id}`} className="flex-center gap-3"/>
          <img src={user.imageUrl || '/assets/icons/profile-placeholder.svg'} alt="profile pic" className="h-8 w-8 rounded-full"/>
        </div>
      </div>
    </section>
  );
};

export default Topbar;
