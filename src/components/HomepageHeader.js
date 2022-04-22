import React, {Component} from "react";
import Delaunator from "delaunator";
import * as THREE from "three";

class HomepageHeader extends Component {
  constructor(){
    super();
    this.state ={
      selectedGradient: 0
    }
  }

  toggleSelectedGradient(clickedGradient){
    this.setState({
      selectedGradient: clickedGradient
    })
    this.init(clickedGradient);
  }

  componentDidMount(){
    var activeAnimation;
    activeAnimation != null && cancelAnimationFrame( activeAnimation );
    let camera,
      scene,
      renderer;

    //Mouse variables for mouse light positioning
    var mouse = {
      x: 0,
      y: 0
    };

    var selectedGradient;

    const mouseLight = new THREE.PointLight(0xcccccc, 1, 300);
    var mouseLightHeight = 20;

    var headerContainer = document.getElementById("headerContainer");

    this.init = (clickedGradient) => {
      var headerCanvas = document.getElementById("headerCanvas");
      if(headerCanvas != null){
        headerCanvas.remove();
      }
      // SETUP
      // ======================
      headerContainer = document.getElementById("headerContainer");
      camera = new THREE.PerspectiveCamera(5, headerContainer.offsetWidth / headerContainer.offsetHeight, 1, 10000);
      camera.position.z = 1800 - (camera.aspect * 200);

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x000000);

      // LIGHTS
      // ======================
      const light = new THREE.DirectionalLight(0xcccccc);
      light.position.set(0, 0, 1);
      scene.add(light);

      mouseLight.position.set(-50, 10, mouseLightHeight);
      scene.add(mouseLight);

      // point light helper
      //const sphereSize = 1;
      //const pointLightHelper = new THREE.PointLightHelper(mouseLight, sphereSize);
      //scene.add(pointLightHelper);

      // TEMPORARY CANVAS
      // this is the canvas for mapping the gradient
      // ======================
      const tempCanvas = document.createElement('canvas');
      var ctx = tempCanvas.getContext("2d");

      const width = headerContainer.offsetWidth;
      const height = headerContainer.offsetWidth;

      const halfWidth = Math.floor(width * 0.5);

      const gradientRange = Math.sqrt(width ** 2 + height ** 2);

      // Size the canvas to match viewport
      tempCanvas.width = width;
      tempCanvas.height = height;

      var grd = ctx.createRadialGradient(THREE.Math.randFloat(-halfWidth / 2, halfWidth / 2) + halfWidth, height, THREE.Math.randFloat(5, 100), halfWidth, height, gradientRange);
      // Create a set of RANDOM gradients for the fill
      // var firstColorR = Math.floor(Math.random() * 255);
      // var firstColorG = Math.floor(Math.random() * 255);
      // var firstColorB = Math.floor(Math.random() * 255);
      //
      // var numOfGradientBands = Math.floor(THREE.Math.randFloat(2, 4));
      // grd.addColorStop(.25, "rgb(" + firstColorR + "," + firstColorG + ", " + firstColorB);
      // if(numOfGradientBands == 3){
      //   grd.addColorStop(.35, "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ", " + Math.floor(Math.random() * 255));
      // }
      // grd.addColorStop(.45, "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ", " + Math.floor(Math.random() * 255));
      //document.documentElement.style.setProperty("--brandColor", "rgba(" + firstColorR + "," + firstColorG + ", " + firstColorB + ", 1)");

      // Create a set of  gradients for the fill
      var gradients = [[73,50,64, 255, 0, 153], [51, 51, 51, 221, 24, 24], [75,19,79,201,75,75], [0,0,70,28,181,224], [15,52,67,52,232,158], [60,16,83,173,83,137]];

      if(clickedGradient !== undefined){
        selectedGradient = clickedGradient;
      }
      else{
        selectedGradient = Math.floor(Math.random() * gradients.length);
      }
      grd.addColorStop(.25, "rgb(" + gradients[selectedGradient][0] + "," + gradients[selectedGradient][1] + ", " + gradients[selectedGradient][2]);
      grd.addColorStop(.45, "rgb(" + gradients[selectedGradient][3] + "," + gradients[selectedGradient][4] + ", " + gradients[selectedGradient][5]);

      document.documentElement.style.setProperty("--brandColor", "rgba(" + gradients[selectedGradient][3] + "," + gradients[selectedGradient][4] + ", " + gradients[selectedGradient][5] + ", 1)");

      var gradientElements = document.getElementsByClassName("gradientOverlay");
      for (var i = 0; i < gradientElements.length; i++) {
        gradientElements[i].style.opacity = '1';
      }

      // Render gradient across whole fill covering canvas
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, width, height);

