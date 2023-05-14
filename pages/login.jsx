import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Form, Input, Button } from "antd";
import AppContext from "@/components/AppContext";

export default function LoginPage() {
  const context = useContext(AppContext);

  const router = useRouter();
  const [pageStart, setPageStart] = useState(null);
  const [pageEndSession, setEndSession] = useState(null);

  const [startTime, setStartTime] = useState(Date.now());
  const [endTime, setEndTime] = useState(null);

  const [numChanges, setNumChanges] = useState(0);
  const [numRetries, setNumRetries] = useState(0);

  useEffect(() => {
    context.setStore({
      pageStart,
      startTime,
      endTime,
      numChanges,
      numRetries,
      pageEndSession,
    });
  }, [pageStart, startTime, endTime, numChanges, numRetries, pageEndSession]);

  const handleInputChange = () => {
    setNumChanges(numChanges + 1);
  };

  const handleStartTyping = () => {
    if (!startTime) {
      setStartTime(new Date());
    }
  };

  const handleFinishTyping = () => {
    if (!endTime) {
      setEndTime(new Date());
    }
  };

  useEffect(() => {
    setPageStart(new Date());
  }, []);

  const expectedLogin = "admin";
  const expectedPassword = "admin";

  const handleSubmit = async (values) => {
    const { login, password } = values;
    if (login === expectedLogin && password === expectedPassword) {
      setEndSession(new Date());
      router.push("/page1");
    } else {
      setNumRetries(numRetries + 1);
      alert("Invalid login or password");
    }
  };

  return (
    <>
      <div className="login-warp">
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Login"
            name="login"
            rules={[{ required: true, message: "Please input your login!" }]}
          >
            <Input
              onFocus={handleStartTyping}
              onBlur={handleFinishTyping}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              onFocus={handleStartTyping}
              onBlur={handleFinishTyping}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item style={{ textAlign: "center" }}>
            <Button type="primary" htmlType="submit" style={{ width: "50%" }}>
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
