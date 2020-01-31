import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { searchFlight } from '../../Store/Actions/searchAction';

import { FlightCard } from '../FlightCard/FlightCard';

class SearchPage extends Component {

    flightStatus = {
        'A': 'Active',
        'D': 'Diverted',
        'DN': 'Data source needed',
        'L': 'Landed',
        'NO': 'Not Operational',
        'R': 'Redirected',
        'S': 'Scheduled',
        'U': 'Unknown'
    }

    state = {
        searchInput: '',
        errorMessage: '',
        imptData: {},
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
        console.log(this.state.searchInput);
    }

    submitHandler = (e) => {

        this.props.searchFlight();

        let searchTerm = this.state.searchInput;
        let bs = searchTerm.split(' ').join('');

        if (bs.length == 0) {

            this.setState({
                searchInput: '',
                errorMessage: '',
            })

            return null;
        }

        let regexStr = bs.match(/[a-z]+|[^a-z]+/gi);
        
        //Display Searched Flight in uppercase
        let flightNumber = regexStr[0] + regexStr[1]
        flightNumber = flightNumber.toUpperCase();
        this.setState({
            searchInput: '',
            errorMessage: '',
        })

        //get date
        const today = new Date();
        const todayFormatted = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();

        const appId = '8a3f5b9c';
        const appKey = '97ed09e2c8b1052afeaae034e602802f';
        const carrier = regexStr[0];
        const flight = regexStr[1];
        const date = todayFormatted;
        let url = `/flex/flightstatus/rest/v2/json/flight/status/${carrier}/${flight}/arr/${date}?appId=${appId}&appKey=${appKey}&utc=false`

        
        axios.get(url)
        .then((resp) => {

            //console.log(resp);

            let imptData = {};

            let departureDate;
            let departureTime;
            let arrivalDate;
            let arrivalTime;

            let specificData = resp.data.flightStatuses[0]

            if (specificData.departureDate.dateLocal) {
                let splitDepTime = specificData.departureDate.dateLocal.split('T');
                [departureDate, departureTime] = splitDepTime;
            }

            if (specificData.arrivalDate.dateLocal) {
                let splitArrTime = specificData.arrivalDate.dateLocal.split('T');
                [arrivalDate, arrivalTime] = splitArrTime;
            }

            const flightLength = specificData.flightDurations.scheduledBlockMinutes;
            const flightDuration = `${Math.floor(flightLength/60)} Hours ${flightLength%60} Mins`;

            imptData = {
                flightNumber: flightNumber,
                from: specificData.departureAirportFsCode,
                to: specificData.arrivalAirportFsCode,
                flightDuration: flightDuration,
                departureDate: departureDate,
                departureTime: departureTime,
                status: this.flightStatus[specificData.status],
                arrivalDate: arrivalDate,
                arrivalTime: arrivalTime,
                delay: specificData.delays.arrivalGateDelayMinutes,
                departureTerminal: specificData.airportResources.departureTerminal,
                arrivalTerminal: specificData.airportResources.arrivalTerminal,
                gate: specificData.airportResources.arrivalGate,
                baggage: specificData.airportResources.baggage
            }

            this.setState({
                imptData: imptData,
            }) 

        }).catch(error => {
            this.setState({
                errorMessage: 'Flight Unavailable',
                imptData: {},
            })
        });
    }

    render() {
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
                {this.state.errorMessage ? <h1>{this.state.errorMessage}</h1> : null }
                <FlightCard props={this.state.imptData}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        searchFlight: () => dispatch(searchFlight())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);