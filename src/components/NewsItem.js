import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let {title,description,imageUrl, newsUrl, author, date, source} = this.props
        return (
            <div className="my-3">
                <div className="card shadow p-3 mb-5 bg-body rounded border border-2 rounded-3">
                <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{zIndex: 1, left: '50%'}}> {source}</span>
                    <img src={!imageUrl?"https://bsmedia.business-standard.com/_media/bs/img/article/2021-09/13/full/1631481496-941.jpg" : imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body text-center">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">By {!author?"Unknown" : author} on {new Date(date).toGMTString()} </small></p>
                        <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