      var pixels = [];

      // Map the pixel data (RGB) to an array
      for (var a = 1; a < 33; a++) {
        for (var b = 1; b < 33; b++) {
          var pixel = ctx.getImageData((tempCanvas.width / 32) * a, (tempCanvas.height / 32) * b, 1, 1).data;
          pixels.push(pixel);
        }
      }

      // * For debugging, render the gradient canvas to see the gradient
      //document.body.appendChild(tempCanvas);

      // GENERATE LOW-POLY MESH
      // ======================

      var points3d = [];

      const visibleHeightAtZDepth = (depth, camera) => {
        // compensate for cameras not positioned at z=0
        const cameraOffset = camera.position.z;
        if (depth < cameraOffset)
          depth -= cameraOffset;
        else
          depth += cameraOffset;

        // vertical fov in radians
        const vFOV = camera.fov * Math.PI / 180;

        // Math.abs to ensure the result is always positive
        return 2 * Math.tan(vFOV / 2) * Math.abs(depth);
      };

      const visibleWidthAtZDepth = (depth, camera) => {
        const height = visibleHeightAtZDepth(depth, camera);
        return height * camera.aspect;
      };

      var visibleWidth = visibleWidthAtZDepth( camera.position.z, camera);
      if(visibleWidth < 800){
        visibleWidth = 500
      }

      var variance = THREE.Math.randFloat(1, 10);
      // generate 1024 verticies (32 * 32)
      for (let i = 1; i < 33; i++) {
        for (let j = 1; j < 33; j++) {
          // width/height of screen / 32 segents * index / 5 (used to scale the mesh. Larger values = smaller mesh)
          let x = (visibleWidth / 32) * i + THREE.Math.randFloatSpread(variance);
          let z = (visibleWidth / 32) * j + THREE.Math.randFloatSpread(variance);
          let y = THREE.Math.randFloatSpread(4);
          points3d.push(new THREE.Vector3(x, y, z));
        }
      }

      var geometry1 = new THREE.BufferGeometry().setFromPoints(points3d);

      // DELAUNAY / APPLY FACES TO MESH
      // ======================

      // triangulate x, z
      var indexDelaunay = Delaunator.from(points3d.map(v => {
        return [v.x, v.z];
      }));

      // delaunay index => three.js index
      var meshIndex = [];
      for (let i = 0; i < indexDelaunay.triangles.length; i++) {
        meshIndex.push(indexDelaunay.triangles[i]);
      }

      // add three.js index to the existing geometry
      geometry1.setIndex(meshIndex);
      geometry1.computeVertexNormals();

      // get the geometry points using attributes.position.count
      const count = geometry1.attributes.position.count;
      // assign a color attribute to geometry points
      geometry1.setAttribute('color', new THREE.BufferAttribute(new Float32Array(count * 3), 3));

      const color = new THREE.Color();
      const colors1 = geometry1.attributes.color;

      // Generate color
      //color1 = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255);

      for (let i = 0; i < count; i++) {
        color.setRGB(pixels[i][0] / 255, pixels[i][1] / 255, pixels[i][2] / 255);

        colors1.setXYZ(i, color.r, color.g, color.b);
      }

      const texture = new THREE.TextureLoader().load("noise.png");
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(100, 100);

      var mesh = new THREE.Mesh(geometry1, new THREE.MeshPhongMaterial({color: 0xffffff, opacity: 1, vertexColors: true, flatShading: true, shininess: 30}));
      mesh.rotation.x = Math.PI / 2;
      mesh.position.y = 200;
      mesh.position.x -= visibleWidth / 2.5;
      mesh.scale.set(.8,.8,.8);
      scene.add(mesh);

