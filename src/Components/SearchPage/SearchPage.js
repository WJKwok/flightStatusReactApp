import React, { Component } from 'react';
import axios from 'axios';

import { FlightCard } from '../FlightCard/FlightCard';

class SearchPage extends Component {

    state = {
        flightNo: '',
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
        console.log(this.state.flightNo);
    }

    componentDidMount() {
        const appId = '8a3f5b9c';
        const appKey = '97ed09e2c8b1052afeaae034e602802f';
        const carrier = 'tp';
        const flight = '536';
        const date = '2020/1/29';
        let url = `/flex/flightstatus/rest/v2/json/flight/status/${carrier}/${flight}/arr/${date}?appId=${appId}&appKey=${appKey}&utc=false`
        axios.get(url)
        .then((resp) => {
            console.dir(resp);
        });
    }

    render() {
        return(
            <div className='white-overlay'>
                <label>Flight Number</label>
                <div className='h-align'>
                    <input id="flightNo"
                        placeholder="e.g. FR1647" 
                        value={this.state.flightNo}
                        onChange={this.changeHandler}/>
                    <a className="waves-effect waves-light btn">Search</a>
                </div>
                <FlightCard/>
            </div>
        );
    }
}

export default SearchPage;