import { useContext } from "react";
import AppContext from "@/components/AppContext";
import { Form, Button, Select } from "antd";
import { useRouter } from "next/router";

export default function Page2() {
  const context = useContext(AppContext);
  const router = useRouter();

  const handleChange = (value) => {
    context.setStore({
      ...context.store,
      value,
    });
  };

  const handleSubmit = async (values) => {
    router.push("/result");
  };

  return (
    <>
      <div className="login-warp">
        <Form
          name="season"
          initialValues={{ remember: true }}
          onFinish={handleSubmit}
        >
          <Select
            showSearch
            placeholder="What time of the year do you like the most?"
            optionFilterProp="children"
            style={{ width: "100%" }}
            onChange={handleChange}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={[
              {
                value: "Winter",
                label: "Winter",
              },
              {
                value: "Spring",
                label: "Spring",
              },
              {
                value: "Summer",
                label: "Summer",
              },
              {
                value: "Autumn",
                label: "Autumn",
              },
            ]}
          />
          <Form.Item style={{ textAlign: "center", marginTop: "1rem" }}>
            <Button type="primary" htmlType="submit" style={{ width: "50%" }}>
              Next
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
