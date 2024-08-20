let panoramaImage1, panoramaImage2, panoramaImage3, panoramaImage4;
var textureLoader, texture1, texture2;
// Create a `ImageLoader` instance
const loader = new THREE.ImageLoader();
textureLoader = new THREE.TextureLoader();
textureLoader.crossOrigin = "*";

// Function to preload images
function preloadPanoramas() {
  return new Promise((resolve, reject) => {
    // Load the images for each panorama
    loader.load("images/2_pano.jpg", (image) => {
      panoramaImage1 = new PANOLENS.ImagePanorama(image);
    });

    loader.load("images/1_pano.jpg", (image) => {
      panoramaImage2 = new PANOLENS.ImagePanorama(image);
    });

    // Resolve the promise once all images are loaded

    const checkAllLoaded = setInterval(() => {
      if (panoramaImage1 && panoramaImage2) {
        clearInterval(checkAllLoaded);
        resolve();
      }
    }, 100); // Check every 100ms
  });
}
// function preloadPanoramas() {
//     return new Promise((resolve, reject) => {
//         // Load the images for each panorama
//         textureLoader.load("images/2_pano.jpg", (texture) => {
//             console.log(texture)
//             panoramaImage1 = new PANOLENS.ImagePanorama(texture.image.src);
//             texture1 = texture
//         });

//         textureLoader.load("images/1_pano.jpg", (texture) => {
//             panoramaImage2 = new PANOLENS.ImagePanorama(texture.image.src);

//             // Adjust the UV mapping to scale the texture
//             // texture.wrapS = THREE.RepeatWrapping;
//             // texture.wrapT = THREE.RepeatWrapping;
//             // texture.repeat.set(0.5, 0.5); // Scale to 50%
//             texture2 = texture
//         });

