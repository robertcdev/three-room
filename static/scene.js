var mouse = new THREE.Vector2();
var CAMERA, CONTROLS, SCENE, RENDERER, SKYBOX, TEXTURELOADER;

var MESHES = [];
var WINDOWS = [];
var DOORS = [];
var GARAGEDOORS = [];
var GROUND, HOUSE;

var PATH = 'static/objects/';
var mouseCaster;

var SUN, ANTISUN, AMBIENT;
var MOBILE = false;
var SECONDSTEP = false;

INTERIOR_OPTIONS = {
    'rightloft': 0,
    'leftloft': 0,
    'shelving': 0,
    'workbenches': 0,
    'floor': 0,
    'joist': 0,
}
INTERIOR_STRINGS = {
    'rightloft': '',
    'leftloft': '',
    'shelving': '',
    'workbenches': '',
    'floor': '',
    'joist': '',
}

DOOR_COSTS = {
    'Fiberglass Prehung 36"': 250,
    'Fiberglass Prehung 36" w/ Glass': 275,
    'Fiberglass 36" Slab': 135,
    'Fiberglass 36" Slab w/ Glass': 185,
    'Smartside': 100,
    'Double Smartside': 160,
    'Double Fiberglass Slabs': 265,
    'Standard Garage': 450,
    'Carrige Garage': 590,
}

SILL_COSTS = {
    'Fiberglass Prehung 36"': 21,
    'Fiberglass Prehung 36" w/ Glass': 21,
    'Fiberglass 36" Slab': 21,
    'Fiberglass 36" Slab w/ Glass': 21,
    'Smartside': 21,
    'Double Smartside': 42,
    'Double Fiberglass Slabs': 42,
    'Standard Garage': 49,
    'Carrige Garage': 49,
}

SMARTSIDE_COSTS = {
    8: 280,
    10: 300,
    12: 330,
    14: 400,
}

