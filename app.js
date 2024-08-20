// Basic scene setup
const container = document.getElementById('container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

// Load textures
const textureLoader = new THREE.TextureLoader();
let texture1, texture2;

textureLoader.load(
  'images/2_pano.jpg',
  (texture) => {
    texture1 = texture;
    checkTexturesLoaded();
  },
  undefined,
  (err) => console.error('Error loading texture1', err)
);

textureLoader.load(
  'images/1_pano.jpg',
  (texture) => {
    texture2 = texture;
    checkTexturesLoaded();
  },
  undefined,
  (err) => console.error('Error loading texture2', err)
);

// Create spheres and materials
let sphere1, sphere2;
function checkTexturesLoaded() {
  if (texture1 && texture2) {
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1);

    const material1 = new THREE.MeshBasicMaterial({ map: texture1 });
    sphere1 = new THREE.Mesh(geometry, material1);
    scene.add(sphere1);

    const material2 = new THREE.MeshBasicMaterial({ map: texture2, transparent: true, opacity: 0 });
    sphere2 = new THREE.Mesh(geometry, material2);
    scene.add(sphere2);

    camera.position.set(0, 0, 0.1);

    // Initial render
    renderer.render(scene, camera);

    // Listen for keypress to start transition
    document.addEventListener('keydown', (event) => {
      if (event.key === 't') {
        transitionToSphere2();
      }
    });
  }
}

// Transition function
function transitionToSphere2() {
  let progress = 0;
  const duration = 2; // seconds
  const frameRate = 60;
  const totalFrames = duration * frameRate;

  function animate() {
    requestAnimationFrame(animate);
    progress += 1 / totalFrames;

    if (progress >= 1) {
      progress = 1;
      sphere1.visible = false; // Hide the first sphere after transition
    }

    // Fade out sphere1
    sphere1.material.opacity = 1 - progress;
    sphere1.material.transparent = true;

    // Fade in sphere2
    sphere2.material.opacity = progress;
    sphere2.material.transparent = true;

    renderer.render(scene, camera);
  }

  animate();
}

// Adjust the scene when the window is resized
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});