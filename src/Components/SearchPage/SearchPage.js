import React, { Component } from 'react';
import axios from 'axios';

import { FlightCard } from '../FlightCard/FlightCard';

class SearchPage extends Component {

    state = {
        flightNo: '',
        searchedNo: '',
        imptData: {},
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
        console.log(this.state.flightNo);
    }

    submitHandler = (e) => {
        let searchTerm = this.state.flightNo;
        let bs = searchTerm.split(' ').join('');
        let regexStr = bs.match(/[a-z]+|[^a-z]+/gi);
        console.log(regexStr);
        console.log('searching');
        let searchedNo = regexStr[0] + regexStr[1]
        searchedNo = searchedNo.toUpperCase();
        this.setState({
            flightNo: '',
            searchedNo: searchedNo
        })
        const appId = '8a3f5b9c';
        const appKey = '97ed09e2c8b1052afeaae034e602802f';
        const carrier = regexStr[0];
        const flight = regexStr[1];
        const date = '2020/1/29';
        let url = `/flex/flightstatus/rest/v2/json/flight/status/${carrier}/${flight}/arr/${date}?appId=${appId}&appKey=${appKey}&utc=false`

        
        axios.get(url)
        .then((resp) => {
            let imptData = {};
            console.log(resp);

            let specificData = resp.data.flightStatuses[0]

            //from and to airport code
            console.log(specificData.departureAirportFsCode);
            console.log(specificData.arrivalAirportFsCode);
            
            //Flight Duration
            console.log(specificData.flightDurations.scheduledBlockMinutes);
            
            //Flight arrival time
            console.log(specificData.arrivalDate.dateLocal);
            
            //https://developer.flightstats.com/api-docs/flightstatus/v2/flightstatusresponse
            console.log(specificData.status);
            
            //Delays
            console.log(specificData.delays.arrivalGateDelayMinutes);

            //terminal/gate
            console.log(specificData.airportResources.arrivalTerminal);
            console.log(specificData.airportResources.arrivalGate);

            //baggage
            console.log(specificData.airportResources.baggage);

            imptData = {
                from: specificData.departureAirportFsCode,
                to: specificData.arrivalAirportFsCode,
            }

            this.setState({
                imptData: imptData,
            })

            console.log('ehehhehe');
            console.log(this.state.imptData.from);
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
                    <a className="waves-effect waves-light btn" onClick={this.submitHandler}>Search</a>
                </div>
                <h1>{this.state.searchedNo}</h1>
                <FlightCard props={this.state.imptData}/>
            </div>
        );
    }
}

export default SearchPage;