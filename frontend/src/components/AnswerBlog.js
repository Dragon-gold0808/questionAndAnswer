import React, { useState, useEffect } from "react";
import { renderToString } from "react-dom/server";
import { Card, Button, Row, Col, Modal, Form, Input, InputNumber } from "antd";
import screenimg from "../assets/images/answer.png";
import Checkout from "./Checkout";
import { navigate } from "gatsby";
import axios from "axios";

const AnswerBlog = ({ post }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState(localStorage.token);
  const [user, setUser] = useState();
  const [quotes, setQuotes] = useState();
  const [form] = Form.useForm();
  const name = Form.useWatch("name", form);
  const email = Form.useWatch("email", form);
  const phone = Form.useWatch("phone", form);
  const budget = Form.useWatch("budget", form);
  const instructions = Form.useWatch("instructions", form);
  const values = { name, email, phone, budget, instructions };
  const showQuoteModal = () => {
    setOpen(true);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios({
        method: "GET",
        url: `${process.env.api_url}/api/auth`,
        headers: {
          "x-auth-token": token,
        },
      });
      setUser(res.data);
    };
    if (token) fetchUser();
  }, []);
  const handleModalOk = () => {
    setLoading(true);
    const postElement = renderToString(postCard);
    const emailElement = { ...values, content: postElement };
    axios
      .post(`${process.env.api_url}/api/email/send-email`, emailElement)
      .then((res) => {
        setLoading(false);
        setOpen(false);
      })
      .catch((err) => console.log(err));
    console.log(values);
  };
  const handleModalCancel = () => {
    setOpen(false);
  };
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };
  const postCard = (
    <Card style={{ padding: "5px" }}>
      <div
        style={{
          padding: "5px",
          paddingTop: "0px",
          fontFamily: "'Heebo', sans-serif",
          marginBottom: "15px",
        }}
      >
        <div style={{ marginBottom: "15px", marginTop: "-10px" }}>
          <Row>
            <Col xs={{ span: 24 }} md={{ span: 12 }} xl={{ span: 8 }}>
              <span>
                <strong>University:</strong>
              </span>
              <span>{post.universityName}</span>
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }} xl={{ span: 8 }}>
              <span>
                <strong>Category:</strong>
              </span>
              <span>{post.category}</span>
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }} xl={{ span: 8 }}>
              <span>
                <strong>Date:</strong>
              </span>
              <span>
                {new Date(post.date).getFullYear() +
                  "-" +
                  (new Date(post.date).getMonth() + 1) +
                  "-" +
                  new Date(post.date).getDate()}
              </span>
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }} xl={{ span: 8 }}>
              <span>
                <strong>Course code:</strong>
              </span>
              <span>{post.courseCode}</span>
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }} xl={{ span: 8 }}>
              <span>
                <strong>Course name:</strong>
              </span>
              <span>{post.courseName}</span>
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }} xl={{ span: 8 }}>
              <span>
                <strong>Price:</strong>
              </span>
              <span>{post.insertPrice}</span>
            </Col>
          </Row>
          <h2
            style={{
              marginTop: "15px",
              fontFamily: "awesome",
              fontSize: "26px",
              // textAlign: "center",
            }}
          >
            {post.questionTitle}
          </h2>
        </div>
        <div style={{ marginTop: "15px" }}>
          <div
            dangerouslySetInnerHTML={{
              __html: post.description,
            }}
          ></div>
          {/* <div style={{ marginTop: "-15px", paddingLeft: "680px" }}>
            <button
              type="submit"
              style={{
                width: "100%",
                height: "30px",
                fontSize: "20px",
                fontFamily: "awesome",
              }}
            >
              Answer
            </button>
          </div> */}
        </div>
      </div>
    </Card>
  );
  return (
    <div style={{ marginBottom: "50px" }}>
      {postCard}
      <Card style={{ padding: "5px", marginTop: 16 }}>
        <div
          style={{
            padding: "5px",
            paddingTop: "10px",
            fontFamily: "'Heebo', sans-serif",
            marginBottom: "15px",
          }}
        >
          <div style={{ marginBottom: "15px" }}>
            <h2
              style={{
                marginTop: "-20px",
                fontFamily: "awesome",
                fontSize: "26px",
                textAlign: "center",
              }}
            >
              Answer Details
            </h2>
          </div>
          <div style={{ marginTop: "-20px" }}>
            <div style={{ borderTop: "1px solid #dedede" }}>
              <img
                src={screenimg}
                alt="screenimage"
                width="100%"
                height="160px"
              />
            </div>
            <div>
              {/* <a href="/homework-solution-details/632507/accn-2010-quiz-1-tulane-university">
              Read more <i></i>
            </a> */}
              <Checkout post={post} />
              <div style={{ marginTop: "5px" }}>
                <Button
                  block
                  style={{ fontWeight: "bold" }}
                  onClick={showQuoteModal}
                >
                  Get a quote of a new original/Human generated paper
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
      <Modal
        open={open}
        title="Get a quote"
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        footer={[
          <Button key="back" onClick={handleModalCancel}>
            Return
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleModalOk}
          >
            Submit
          </Button>,
        ]}
      >
        <Form
          {...layout}
          name="nest-messages"
          form={form}
          style={{
            maxWidth: 600,
          }}
          validateMessages={validateMessages}
        >
          <Form.Item
            name={"name"}
            label="Full Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={"email"}
            label="Email"
            rules={[
              {
                type: "email",
                required: true,
              },
            ]}
            initialValue={user?.email}
          >
            <Input />
          </Form.Item>
          <Form.Item name={"phone"} label="Phone Number">
            <Input />
          </Form.Item>
          <Form.Item
            name={"budget"}
            label="Budget"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
                required: true,
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item name={"instructions"} label="Instructions">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AnswerBlog;