//         // Resolve the promise once all images are loaded
//         const checkAllLoaded = setInterval(() => {
//             if (panoramaImage1 && panoramaImage2) {
//                 clearInterval(checkAllLoaded);
//                 resolve();
//             }
//         }, 100);  // Check every 100ms
//     });
// }
preloadPanoramas().then(() => {
  "";

  // var texture3 = textureLoader.load("images/1_pano.jpg");
  // console.log('texture2',texture3)

  // Set up the viewer
  // const imageContainer1 = document.querySelector(".image-containera");
  // const imageContainer2 = document.querySelector(".image-containerb");
  // const viewer2 = new PANOLENS.Viewer({
  //   container: imageContainer1,
  //   controlBar: false,
  //   // autoHideInfospot: false,
  //   // horizontalView: true
  // });

  // const viewer1 = new PANOLENS.Viewer({
  //   container: imageContainer2,
  //   controlBar: false,
  //   // autoHideInfospot: false,
  //   // horizontalView: true
  // });

  

  // if (viewer1.getControl().getAzimuthalAngle() == 0) {
  //   viewer1.getControl().rotateLeft(2);
  //   viewer1.getControl().update();
  // }

  // viewer.camera.fov = 60;
  // viewer.camera.updateProjectionMatrix();

  // Add the preloaded panoramas to the viewer
  // viewer1.add(panoramaImage2);
  // viewer2.add( panoramaImage1);
  

  // const axisHelper = new THREE.AxesHelper(100000); // Length of each axis line
  // viewer.add(axisHelper);

  // Add hotspots or other configurations here
  const hotspot1 = new PANOLENS.Infospot(500, PANOLENS.DataImage.Info);
  const hotspot2 = new PANOLENS.Infospot(500, PANOLENS.DataImage.Info);
  console.log(panoramaImage2.position);
  console.log(panoramaImage1.position);
  hotspot1.position.set(-6000, 0, 6800);
  hotspot2.position.set(-6000, 0, 0);
  hotspot2.hide();
  hotspot1.show();


  panoramaImage1.add(hotspot1);


  const container1 = document.getElementById('viewer1-container');
  const viewer1 = new PANOLENS.Viewer({ container: container1 });
  // const scene1 = new PANOLENS.ImagePanorama('path/to/scene1.jpg');
  viewer1.add(panoramaImage1);
  viewer1.setPanorama(panoramaImage1);

  // Initialize second viewer
  const container2 = document.getElementById('viewer2-container');
  const viewer2 = new PANOLENS.Viewer({ container: container2 });
  // const scene2 = new PANOLENS.ImagePanorama('path/to/scene2.jpg');
  viewer2.add(panoramaImage2);
  viewer2.setPanorama(panoramaImage2);

  viewer1.renderer.domElement.id = 'aayush';
  viewer2.renderer.domElement.id = 'singla';

  const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2(0, 0);

// Function to get intersection points
function getIntersectionPoints(viewer) {
    // Get the camera from the viewer
    const camera = viewer.getCamera();

    // Update the raycaster with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);
    console.log('raycaster',viewer.panorama)


    // Get the panorama (assuming it's the current panorama)
    const panorama = viewer.panorama;

    if (!panorama) {
        console.error("Panorama not found in the scene.");
        return [];
    }

    // Calculate intersection points
    const intersects = raycaster.intersectObject(panorama, true);

    // Return the points of intersection
    return intersects.map(intersect => intersect.point);
}
panoramaImage1.addEventListener('load', () => {
  // viewer.add(panorama);

  

});
setInterval(()=>{
  const intersectionPoints = getIntersectionPoints(viewer1);
  console.log("aayush singla",intersectionPoints);
},5000)
  

  // Function to switch between viewers
  function switchViewer() {
      const viewer1Container = document.getElementById('viewer1-container');
      const viewer2Container = document.getElementById('viewer2-container');

      if (viewer1Container.classList.contains('active')) {
          viewer1Container.classList.remove('active');
          viewer2Container.classList.add('active');
      } else {
          viewer2Container.classList.remove('active');
          viewer1Container.classList.add('active');
      }
  }

  // Attach event listener to the button
  // const switchButton = document.getElementById('switch-viewer-btn');
  // switchButton.addEventListener('click', switchViewer);






  function logCameraCoordinates1() {
    viewer1.camera.rotation.set(0, 0, 0);
    viewer1.camera.position.set(0, 0, 0);
    const position = viewer1.camera.position;
    const rotation = viewer1.camera.rotation;
    console.log(`Position: x=${position.x}, y=${position.y}, z=${position.z}`);
    console.log(`Rotation: x=${rotation.x}, y=${rotation.y}, z=${rotation.z}`);
}

function logCameraCoordinates2() {
  viewer2.camera.rotation.set(0, 0, 0);
    viewer2.camera.position.set(0, 0, 0);
  const position = viewer2.camera.position;
  const rotation = viewer2.camera.rotation;
  console.log(`Position: x=${position.x}, y=${position.y}, z=${position.z}`);
  console.log(`Rotation: x=${rotation.x}, y=${rotation.y}, z=${rotation.z}`);
}

logCameraCoordinates1();
logCameraCoordinates2();

function animateZoom(targetFOV, duration) {
      const initialFOV = viewer1.camera.fov;
      console.log(initialFOV)
      var value1 = false;
      new TWEEN.Tween({ fov: initialFOV })
          .to({ fov: targetFOV }, duration)
          .easing(TWEEN.Easing.Exponential.Out)
          .onUpdate(function (value) {
              // if(!value1 && value.fov <=70 ){
              //     // hotspot1.hide()
              //     // panoramaImage1.material.opacity =0
              //     // viewer.OrbitControls.noPan = true;
              //     console.log("value.fov",value.fov)
              //     value1 = true
              //     // panoramaImage2.animationDuration = 0;
              //     // viewer.setPanorama(panoramaImage2);
              //     updateImage()
              //     // viewer.camera.fov = value.fov;
              //     // viewer.camera.updateProjectionMatrix();
              // }else{
                  viewer1.camera.fov = value.fov;
                  viewer1.camera.updateProjectionMatrix();
              // }

          })
          .onComplete(function (e) {
              // hotspot2.show();

              // document.querySelector(".image-containerb").style.display="block"
              // document.querySelector(".image-containera").style.display="none"
              let singla = document.getElementById("singla")
              singla.parentNode.removeChild(singla);

              // document.getElementById("singla").style.height="0%"
              // document.getElementById("singla").style.width="0%"

              
              // document.getElementById("aayush").style.display="block"
              // viewer.camera.fov = 80;
              // viewer.camera.updateProjectionMatrix();
              // console.log("value.fov",viewer.camera.fov)
              // panoramaImage2.animationDuration = 0;
              // console.log("panoramaImage2.scale",panoramaImage2.scale)
              // viewer.setPanorama(panoramaImage2);
              // viewer.camera.fov = 80;
              // viewer.camera.updateProjectionMatrix();
          })
          .start();
  }

  hotspot1.addEventListener("click", function () {
    // animateZoom(30,200)
    switchViewer()
  });

  // Add event listeners to log camera coordinates on click
  // panoramaImage1.addEventListener('enter', logCameraCoordinates);
  // panoramaImage1.addEventListener('enter', logCameraCoordinates);

  // Start with the first scene
  // viewer.setPanorama(panoramaImage1);

// Optionally log coordinates at intervals
// setInterval(logCameraCoordinates, 5000); // Adjust the interval as needed

  // hotspot1.addEventListener("click", function () {
  //   var tweenScale = new TWEEN.Tween(this.parent.scale)
  //         .to({ x: -1, y: 2, z: 2 }, 500)
  //         .easing(TWEEN.Easing.Quadratic.Out)
  //         .onUpdate(function (nVal) {
  //             this.parent.scale.set(nVal.x, nVal.y, nVal.z);
  //         }.bind(this))
  //         .onComplete(function (e) {
  //             updateImage()

  //             panoramaImage2.animationDuration = 0;
  //             viewer.setPanorama(panoramaImage2);
  //         })
  //         .start();
  //   // panoramaImage2.animationDuration = 0
  //   // viewer.setPanorama(panoramaImage2);
  // });
  // function animate() {
  //   requestAnimationFrame(animate);
  //   TWEEN.update();
  // }

  // animate();

  // function cameraTransition1(fromPanorama, toPanorama, duration) {
  //     const camera = viewer.getCamera();
  //     const initialPosition = camera.position.clone();
  //     const targetPosition = { x: initialPosition.x-0.22, y: initialPosition.y, z: initialPosition.z-0.22  };
  //     logCameraPosition()
  //     const cameraTween = new TWEEN.Tween(camera.position)
  //         .to(targetPosition, duration)
  //         .easing(TWEEN.Easing.Quadratic.InOut)
  //         .onUpdate(function (nVal) {
  //             const cameraPosition = viewer.camera.position;
  //             logCameraPosition()
  //             // console.log(`Camera position: x=${cameraPosition.x}, y=${cameraPosition.y}, z=${cameraPosition.z}`);
  //             // console.log(nVal)
  //             // this.parent.scale.set(nVal.x, nVal.y, nVal.z);
  //             viewer.camera.position.set(nVal.x, nVal.y, nVal.z);
  //         })
  //         .onComplete(function () {
  //             logCameraPosition()
  //             updateImage()
  //             // toPanorama.animationDuration = 0;
  //             // viewer.setPanorama(toPanorama);
  //         })
  //         .start();
  // }
  // hotspot1.addEventListener('click', function () {
  //     cameraTransition1(panoramaImage1, panoramaImage2, 500); // 2000ms for the blend transition
  // });

  //Changing the scale
  // var textureLoader, texture1, texture2;
  // panoramaImage1.addEventListener( 'load', function(){
  //     texture1 = panoramaImage1.material.uniforms.tEquirect.value;
  //   });

  var texture3 = textureLoader.load("images/1_pano.jpg");
  console.log('texture2',texture3)

  // Change image button behavior
  function updateImage() {
    panoramaImage1.updateTexture(texture3);
  }

  // hotspot1.addEventListener('click', function (e) {
  //     hotspot1.hide();
  //     console.log("panoramaImage1.scale",panoramaImage1.scale)
  //     // logCameraPosition()
      // var tweenScale = new TWEEN.Tween(this.parent.scale)
      //     .to({ x: -1, y: 2, z: 2 }, 500)
      //     .easing(TWEEN.Easing.Quadratic.Out)
      //     .onUpdate(function (nVal) {
      //         this.parent.scale.set(nVal.x, nVal.y, nVal.z);
      //     }.bind(this))
      //     .onComplete(function (e) {
      //         updateImage()

      //         // panoramaImage2.animationDuration = 0;
      //         // viewer.setPanorama(panoramaImage2);
      //     })
      //     .start();

  // }.bind(hotspot1));

  // panoramaImage1.addEventListener('leave-complete', function (e) {
  //     this.scale.set(-1, 1, 1);
  // }.bind(panoramaImage1));

  

  // Changing the scale and the camera

  // hotspot1.addEventListener('click', function (e) {
  //     hotspot1.hide();
  //     console.log("panoramaImage1.scale",panoramaImage1.scale)
  //     // logCameraPosition()
  //     const camera = viewer.getCamera();
  //     const initialPosition = camera.position.clone();
  //     const targetPosition = { x: initialPosition.x , y: initialPosition.y, z: initialPosition.z - 0.22 };
  //     const cameraTween2 = new TWEEN.Tween(camera.position)
  //     .to(targetPosition, 200)
  //     .easing(TWEEN.Easing.Quadratic.InOut)
  //     .onUpdate(function (nVal) {
  //         const cameraPosition = viewer.camera.position;
  //         viewer.camera.position.set(nVal.x, nVal.y, nVal.z);
  //     })
  //     .onComplete(function () {
  //         console.log("B executed")
  //         logCameraPosition()
  //         panoramaImage2.animationDuration = 0;
  //         viewer.setPanorama(panoramaImage2);
  //     })
  //     const initialScaleY = this.parent.scale.y;
  //     var value = false;
  //     var tweenScale = new TWEEN.Tween(this.parent.scale)
  //         .to({ x: -1, y: 2, z: 2 }, 1500)
  //         .easing(TWEEN.Easing.Exponential.In)
  //         .onUpdate(function (nVal) {
  //             this.parent.scale.set(nVal.x, nVal.y, nVal.z);
  //             if(nVal.y>1.8 && value ==false){
  //                 console.log("executed")
  //                 value = true;
  //                 cameraTween2.start()
  //             }
  //         }.bind(this))
  //         .onComplete(function (e) {
  //             console.log("A executed")
  //             logCameraPosition()
  //         })
  //         .start();

  // }.bind(hotspot1));

  // Changing The FOV

  // function animateZoom(targetFOV, duration) {
  //     const initialFOV = viewer.camera.fov;
  //     var value1 = false;
  //     new TWEEN.Tween({ fov: initialFOV })
  //         .to({ fov: targetFOV }, duration)
  //         .easing(TWEEN.Easing.Exponential.Out)
  //         .onUpdate(function (value) {
  //             if(!value1 && value.fov <=70 ){
  //                 // hotspot1.hide()
  //                 // panoramaImage1.material.opacity =0
  //                 // viewer.OrbitControls.noPan = true;
  //                 console.log("value.fov",value.fov)
  //                 value1 = true
  //                 // panoramaImage2.animationDuration = 0;
  //                 // viewer.setPanorama(panoramaImage2);
  //                 updateImage()
  //                 // viewer.camera.fov = value.fov;
  //                 // viewer.camera.updateProjectionMatrix();
  //             }else{
  //                 viewer.camera.fov = value.fov;
  //                 viewer.camera.updateProjectionMatrix();
  //             }

  //         })
  //         .onComplete(function (e) {
  //             // hotspot2.show();
  //             viewer.camera.fov = 80;
  //             viewer.camera.updateProjectionMatrix();
  //             console.log("value.fov",viewer.camera.fov)
  //             // panoramaImage2.animationDuration = 0;
  //             // console.log("panoramaImage2.scale",panoramaImage2.scale)
  //             // viewer.setPanorama(panoramaImage2);
  //             // viewer.camera.fov = 80;
  //             // viewer.camera.updateProjectionMatrix();
  //         })
  //         .start();
  // }

  // hotspot1.addEventListener('click', function () {
  //     this.hide()
  //     const currentFOV = viewer.camera.fov;
  //     console.log("currentFOV",currentFOV)
  //     const zoomIn = currentFOV > 30; // Arbitrary threshold
  //     const targetFOV = zoomIn ? 90 : 70; // Zoom in to 20 FOV, zoom out to 70 FOV
  //     animateZoom(targetFOV, 500); // 1000ms for the transition
  // });

  // function transitionToScene(panorama, lookAt, duration) {
  //     const initialPosition = viewer.camera.position;
  //     const targetPosition = new THREE.Vector3(lookAt.x, lookAt.y, lookAt.z);

  //     const tweenPosition = new TWEEN.Tween(initialPosition)
  //         .to(targetPosition, duration)
  //         .easing(TWEEN.Easing.Quadratic.InOut)
  //         .onUpdate(function () {
  //             console.log("AAYUS")
  //             viewer.camera.position.set(this.x, this.y, this.z);
  //         })
  //         .onComplete(function () {
  //             viewer.setPanorama(panoramaImage2);
  //         });

  //     const initialOpacity = { opacity: 1 };
  //     const tweenOpacity = new TWEEN.Tween(initialOpacity)
  //         .to({ opacity: 0 }, duration)
  //         .easing(TWEEN.Easing.Quadratic.InOut)
  //         .onUpdate(function () {
  //             console.log("AAYUSg")
  //             panoramaImage1.material.opacity = this.opacity;
  //         });

  //     tweenPosition.start();
  //     tweenOpacity.start();
  // }

  // // Event listener for the hotspot
  // hotspot1.addEventListener('click', function () {
  //     const lookAt = { x: 323.35, y: 6.86, z: 134.5 };
  //     const duration = 5000; // 5 seconds
  //     transitionToScene(panoramaImage2, lookAt, duration);
  // });

  function ZOOMBLEND1(
    time = 2.0,
    zoom = 2.0,
    x = 0.5,
    y = 0.5,
    tweentype = TWEEN.Easing.Sinusoidal.InOut
  ) {
    const initialZoom = viewer.camera.fov;
    const targetZoom = initialZoom / zoom;

    const coords = {
      fov: initialZoom,
      x: 0,
      y: 0,
    };

    // Zoom animation
    new TWEEN.Tween(coords)
      .to({ fov: targetZoom, x: x * 2 - 1, y: y * 2 - 1 }, time * 1000)
      .easing(tweentype)
      .onUpdate((nval) => {
        console.log(nval);
        viewer.camera.fov = nval.fov;
        viewer.camera.position.set(nval.x, nval.y, viewer.camera.position.z);
        viewer.camera.updateProjectionMatrix();
      })
      .onComplete(() => {
        // Blend to the next panorama
        viewer.setPanorama(panoramaImage2);
        // Reset zoom
        viewer.camera.fov = initialZoom;
        viewer.camera.updateProjectionMatrix();
      })
      .start();
  }

  // Start zoom and blend transition on button click
  //   hotspot1.addEventListener('keydown', (event) => {
  //     if (event.key === 'Enter') {
  //       ZOOMBLEND(2.0, 2.0, 0.5, 0.5, TWEEN.Easing.Sinusoidal.InOut);
  //     }
  //   });
  // hotspot1.addEventListener("click", () => {
  //   // transitionToPanorama(panoramaImage2);
  //   ZOOMBLEND(2.0, 2.0, 0.5, 0.5, TWEEN.Easing.Sinusoidal.InOut);
  // });
  // // Animation loop
  // function animate() {
  //   requestAnimationFrame(animate);
  //   TWEEN.update();
  // }

  // animate();


  //   function transitionToPanorama(targetPanorama) {
  //     const duration = 2000;
  //     const startPosition = viewer.camera.position.clone();
  //     const endPosition = new THREE.Vector3(0, 0, -3000);

  //     const tween = new TWEEN.Tween(startPosition)
  //       .to(endPosition, duration)
  //       .easing(TWEEN.Easing.Quadratic.InOut)
  //       .onUpdate(function() {
  //         viewer.camera.position.copy(this);
  //       })
  //       .onComplete(function() {
  //         viewer.setPanorama(targetPanorama);
  //       })
  //       .start();

  //     viewer.addUpdateCallback(() => {
  //       TWEEN.update();
  //     });

  //     const renderer = viewer.getRenderer();
  //     const scene = viewer.scene;
  //     const camera = viewer.camera;
  //     const composer = applyMotionBlurEffect(renderer, scene, camera, 0.001);

  //     viewer.addRenderCallback(() => {
  //       composer.render();
  //     });
  //   }

  //   hotspot1.addEventListener('click', () => {
  //     transitionToPanorama(panoramaImage2);
  //   });

  // changing the scale and opacity Simultaniously

  function setOpacity(panorama, opacityValue) {
    panorama.material.opacity = opacityValue;
    panorama.material.transparent = opacityValue < 1;
  }

  // hotspot1.addEventListener('click', function (e) {
  //     hotspot1.hide();
  //     console.log("panoramaImage1.scale",panoramaImage1.scale)
  //     var value = true;
  //     var tweenScale = new TWEEN.Tween(this.parent.scale)
  //         .to({ x: -1, y: 2, z: 2 }, 1500)
  //         .easing(TWEEN.Easing.Exponential.In)
  //         .onUpdate(function (nVal) {
  //             if(value){
  //                 panoramaImage2.animationDuration = 0;
  //                 viewer.setPanorama(panoramaImage2);
  //                 value=false;
  //             }
  //             console.log("nVal",2-nVal.y,nVal.y-1)
  //             setOpacity(panoramaImage1,2-nVal.y)
  //             setOpacity(panoramaImage2,nVal.y-1)
  //             this.parent.scale.set(nVal.x, nVal.y, nVal.z);
  //         }.bind(this))
  //         .onComplete(function (e) {
  //             panoramaImage2.animationDuration = 0;
  //             viewer.setPanorama(panoramaImage2);
  //         })
  //         .start();
  // }.bind(hotspot1));

  //changing the opacity and camera position
  function travelTransition(fromPanorama, toPanorama, duration) {
    // fromPanorama.material.opacity = 1;
    // toPanorama.material.opacity = 0;

    // const opacityTween = new TWEEN.Tween({ opacity: 1 })
    //     .to({ opacity: 0 }, duration)
    //     .easing(TWEEN.Easing.Quadratic.InOut)
    //     .onUpdate(function (value) {
    //         fromPanorama.material.opacity = value.opacity;
    //         toPanorama.material.opacity = 1 - value.opacity;
    //     })
    //     .onComplete(function () {
    //         toPanorama.animationDuration = 0;
    //         viewer.setPanorama(toPanorama);
    //     })
    //     .start();

    const camera = viewer.getCamera();
    const initialPosition = camera.position.clone();
    const targetPosition = {
      x: initialPosition.x - 1,
      y: initialPosition.y,
      z: initialPosition.z - 1,
    };

    const cameraTween = new TWEEN.Tween(camera.position)
      .to(targetPosition, duration)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onComplete(() => {
        updateImage();
      })
      .start();
  }

  // hotspot1.addEventListener('click', function () {
  //     travelTransition(panoramaImage1, panoramaImage2, 2000); // 2000ms for the travel transition
  // });

  //zoom and blend

  function zoomBlendTransition(
    currentPanorama,
    targetPanorama,
    zoomDuration = 1000
  ) {
    targetPanorama.opacity = 0; // Initially hide the target panorama
    targetPanorama.visible = true; // Ensure the target panorama is visible for blending

    // viewer.add(targetPanorama);

    const startPosition = viewer.camera.position.clone();
    const endPosition = new THREE.Vector3(-1, 2, 2); // Adjust as needed for zoom effect

    const tweenScale = new TWEEN.Tween({ x: -1, y: 0, z: 0 })
      .to(endPosition, zoomDuration)
      .easing(TWEEN.Easing.Exponential.Out)
      .start();

    console.log("targetPanorama.opacity", targetPanorama.opacity);
    const tweenOpacity = new TWEEN.Tween(targetPanorama.opacity)
      .to({ opacity: 1 }, zoomDuration)
      .easing(TWEEN.Easing.Exponential.Out)
      .onUpdate(function (v) {
        // console.log("v",v)
      })
      .start();

    tweenOpacity.onComplete(() => {
      currentPanorama.animationDuration = 0;
      viewer.remove(currentPanorama);
      targetPanorama.animationDuration = 0;
      viewer.setPanorama(targetPanorama);
    });

    function animate() {
      requestAnimationFrame(animate);
      TWEEN.update();
    }
    animate();
  }

  // hotspot1.addEventListener('click', function (e) {
  //     hotspot1.hide();
  //     console.log("panoramaImage1.scale",panoramaImage1.scale)
  //     var tweenScale = new TWEEN.Tween(this.parent.scale)
  //         .to({ x: -1, y: 2, z: 2 }, 1500)
  //         .easing(TWEEN.Easing.Exponential.In)
  //         .onUpdate(function (nVal) {
  //             this.parent.scale.set(nVal.x, nVal.y, nVal.z);
  //         }.bind(this))
  //         .onComplete(function (e) {
  //             panoramaImage2.animationDuration = 0;
  //             viewer.setPanorama(panoramaImage2);
  //         })
  //         .start();
  //     zoomBlendTransition(panoramaImage1, panoramaImage2, 2000);

  // }.bind(hotspot1));

  // Only Blending
  function blendPanoramas(fromPanorama, toPanorama, duration) {
    fromPanorama.material.opacity = 1;
    toPanorama.material.opacity = 0;

    const tweenOpacity = new TWEEN.Tween({ opacity: 1 })
      .to({ opacity: 0 }, duration)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onUpdate(function (value) {
        fromPanorama.material.opacity = value.opacity;
        toPanorama.material.opacity = 1 - value.opacity;
      })
      .onComplete(function () {
        toPanorama.animationDuration = 0;
        viewer.setPanorama(toPanorama);
      })
      .start();
  }
  // hotspot1.addEventListener('click', function () {
  //     blendPanoramas(panoramaImage1, panoramaImage2, 2000); // 2000ms for the blend transition
  // });

  //Changing the camera position
  function logCameraPosition() {
    const cameraPosition = viewer.camera.position;
    console.log(
      `Camera Position: func x=${cameraPosition.x}, y=${cameraPosition.y}, z=${cameraPosition.z}`
    );
  }

  function cameraTransition(fromPanorama, toPanorama, duration) {
    const camera = viewer.getCamera();
    const initialPosition = camera.position.clone();
    const targetPosition = {
      x: initialPosition.x,
      y: initialPosition.y,
      z: initialPosition.z - 0.22,
    };
    logCameraPosition();
    const cameraTween = new TWEEN.Tween(camera.position)
      .to(targetPosition, duration)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onUpdate(function (nVal) {
        const cameraPosition = viewer.camera.position;
        // logCameraPosition()
        // console.log(`Camera position: x=${cameraPosition.x}, y=${cameraPosition.y}, z=${cameraPosition.z}`);
        // console.log(nVal)
        // this.parent.scale.set(nVal.x, nVal.y, nVal.z);
        viewer.camera.position.set(nVal.x, nVal.y, nVal.z);
      })
      .onComplete(function () {
        logCameraPosition();
        toPanorama.animationDuration = 0;
        viewer.setPanorama(toPanorama);
      })
      .start();
  }
  // hotspot1.addEventListener('click', function () {
  //     cameraTransition(panoramaImage1, panoramaImage2, 2000); // 2000ms for the blend transition
  // });

  // function animate() {
  //     requestAnimationFrame(animate);
  //     TWEEN.update();
  // }
  // animate();

  // hotspot2.addEventListener('click', function (e) {
  // this.hide();
  // var tweenScale = new TWEEN.Tween(this.parent.scale)
  //     .to({ x: 2, y: 2, z: 2 }, 500)
  //     .easing(TWEEN.Easing.Exponential.Out)
  //     .onUpdate(function (nVal) {
  //         console.log("AAYUS")
  //         this.parent.scale.set(nVal.x, nVal.y, nVal.z);
  //     }.bind(this))
  //     .onComplete(function (e) {
  //         console.log("SINGL")
  //         panoramaImage1.animationDuration = 0;
  //         viewer.setPanorama(panoramaImage1);
  //     })
  //     .start();

  // }.bind(hotspot2));

  // panoramaImage2.addEventListener('leave-complete', function (e) {
  //     this.scale.set(-1, 1, 1);
  // }.bind(panoramaImage2));

  // panoramaImage2.add(hotspot2);
});

// panoramaImage1.addEventListener('leave-complete', function (e) {
//     this.scale.set(-1, 1, 1);
// }.bind(panoramaImage1));

// panoramaImage1.add(hotspot1);

// Second Hotspot

// hotspot2.addEventListener('click', function (e) {
//     this.hide();
//     var tweenScale = new TWEEN.Tween(this.parent.scale)
//         .to({ x: 2, y: 2, z: 2 }, 500)
//         .easing(TWEEN.Easing.Exponential.Out)
//         .onUpdate(function (nVal) {
//             this.parent.scale.set(nVal.x, nVal.y, nVal.z);
//         }.bind(this))
//         .onComplete(function (e) {
//             panoramaImage1.animationDuration = 0;
//             viewer.setPanorama(panoramaImage1);
//         })
//         .start();
// }.bind(hotspot2));

// panoramaImage2.addEventListener('leave-complete', function (e) {
//     this.scale.set(-1, 1, 1);
// }.bind(panoramaImage2));

// panoramaImage2.add(hotspot2);
