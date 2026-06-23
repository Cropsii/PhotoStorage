import { pb } from "../../Utils/PB";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { AuthContext } from "../AuthContext";
import { FloatButtonComponent } from "../../components/FloatButtonComponent";

export const AuthCheckProvider = () => {
  const navigate = useNavigate();
  const [sesion, setSesion] = useState(pb.authStore.isValid);
  const [user, setUser] = useState(pb.authStore.record);
  console.log(`id польователя AuthCheck ${user?.id}`);

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
      <FloatButtonComponent></FloatButtonComponent>
      <Outlet />
    </AuthContext.Provider>
  );
};