      const noisePlaneGeom = new THREE.PlaneGeometry(1000, 1000);
      const noisePlaneMat = new THREE.MeshBasicMaterial({color: 0xffffff, transparent: true, map: texture, opacity: .5});
      const noisePlane = new THREE.Mesh(noisePlaneGeom, noisePlaneMat);
      noisePlane.position.z = 8;
      scene.add(noisePlane);

      var wireMesh = new THREE.Mesh(geometry1, new THREE.MeshBasicMaterial({color: 0xeeeeee, opacity: .2, transparent: true, wireframe: true, shininess: 0}));
      wireMesh.rotation.x = Math.PI / 2;
      wireMesh.position.z = 2;
      wireMesh.position.y = 200;
      wireMesh.position.x -= visibleWidth / 2.5;
      wireMesh.scale.set(.8,.8,.8);
      scene.add(wireMesh);


      renderer = new THREE.WebGLRenderer({antialias: true});
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(headerContainer.offsetWidth, headerContainer.offsetHeight);
      var canvas = renderer.domElement;
      canvas.id = "headerCanvas";
      headerContainer.appendChild(canvas);

      // * DEBUG enable orbit controls
      //var controls = new THREE.OrbitControls(camera, canvas);

      document.addEventListener('mousemove', onDocumentMouseMove);