$(document).ready(function () {
    MOBILE = window.mobilecheck();
    if (MOBILE){
        $('.sidebarContainer').hide();
        $('.sidebarContainer').css('position', 'absolute');
        $('.sidebarContainer').css('right', '0px');
        $('.sidebarContainer').css('background', 'white');

        $('.mobileButtons').show();

        $('.bottom-button').css('bottom', '60px');
        $('.floatingInstructions').css('bottom', '60px');
    }

    if ( WEBGL.isWebGLAvailable() === false ) {
        document.body.appendChild( WEBGL.getWebGLErrorMessage() );
    }

    window.addEventListener("keyup", function(e){
        if (e.key == 'c'){
            HOUSE.centerCamera();
        }
    });

    $('body').on('change', 'input[type=number]', function(e){
        var obj = $(e.currentTarget);
        console.log(obj.val());

        var interiorKeys = Object.keys(INTERIOR_OPTIONS);
        if (interiorKeys.indexOf(obj.attr('name')) > -1){
            INTERIOR_OPTIONS[obj.attr('name')] = parseFloat(obj.val());
            INTERIOR_STRINGS[obj.attr('name')] = obj.parent().text();
            calculateTotal();
        }
    });

    $('body').on('change', 'input[type=checkbox]', function(e){
        var obj = $(e.currentTarget);
        console.log(obj.val());

        var interiorKeys = Object.keys(INTERIOR_OPTIONS);
        if (interiorKeys.indexOf(obj.attr('name')) > -1){
            INTERIOR_OPTIONS[obj.attr('name')] = parseFloat(obj.val());
            INTERIOR_STRINGS[obj.attr('name')] = obj.parent().text();
            calculateTotal();
        }

        else if (obj.attr('name') == 'vent'){
            if (obj.val() == 'gable'){
                HOUSE.setGableVent(obj.val(), obj.is(':checked'));
            } else {
                HOUSE.setRidgeVent(obj.val(), obj.is(':checked'));
            }

        }
    });

    $('body').on('change', 'input[type=radio]', function(e){
        var obj = $(e.currentTarget);
        console.log(obj.val());

        var interiorKeys = Object.keys(INTERIOR_OPTIONS);

        if (interiorKeys.indexOf(obj.attr('name')) > -1){
            INTERIOR_OPTIONS[obj.attr('name')] = parseFloat(obj.val());
            INTERIOR_STRINGS[obj.attr('name')] = obj.parent().text();
        } else if (obj.attr('name') == 'style'){
            HOUSE.changeStyle(obj.val());
            HOUSE.styleText = obj.parent().text().trim()

        } else if (obj.attr('name') == 'shutter'){
            if (WINDOW_SHUTTERS){WINDOW_SHUTTERS=false;}
            else {WINDOW_SHUTTERS=true;}

            for (i in WINDOWS){
                WINDOWS[i].toggleShutters(WINDOW_SHUTTERS);
            }
            if (WINDOW_SHUTTERS){
                $('.shutterColors').show();
            } else {
                $('.shutterColors').hide();
            }

        } else if (obj.attr('name') == 'doorcolor') {
            for (i in DOORS){
                if (WOOD_DOORS.indexOf(DOORS[i]['name']) == -1){
                    DOORS[i].changeColor(obj.val());
                }
            }
            updateSelectedColor(obj);

        } else if (obj.attr('name') == 'garagedoorcolor') {
            for (i in GARAGEDOORS){
                GARAGEDOORS[i].changeColor(obj.val());
            }
            updateSelectedColor(obj);

        } else if (obj.attr('name') == 'windowcolor') {
            for (i in WINDOWS){
                WINDOWS[i].changeColor(obj.val());
            }
            updateSelectedColor(obj);

        } else if (obj.attr('name') == 'flowercolor') {
            for (i in WINDOWS){
                WINDOWS[i].changeFlowerColor(obj.val());
            }
            updateSelectedColor(obj);

        } else if (obj.attr('name') == 'sidingcolor') {
            HOUSE.changeColor(obj.val());
            updateSelectedColor(obj);

        } else if (obj.attr('name') == 'trimcolor') {
            HOUSE.changeTrimColor(obj.val());
            updateSelectedColor(obj);

        } else if (obj.attr('name') == 'roofcolor') {
            HOUSE.changeRoofColor(obj.val());
            updateSelectedColor(obj);

        } else if (obj.attr('name') == 'cupola'){
            HOUSE.setCupola(obj.val());

        } else if (obj.attr('name') == 'sidingtype'){
            HOUSE.setSiding(obj.val());

        } else if (obj.attr('name') == 'overhang'){
            if (obj.val() == 'on'){
                HOUSE.toggleOverhang(true);
            } else {
                HOUSE.toggleOverhang(false);
            }

        } else if (obj.attr('name') == 'higherwalls'){
            if (obj.val() == 'on'){
                HOUSE.changeStyle('7aframe');
            } else {
                HOUSE.changeStyle('aframe');
            }

        } else if (obj.attr('name') == 'smartside'){
            if (obj.val() == 'on'){
                HOUSE.smartside = true;
            } else {
                HOUSE.smartside = false;
            }

        } else if (typeof(CONTEXTOBJECT) == 'undefined'){

        }
        else if (obj.attr('name') == 'windowType'){
            CONTEXTOBJECT.setWindow(copyObject(OBJECTS[obj.val()]));
            CONTEXTOBJECT.type = obj.parent().find('label').html().trim();
        }
        else if (obj.attr('name') == 'flowerType'){
            CONTEXTOBJECT.setFlower(obj.val());

            flowers = false;
            for (var i in WINDOWS){
                var window = WINDOWS[i];
                if (window.flowerName != 'none') {flowers=true;}
            }
            if (flowers){
                $('.flowerboxColors').show();
            } else {
                $('.flowerboxColors').hide();
            }
        }

        else if (obj.attr('name') == 'doorType'){
            CONTEXTOBJECT.setDoor(obj.val());
            CONTEXTOBJECT.longName = obj.parent().text().trim();

        } else if (obj.attr('name') == 'hingeType'){
            CONTEXTOBJECT.setHinge(obj.val());

        } else if (obj.attr('name') == 'rampType'){
            CONTEXTOBJECT.setRamp(obj.val());

        } else if (obj.attr('name') == 'diamond'){
            CONTEXTOBJECT.diamond = obj.val();
        }

        calculateTotal();
    });

    $('body').on('change', 'select', function(e){
        var obj = $(e.currentTarget);
        console.log(obj.val());

        if (obj.attr('name') == 'size'){
            HOUSE.changeSize(obj.val());
            calculateTotal();
        }
    });

    init();
    //render(); // remove when using next line for animation loop (requestAnimationFrame)
    animate();

    TEXTURELOADER = new THREE.TextureLoader();

    loadTextures();

    if (!MOBILE){

    }

    //createSkybox();

    loadOBJModel(PATH, 'ground', {'scale': {x:2, y:2, z:2}, 'repeat': {x:10, y:10}}, function(object){
        object.position.set(0, -39.6, 0);
        GROUND = object;

        GROUND.castShadow = false;
        GROUND.children[0].castShadow = false;
        SCENE.add(GROUND);
    });

    setupObjectControls();

    finalize();
});

