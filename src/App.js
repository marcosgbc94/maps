import React, { useState, useEffect } from 'react';
import fetchEventsCategories from './API/EventsCategories';
import fetchEvents from './API/Events';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

function App() {
  const [eventCategories, setEventCategories] = useState([]);
  const [event, setEvent] = useState([]);

  useEffect(() => {
    const fetchEventsCategoriesData = async () => {
      try {
        const categoriesData = await fetchEventsCategories();
        setEventCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchEventsData = async () => {
      try {
        const eventsData = await fetchEvents();
        setEvent(eventsData);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEventsCategoriesData();
    fetchEventsData();
  }, []);

  return (
    <div id="app">
      <MapContainer center={[51.505, -0.09]} zoom={1} scrollWheelZoom={true} className='w-full h-full fixed'>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {
          event.length > 0 ? (
            event.map((evt) => (
              evt.geometry.length > 0 ? (
                evt.geometry.map((geometry) => (
                <Marker key={geometry.date} position={[parseFloat(geometry.coordinates[1]), parseFloat(geometry.coordinates[0])]}>
                  <Popup>
                    {evt.title}
                  </Popup>
                </Marker>
                )))
              : null
            ))
          ) : null
        }
      </MapContainer>
    </div>
  );
}

export default App;