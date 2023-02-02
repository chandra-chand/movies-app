import {Component} from 'react'

import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'

import Header from '../Header'
import Load from "../Load"

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Search extends Component{
    state={list:[],apiStatus:apiStatusConstants.initial,searchInput:""}

    componentDidMount(){
        this.searchVideos()
    }

    searchVideos = async ()=> {
        this.setState({apiStatus:apiStatusConstants,inProgress})
        const jwtToken =  Cookies.get("jwt_token")
        const url = `https://apis.ccbp.in/movies-app/movies-search?search=${searchText}`
        const options = {
            method:"GET",
            headers:{
                Authorization:`Bearer ${jwtToken}`
            }
        }
        const response = await fetch(url,options)
        
        if(response.ok===true){
            const data = await response.json()
            const updatedData = data.results.map((each)=>({
                id:each.id,
                backdropPath:each.backdrop_path,
                overview:each.overview,
                posterPath:each.poster_path,
                title:each.title
            }))
            this.setState({apiStatus:apiStatusConstants.success,list:updatedData})
        }else{
            this.setState({apiStatus:apiStatusConstants.failure})
        }
    }

    renderFailure = ()=> {
        const {searchInput} = this.state

        return(
        <>
            <img src="https://res.cloudinary.com/djo72ivyd/image/upload/v1675329748/search_error_image_lhbudu.png" alt="no movies"/>
            <p className="search-fail-para">Your Search for {searchInput} did not find any matches.</p>
        </>
        )
    
    }

    renderLoader = ()=> (
        <Load/>
    )

    renderSuccess = ()=> {
        const {searchInput} = this.state
        const empty = searchInput === " "

        return(

        )
    }


    render(){
        return()
    }
}
export default Search