function finalize(){
    if (TEXTURELOADED && OBJECTLOADED && SHEDLOADED && SECONDSTEP){
        setupShed();
        applyTextures();
        calculateTotal();
    } else if (TEXTURELOADED && !(SECONDSTEP)){
        loadObjects();
        loadShed(STYLE_START, SIZE_START);

        SECONDSTEP = true;
        setTimeout(function(){
            finalize();
        },500);
    } else {
        setTimeout(function(){
            finalize();
        },500);
    }
}

function init() {
    var context = $('.viewer');
    context.height(window.innerHeight);

    SCENE = new THREE.Scene();
    SCENE.background = new THREE.Color( 0xcccccc );
    if (!MOBILE){

    }
    SCENE.fog = new THREE.Fog( 0xa9b8bf, 10, 800);

    RENDERER = new THREE.WebGLRenderer({
        antialias: true,
        preserveDrawingBuffer: true,
    });
    if (!MOBILE){
        RENDERER.shadowMap.enabled = true;
        RENDERER.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
    }

    RENDERER.setPixelRatio( window.devicePixelRatio );
    RENDERER.setSize( context.width(), window.innerHeight );
    context.append( RENDERER.domElement );

    CAMERA = new THREE.PerspectiveCamera( 60, context.width() / window.innerHeight, 1, 5000 );
    CAMERA.position.set( 0, 25, 50 );

    // CONTROLS
    CONTROLS = new THREE.OrbitControls( CAMERA, RENDERER.domElement );
    //CONTROLS.addEventListener( 'change', render ); // call this only in static SCENEs (i.e., if there is no animation loop)
    CONTROLS.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    CONTROLS.dampingFactor = 0.25;
    CONTROLS.screenSpacePanning = false;
    CONTROLS.enablePan = false;
    CONTROLS.minDistance = 25;
    CONTROLS.maxDistance = 200;
    CONTROLS.maxPolarAngle = Math.PI / 2;
    CONTROLS.rotateSpeed = .5;
    CONTROLS.target.set(0, 8, 0);

    // lights
    SUN = new THREE.DirectionalLight( 0xffffff );
    if (!MOBILE){
        SUN = createShadows(SUN, (1024 * 4));
    }
    SUN.intensity = .5;

    SUN.position.set( 100, 200, 100 );
    SCENE.add( SUN );


    //Create a helper for the shadow camera (optional)
    //var helper = new THREE.CameraHelper( SUN.shadow.camera );
    //SCENE.add( helper );

    ANTISUN = new THREE.DirectionalLight( 0xffffff );
    ANTISUN = createShadows(ANTISUN, (1024 * 2));
    if (!MOBILE){
        ANTISUN = createShadows(ANTISUN, (1024 * 2));
    }

    ANTISUN.intensity = .3;
    ANTISUN.position.set(-100, 0, -100);
    SCENE.add( ANTISUN );

    ANTISUN2 = new THREE.DirectionalLight( 0xffffff );
    ANTISUN2.intensity = .3;
    ANTISUN2.position.set(100, 0, 100);
    SCENE.add( ANTISUN2 );

    AMBIENT = new THREE.AmbientLight( 0xffffff );
    AMBIENT.intensity = .3
    SCENE.add( AMBIENT );

    mouseCaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 1, 0, 0 ), 0, 300 );

    onWindowResize();
    window.addEventListener( 'resize', onWindowResize, false );
}


function onWindowResize() {
    var context = $('.viewer');
    var offset = 0;
    if ($('.sidebarContainer').css('display') != 'none'){
        offset = $('.sidebarContainer').width();
    }
    context.width(window.innerWidth - offset);

    CAMERA.aspect = context.width() / window.innerHeight;
    CAMERA.updateProjectionMatrix();
    RENDERER.setSize( context.width(), window.innerHeight );

    $('.sidebarContainer').css('max-height', window.innerHeight);
}


