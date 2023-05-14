import { useContext } from "react";
import AppContext from "@/components/AppContext";
import { Form, Input, Button } from "antd";
import { useRouter } from "next/router";

export default function Page1() {
  const context = useContext(AppContext);
  const router = useRouter();

  const handleSubmit = async (values) => {
    context.setStore({
      ...context.store,
      values,
    });
    router.push("/page2");
  };

  return (
    <>
      <div className="login-warp">
        <Form
          name="age"
          initialValues={{ remember: true }}
          onFinish={handleSubmit}
        >
          <Form.Item
            label="How old are you?"
            name="age"
            rules={[
              {
                required: true,
                message: "Please show your age!",
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item style={{ textAlign: "center" }}>
            <Button type="primary" htmlType="submit" style={{ width: "50%" }}>
              Next
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