      window.addEventListener('resize', onWindowResize);
      threeRender();

    }

    function onWindowResize() {

      camera.aspect = headerContainer.offsetWidth / headerContainer.offsetHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(headerContainer.offsetWidth, headerContainer.offsetHeight);
    }

    function onDocumentMouseMove(event) {
      // Update the mouse variable
      event.preventDefault();
      mouse.x = (event.clientX / headerContainer.offsetWidth) * 2 - 1;
      mouse.y = -(event.clientY / headerContainer.offsetHeight) * 2 + 1.5;

      // Make the sphere follow the mouse
      var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
      vector.unproject(camera);
      var dir = vector.sub(camera.position).normalize();
      var distance = -camera.position.z / dir.z;
      var pos = camera.position.clone().add(dir.multiplyScalar(distance));
      mouseLight.position.copy(pos);
      mouseLight.position.z = mouseLightHeight;
    }

    //

    function animate() {

      //activeAnimation = requestAnimationFrame(animate);

      threeRender();

    }

    function threeRender() {

      camera.lookAt(scene.position);

      renderer.render(scene, camera);

    }
    this.init();
    this.setState({
      selectedGradient: selectedGradient
    })
  }

  render() {
    return (
      <>
        <div className = "headerContainer gs_reveal" id = "headerContainer" >
          <div className="headerName">
            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 42.49 10" xmlSpace="preserve">
              <g>
                <path d="M2.8,10c-0.61,0-1.12-0.11-1.52-0.32c-0.41-0.22-0.72-0.55-0.92-1C0.14,8.22,0.02,7.63,0,6.91l1.84-0.28
                  c0.01,0.42,0.05,0.75,0.11,1.01C2.02,7.9,2.11,8.08,2.24,8.2c0.12,0.11,0.27,0.17,0.45,0.17c0.22,0,0.37-0.08,0.44-0.23
                  s0.1-0.31,0.1-0.48c0-0.4-0.1-0.74-0.29-1.01C2.75,6.37,2.49,6.09,2.16,5.81L1.32,5.08C0.95,4.76,0.64,4.41,0.39,4.01
                  S0.01,3.13,0.01,2.54c0-0.82,0.24-1.45,0.73-1.89C1.23,0.22,1.9,0,2.74,0c0.52,0,0.94,0.09,1.25,0.26
                  c0.32,0.18,0.56,0.41,0.72,0.69c0.16,0.28,0.28,0.58,0.34,0.9c0.06,0.32,0.09,0.62,0.1,0.91L3.3,2.99C3.29,2.7,3.27,2.45,3.25,2.24
                  C3.22,2.03,3.16,1.86,3.07,1.75C2.98,1.63,2.85,1.57,2.66,1.57c-0.2,0-0.35,0.08-0.44,0.25c-0.09,0.17-0.14,0.34-0.14,0.5
                  c0,0.36,0.09,0.65,0.26,0.88c0.17,0.23,0.4,0.47,0.68,0.71l0.8,0.71C4.25,4.99,4.61,5.4,4.9,5.86s0.44,1.02,0.44,1.69
                c0,0.46-0.1,0.87-0.31,1.24c-0.21,0.37-0.5,0.67-0.88,0.88C3.77,9.89,3.32,10,2.8,10z"/>
                <path d="M5.82,9.85l1.84-9.72h2.45l1.81,9.72H9.94L9.61,7.8H8.18L7.85,9.85H5.82z M8.38,6.52h1.03L8.89,2.72L8.38,6.52z"/>
                <path d="M12.8,9.85V0.13h2.15V8.4h2.23v1.45H12.8z"/>
                <path d="M17.65,9.85l1.84-9.72h2.45l1.81,9.72h-1.98L21.44,7.8h-1.43l-0.34,2.05H17.65z M20.21,6.52h1.03l-0.52-3.79L20.21,6.52z"
                />
                <path d="M24.36,9.85v-1.3l2.38-6.97h-2.27V0.13h4.38v1.21L26.44,8.4h2.44v1.45H24.36z"/>
                <path d="M29.46,9.85l1.84-9.72h2.45l1.81,9.72h-1.98L33.25,7.8h-1.43l-0.34,2.05H29.46z M32.02,6.52h1.03l-0.52-3.79L32.02,6.52z"
                />
                <path d="M36.44,9.85V0.13h2.68c0.66,0,1.22,0.07,1.7,0.22s0.85,0.4,1.12,0.77c0.27,0.37,0.4,0.9,0.4,1.58c0,0.4-0.03,0.76-0.1,1.07
                  s-0.18,0.58-0.35,0.81S41.48,5,41.16,5.15l1.33,4.7h-2.22L39.2,5.5h-0.61v4.36H36.44z M38.59,4.26h0.6c0.3,0,0.54-0.05,0.71-0.16
                  c0.17-0.11,0.29-0.26,0.35-0.47c0.07-0.2,0.1-0.45,0.1-0.74c0-0.42-0.08-0.74-0.23-0.97c-0.15-0.23-0.43-0.35-0.84-0.35h-0.7V4.26z
                "/>
              </g>
            </svg>
          </div>
        </div>
        <div className="columns is-mobile gs_reveal">
          <div className="column">
            <div className="gradientContainer">
              <div className="pointer gradient1" onClick={() => this.toggleSelectedGradient(0)}>
                <div className={"gradientOverlay" + (this.state.selectedGradient === 0 ? "" : " inactiveGradient")}></div>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="gradientContainer">
              <div className="pointer gradient2" onClick={() => this.toggleSelectedGradient(1)}>
                <div className={"gradientOverlay" + (this.state.selectedGradient === 1 ? "" : " inactiveGradient")}></div>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="gradientContainer">
              <div className="pointer gradient3" onClick={() => this.toggleSelectedGradient(2)}>
                <div className={"gradientOverlay" + (this.state.selectedGradient === 2 ? "" : " inactiveGradient")}></div>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="gradientContainer">
              <div className="pointer gradient4" onClick={() => this.toggleSelectedGradient(3)}>
                <div className={"gradientOverlay" + (this.state.selectedGradient === 3 ? "" : " inactiveGradient")}></div>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="gradientContainer">
              <div className="pointer gradient5" onClick={() => this.toggleSelectedGradient(4)}>
                <div className={"gradientOverlay" + (this.state.selectedGradient === 4 ? "" : " inactiveGradient")}></div>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="gradientContainer">
              <div className="pointer gradient6" onClick={() => this.toggleSelectedGradient(5)}>
                <div className={"gradientOverlay" + (this.state.selectedGradient === 5 ? "" : " inactiveGradient")}></div>
              </div>
            </div>
          </div>
        </div>
        <div className="spacer-md"></div>
        <div class="container">
          <div className="columns">
            <div className="column work gs_reveal">
              <p>Accessibility</p>
            </div>
            <div className="column work gs_reveal">
              <p>Development</p>
            </div>
            <div className="column work gs_reveal">
              <p>Design</p>
            </div>
          </div>
        </div>
      </>
    )
  }
}
export default HomepageHeader;
