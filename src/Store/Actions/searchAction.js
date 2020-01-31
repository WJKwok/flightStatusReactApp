import axios from 'axios';

export const searchFlight = () => {
    return (dispatch) => {
        const appId = '8a3f5b9c';
        const appKey = '97ed09e2c8b1052afeaae034e602802f';
        const carrier = 'SQ';
        const flight = '276';
        const date = '2020/1/31';
        let url = `/flex/flightstatus/rest/v2/json/flight/status/${carrier}/${flight}/arr/${date}?appId=${appId}&appKey=${appKey}&utc=false`

        
        return axios.get(url).then(response => {
            console.log(response);
        })
    }
}