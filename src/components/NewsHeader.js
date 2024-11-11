import React from 'react'

export default function NewsHeader(props) {
    let { title, description, imageUrl ,newsUrl,publishedAt,author,source} = props
    return (
        <div className="container">
        <div class="card mb-3">
            <img className="card-img-top" src={imageUrl?imageUrl:"https://www.euractiv.com/wp-content/uploads/sites/2/2014/03/news-default.jpeg"} alt="Card" style={{height:"50vh"}}/>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <p className="card-text"><small className="text-muted">By {author} on {new Date(publishedAt).toGMTString()}</small></p>
                <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
            </div>
        </div>
        </div>
    )
}
