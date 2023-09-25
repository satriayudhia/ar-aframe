window.onload = () => {
  let testEntityAdded = false;

  const el = document.querySelector("[gps-new-camera]");

  el.addEventListener("gps-camera-update-position", (e) => {
    alert(
      `lon ${e.detail.position.longitude} lat ${e.detail.position.latitude}`
    );
    // function measure(lat1, lon1, lat2, lon2) {
    //   // generally used geo measurement function
    //   var R = 6378.137; // Radius of earth in KM
    //   var dLat = (lat2 * Math.PI) / 180 - (lat1 * Math.PI) / 180;
    //   var dLon = (lon2 * Math.PI) / 180 - (lon1 * Math.PI) / 180;
    //   var a =
    //     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    //     Math.cos((lat1 * Math.PI) / 180) *
    //       Math.cos((lat2 * Math.PI) / 180) *
    //       Math.sin(dLon / 2) *
    //       Math.sin(dLon / 2);
    //   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    //   var d = R * c;
    //   return d * 1000; // meters
    // }

    if (!testEntityAdded) {
      alert(
        `Got first GPS position: lon ${e.detail.position.longitude} lat ${e.detail.position.latitude}`
      );
      // Add a box to the north of the initial GPS position
      const entity = document.createElement("a-box");
      entity.setAttribute("scale", {
        x: 20,
        y: 20,
        z: 20,
      });
      entity.setAttribute("material", { color: "red" });
      entity.setAttribute("gps-new-entity-place", {
        latitude: e.detail.position.latitude + 0.001,
        longitude: e.detail.position.longitude,
      });
      document.querySelector("a-scene").appendChild(entity);

      // Add a cylinder to the north of the initial GPS position
      const entity2 = document.createElement("a-cylinder");
      entity2.setAttribute("scale", {
        x: 20,
        y: 20,
        z: 20,
      });
      entity2.setAttribute("color", "orange");
      entity2.setAttribute("height", "1.5");
      entity2.setAttribute("gps-new-entity-place", {
        latitude: e.detail.position.latitude - 0.001,
        longitude: e.detail.position.longitude,
      });
      document.querySelector("a-scene").appendChild(entity2);

      // Add a glb to the north of the initial GPS position
      const entity3 = document.createElement("a-gltf-model");
      entity3.setAttribute("src", "#animated-asset");
      entity3.setAttribute("position", "0 1.5 0");
      entity3.setAttribute("rotation", "0 180 0");
      entity3.setAttribute("scale", "100 100 100");
      entity3.setAttribute("animation-mixer", "");

      entity3.setAttribute("gps-new-entity-place", {
        latitude: e.detail.position.latitude,
        longitude: e.detail.position.longitude + 0.001,
      });

      const text = document.createElement("a-text");
      const textScale = 100;
      text.setAttribute("look-at", "[gps-new-camera]");
      text.setAttribute("scale", {
        x: textScale,
        y: textScale,
        z: textScale,
      });
      text.setAttribute("value", "HALLO WORLD");
      text.setAttribute("align", "center");
      entity3.appendChild(text);

      document.querySelector("a-scene").appendChild(entity3);
    }
    testEntityAdded = true;
  });
};
