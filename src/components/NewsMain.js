import React, { useEffect, useState } from "react";

import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import NewsHeader from "./NewsHeader";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);
  const [firstArticle, setFirstArticle] = useState([]);

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&
        pagesize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setFirstArticle(parsedData.articles);
    setArticles(parsedData.articles);
    setTotalArticles(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  };
  //   const updateNews = async () => {
  //     props.setProgress(10);
  //     setLoading(true);
  //     props.setProgress(30);
  //     const parsedData = await fetchNews();
  //     console.log("parse", parsedData);
  //     props.setProgress(70);
  //     // setFirstArticle(parsedData.articles);
  //     // setArticles([]);
  //     // setTotalArticles(parsedData.totalResults);
  //     setLoading(false);
  //     props.setProgress(100);
  //   };

  useEffect(() => {
    document.title = `NewsHub - ${capitalize(props.category)}`;
    updateNews();
  }, []);

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}
        &pagesize=${props.pageSize}`;
    setPage(page + 1);
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log("parsedData", parsedData);
    setArticles(articles.concat(parsedData.articles));
    setTotalArticles(parsedData.totalResults);
    setLoading(false);
  };

  return (
    <>
      <h1 className='text-center' style={{ margin: "35px 0px" }}>
        NewsHub - Top {capitalize(props.category)} headlines
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalArticles}
        loader={loading && <Spinner></Spinner>}
      >
        <div className='container'>
          <div className='row'>
            <div className='row'>
              <div className='col-sm-8'>
                {firstArticle.map((element, i) => {
                  if (i === 0) {
                    return (
                      <NewsHeader
                        item={0}
                        key={element.url}
                        title={
                          element.title
                            ? element.title.length > 50
                              ? (element.title =
                                  element.title.slice(0, 50) + "...")
                              : element.title
                            : ""
                        }
                        description={
                          element.description
                            ? element.description.length > 100
                              ? (element.description =
                                  element.description.slice(0, 100) + "...")
                              : element.description
                            : ""
                        }
                        imageUrl={element.urlToImage}
                        newsUrl={element.url}
                        publishedAt={element.publishedAt}
                        author={element.author ? element.author : "unknown"}
                        source={element.source.name}
                      ></NewsHeader>
                    );
                  }
                })}
              </div>
              <div className='col-sm-4'>
                <div className='row'>
                  <div className='col'>
                    {firstArticle.map((element, i) => {
                      if (i === 1) {
                        return (
                          <NewsItem
                            mainItem={true}
                            key={element.url}
                            title={
                              element.title
                                ? element.title.length > 50
                                  ? (element.title =
                                      element.title.slice(0, 50) + "...")
                                  : element.title
                                : ""
                            }
                            description={
                              element.description
                                ? element.description.length > 100
                                  ? (element.description =
                                      element.description.slice(0, 100) + "...")
                                  : element.description
                                : ""
                            }
                            imageUrl={element.urlToImage}
                            newsUrl={element.url}
                            publishedAt={element.publishedAt}
                            author={element.author ? element.author : "unknown"}
                            source={element.source.name}
                          ></NewsItem>
                        );
                      }
                    })}
                  </div>
                  <div className='col'>
                    {firstArticle.map((element, i) => {
                      if (i === 2) {
                        return (
                          <NewsItem
                            mainItem={true}
                            key={element.url}
                            title={
                              element.title
                                ? element.title.length > 50
                                  ? (element.title =
                                      element.title.slice(0, 50) + "...")
                                  : element.title
                                : ""
                            }
                            description={
                              element.description
                                ? element.description.length > 100
                                  ? (element.description =
                                      element.description.slice(0, 100) + "...")
                                  : element.description
                                : ""
                            }
                            imageUrl={element.urlToImage}
                            newsUrl={element.url}
                            publishedAt={element.publishedAt}
                            author={element.author ? element.author : "unknown"}
                            source={element.source.name}
                          ></NewsItem>
                        );
                      }
                    })}
                  </div>
                </div>

                <div className='row'>
                  <div className='col'>
                    {firstArticle.map((element, i) => {
                      if (i === 3) {
                        return (
                          <NewsItem
                            mainItem={true}
                            key={element.url}
                            title={
                              element.title
                                ? element.title.length > 50
                                  ? (element.title =
                                      element.title.slice(0, 50) + "...")
                                  : element.title
                                : ""
                            }
                            description={
                              element.description
                                ? element.description.length > 100
                                  ? (element.description =
                                      element.description.slice(0, 100) + "...")
                                  : element.description
                                : ""
                            }
                            imageUrl={element.urlToImage}
                            newsUrl={element.url}
                            publishedAt={element.publishedAt}
                            author={element.author ? element.author : "unknown"}
                            source={element.source.name}
                          ></NewsItem>
                        );
                      }
                    })}
                  </div>
                  <div className='col'>
                    {firstArticle.map((element, i) => {
                      if (i === 4) {
                        return (
                          <NewsItem
                            mainItem={true}
                            key={element.url}
                            title={
                              element.title
                                ? element.title.length > 50
                                  ? (element.title =
                                      element.title.slice(0, 50) + "...")
                                  : element.title
                                : ""
                            }
                            description={
                              element.description
                                ? element.description.length > 100
                                  ? (element.description =
                                      element.description.slice(0, 100) + "...")
                                  : element.description
                                : ""
                            }
                            imageUrl={element.urlToImage}
                            newsUrl={element.url}
                            publishedAt={element.publishedAt}
                            author={element.author ? element.author : "unknown"}
                            source={element.source.name}
                          ></NewsItem>
                        );
                      }
                    })}
                  </div>
                </div>
              </div>
            </div>

            {articles.slice(5).map((element) => {
              return (
                <div className='col-md-4' key={element.url}>
                  <NewsItem
                    title={
                      element.title
                        ? element.title.length > 50
                          ? (element.title = element.title.slice(0, 50) + "...")
                          : element.title
                        : ""
                    }
                    description={
                      element.description
                        ? element.description.length > 100
                          ? (element.description =
                              element.description.slice(0, 100) + "...")
                          : element.description
                        : ""
                    }
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    publishedAt={element.publishedAt}
                    author={element.author ? element.author : "unknown"}
                    source={element.source.name}
                  ></NewsItem>
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
