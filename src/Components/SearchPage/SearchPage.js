import React, { Component } from 'react';

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

    render() {
        return(
            <div className='white-overlay'>
                <label>Flight Number</label>
                <input id="flightNo"
                    placeholder="e.g. FR1647" 
                    value={this.state.flightNo}
                    onChange={this.changeHandler}/>
                
                <FlightCard/>
            </div>
        );
    }
}

export default SearchPage;