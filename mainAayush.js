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
                //  https://conceptcityiasi.ro/assets/images/tours/tip8/apartamente-noi-de-vanzare-iasi-dacia-2_camere-tip_8_360_living.jpg

                //  https://conceptcityiasi.ro/assets/images/tours/tip8/apartamente-noi-de-vanzare-iasi-dacia-2_camere-tip_8_360_baie.jpg

//hall
// https://conceptcityiasi.ro/assets/images/tours/tip8/apartamente-noi-de-vanzare-iasi-dacia-2_camere-tip_8_360_hol.jpg

//bedroom
// https://conceptcityiasi.ro/assets/images/tours/tip8/apartamente-noi-de-vanzare-iasi-dacia-2_camere-tip_8_360_dormitor.jpg
    // loader.load("https://conceptcityiasi.ro/assets/images/tours/tip1/apartamente-noi-de-vanzare-iasi-dacia-1_camera-tip_1_360_living.jpg", (image) => {
    //   panoramaImage1 = new PANOLENS.ImagePanorama(image);
    // });

    // loader.load("https://conceptcityiasi.ro/assets/images/tours/tip1/apartamente-noi-de-vanzare-iasi-dacia-1_camera-tip_1_360_hol.jpg", (image) => {
    //   panoramaImage2 = new PANOLENS.ImagePanorama(image);
    // });

    loader.load("https://conceptcityiasi.ro/assets/images/tours/tip1/apartamente-noi-de-vanzare-iasi-dacia-1_camera-tip_1_360_baie.jpg", (image) => {
        panoramaImage3 = new PANOLENS.ImagePanorama(image);
      });
    loader.load("https://conceptcityiasi.ro/assets/images/tours/tip1/apartamente-noi-de-vanzare-iasi-dacia-1_camera-tip_1_360_bucatarie.jpg", (image) => {
    panoramaImage4 = new PANOLENS.ImagePanorama(image);
    });

    loader.load("images/BHK/BEDROOM_1.JPG", (image) => {
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

preloadPanoramas().then(() => {
  "";
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
  const viewer = new PANOLENS.Viewer({ container: container1 ,
    autoHideInfospot: false,
    // horizontalView: true,
    cameraFov: 75,
    output: 'console',
    controlBar: true,
    controlButtons: ['fullscreen'],
    autoRotate: false,
    autoRotateSpeed: 0.3,
    autoRotateActivationDuration: 5000,
    dwellTime: 1000,
    fadeDuration: 1000
  });
  viewer.add(panoramaImage1,panoramaImage2,panoramaImage3,panoramaImage4);
  viewer.setPanorama(panoramaImage1);


  // viewer.renderer.domElement.id = 'aayush';

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2(0, 0);

  function getCurrentCenterCoordinates() {
    const direction = new THREE.Vector3();
    viewer.camera.getWorldDirection(direction);

    const radiusz = panoramaImage1.geometry.parameters.radius;

    console.log("Current Panorama Radius:", radiusz);
    // return radiusz;

    // Assuming the camera is looking at a point on the sphere at radius 'r' (default radius is 5000)
    const radius = 5000;
    const lookAtPosition = direction.multiplyScalar(radius);

    console.log("Current Center Coordinates:",   -lookAtPosition.x,",",lookAtPosition.y,",",lookAtPosition.z);
    return lookAtPosition;
}

// Call this function whenever you need to get the current center coordinates


// Function to get intersection points
    function getIntersectionPoints(viewer) {
        // Get the camera from the viewer
        // const camera = viewer.getCamera();

        // // Update the raycaster with the camera and mouse position
        // raycaster.setFromCamera(mouse, camera);
        // // console.log('raycaster',viewer.panorama)


        // // Get the panorama (assuming it's the current panorama)
        // const panorama = viewer.panorama;

        // if (!panorama) {
        //     console.error("Panorama not found in the scene.");
        //     return [];
        // }

        // // Calculate intersection points
        // const intersects = raycaster.intersectObject(panorama, true);

        // // Return the points of intersection
        // return intersects.map(intersect => intersect.point);

        const position = viewer.raycaster.intersectObject(viewer.panorama, true);

  // intersectObject returns a negative x value so it must be set to the opposite to have the right x coordinate
  // position.x = -position.x;
      // console.log("position",position)

      getCurrentCenterCoordinates();
      return position;
    }

    setInterval(()=>{
      const intersectionPoints = getIntersectionPoints(viewer);
      
      if(intersectionPoints.length>0){
        // intersectionPoints
        // console.log("aayush singla",-intersectionPoints[0].point.x,",",intersectionPoints[0].point.y,",",intersectionPoints[0].point.z);
      }
      // logCameraPosition()
    },5000)


    var lookAtPositions = [


    new THREE.Vector3(-3155.20800017714 , -573.492096201495 , 3836.1138266757143 ),
    new THREE.Vector3(-3155.6921979889994 , -573.5801042244477 , 3835.7023627478225),
    new THREE.Vector3(-4350, -2460, -26 ),
    new THREE.Vector3(3609, -2921, -1830 )
    ];

    panoramaImage1.addEventListener( 'onClick', function(){
      // viewer.tweenControlCenter( lookAtPositions[0], 0 );
  } );

    panoramaImage1.addEventListener( 'enter-fade-start', function(){
        viewer.tweenControlCenter( lookAtPositions[0], 0 );
    } );

    // panoramaImage2.addEventListener( 'enter-fade-start', function(){
    //     // viewer.tweenControlCenter( lookAtPositions[1], 0);
    // } );

    panoramaImage3.addEventListener( 'enter-fade-start', function(){
        // viewer.tweenControlCenter( lookAtPositions[3], 0 );
    } );

    panoramaImage4.addEventListener( 'enter-fade-start', function(){
        // viewer.tweenControlCenter( lookAtPositions[2], 0 );
    } );

//     var lookAtPositions = [
//       new THREE.Vector3(-2517.2571875527037, 44.5417089886519, 4316.836175629537 ),
//       new THREE.Vector3(-3528.7342313365907, 71.16993543527907, 3528.69386475663 ),
//     ];
    
//     panoramaImage2.animationDuration = 0;
    panoramaImage1.link( panoramaImage2, new THREE.Vector3(-6000, 0, 6200),200,"/images/1_pano.jpg" );

//     panoramaImage1.addEventListener( 'enter-fade-start', function(){
//         viewer.tweenControlCenter( lookAtPositions[0], 0 );
//     } );

//     panoramaImage1.addEventListener( 'leave-animation-start', function(){
//       console.log("initia;lFov3")
//       // viewer.tweenControlCenter( lookAtPositions[0], 0 );
//   } );

    panoramaImage2.addEventListener( 'enter-fade-start', function(){
      console.log("initia;lFov2")
      viewer.camera.fov = 75;
      viewer.camera.updateProjectionMatrix();
      viewer.tweenControlCenter( lookAtPositions[1], 0);
    } );
    function logCameraPosition() {
      const cameraPosition = viewer.camera.position;
      console.log(
        `Camera Position: func x=${cameraPosition.x}, y=${cameraPosition.y}, z=${cameraPosition.z}`
      );
    }
  

    function animateZoom(targetFOV, duration) {
      hotspot1.hide()
      const initialFOV = viewer.camera.fov;
      console.log(initialFOV)
      // viewer.tweenControlCenter( lookAtPositions[1], 0);
      new TWEEN.Tween({ fov: initialFOV })
      .to({ fov: targetFOV }, duration)
      .easing(TWEEN.Easing.Exponential.Out)
      .onUpdate(function (value) {
              viewer.camera.fov = value.fov;
              viewer.camera.updateProjectionMatrix();
      })
      .onComplete(function (e) {
        panoramaImage2.animationDuration = 0;
        viewer.setPanorama(panoramaImage2);
      })
      .start();
    }


    hotspot1.addEventListener("click", function () {
        animateZoom(50,1000)
        panoramaImage2.animationDuration = 0;
        logCameraPosition()
      }); 
    });

