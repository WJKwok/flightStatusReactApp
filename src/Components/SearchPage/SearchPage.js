import React, { Component } from 'react';
import { connect } from 'react-redux';

import { searchFlight } from '../../Store/Actions/searchAction';
import { FlightCard } from '../FlightCard/FlightCard';

class SearchPage extends Component {

    state = {
        searchInput: '',
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
        console.log(this.state.searchInput);
    }

    submitHandler = (e) => {

        let searchTerm = this.state.searchInput;
        //remove all spacing in search
        let bs = searchTerm.split(' ').join('');

        if (bs.length == 0) {

            this.setState({
                searchInput: ''
            })

            return null;
        }

        //split search to carrierId and number
        let regexStr = bs.match(/[a-z]+|[^a-z]+/gi);
        this.props.searchFlight(regexStr[0], regexStr[1]);

    }

    render() {

        const {flightSearchResult, errorMessage} = this.props;

        return(
            <div className='white-overlay'>
                <label>Flight Number</label>
                <div className='h-align'>
                    <input id="searchInput"
                        placeholder="e.g. FR1647" 
                        value={this.state.searchInput}
                        onChange={this.changeHandler}/>
                    <a className="waves-effect waves-light btn" onClick={this.submitHandler}>Search</a>
                </div>
                {errorMessage ? <h1>{errorMessage}</h1> : null }
                <FlightCard props={flightSearchResult}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        flightSearchResult: state.search.data,
        errorMessage: state.search.errorMessage,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        searchFlight: (carrier, flight) => dispatch(searchFlight(carrier, flight))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);