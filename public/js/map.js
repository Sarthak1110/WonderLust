
mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
  container: 'map',
  center: listing.geometry.coordinates,
  zoom: 9
});

// Create the popup first so it’s easy to reuse / tweak
const popup = new mapboxgl.Popup({
  offset: 25,
  className: 'booking-popup'   //give it your custom class
}).setHTML(`
  <h4>${listing.location}</h4>
  <p>Exact location provided after booking</p>
`);

new mapboxgl.Marker({ color: 'red' })
  .setLngLat(listing.geometry.coordinates)
  .setPopup(popup)            //attach the styled popup
  .addTo(map);
