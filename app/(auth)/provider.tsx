"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserDetailContext } from "@/context/UserDetailContext";

const Provider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    CreateNewUser()
  }, []);


  const [userDetail, setUserDetail] = useState(null)

  const CreateNewUser = async () => {
    //user API endpoint to create a new user
    const result = await axios.post("/api/user", {});
    console.log(result.data);
    setUserDetail(result?.data)
  };

  return <div>
    <UserDetailContext.Provider value={{userDetail, setUserDetail}}>
      {children}
    </UserDetailContext.Provider>
    
    </div>;
};

export default Provider;
