import axios from 'axios';

const Events = async (open = true, limit = 50, days = 20) => {
    const parameter_open = open === true ? 'status="open"' : '';
    const parameter_limit = typeof limit === 'number' && limit > 0 && limit < 1000 ? `&limit=${limit}` : '&limit=50';
    const parameter_days = typeof days === 'number' && days > 0 && days < 1000 ? `&days=${days}` : '&days=20';
    try {
        const response = await axios.get(`${process.env.REACT_APP_NASA_API}events?${parameter_open}${parameter_limit}${parameter_days}`);
        return response.data.events;
    } catch (error) {
        console.error(error);
    }
}

export default Events;