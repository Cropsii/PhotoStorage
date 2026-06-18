import { LogInForm } from "./components/AUTH/LogInForm";
import { Col, Flex, Layout, Row } from "antd";
import { RegisterForm } from "./components/AUTH/RegisterForm";
import { pb } from "./Utils/PB";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

function App() {
  const navigate = useNavigate();
  const [log, setLog] = useState(true);
  const [isAuth, setIsAuth] = useState(pb.authStore.isValid);

  useEffect(() => {
    const unsubscribe = pb.authStore.onChange(() => {
      setIsAuth(pb.authStore.isValid);
    });

    if (pb.authStore.isValid) {
      navigate("/main");
    }

    return () => unsubscribe();
  }, [navigate]);

  if (isAuth) {
    return null;
  }
  return (
    <Layout style={{ minHeight: "100dvh" }}>
      <Row align="middle" justify="center" style={{ flex: 1 }}>
        <Col>
          <Flex gap={10} vertical align="center">
            {log ? <LogInForm /> : <RegisterForm />}
            <a onClick={() => setLog((prev) => !prev)}>
              {log ? "Нет аккаунта? - регистрируйся" : "Есть аккаунт? - вход"}
            </a>
          </Flex>
        </Col>
      </Row>
    </Layout>
  );
}

export default App;
