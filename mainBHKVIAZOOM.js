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
    autoRotate: true,
    autoRotateSpeed: 0.3,
    autoRotateActivationDuration: 5000,
    dwellTime: 1000,
    fadeDuration: 1000
  });
  viewer.add(panoramaImage1,panoramaImage2,panoramaImage3,panoramaImage4,panoramaImage5);
  viewer.setPanorama(panoramaImage1);


  const hotspot1 = new PANOLENS.Infospot(500, PANOLENS.DataImage.Info);
  const hotspot2 = new PANOLENS.Infospot(500, PANOLENS.DataImage.Info);

  const hotspotHallKitchen = new PANOLENS.Infospot(200, "images/BHK/KITCHEN.JPG");
  const hotspotKitchenHall = new PANOLENS.Infospot(200, "images/BHK/HALL.JPG");
  const hotspotHallBed = new PANOLENS.Infospot(200, "images/BHK/BEDROOM_1.JPG");
  const hotspotBedHall = new PANOLENS.Infospot(400, PANOLENS.DataImage.Info);
  const hotspotHallAnotherBed = new PANOLENS.Infospot(200, "images/BHK/BEDROOM_3.JPG");
  const hotspotAnotherBedHall = new PANOLENS.Infospot(200, PANOLENS.DataImage.Info);

  hotspotHallKitchen.position.set(4124.909379346616 , 439.3184398423302 , -2777.541271953395);
  hotspotKitchenHall.position.set(-2135.6402212521116 , 826.5711955636158 , -4436.885669093779);
  hotspotHallBed.position.set(-2885.8960648782495 , 187.39322104994665 , -4070.756153182008);
  hotspotBedHall.position.set( -4247.594963294256 , -504.4936920206869 , 2574.478092583634);
  hotspotHallAnotherBed.position.set(-3966.680082074095 , 209.24551085440302 , -3022.7023549034097);
  hotspotAnotherBedHall.position.set(4352.831756422047 , 121.03878664536361 , 2444.9785440215956);

  panoramaImage1.add(hotspotHallKitchen,hotspotHallBed,hotspotHallAnotherBed)
  panoramaImage2.add(hotspotKitchenHall)
  panoramaImage3.add(hotspotBedHall)
  panoramaImage4.add(hotspotAnotherBedHall)

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


// Function to get intersection points
    function getIntersectionPoints(viewer) {
        const position = viewer.raycaster.intersectObject(viewer.panorama, true);
        getCurrentCenterCoordinates();
        return position;
    }

    setInterval(()=>{
      const intersectionPoints = getIntersectionPoints(viewer);
      
      if(intersectionPoints.length>0){
        console.log("aayush singla",-intersectionPoints[0].point.x,",",intersectionPoints[0].point.y,",",intersectionPoints[0].point.z);
      }
    },5000)


    var lookAtPositions = [
        new THREE.Vector3(-4968.69497489731 , -209.628591638335 , -517.8089415971325 ),
        new THREE.Vector3(4968.301262111784 , -548.1294609668647 , -124.64615083759341),
        new THREE.Vector3(4862.273813294865 , -829.2329793449686 , 818.9420190182449 ),
        new THREE.Vector3(4990.323196863266 , -245.0852901199433 , -191.33110414989721 ),
        new THREE.Vector3(4582.161979402548 , -1248.2736193080148 , -1563.8428840063787 ),


        new THREE.Vector3(4124.909379346616 , 439.3184398423302 , -2777.541271953395),
        new THREE.Vector3(-2135.6402212521116 , 826.5711955636158 , -4436.885669093779),
        new THREE.Vector3(-2885.8960648782495 , 187.39322104994665 , -4070.756153182008),
        new THREE.Vector3( -4247.594963294256 , -504.4936920206869 , 2574.478092583634),
        new THREE.Vector3(-3966.680082074095 , 209.24551085440302 , -3022.7023549034097),
        new THREE.Vector3(4352.831756422047 , 121.03878664536361 , 2444.9785440215956)
    ];


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


    function logCameraPosition() {
      const cameraPosition = viewer.camera.position;
      console.log(
        `Camera Position: func x=${cameraPosition.x}, y=${cameraPosition.y}, z=${cameraPosition.z}`
      );
    }
  

    function animateZoom(targetFOV, duration,targetPanorama) {
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
        viewer.setPanorama(targetPanorama);
      })
      .start();
    }
    const audioHallKitchen = document.getElementById("audio-hall-kitchen");

  hotspotHallKitchen.addEventListener("click", function () {
    viewer.tweenControlCenter( lookAtPositions[5], 0 );
    
        animateZoom(40,800,panoramaImage2)
        logCameraPosition()
    }); 
    hotspotKitchenHall.addEventListener("click", function () {
        viewer.tweenControlCenter( lookAtPositions[6], 0 );
        animateZoom(40,800,panoramaImage1)
        logCameraPosition()
    }); 
    hotspotHallBed.addEventListener("click", function () {
        hotspotHallBed.hide()
        audioHallKitchen.src = "images/BHK/office-corporate-motivational-successful-business-real-estate-219420.mp3";
        audioHallKitchen.play();
        viewer.tweenControlCenter( lookAtPositions[7], 0 );
        animateZoom(40,800,panoramaImage3)
        logCameraPosition()
    }); 
    hotspotBedHall.addEventListener("click", function () {
        viewer.tweenControlCenter( lookAtPositions[8], 0 );
        audioHallKitchen.pause();
        animateZoom(40,800,panoramaImage1)
        logCameraPosition()
    }); 
    hotspotHallAnotherBed.addEventListener("click", function () {
        hotspotHallAnotherBed.hide()
        viewer.tweenControlCenter( lookAtPositions[9], 0 );
        audioHallKitchen.src = "images/BHK/jazzy-abstract-beat-11254.mp3";
        audioHallKitchen.play();
        animateZoom(40,800,panoramaImage4)
        logCameraPosition()
    }); 
    hotspotAnotherBedHall.addEventListener("click", function () {
        viewer.tweenControlCenter( lookAtPositions[10], 0 );
        audioHallKitchen.pause();
        animateZoom(40,800,panoramaImage1)
        logCameraPosition()
    }); 
});

