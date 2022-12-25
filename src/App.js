import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [currentPage, setCurrnetPage] = useState(1);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const response = await fetch("https://dummyjson.com/posts?limit=100");
    const dataFetched = await response.json();
    setData(dataFetched.posts);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const listDataFunc = (data) => {
    return (
      <div className="posts__outer__box">
        {data.slice(currentPage * 3 - 3, currentPage * 3).map((post, index) => {
          return (
            <div className="post__container" key={index}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <h3 style={{ textDecoration: "underline", fontSize: "25px" }}>
                  Post : {post.id}
                </h3>
                <div>
                  {post?.tags?.map((item) => (
                    <label className="post__tag">{item}</label>
                  ))}
                </div>
              </div>
              <h3 className="post__title">{post.title}</h3>
              <p>{post.body}</p>
              <div className="reactions__post">
                {[...Array(post.reactions)].map((item) => (
                  <label>❤️</label>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const paginateHandle = (index) => {
    setCurrnetPage(index + 1);
  };

  const paginationFunc = (data) => {
    return (
      <div className="pagination__container">
        <div
          style={{ visibility: currentPage === 1 ? "hidden" : "visible" }}
          onClick={() => {
            paginateHandle(currentPage - 2);
          }}
          className="pagination__btn"
        >
          Prev
        </div>

        {[...Array(Math.ceil(data.length / 3))].map((item, index) => {
          return (
            <div
              style={{
                backgroundColor: currentPage - 1 === index ? "green" : "#222",
              }}
              onClick={() => {
                paginateHandle(index);
              }}
              className="pagination__btn"
            >
              {index + 1}
            </div>
          );
        })}

        <div
          style={{
            visibility:
              currentPage === Math.ceil(data.length / 3) ? "hidden" : "visible",
          }}
          onClick={() => {
            paginateHandle(currentPage);
          }}
          className="pagination__btn"
        >
          Next
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      {data.length ? listDataFunc(data) : <>No data found...</>}
      {data.length ? paginationFunc(data) : <></>}
    </div>
  );
}

export default App;