function animate() {
    requestAnimationFrame( animate );
    CONTROLS.update(); // only required if CONTROLS.enableDamping = true, or if CONTROLS.autoRotate = true
    render();
}


function render() {
    RENDERER.render( SCENE, CAMERA );
}


var skyboxCount = 1;
var skyboxMaterialArray = [];
var skyboxImagePrefix = 'static/skybox/skybox';
var skyboxImageSuffix = '.jpg';

function createSkybox(){
    TEXTURELOADER.load(skyboxImagePrefix + skyboxCount + skyboxImageSuffix, skyboxTextureLoaded);
}

function skyboxTextureLoaded( texture ) {
    // do something with the texture
    var material = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.BackSide,
        fog: false
     });

    skyboxMaterialArray.push(material);
    console.log(skyboxImagePrefix + skyboxCount);
    if (skyboxMaterialArray.length == 6){
        var skyGeometry = new THREE.BoxGeometry(2000, 2000, 2000);
        SKYBOX = new THREE.Mesh( skyGeometry, skyboxMaterialArray );
        SKYBOX.position.set(0, 0, 0);
        SCENE.add( SKYBOX );
    } else {
        skyboxCount += 1;
        TEXTURELOADER.load(skyboxImagePrefix + skyboxCount + skyboxImageSuffix, skyboxTextureLoaded);
    }
}

function createShadows(light, res){
    light.castShadow = true;
        //Set up shadow properties for the light
    light.shadow.mapSize.width = res;  // default
    light.shadow.mapSize.height = res; // default
    light.shadow.camera.near = 0.5;       // default
    light.shadow.camera.far = 1000;      // default
    light.shadow.camera.top = 60;
    light.shadow.camera.bottom = -60;
    light.shadow.camera.left = -60;
    light.shadow.camera.right = 60;

    return light
}

function saveFile(strData, filename) {
    var link = document.createElement('a');
    if (typeof link.download === 'string') {
        document.body.appendChild(link); //Firefox requires the link to be in the body
        link.download = filename;
        link.href = strData;
        link.click();
        document.body.removeChild(link); //remove the link when done
    } else {
        location.replace(uri);
    }
}


var CURRENTOBJECT;
var CONTEXTOBJECT;
var PLACEMENTOBJECT;
function setupObjectControls(){
    var element = document.body;

    if (!MOBILE){
        document.addEventListener('mousemove', function(event){
            //console.log('mousemove');
            onMouseMove(event);
        }, false);

        element.addEventListener("mousedown", function(event){
            //console.log('mousedown');
            onMouseDown(event);
        }, false);

        element.addEventListener("mouseup", function(event){
            //console.log('mouseup');
            onMouseUp(event);
        });

    } else {
        document.addEventListener('touchmove', function(event){
            //console.log('touchmove');
            onMouseMove(event);
        }, false);

        element.addEventListener("touchstart", function(event){
            //console.log('touchstart');
            onMouseDown(event);
        }, false);


        element.addEventListener("touchend", function(event){
            //console.log('touchend');
            onMouseUp(event);
        });
    }
}

function onMouseMove(event){
    updateMouse(event);
    if (!$(event.target).is('canvas')){
        return false;
    }

    if (typeof(HOUSE) == 'undefined' || !(HOUSE.shed)){
        return false;
    }

    if (mouse.x > -1 && mouse.y > -1 && mouse.x < 1 && mouse.y < 1){
        mouseCaster.setFromCamera(mouse.clone(), CAMERA);

        var intersect = mouseCaster.intersectObjects(HOUSE.shed.childDict['Shed']);
        if (intersect.length > 0 && typeof(CURRENTOBJECT) != 'undefined'){
            if (intersect[0].face.normal.y != 0){
                return false;
            }

            var doorSide = SHEDOBJECTSMAP[HOUSE.style]['door_side'];
            if (doorSide){
                var normal = intersect[0].face.normal;
                if (doorSide == 'half' && normal.x != 0){
                    return false;
                } else if (doorSide == 'none') {
                    return false;
                }
            }

            if (CURRENTOBJECT.isGarage){
                var normal = intersect[0].face.normal;
                var side = SHEDOBJECTSMAP[HOUSE.style]['garage_side'];
                if (side == 'half' && normal.x != 0){
                    return false;
                } else if (side == 'none'){
                    return false;
                }
            }

            CURRENTOBJECT.move(intersect);

        }
    }

    return false;
}

