window.onload = () => {
  let testEntityAdded = false;

  const el = document.querySelector("[gps-new-camera]");

  el.addEventListener("gps-camera-update-position", (e) => {
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
      entity3.setAttribute("scale", "10 10 10");
      entity3.setAttribute("animation-mixer", "");

      entity3.setAttribute("gps-new-entity-place", {
        latitude: e.detail.position.latitude,
        longitude: e.detail.position.longitude + 0.001,
      });
      document.querySelector("a-scene").appendChild(entity3);
    }
    testEntityAdded = true;
  });
};
