import React, { useEffect, useState } from "react";

import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import NewsHeader from "./NewsHeader";
import { apiEndPoints } from "../Constants/urls";
import { get } from "../services/axiosService";

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
    setLoading(true);
    const params = {
      category: props.category,
      pageSize: props.pageSize,
      page: props.page,
    };
    const { newsapi } = await get(apiEndPoints.HOMEPAGE, params);
    props.setProgress(30);
    let parsedData = newsapi;
    props.setProgress(70);
    setFirstArticle(parsedData.articles);
    setArticles(parsedData.articles);
    setTotalArticles(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    document.title = `NewsHub - ${capitalize(props.category)}`;
    updateNews();
  }, []);

  const fetchMoreData = async () => {
    setPage(page + 1);
    setLoading(true);
    const params = {
      category: props.category,
      pageSize: props.pageSize,
      page: props.page,
    };

    const { newsapi } = await get(apiEndPoints.HOMEPAGE, params);
    let parsedData = await newsapi;
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
            {
              // console.log(articles[0].title)
              /* {
                        props.main && <NewsHeader title={articles[0].title ? (articles[0].title.length > 50 ? (articles[0].title = articles[0].title.slice(0, 50) + "...") : articles[0].title) : ""} description={articles[0].description ? (articles[0].description.length > 100 ? (articles[0].description = articles[0].description.slice(0, 100) + "...") : articles[0].description) : ""} imageUrl={articles[0].urlToImage}
                        newsUrl={articles[0].url} publishedAt={articles[0].publishedAt} author={(articles[0].author?articles[0].author:"unknown")} source={articles[0].source.name}></NewsHeader>
                    } */
            }

            {articles.map((element) => {
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
      {/* <div className="container d-flex justify-content-between">
                    {
                        !state.loading &&
                        <button type="button" disabled={state.page <= 1} className="btn btn-dark" onClick={handlePrevClick}> &larr; Previous</button>
                    }
                    {
                        !state.loading &&
                        <button type="button" disabled={state.page + 1 > Math.ceil(state.totalArticles / props.pageSize)} className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
                    }

                </div> */}
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
