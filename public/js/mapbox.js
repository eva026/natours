/* eslint-disable */

export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiZXZhMDI2IiwiYSI6ImNrYnFjYnR5NjJoeHgyc3BmMzhkaTAzeGUifQ.Z0sNJF7yjnk7Ma50m4z8MA';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/eva026/ckbr9ca3q62eu1io27lpe4m8k',
    scrollZoom: false,
    // center: [-118.247225, 34.046353],
    // zoom: 10,
    // interactive: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';
    // Add marker
    const marker = new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Extend map bounds
    bounds.extend(loc.coordinates);
    map.fitBounds(bounds, {
      padding: {
        top: 200,
        bottom: 150,
        left: 100,
        right: 100,
      },
    });

    // Add popup
    new mapboxgl.Popup({ offset: 30 })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);
  });
};
