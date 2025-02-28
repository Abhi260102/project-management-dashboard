




import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input ,Select} from "antd";
import { UserElement } from "../../components/Store";
import { useNavigate } from "react-router";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { getUserData } from "../../redux/itemSlice";

const { Option } = Select;

const LoginPage = () => {
  const setUserDetails = UserElement((state) => state.setUserData);
  const router = useNavigate();
const dispatch=useDispatch()
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Username is required.")
      .matches(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, and underscores allowed."),
    password: Yup.string()
      .required("Password is required.")
      .min(6, "Password must be at least 6 characters."),
    userType: Yup.string().required("User type is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    setUserDetails(values);
    router("/dashboard");
    
    localStorage.setItem('userData',JSON.stringify(values))
    dispatch(getUserData(values))
    setSubmitting(false);
  };

  return (
    <div className="w-screen h-screen p-2 flex items-center justify-center bg-[url('https://picsum.photos/1600/800')] bg-center bg-cover">
      <Formik
        initialValues={{ username: "", password: "", userType: "", remember: true }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, isSubmitting, setFieldValue }) => (
          <Form
            name="login_form"
            className="bg-[rgba(255,255,255,0.7)] sm:w-[40%] w-full h-[80%] rounded-xl flex justify-center items-center flex-col backdrop-blur-sm"
            onFinish={handleSubmit}
          >
            <h1 className="text-2xl font-bold m-5 text-blue-500">Login</h1>

            <Form.Item className="sm:w-[40%]">
              <Field name="userType">
                {({ field }) => (
                  <Select
                    {...field}
                    onChange={(value) => setFieldValue("userType", value)}
                    className="w-full"
                  >
                     <Option value="">Select User type</Option>
                    <Option value="user">User</Option>
                    <Option value="admin">Admin</Option>
                  </Select>
                )}
              </Field>
              <ErrorMessage name="userType" component="div" className="text-red-500 text-sm" />
            </Form.Item>


            <Form.Item className="sm:w-[40%]">
              <Field name="username">
                {({ field }) => (
                  <Input
                    {...field}
                    prefix={<UserOutlined className="p-2" />}
                    placeholder="Username"
                    onChange={(e) => setFieldValue("username", e.target.value)}
                  />
                )}
              </Field>
              <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
            </Form.Item>

            <Form.Item className="sm:w-[40%]">
              <Field name="password">
                {({ field }) => (
                  <Input.Password
                    {...field}
                    prefix={<LockOutlined className="p-2" />}
                    placeholder="Password"
                    onChange={(e) => setFieldValue("password", e.target.value)}
                  />
                )}
              </Field>
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
            </Form.Item>

            <Form.Item className="sm:w-[40%]">
              <Field name="remember" type="checkbox">
                {({ field }) => (
                  <Checkbox {...field} checked={field.value}>
                    Remember me
                  </Checkbox>
                )}
              </Field>
              <a className="float-right hover:text-blue-700" href="">
                Forgot password?
              </a>
            </Form.Item>

            <Form.Item className="w-[40%]">
              <Button type="primary" htmlType="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Logging in..." : "Log in"}
              </Button>
            </Form.Item>

            <Form.Item>
              Or <a href="">register now!</a>
            </Form.Item>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginPage;
