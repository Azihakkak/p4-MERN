import React, { useRef, useEffect } from "react";

import "./Map.css";
const Map = (props) => {
  const mapRef = useRef();

  // zoom and center will be our dependencies here,
  // so we use destructuring to be able to pass them as dependencies to useEffect argument.
  const { center, zoom } = props;

  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: center,
      zoom: zoom,
    });

    // we can render a marker as well
    // to marker we pass an object
    new window.google.maps.Marker({ position: center, map: map });
  }, [center, zoom]);

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
    ></div>
  );
};

export default Map;
