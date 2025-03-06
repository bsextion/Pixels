import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useLogoutAccount } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";

const LeftSidebar = () => {
  const { mutate: logOut, isSuccess } = useLogoutAccount();
  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);
  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to="/" className="flex gap-3 items-center">
          <img src="/assets/vite.svg" alt="logo" width={50} height={50} />
        </Link>
        <Link to={`/profile/${user.id}`} className="flex gap-3">
          <img
            src={
              user.imageUrl || "assets/icons/profile-placeholder.svg"
            }
            alt="profile"
            className="h-14 w-14 rounded-full"
          />
          <div className="flex flex-col">
            <p className="body-bold">
              {user.name}
            </p>
            <p className="small-regular text-light-3">
              @{user.username}
            </p>
          </div>
        </Link>
        <ul className="flex flex-col gap-6">
          <Link></Link>
          <Link></Link>
          <Link></Link>
          <Link></Link>
          <Link></Link>

        </ul>
      </div>
    </nav>
  );
};

export default LeftSidebar;
