// Step 1: Import React
import * as React from "react";
import MainLayout from "../components/MainLayout";
import BlogContent from "../components/BlogContent";
import { Layout, Breadcrumb } from "antd";
import { Col, Row } from "antd";

const { Content } = Layout;

const SolutionPage = () => {
  const [filter, setFilter] = React.useState(null);
  return (
    <MainLayout pageTitle="Home">
      <Content
        style={{
          // padding: "120px",
          paddingTop: "0px",
          paddingBottom: "3px",
          borderBottom: "0.2px solid rgba(111,111,110,.8)",
        }}
      >
        <div
          style={{
            height: "40px",
            // background: "rgb(52,120,255)",
            width: "100%",
            // borderBottom: "0.2px solid rgba(255,255,255,.8)",
            //   borderBottom: "0.2px solid rgba(52,120,255,.8)",
            borderBottom: "0.2px solid rgba(111,111,110,.8)",
          }}
        >
          <Breadcrumb
            style={{
              //   margin: "16px 0",
              paddingLeft: "200px",
              paddingTop: "10px",
            }}
          >
            <Breadcrumb.Item>
              <p style={{ fontFamily: "awesome", marginTop: "0px" }}>
                <a herf="/">Home</a>
              </p>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <p style={{ fontFamily: "awesome", marginTop: "0px" }}>
                <a herf="/solution">Solutions</a>
              </p>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a onClick={() => setFilter(null)}>All</a>
            </Breadcrumb.Item>
            {filter ? <Breadcrumb.Item>{filter}</Breadcrumb.Item> : null}
          </Breadcrumb>
        </div>
        <Row>
          <Col xs={{ span: 18, offset: 3 }} lg={{ span: 14, offset: 5 }}>
            <BlogContent filter={filter} onFilterChange={setFilter} />
          </Col>
        </Row>
      </Content>
    </MainLayout>
  );
};

// You'll learn about this in the next task, just copy it for now
export const Head = () => <title>Solution</title>;

// Step 3: Export your component
export default SolutionPage;
