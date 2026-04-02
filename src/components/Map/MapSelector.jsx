"use client";

import { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import L from "leaflet";

/* FIX MARKER ICON */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

/* FLY TO LOCATION */
function FlyTo({ position }) {
  const map = useMap();
  if (position) map.flyTo(position, 15);
  return null;
}

/* CLICK SELECT */
function LocationMarker({ setMarker }) {
  useMapEvents({
    async click(e) {
      const { lat, lng } = e.latlng;

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
        );
        const data = await res.json();

        setMarker({
          lat,
          lng,
          address: data?.display_name || "Selected location",
        });
      } catch {
        setMarker({ lat, lng, address: "Selected location" });
      }
    },
  });

  return null;
}

export default function MapSelector({ marker, setMarker }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [locating, setLocating] = useState(false);
  const [error, setError] = useState("");

  const wrapperRef = useRef(null);

  /* CLOSE DROPDOWN */
  useEffect(() => {
    const handler = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* AUTOCOMPLETE */
  useEffect(() => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    const t = setTimeout(async () => {
      setLoading(true);

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            query,
          )}`,
        );

        const data = await res.json();
        setSuggestions(data || []);
        setShow(true);
      } catch {
        setSuggestions([]);
      }

      setLoading(false);
    }, 400);

    return () => clearTimeout(t);
  }, [query]);

  /* SELECT SUGGESTION */
  const selectPlace = (place) => {
    const lat = parseFloat(place.lat);
    const lng = parseFloat(place.lon);

    setMarker({
      lat,
      lng,
      address: place.display_name,
    });

    setQuery(place.display_name);
    setShow(false);
  };

  /* 📍 CURRENT LOCATION (MOBILE SAFE) */
  const getCurrentLocation = () => {
    setError("");

    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      return;
    }

    if (location.protocol !== "https:" && location.hostname !== "localhost") {
      setError("Location requires HTTPS");
      return;
    }

    setLocating(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;

          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
          );
          const data = await res.json();

          setMarker({
            lat,
            lng,
            address: data?.display_name || "Current location",
          });
        } catch {
          setMarker({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            address: "Current location",
          });
        }

        setLocating(false);
      },
      (err) => {
        setLocating(false);

        if (err.code === 1) {
          setError("Permission denied. Allow location access.");
        } else if (err.code === 2) {
          setError("Turn on device location (GPS).");
        } else if (err.code === 3) {
          setError("Location request timed out.");
        } else {
          setError("Failed to get location.");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  };

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* TOP BAR */}
      <div
        ref={wrapperRef}
        style={{
          padding: 10,
          background: "#fff",
          borderBottom: "1px solid #eee",
        }}
      >
        <div style={{ display: "flex", gap: 10 }}>
          {/* SEARCH */}
          <div style={{ flex: 1, position: "relative" }}>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search location..."
              style={{
                width: "100%",
                padding: 10,
                borderRadius: 8,
                border: "1px solid #ccc",
              }}
            />

            {/* DROPDOWN */}
            {show && suggestions.length > 0 && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  right: 0,
                  background: "#fff",
                  maxHeight: 250,
                  overflowY: "auto",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                  borderRadius: 8,
                  zIndex: 2000,
                }}
              >
                {suggestions.map((p, i) => (
                  <div
                    key={i}
                    onClick={() => selectPlace(p)}
                    style={{
                      padding: 10,
                      cursor: "pointer",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    {p.display_name}
                  </div>
                ))}
              </div>
            )}

            {loading && <div style={{ fontSize: 12 }}>Searching...</div>}
          </div>

          {/* 📍 GPS BUTTON */}
          <button
            onClick={getCurrentLocation}
            style={{
              width: 45,
              height: 45,
              borderRadius: "50%",
              border: "1px solid #ccc",
              background: "#fff",
              cursor: "pointer",
              fontSize: 18,
            }}
          >
            {locating ? "⏳" : "📍"}
          </button>
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <div style={{ color: "red", fontSize: 12, marginTop: 5 }}>
            {error}
          </div>
        )}
      </div>

      {/* MAP */}
      <div style={{ flex: 1 }}>
        <MapContainer
          center={[26.9124, 75.7873]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <LocationMarker setMarker={setMarker} />

          {marker && (
            <>
              <Marker position={[marker.lat, marker.lng]} />
              <FlyTo position={[marker.lat, marker.lng]} />
            </>
          )}
        </MapContainer>
      </div>
    </div>
  );
}
