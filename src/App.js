import React, { useState } from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import "./scrollbar.css";
import NewsMain from "./components/NewsMain";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import Profile from "./components/Profile";
const App = () => {
  const pgSize = 12;
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
                key='general'
                pageSize={pgSize}
                country='us'
                category='general'
              />
            }
          ></Route>
          <Route
            exact
            path='/health'
            element={
              <News
                setProgress={changeProgress}
                key='health'
                pageSize={pgSize}
                country='us'
                category='health'
              />
            }
          ></Route>

          <Route
            exact
            path='/sports'
            element={
              <News
                setProgress={changeProgress}
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
                key='technology'
                pageSize={pgSize}
                country='us'
                category='technology'
              />
            }
          ></Route>
          <Route exact path='/login' element={<SignIn />}></Route>
          <Route exact path='/signup' element={<SignUp />}></Route>
          <Route exact path='/profile' element={<Profile />}></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
