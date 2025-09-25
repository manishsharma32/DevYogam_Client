import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactPixel from "react-facebook-pixel";

function RouteChangeTracker() {
  const location = useLocation();

  useEffect(() => {
    ReactPixel.pageView(); // Tracks page views
  }, [location]);

  return null;
}

export default RouteChangeTracker;
