// Full-bleed between the hero and the pink section: no frame, no side
// margins, just the artwork edge to edge — the map's own white background
// carries the transition from the hero's royal blue into the pink section.
const AmenityMapSection = () => (
  <section className="casaley-amenity" data-screen-label="Amenity map">
    <img src="./assets/amenity-map.jpg" alt="Casaley Officer amenity map" />
  </section>
);

window.AmenityMapSection = AmenityMapSection;
