import React, { useState } from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import "./scrollbar.css";
import NewsMain from "./components/NewsMain";
const App = () => {
  const pgSize = 12;
  const apiKey = process.env.REACT_APP_NEWSAPI;
  console.log("apiKey", apiKey);
  const [progress, setProgress] = useState(0);

  const changeProgress = (p) => {
    setProgress(p);
  };

  return (
    <div>
      <Router>
        <NavBar />
        <LoadingBar color='#f11946' progress={progress} />

        <Routes>
          <Route
            exact
            path='/'
            element={
              <NewsMain
                main={true}
                setProgress={changeProgress}
                apiKey={apiKey}
                key='general'
                pageSize={pgSize}
                country='us'
                category='general'
              />
            }
          ></Route>
          <Route
            exact
            path='/business'
            element={
              <News
                setProgress={changeProgress}
                apiKey={apiKey}
                key='business'
                pageSize={pgSize}
                country='us'
                category='business'
              />
            }
          ></Route>
          <Route
            exact
            path='/entertainment'
            element={
              <News
                setProgress={changeProgress}
                apiKey={apiKey}
                key='entertainment'
                pageSize={pgSize}
                country='us'
                category='entertainment'
              />
            }
          ></Route>
          <Route
            exact
            path='/health'
            element={
              <News
                setProgress={changeProgress}
                apiKey={apiKey}
                key='health'
                pageSize={pgSize}
                country='us'
                category='health'
              />
            }
          ></Route>
          <Route
            exact
            path='/science'
            element={
              <News
                setProgress={changeProgress}
                apiKey={apiKey}
                key='science'
                pageSize={pgSize}
                country='us'
                category='science'
              />
            }
          ></Route>
          <Route
            exact
            path='/general'
            element={
              <News
                setProgress={changeProgress}
                apiKey={apiKey}
                key='science'
                pageSize={pgSize}
                country='us'
                category='general'
              />
            }
          ></Route>
          <Route
            exact
            path='/sports'
            element={
              <News
                setProgress={changeProgress}
                apiKey={apiKey}
                key='sports'
                pageSize={pgSize}
                country='us'
                category='sports'
              />
            }
          ></Route>
          <Route
            exact
            path='/technology'
            element={
              <News
                setProgress={changeProgress}
                apiKey={apiKey}
                key='technology'
                pageSize={pgSize}
                country='us'
                category='technology'
              />
            }
          ></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
