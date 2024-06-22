import axios from 'axios';

const EventsCategories = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_NASA_API}categories`);
        return response.data.categories;
    } catch (error) {
        console.error(error);
    }
}

export default EventsCategories;