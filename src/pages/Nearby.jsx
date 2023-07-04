import "mapbox-gl/dist/mapbox-gl.css";
import Map, {
  Marker,
  NavigationControl,
  FullscreenControl,
  GeolocateControl,
} from "react-map-gl";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function Nearby() {
  const city = [
    {
      name: "Mumbai",
      latitude: 19.076,
      longitude: 72.8777,
      vacant: 0,
    },
    {
      name: "New Delhi",
      latitude: 28.6139,
      longitude: 77.209,
      vacant: 7,
    },
    {
      name: "Bangalore",
      latitude: 12.9716,
      longitude: 77.5946,
      vacant: 8,
    },
    {
      name: "Hyderabad",
      latitude: 17.385,
      longitude: 78.4867,
      vacant: 7,
    },
    {
      name: "Chennai",
      latitude: 13.0827,
      longitude: 80.2707,
      vacant: 6,
    },
    {
      name: "Kolkata",
      latitude: 22.5726,
      longitude: 88.3639,
      vacant: 4,
    },
    {
      name: "Jaipur",
      latitude: 26.9124,
      longitude: 75.7873,
      vacant: 9,
    },
    {
      name: "Ahmedabad",
      latitude: 23.0225,
      longitude: 72.5714,
      vacant: 1,
    },
    {
      name: "Pune",
      latitude: 18.5204,
      longitude: 73.8567,
      vacant: 5,
    },
    {
      name: "Surat",
      latitude: 21.1702,
      longitude: 72.8311,
      vacant: 2,
    },
  ];

  const [mkr, setmkr] = useState([]);
  useEffect(() => {
    const fun = async () => {
      try {
        const result = await axios.get("https://disa2.onrender.com/getorg");
        setmkr(result.data.org);
      } catch (err) {
        console.log(err);
      }
    };
    fun();
  }, []);

  return (
    <div className="App relative">
      <div className="fixed top-16 left-0 bg-white z-30 ">
        <div className="flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
            />
          </svg>
          : Organization
        </div>
        <br />
        <div className="flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
          : Shelter
        </div>
      </div>
      <Map
        mapboxAccessToken="pk.eyJ1IjoidmFyZGhhbjEyMyIsImEiOiJjbGg4d2MzcTcwMXFhM25zMmZsNGtsaXhqIn0.Bzh3Zgld2ACsf8SQC04D4Q"
        style={{
          width: "100vw",
          height: "100vh",
        }}
        initialViewState={{
          longitude: 78.795319,
          latitude: 28.841064,
          zoom: 5,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        {mkr.map((marker, index) => (
          <Marker
            longitude={marker.longitude}
            className="relative"
            latitude={marker.latitude}
            key={index}
          >
            {console.log(marker)}
            <div className="text-red-800">
              <Link
                to="/orgmkrprofile"
                onClick={() => {
                  localStorage.setItem("markerOrg", JSON.stringify(marker));
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
              </Link>
            </div>
          </Marker>
        ))}
        {city.map((item, i) => {
          return (
            <>
              <Marker latitude={item.latitude} longitude={item.longitude}>
                <div
                  className="tooltip hover:tooltip-open"
                  data-tip={`vacant : ${item?.vacant}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                  </svg>
                </div>
              </Marker>
            </>
          );
        })}
        <NavigationControl position="bottom-right" />
        <FullscreenControl />
        <GeolocateControl />
      </Map>
    </div>
  );
}

export default Nearby;