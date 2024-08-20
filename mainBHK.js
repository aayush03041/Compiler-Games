let panoramaImage1, panoramaImage2, panoramaImage3, panoramaImage4,panoramaImage5;
// Create a `ImageLoader` instance
const loader = new THREE.ImageLoader();
// Function to preload images
function preloadPanoramas() {
  return new Promise((resolve, reject) => {  
    loader.load("images/BHK/HALL.JPG", (image) => {
        panoramaImage1 = new PANOLENS.ImagePanorama(image);
    });
    loader.load("images/BHK/KITCHEN.JPG", (image) => {
        panoramaImage2 = new PANOLENS.ImagePanorama(image);
    });

    loader.load("images/BHK/BEDROOM_1.JPG", (image) => {
        panoramaImage3 = new PANOLENS.ImagePanorama(image);
    });

    loader.load("images/BHK/BEDROOM_2.JPG", (image) => {
        panoramaImage4 = new PANOLENS.ImagePanorama(image);
    });

    loader.load("images/BHK/BEDROOM_3.JPG", (image) => {
        panoramaImage5 = new PANOLENS.ImagePanorama(image);
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
  viewer.add(panoramaImage1,panoramaImage2,panoramaImage3,panoramaImage4,panoramaImage5);
  viewer.setPanorama(panoramaImage1);


  // const hotspot1 = new PANOLENS.Infospot(500, PANOLENS.DataImage.Info);
  // const hotspot2 = new PANOLENS.Infospot(500, PANOLENS.DataImage.Info);
  // console.log(panoramaImage2.position);
  // console.log(panoramaImage1.position);
  // hotspot1.position.set(-2885.8960648782495 , 187.39322104994665 , -4070.756153182008);
  // hotspot2.position.set(-6000, 0, 0);
  // hotspot2.hide();
  // hotspot1.show();


  // panoramaImage1.add(hotspot1);


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
        console.log("aayush singla",-intersectionPoints[0].point.x,",",intersectionPoints[0].point.y,",",intersectionPoints[0].point.z);
      }
      // logCameraPosition()
    },5000)


    var lookAtPositions = [
        new THREE.Vector3(-4968.69497489731 , -209.628591638335 , -517.8089415971325 ),
        new THREE.Vector3(4968.301262111784 , -548.1294609668647 , -124.64615083759341),
        new THREE.Vector3(4862.273813294865 , -829.2329793449686 , 818.9420190182449 ),
        new THREE.Vector3(4990.323196863266 , -245.0852901199433 , -191.33110414989721 ),
        new THREE.Vector3(4582.161979402548 , -1248.2736193080148 , -1563.8428840063787 )
    ];

    panoramaImage1.addEventListener( 'onClick', function(){
      // viewer.tweenControlCenter( lookAtPositions[0], 0 );
      console.log("Current Panorama Radius:");
    } );

    panoramaImage1.addEventListener( 'enter-fade-start', function(){
        viewer.camera.fov = 75;
      viewer.camera.updateProjectionMatrix();
        viewer.tweenControlCenter( lookAtPositions[0], 0 );
    } );

    panoramaImage2.addEventListener( 'enter-fade-start', function(){
        viewer.camera.fov = 75;
        viewer.camera.updateProjectionMatrix();
        viewer.tweenControlCenter( lookAtPositions[1], 0);
    } );

    panoramaImage3.addEventListener( 'enter-fade-start', function(){
        viewer.camera.fov = 75;
      viewer.camera.updateProjectionMatrix();
        viewer.tweenControlCenter( lookAtPositions[2], 0 );
    } );

    panoramaImage4.addEventListener( 'enter-fade-start', function(){
        viewer.camera.fov = 75;
      viewer.camera.updateProjectionMatrix();
        viewer.tweenControlCenter( lookAtPositions[3], 0 );
    } );
    panoramaImage5.addEventListener( 'enter-fade-start', function(){
        viewer.camera.fov = 75;
      viewer.camera.updateProjectionMatrix();
        viewer.tweenControlCenter( lookAtPositions[4], 0 );
    } );


    
    panoramaImage1.animationDuration = 0;
    panoramaImage2.animationDuration = 0;
    panoramaImage3.animationDuration = 0;
    panoramaImage4.animationDuration = 0;
    panoramaImage5.animationDuration = 0;
    
    panoramaImage1.link( panoramaImage2, new THREE.Vector3(4124.909379346616 , 439.3184398423302 , -2777.541271953395),200,"images/BHK/KITCHEN.JPG" );
    panoramaImage2.link( panoramaImage1, new THREE.Vector3(-2135.6402212521116 , 826.5711955636158 , -4436.885669093779),200,"images/BHK/HALL.JPG" );
    panoramaImage1.link( panoramaImage3, new THREE.Vector3(-2885.8960648782495 , 187.39322104994665 , -4070.756153182008),200,"images/BHK/BEDROOM_1.JPG" );
    panoramaImage3.link( panoramaImage1, new THREE.Vector3( -4247.594963294256 , -504.4936920206869 , 2574.478092583634),400 );
    panoramaImage1.link( panoramaImage4, new THREE.Vector3(-3966.680082074095 , 209.24551085440302 , -3022.7023549034097),200,"images/BHK/BEDROOM_3.JPG" );
    panoramaImage4.link( panoramaImage1, new THREE.Vector3( 4352.831756422047 , 121.03878664536361 , 2444.9785440215956),400);

//     panoramaImage1.addEventListener( 'enter-fade-start', function(){
//         viewer.tweenControlCenter( lookAtPositions[0], 0 );
//     } );

//     panoramaImage1.addEventListener( 'leave-animation-start', function(){
//       console.log("initia;lFov3")
//       // viewer.tweenControlCenter( lookAtPositions[0], 0 );
//   } );

    // panoramaImage2.addEventListener( 'enter-fade-start', function(){
    //   console.log("initia;lFov2")
    //   viewer.camera.fov = 75;
    //   viewer.camera.updateProjectionMatrix();
    //   viewer.tweenControlCenter( lookAtPositions[1], 0);
    // } );
    function logCameraPosition() {
      const cameraPosition = viewer.camera.position;
      console.log(
        `Camera Position: func x=${cameraPosition.x}, y=${cameraPosition.y}, z=${cameraPosition.z}`
      );
    }
  

    // function animateZoom(targetFOV, duration) {
    //   hotspot1.hide()
    //   const initialFOV = viewer.camera.fov;
    //   console.log(initialFOV)
    //   // viewer.tweenControlCenter( lookAtPositions[1], 0);
    //   new TWEEN.Tween({ fov: initialFOV })
    //   .to({ fov: targetFOV }, duration)
    //   .easing(TWEEN.Easing.Exponential.Out)
    //   .onUpdate(function (value) {
    //           viewer.camera.fov = value.fov;
    //           viewer.camera.updateProjectionMatrix();
    //   })
    //   .onComplete(function (e) {
    //     panoramaImage2.animationDuration = 0;
    //     viewer.setPanorama(panoramaImage3);
    //   })
    //   .start();
    // }


    // hotspot1.addEventListener("click", function () {
    //     animateZoom(50,1000)
    //     panoramaImage2.animationDuration = 0;
    //     logCameraPosition()
    //   }); 
    const audioHallKitchen = document.getElementById("audio-hall-kitchen");
  panoramaImage3.addEventListener("enter", function () {
    audioHallKitchen.src = "images/BHK/office-corporate-motivational-successful-business-real-estate-219420.mp3";
    audioHallKitchen.play();
  }); 
  panoramaImage4.addEventListener("enter", function () {
    audioHallKitchen.src = "images/BHK/jazzy-abstract-beat-11254.mp3";
    audioHallKitchen.play();
  }); 
  panoramaImage1.addEventListener("enter", function () {
    audioHallKitchen.pause();
  }); 
  panoramaImage2.addEventListener("enter", function () {
    audioHallKitchen.pause();
  }); 
  
    });

