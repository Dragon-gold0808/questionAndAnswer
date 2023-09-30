import React, { useEffect, useState } from "react";
import { Card, Col, Pagination, Row } from "antd";
import axios from "axios";

const BlogContent = (props) => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [current, setCurrent] = useState(1);
  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await axios.get(
        `${process.env.api_url}/api/posts/fetch/answeredPosts`
      );
      setBlogs(res.data);
      setFilteredBlogs(res.data);
    };
    if (!props.filter) fetchBlogs();
  }, [props.filter]);
  const setUniversity = (univ) => {
    const filteredBlogs = blogs.filter((blog) => blog.universityName === univ);
    setFilteredBlogs(filteredBlogs);
    setCurrent(1);
    props.onFilterChange(univ);
  };
  const setCategory = (cat) => {
    const filteredBlogs = blogs.filter((blog) => blog.category === cat);
    setFilteredBlogs(filteredBlogs);
    setCurrent(1);
    props.onFilterChange(cat);
  };
  const onChange = (page) => setCurrent(page);
  return (
    <div>
      {filteredBlogs?.length
        ? filteredBlogs.slice((current - 1) * 5, current * 5).map((blog) => {
            return (
              <Card
                style={{ padding: "5px", marginTop: "5px" }}
                key={blog.questionTitle}
              >
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
                        <span>
                          <a
                            onClick={() => {
                              setUniversity(blog.universityName);
                            }}
                          >
                            {blog.universityName}
                          </a>
                        </span>
                      </Col>
                      <Col xs={{ span: 24 }} md={{ span: 12 }} xl={{ span: 8 }}>
                        <span>
                          <strong>Category:</strong>
                        </span>
                        <span>
                          <a
                            onClick={() => {
                              setCategory(blog.category);
                            }}
                          >
                            {blog.category}
                          </a>
                        </span>
                      </Col>
                      <Col xs={{ span: 24 }} md={{ span: 12 }} xl={{ span: 8 }}>
                        <span>
                          <strong>Date:</strong>
                        </span>
                        <span>
                          {new Date(blog.date).getFullYear() +
                            "-" +
                            (new Date(blog.date).getMonth() + 1) +
                            "-" +
                            new Date(blog.date).getDate()}
                        </span>
                      </Col>
                      <Col xs={{ span: 24 }} md={{ span: 12 }} xl={{ span: 8 }}>
                        <span>
                          <strong>Course code:</strong>
                        </span>
                        <span>{blog.courseCode}</span>
                      </Col>
                      <Col xs={{ span: 24 }} md={{ span: 12 }} xl={{ span: 8 }}>
                        <span>
                          <strong>Course name:</strong>
                        </span>
                        <span>{blog.courseName}</span>
                      </Col>
                      <Col xs={{ span: 24 }} md={{ span: 12 }} xl={{ span: 8 }}>
                        <span>
                          <strong>Price:</strong>
                        </span>
                        <span>{blog.insertPrice}</span>
                      </Col>
                    </Row>
                    <h2
                      style={{
                        marginTop: "0px",
                        fontFamily: "awesome",
                        fontSize: "26px",
                        //textAlign: "center",
                      }}
                    >
                      <a href={`/answer/${blog._id}`}>{blog.questionTitle}</a>
                    </h2>
                  </div>
                  <div style={{ marginTop: "-15px" }}>
                    <div>
                      {blog.description?.length > 500 ? (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: blog.description
                              .replace(/(<([^>]+)>)/gi, "")
                              .replaceAll("&nbsp;", "")
                              .slice(0, 500)
                              .concat("..."),
                          }}
                          className="my-4"
                        ></div>
                      ) : (
                        <div
                          dangerouslySetInnerHTML={{ __html: blog.description }}
                          className="my-4"
                        />
                      )}
                      {blog.description?.length > 500 && (
                        <p style={{ color: "blue", marginTop: "20px" }}>
                          {" "}
                          <a href={`/answer/${blog._id}`}>Read more{" >>"}</a>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })
        : null}
      <Pagination
        style={{ margin: "5px auto", float: "right" }}
        current={current}
        onChange={onChange}
        total={filteredBlogs.length}
        pageSize={5}
      />
    </div>
  );
};

export default BlogContent;
