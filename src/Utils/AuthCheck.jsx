import { pb } from "./PB";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { AuthContext } from "../Contexts/AuthContext";

export const AuthCheck = () => {
  const navigate = useNavigate();
  const [sesion, setSesion] = useState(pb.authStore.isValid);
  const [user, setUser] = useState(pb.authStore.record);
  console.log(`id польователя AuthCheck ${user.id}`);

  useEffect(() => {
    const unsubscribe = pb.authStore.onChange((token, model) => {
      setSesion(!!model);
      setUser(model);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!sesion) {
      navigate("/");
    }
  }, [navigate, sesion]);
  if (!sesion) {
    return null;
  }
  const logOut = () => {
    pb.authStore.clear();
  };
  return (
    <AuthContext.Provider value={{ sesion, user, logOut }}>
      <Outlet />
    </AuthContext.Provider>
  );
};
