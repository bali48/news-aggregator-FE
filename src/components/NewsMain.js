import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import NewsHeader from "./NewsHeader";
import { get } from "../services/axiosService";
import { apiEndPoints } from "../Constants/urls";
import { useSearch } from "../context/filterContext";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);
  const [firstArticle, setFirstArticle] = useState([]);

  const { searchTerm } = useSearch();
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
    const { newsapi,guardianapi,newYarkApiUrl } = await get(apiEndPoints.USERARTICALS, params);
    props.setProgress(30);
    const allArticles = [
      ...newsapi.articles,
      ...guardianapi.response.results.map(article => ({
        source: {
          id: "guardian",
          name: "The Guardian"
        },
        author: article.fields?.byline || "Unknown",
        title: article.fields?.headline,
        description: article.fields?.standfirst || article?.fields?.trailText,
        url: article.webUrl,
        urlToImage: article.fields?.thumbnail || "",
        publishedAt: article.webPublicationDate,
        content: article.fields?.main || "No content available"
      })),
      ...newYarkApiUrl.results.map(article => ({
        source: {
          id: "nytimes",
          name: "The New York Times"
        },
        author: article.byline || "Unknown",
        title: article.title,
        description: article.abstract,
        url: article.url,
        urlToImage: article.multimedia && article.multimedia.length > 0 ? article.multimedia[0].url : "",
        publishedAt: article.published_date,
        content: article.source || "No content available"
      }))
    ];
        
      props.setProgress(70);
    setFirstArticle(allArticles);
    setArticles(allArticles);
    setTotalArticles(allArticles.length);
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

    const { newsapi } = await get(apiEndPoints.USERARTICALS, params);
    let parsedData = await newsapi;
    setArticles(articles.concat(parsedData.articles));
    setTotalArticles(parsedData.totalResults);
    setLoading(false);
  };

  // Filter articles based on the search term
  const filteredArticles = articles.filter((article) =>
    article.title?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
    (article.description && article.description?.toLowerCase().includes(searchTerm?.toLowerCase()))
  );

  return (
    <>
      <h1 className="text-center" style={{ margin: "35px 0px" }}>
        NewsHub - Top {capitalize(props.category)} headlines
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={filteredArticles.length}
        next={fetchMoreData}
        hasMore={filteredArticles.length !== totalArticles}
        loader={loading && <Spinner />}
      >
        <div className="container">
          <div className="row">
            <div className="row">
              <div className="col-sm-8">
                {filteredArticles.slice(0, 1).map((element,index) => (
                  <NewsHeader
                    key={index}
                    item={0}
                    title={
                      element.title.length > 50
                        ? element.title.slice(0, 50) + "..."
                        : element.title
                    }
                    description={
                      element.description && element.description.length > 100
                        ? element.description.slice(0, 100) + "..."
                        : element.description
                    }
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    publishedAt={element.publishedAt}
                    author={element.author || "unknown"}
                    source={element.source.name}
                  />
                ))}
              </div>
              <div className="col-sm-4">
                <div className="row">
                  {filteredArticles.slice(1, 5).map((element) => (
                    <div className="col" key={element.url}>
                      <NewsItem
                        mainItem
                        title={
                          element.title.length > 50
                            ? element.title.slice(0, 50) + "..."
                            : element.title
                        }
                        description={
                          element.description && element.description.length > 100
                            ? element.description.slice(0, 100) + "..."
                            : element.description
                        }
                        imageUrl={element.urlToImage}
                        newsUrl={element.url}
                        publishedAt={element.publishedAt}
                        author={element.author || "unknown"}
                        source={element.source.name}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {filteredArticles.slice(5).map((element) => (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={
                    element.title.length > 50
                      ? element.title.slice(0, 50) + "..."
                      : element.title
                  }
                  description={
                    element.description && element.description.length > 100
                      ? element.description.slice(0, 100) + "..."
                      : element.description
                  }
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  publishedAt={element.publishedAt}
                  author={element.author || "unknown"}
                  source={element.source.name}
                />
              </div>
            ))}
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