function onMouseDown(event){
    updateMouse(event);
    if (!$(event.target).is('canvas')){
        return false;
    }

    if (mouse.x > -1 && mouse.y > -1 && mouse.x < 1 && mouse.y < 1){
        lastMouse = mouse.clone();
        mouseCaster.setFromCamera(mouse.clone(), CAMERA);

        var intersect = mouseCaster.intersectObjects(MESHES);
        if (intersect.length > 0){
            CONTROLS.enabled = false;

            CURRENTOBJECT = intersect[0]['object'].parent.jsParent;
        }
    }

    return false;
}

function onMouseUp(event){
    updateMouse(event);
    if (!$(event.target).is('canvas')){
        return false;
    }

    CONTROLS.enabled = true;
    CURRENTOBJECT = undefined;

    if (mouse.x > -1 && mouse.y > -1 && mouse.x < 1 && mouse.y < 1){
        var xDiff = Math.abs(lastMouse.x - mouse.x);
        var yDiff = Math.abs(lastMouse.y - mouse.y);

        if (xDiff < .05 && yDiff < .05){
            mouseCaster.setFromCamera(mouse.clone(), CAMERA);

            if (PLACEMENTOBJECT){
                var intersect = mouseCaster.intersectObjects(HOUSE.shed.children);
                if (intersect.length > 0){
                    if (PLACEMENTOBJECT.jsParent.isGarage){
                        var normal = intersect[0].face.normal;
                        var side = SHEDOBJECTSMAP[HOUSE.style]['garage_side'];
                        if (side == 'half' && normal.x != 0){
                            return false;
                        } else if (side == 'none'){
                            return false;
                        }
                    }

                    var currentPos = PLACEMENTOBJECT.position.clone();
                    PLACEMENTOBJECT.jsParent.move(intersect);
                    var newPos = PLACEMENTOBJECT.position;
                    if (newPos.x != currentPos.x || newPos.y != currentPos.y || newPos.z != currentPos.z){
                        PLACEMENTOBJECT.visible = true;
                        if (PLACEMENTOBJECT.jsParent.hinges){
                            PLACEMENTOBJECT.jsParent.hinges.visible = true;

                            CONTEXTOBJECT = PLACEMENTOBJECT.jsParent;
                            CONTEXTOBJECT.showContext();
                        }
                        PLACEMENTOBJECT = undefined;
                        $('.viewer').css('cursor', 'default');
                    }
                }
            } else {
                var intersect = mouseCaster.intersectObjects(MESHES);
                if (intersect.length > 0){
                    CONTROLS.enabled = false;
                    setTimeout(function(){
                        CONTEXTOBJECT = intersect[0]['object'].parent.jsParent;
                        CONTEXTOBJECT.showContext(mouse);
                    },50);

                }
            }
        }
    }

    return false;
}

function mouseToPixels(mouse){
    var x = (mouse.x + 1) / 2;
    var y = (mouse.y * -1 + 1) / 2;

    var width = x * $('.viewer').width();
    var height = y * $('.viewer').height();

    //console.log(height + " : " + width);

    return {x: width, y: height}
}

function updateMouse(event){
    var context = $('.viewer');

    if ('clientX' in event){
        mouse.x = ( event.clientX / context.width() ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    } else if (event.touches.length > 0) {
        mouse.x = ( event.touches[0].clientX / context.width() ) * 2 - 1;
        mouse.y = - ( event.touches[0].clientY / window.innerHeight ) * 2 + 1;
    } else {
        mouse.x = ( event.changedTouches[0].clientX / context.width() ) * 2 - 1;
        mouse.y = - ( event.changedTouches[0].clientY / window.innerHeight ) * 2 + 1;
    }

}

function updateSelectedColor(obj){
    var name = obj.parent().find('.previewColor').prop('title');
    $(obj).closest('.colorContainer').find('.selected-color').text('Selected Color: ' + name);
}

function updateFloatingTitle(){
    var title = HOUSE.styleText + ' ' + HOUSE.size;
    $('.floatingTitle div').html    (title);
}