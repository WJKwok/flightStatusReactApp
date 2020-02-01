import React from 'react';

const FlightCard = (props) => {
    let object = props.props;
    console.log(object);
    
    if (object) {
        return(
            <div>
                <div className="row">
                    <div className="col s12 line-height">
                        <p className="flight-header">{object.flightNumber.toUpperCase()}</p>
                        <p>Flight Status: {object.status}</p>
                        <p>Flight Duration: {object.flightDuration}</p>
                        <p>Delay: {object.delay? `${object.delay} mins` : 'None'}</p>
                    </div>
                    <div className="col s12 m6">
                        <div className="card blue-grey darken-1">
                            <div className="card-content white-text">
                                <span className="card-title">From: {object.from}</span>
                                <p>Date: {object.departureDate? object.departureDate : '-'}</p>
                                <p>Time: {object.departureTime? object.departureTime.substring(0,5) : '-'}</p>
                                <p>Terminal: {object.departureTerminal? object.departureTerminal : '-'}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col s12 m6">
                        <div className="card blue-grey darken-1">
                            <div className="card-content white-text">
                                <span className="card-title">To: {object.to}</span>
                                <p>Date: {object.arrivalDate? object.arrivalDate : '-'}</p>
                                <p>Time: {object.arrivalTime? object.arrivalTime.substring(0,5) : '-'}</p>
                                <p>Terminal: {object.arrivalTerminal? object.arrivalTerminal : '-'}</p>
                                <p>Gate: {object.gate? object.gate : '-'}</p>
                                <p>Baggage: {object.baggage? object.baggage : '-'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div></div>
    );
    
}

export { FlightCard };