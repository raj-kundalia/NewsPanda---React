import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";



export class News extends Component {
    static defaultProps = {
        country: "in",
        pageSize: 9,
        category: 'sports',
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        }
        document.title = `NewsPanda - ${this.capitalizeFirstLetter(this.props.category)}`
    }

    async updateNews() {
        this.props.setProgress(10)
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=02454bd2e14e43afa7a88e559b88ebec&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setProgress(25)
        let parsedData = await data.json();
        this.props.setProgress(50)
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false})
            this.props.setProgress(100)
    }

    async componentDidMount() {
        this.updateNews()
    }

    handlePrevClick = async () => {
        this.setState({page: this.state.page-1});
        this.updateNews();
    }

    handleNextClick = async () => {
        this.setState({page: this.state.page+1});
        this.updateNews();
    }

    fetchMoreData = async () => {
        this.setState({page: this.state.page + 1})
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=02454bd2e14e43afa7a88e559b88ebec&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            loading: false,
        })
    };
        render() {
            return (
                <>
                    <h1 className="text-center" style={{ margin: "82px 0px 15px"}}><b>NewsPanda</b></h1>
                    <h5 className="text-center">Top Headlines from {this.capitalizeFirstLetter(this.props.category)}</h5>
                    <hr />

                    {/* {this.state.loading && <Spinner />} */}
                    <InfiniteScroll
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.articles.lenght !== this.state.totalResults}
                        loader={<Spinner />}>

                            <div className="container">
                        <div className="row">
                            {this.state.articles.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title ? element.title : ""} source={element.source.name} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />
                                </div>
                            })}
                        </div>
                        </div>
                    </InfiniteScroll>
                </>
            )
        }
    }

export default News
