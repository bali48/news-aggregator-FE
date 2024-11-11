import React from 'react'
const NewsItem = (props) => {
  
    let { title, description, imageUrl ,newsUrl,publishedAt,author,source,mainItem} = props

    const hrefStyle = {
      color:'black',
      fontSize:'1.4vh'
    }

    return (
      <div className="row">
      <div className="my-4">
        <div className="card" style={mainItem?{width:'18vh'}:{}}>
          <div style={!mainItem?{display:'flex',justifyContent:'flex-end',position:'absolute',right:'0'}:{display:'flex',justifyContent:'flex-end',position:'absolute',right:'0',fontSize:'1.2vh'}}>
        <span className="badge rounded-pill bg-danger">{source}</span>
        </div>
          {<img src={imageUrl?imageUrl:"https://www.euractiv.com/wp-content/uploads/sites/2/2014/03/news-default.jpeg"} className="card-img-top" alt="..."/>}
          
          
          <div className="card-body">
            {
              !mainItem?
              <h5 className="card-title">{title}</h5>
              :
              <a className="card-title" style={hrefStyle} href={newsUrl} target="_blank" rel="noreferrer">{title}</a>
            }
            
            <p className="card-text"style={mainItem?{fontSize:'1vh'}:{}} >{description}</p>
            {!mainItem && <p className="card-text"><small className="text-muted" style={mainItem?{fontSize:'1vh'}:{}}>By {author} on {new Date(publishedAt).toGMTString()}</small> </p>}
            {!mainItem && <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark" style={mainItem?{fontSize:'1vh'}:{}}>Read More</a>}
          </div>
        </div>
      </div>
      </div>
    )
  
}

export default NewsItem