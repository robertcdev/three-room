var SHEDS = {};
var SHEDLOADED = false;

var TYPELIST = Object.keys(SHEDMAP);
var TYPECOUNT = 0;
var SIZELIST = [];
var SIZECOUNT = 0;

var SIZE_START = '8x12';
var STYLE_START = 'classic';

GHOST_MAT = new THREE.MeshBasicMaterial({
    color: 0x000000,
    transparent: true,
    opacity: 0.0001,
    side: THREE.BackSide
});


function loadShed(style, size){
    var data = SHEDMAP[style][size];
    var filename = data['name'];

    loadOBJModel(PATH, filename, {'scale': {x:10, y:10, z:10}, 'repeat': {x:1, y:1}}, shedLoaded);
}

function shedLoaded( object ) {
    var name = SHEDMAP[STYLE_START][SIZE_START]['name'];
    if (HOUSE){
        name = SHEDMAP[HOUSE.style][HOUSE.size]['name'];
    }

    object.secretName = name;
    object.interior = new THREE.Group();
    object.interior.castShadow = true;
    object.interior.position.y = -1;
    object.interior.scale.set(.992, 1, .992);

    if (HOUSE && HOUSE.style == 'quaker'){
        object.interior.scale.set(.992, 1, .985);
        object.interior.position.z = -.07;
    }

    for (var i in object.childDict['Shed']){
        if (i >= object.childDict['Shed'].length-1 ){
            continue;
        } else if (HOUSE && HOUSE.style == 'victorian' && i >= 2){
            continue;
        }
        var mesh = object.childDict['Shed'][i];

        var newMesh = mesh.clone();
        newMesh.material = GHOST_MAT;

        object.interior.add(newMesh);
    }

    SHEDS[name] = object;

    if (!(HOUSE)){
        SHEDLOADED = true;
    } else if (HOUSE.callback == 'style'){
        HOUSE.changeStyle(HOUSE.style);
    } else if (HOUSE.callback == 'size'){
        HOUSE.changeSize(HOUSE.size);
    }
}

function setupShed(){
    HOUSE = new Shed();
    HOUSE.create();
}


function Shed(){
    this.helper = new ThreeObject();
    this.createBoundingBox = this.helper.createBoundingBox.bind(this);

    this.shed;
    this.shedMap = SHEDMAP;
    this.callback;

    this.create = function (){
        this.overhang = false;
        this.smartside = false;

        this.size = '8x12';
        this.style = 'classic';
        this.styleText = 'Classic A-Frame';
        this.roofColor = 'roofgrey';

        this.changeStyle(this.style);
    }

    this.changeStyle = function (value){
        this.style = value;
        this.overhang = false;

        if (this.style == 'minibarnsheds'){
            this.sidingType = 'woodsiding';
        } else {
            this.sidingType = 'wall';
        }

        if (['classic', 'aframe', 'quaker', '7aframe'].indexOf(this.style) > -1){
            $('.overhang-options').show();
        } else {
            $('.overhang-options').hide();
        }
        if (['aframe', '7aframe'].indexOf(this.style) > -1){
            $('.height-options').show();
        } else {
            $('.height-options').hide();
        }


        if (!this.shedMap[this.style][this.size]){
            this.size = Object.keys(this.shedMap[this.style])[0];
            $('[name=size]').val(this.size);
        }

        $('[name=size] option').hide();
        for (var key in this.shedMap[this.style]){
            $('[name=size] option[value='+ key +']').show();
        }

        var name = this.shedMap[this.style][this.size]['name'];
        if (name in SHEDS){
            this.setShed(copyObject(SHEDS[name]));
            this.setSiding(this.sidingType);
        } else {
            this.callback = 'style';
            loadShed(this.style, this.size);
        }

        var height = (SHEDOBJECTSMAP[this.style]['roofCenter'][1]+20)/2;
        CONTROLS.target.set(0, height, 0);
    }

    this.changeSize = function (value){
        this.size = value;

        var name = this.shedMap[this.style][this.size]['name'];
        if (name in SHEDS){
            this.setShed(copyObject(SHEDS[name]));
        } else {
            this.callback = 'size';
            loadShed(this.style, this.size);
        }
    }

    this.setShed = function (object){
        this.centerCamera();

        //Clean up existing objects in the scene
        if (typeof(this.shed) != 'undefined'){
            SCENE.remove(this.shed);
            SCENE.remove(this.shed.interior);

            while (WINDOWS.length > 0){
                WINDOWS[0].remove();
            }
            while (DOORS.length > 0){
                DOORS[0].remove();
            }
            while (GARAGEDOORS.length > 0){
                GARAGEDOORS[0].remove();
            }
        }

        this.shed = object;
        this.shed.jsParent = this;
        //this.shed.position.set(-.3,0,0);
        applyTextures();
        SCENE.add(object);
        SCENE.add(object.interior);

        this.createBoundingBox();

        var offset = this.bbox.max.clone();
        offset.add(this.bbox.min);
        offset.multiplyScalar(-.5);
        offset.y = 0;
        var height = this.bbox.min.y;

        var pos = this.shed.position.clone();
        pos.add(offset);
        pos.y = -1 * height;
        this.shed.position.copy(pos);
        this.shed.interior.position.copy(pos);
        this.shed.interior.position.y = -1;

        this.bbox.max.add(offset);
        this.bbox.min.add(offset);
        this.bbox.min.y = 0;

        if (this.cupola){
            this.setCupolaPosition();
        }
        if (this.hasGable){
            this.setVentPosition('gable');
        }
        if (this.hasRidge){
            this.setVentPosition('ridge');
        }

        this.toggleOverhang(this.overhang);

        setupDoors();
        setupWindows();
        updateWindowOptions();

        $('.flowerboxColors').hide();

        setTimeout(function(){
            fixPlacedObjects();
            removeMisplacedObjects();

            checkDoorSizes();
            calculateTotal();
            updateFloatingTitle();
        }, 200);
    }

    this.setSiding = function(value){
        var textDict = {
            'Shed': value,
        }

        this.sidingType = value;
        if (this.sidingType == 'woodsiding'){
            $('.smartside-package').show();
            $('.vinyl-trimcolor').hide();
            $('.woodsiding-trimcolor').show();
            this.changeTrimColor($('.woodsiding-trimcolor').find('[name=trimcolor]')[0].value);

            for (var i in DOORS){
                var door = DOORS[i];
                if (SMALL_DOORS.indexOf(door.name) > -1){
                    door.setDoor("3 ft smartside door");
                }
                else if (LARGE_DOORS.indexOf(door.name) > -1) {
                    door.setDoor("6 ft smartside door");
                }
            }

        } else {
            $('.smartside-package').hide();
            $('.vinyl-trimcolor').show();
            $('.woodsiding-trimcolor').hide();
            this.changeTrimColor($('.vinyl-trimcolor').find('[name=trimcolor]')[0].value);

            this.smartside = false;
            $('.smartside-package [name=smartside][value="on"]').prop('checked', '');
            $('.smartside-package [name=smartside][value="off"]').prop('checked', 'checked');
        }

        this.helper.updateChildMaterials(textDict, this.shed);
        this.changeColor(this.siding_color);
        removeMisplacedObjects();
    }

    this.setCupola = function(name){
        if (typeof(this.cupola) != 'undefined'){
            SCENE.remove(this.cupola);
        }
        if (name == 'none'){
            this.cupola = null;
            return false;
        }

        this.cupolaName = name;
        this.cupola = copyObject(OBJECTS[name]);
        this.setCupolaPosition();

        var textDict = {
            'Shingles': this.roofColor,
            'Wood': 'whitewindow',
            'Inset': 'whitewindow',
        }
        if (this.cupolaName == 'Gulfport'){
            textDict['Shingles'] = 'blackmetal';
        }
        this.helper.updateChildMaterials(textDict, this.cupola);

        SCENE.add(this.cupola);
    }

    this.setCupolaPosition = function (){
        var pos = CUPOLAMAP[this.cupolaName]['positions'][0];
        var roof = SHEDOBJECTSMAP[this.style]['roofCenter'];
        var position = new THREE.Vector3(pos[0] + roof[0], pos[1] + roof[1], pos[2] + roof[2]);

        var rotation = CUPOLAMAP[this.cupolaName]['rotations'][0];

        this.cupola.position.copy(position);
    }

    this.setGableVent = function(name, keep){
        if (!(keep)){
            SCENE.remove(this.vent2);
            SCENE.remove(this.vent3);
            this.vent2 = null;
            this.vent3 = null;
            this.hasGable = false;
            return false;
        }


        this.hasGable = true;
        this.vent2 = copyObject(OBJECTS[name]);
        this.vent3 = copyObject(OBJECTS[name]);

        var textDict = {
            'Vent': this.roofColor,
            'Black': 'black',
            'Default': 'white'
        }

        this.helper.updateChildMaterials(textDict, this.vent2);
        this.helper.updateChildMaterials(textDict, this.vent3);
        SCENE.add(this.vent2);
        SCENE.add(this.vent3);

        this.setVentPosition('gable');
        calculateTotal();
    }

    this.setRidgeVent = function(name, keep){
        if (!(keep)){
            SCENE.remove(this.vent);
            this.vent = null;
            this.hasRidge = false;
            return false;
        }

        this.hasRidge = true;
        this.vent = copyObject(OBJECTS[name]);

        var textDict = {
            'Vent': this.roofColor,
            'Black': 'black',
            'Default': 'white'
        }

        this.helper.updateChildMaterials(textDict, this.vent, true);
        SCENE.add(this.vent);

        this.setVentPosition('ridge');
        calculateTotal();
    }


    this.setVentPosition = function (name){
        var pos = VENTMAP[name]['positions'][0];
        var roof = SHEDOBJECTSMAP[this.style]['roofCenter'];
        var length = parseInt(this.size.split('x')[1]);

        var rotation = VENTMAP[name]['rotations'][0];

        if (name == 'ridge'){
            var textDict = {
                'Vent': this.roofColor,
                'Black': 'black',
                'Default': 'white'
            }
            this.helper.updateChildMaterials(textDict, this.vent, true);
            this.vent.scale.x = 1.1 * (length/12);

            var position = new THREE.Vector3(pos[0] + roof[0], pos[1] + roof[1], pos[2] + roof[2]);
            this.vent.rotation.y = Math.PI/2;

            if (this.style == 'victorian' || this.style == 'quaker'){
                this.vent.rotation.y = 0;
            }

            this.vent.position.copy(position);

        } else if (name == 'gable'){
            var position = new THREE.Vector3(pos[0] + roof[0], pos[1] + roof[1] -2.5, pos[2] + roof[2] - length*1.54);
            var position2 = new THREE.Vector3(pos[0] + roof[0], pos[1] + roof[1] -2.5, pos[2] + roof[2] + length*1.54);

            this.vent2.rotation.y = 0;
            this.vent3.rotation.y = Math.PI;

            if (this.style == 'victorian' || this.style == 'quaker'){
                var position = new THREE.Vector3(pos[2] + roof[0] - length*1.54, pos[1] + roof[1] -2.5, pos[0] + roof[2]);
                var position2 = new THREE.Vector3(pos[2] + roof[0] + length*1.54, pos[1] + roof[1] -2.5, pos[0] + roof[2]);

                this.vent2.rotation.y = Math.PI/2;
                this.vent3.rotation.y = Math.PI * 3 / 2;
            } else if (this.style == 'doublegarage' || this.style == 'elitegarage'){
                position.y -= 2;
                position2.y -= 2;
            }

            this.vent2.position.copy(position);
            this.vent3.position.copy(position2);
        }
    }

    this.centerCamera = function(){
        var cam = SHEDOBJECTSMAP[this.style]['camera'].slice();
        var width = parseInt(this.size.split('x')[0]);
        var length = parseInt(this.size.split('x')[1]);
        if (cam[0] > 0){
            cam[0] = (width / 2) * 3 + 40;
            CONTROLS.minDistance = cam[0]/2 + 10;
        }
        if (cam[2] > 0){
            cam[2] = (length / 2) * 3 + 40;
            CONTROLS.minDistance = cam[2]/2 + 10;
        }

        if (CONTROLS.minDistance < 35){
            CONTROLS.minDistance = 35;
        }

        CAMERA.position.set(cam[0], cam[1], cam[2]);
    }


    this.applyTextures = function (){
        var textDict = {
            'Shed': this.sidingType,
            'Trim': 'trim',
            'Roof': this.roofColor,
            'Sides': 'trim',
            'Floor': 'wood',
        }

        this.helper.updateChildMaterials(textDict, this.shed);
    }

    this.changeColor = function (value){
        this.siding_color = value;
        for (var i in this.shed.childDict['Shed']){
            this.shed.childDict['Shed'][1].material.color.set('#' + this.siding_color);
        }
        this.updateDoorColor();
    }

    this.updateDoorColor = function () {
        if (this.sidingType == 'woodsiding' && ['aframe', '7aframe', 'classic', 'victorian'].indexOf(this.style) == -1){
            MATERIALS['woodsidingdoor'].color.set('#' + this.siding_color);
        }
    }

    this.changeTrimColor = function (value){
        for (var i in this.shed.childDict['Trim']){
            this.shed.childDict['Trim'][i].material.color.set('#' + value);
        }
    }

    this.changeRoofColor = function (value){
        this.roofColor = value;

        for (var i in this.shed.childDict['Roof']){
            this.shed.childDict['Roof'][i].material = MATERIALS[value];
        }

        if (this.cupola){
            //this.cupola.childDict['Shingles'][0].material = MATERIALS[value];
        }
        if (this.vent){
            this.vent.childDict['Vent'][0].material = MATERIALS[value];
        }
    }

    this.createBoundingBox = function (){
        this.bbox = new THREE.Box3().setFromObject(this.shed.interior);

        if (this.style == 'quaker'){
            this.bbox.max.z -= 1.5;
        } else if (this.style == 'minibarnsheds'){
            var width = parseInt(this.size.split('x')[0]);
            if (width == '8'){
                var dist = 2;
            } else if (width == '10'){
                var dist = 3;
            } else {
                var dist = 4;
            }
            this.bbox.max.x -= dist;
            this.bbox.min.x += dist;
        }

        var geometry = new THREE.BoxGeometry(
            this.bbox.max.x - this.bbox.min.x,
            this.bbox.max.y - this.bbox.min.y,
            this.bbox.max.z - this.bbox.min.z
        );
        //this.bboxHelp = new THREE.BoxHelper( this.shed.childDict['Shed'], 0xff0000 );
        //SCENE.add(this.bboxHelp);
    }

    this.toggleOverhang = function (overhang){
        if (overhang){
            var length = parseInt(this.size.split('x')[1]);
            var scale = 10 + (12/length);
        } else {
            var scale = 10;
        }
        this.overhang = overhang;

        if (this.style == 'classic'){
            this.shed.childDict['Roof'][0].material.map.repeat.x = (8 /15) * (scale / 10);
            for (var i in this.shed.childDict['Roof']){
                this.shed.childDict['Roof'][i].scale.z = scale;
            }
            this.shed.childDict['Shed'][1].scale.z = scale;
            this.shed.childDict['Sides'][0].scale.z = scale;
            this.shed.childDict['Sides'][1].scale.z = scale;
            this.shed.childDict['Sides'][2].scale.z = scale;
        }

        if (this.style == 'aframe'){
            this.shed.childDict['Roof'][0].material.map.repeat.x = (8 /15) * (scale / 10);
            for (var i in this.shed.childDict['Roof']){
                this.shed.childDict['Roof'][i].scale.z = scale;
            }
            for (var i in this.shed.childDict['Sides']){
                this.shed.childDict['Sides'][i].scale.z = scale;
            }

            this.shed.childDict['Shed'][3].scale.z = scale;

        }

        else if (this.style == '7aframe'){
            this.shed.childDict['Roof'][0].material.map.repeat.x = (8 /15) * (scale / 10);
            for (var i in this.shed.childDict['Roof']){
                this.shed.childDict['Roof'][i].scale.z = scale;
            }
            for (var i in this.shed.childDict['Sides']){
                this.shed.childDict['Sides'][i].scale.z = scale;
            }

            this.shed.childDict['Shed'][3].scale.z = scale;
        }

        else if (this.style == 'quaker'){

            this.toggleQuakerOverhangObject(overhang);
        }

    }

    this.toggleQuakerOverhangObject = function(overhang){
        if (this.overhangObject){
            this.helper.removeMeshes(this.overhangObject);
            SCENE.remove(this.overhangObject);
            this.overhangObject = null;
            this.helper.removeMeshes(this.overhangObject2);
            SCENE.remove(this.overhangObject2);
            this.overhangObject2 = null;
        }

        var length = parseInt(this.size.split('x')[1]);
        var width = parseInt(this.size.split('x')[0]);

        if (overhang){
            for (var i=0; i<4; i++){
                this.shed.childDict['Roof'][i].visible = false;
            }

            var name1 = 'overhang';
            var name2 = 'overhang2';
            if (width == 10){
                name1 = 'overhang_10_1';
                name2 = 'overhang_10_2';
            } else if (width == 12){
                name1 = 'overhang_12_1';
                name2 = 'overhang_12_2';
            }

            this.overhangObject = copyObject(OBJECTS[name1]);
            this.overhangObject.position.copy(OBJECTS[name1].offset);
            SCENE.add(this.overhangObject);

            this.overhangObject2 = copyObject(OBJECTS[name2]);
            this.overhangObject2.position.copy(OBJECTS[name2].offset);
            SCENE.add(this.overhangObject2);

            var textDict = {
                'Shed': this.sidingType,
                'Sides': 'trim',
            }
            this.helper.updateChildMaterials(textDict, this.overhangObject);
            this.helper.updateChildMaterials(textDict, this.overhangObject2);

            var pos = new THREE.Vector3(0,0,0).copy(OBJECTS['overhang'].offset);
            var roof = [0,0,0];//SHEDOBJECTSMAP[this.style]['roofCenter'];

            var position = new THREE.Vector3(pos.x + roof[0] - length*1.54, pos.y + roof[1], pos.z + roof[2]);
            var position2 = new THREE.Vector3(pos.x + roof[0] + length*1.54, pos.y + roof[1], pos.z + roof[2]);

            this.shed.childDict['Roof'][4].scale.x = QUAKER_OVERHANG_SCALES_X[length];
            this.shed.childDict['Roof'][5].scale.x = QUAKER_OVERHANG_SCALES_X[length];
            this.shed.childDict['Roof'][4].material.map.repeat.x = (8 /15) * (QUAKER_OVERHANG_SCALES_X[length] / 10);

            //this.overhangObject.scale.z = QUAKER_OVERHANG_SCALES_Z[width];
            //this.overhangObject2.scale.z = QUAKER_OVERHANG_SCALES_Z[width];

            this.overhangObject.position.copy(position);
            this.overhangObject2.position.copy(position2);


        } else {
            for (var i=0; i<4; i++){
                this.shed.childDict['Roof'][i].visible = true;
            }

            this.shed.childDict['Roof'][4].scale.x = 10;
            this.shed.childDict['Roof'][5].scale.x = 10;
            this.shed.childDict['Roof'][4].material.map.repeat.x = (8 /15);
        }

    }

}


function fixPlacedObjects(){
    var ray = new THREE.Raycaster( new THREE.Vector3(100,5,0), new THREE.Vector3( -1, 0, 0 ), 0, 150 );

    var front = getShedPoint(ray, new THREE.Vector3(100,5,0), new THREE.Vector3( -1, 0, 0 ), 'x');
    var back = getShedPoint(ray, new THREE.Vector3(-100,5,0), new THREE.Vector3( 1, 0, 0 ), 'x');
    var left = getShedPoint(ray, new THREE.Vector3(0,5,100), new THREE.Vector3( 0, 0, -1 ), 'z');
    var right = getShedPoint(ray, new THREE.Vector3(0,5,-100), new THREE.Vector3( 0, 0, 1 ), 'z');
    var shedPoints = [
        front,
        back,
        left,
        right
    ];

    for (var i in WINDOWS){
        var window = WINDOWS[i];
        findObjectSide(window, window.object, shedPoints);
        window.createBoundingBox();
    }

    for (var i in DOORS){
        var door = DOORS[i];
        findObjectSide(door, door.object, shedPoints);
        door.createBoundingBox();

        if (door.hinges){
            door.hinges.position.copy(door.object.position);
            door.hinges.quaternion.copy(door.object.quaternion);
        }
    }

    for (var i in GARAGEDOORS){
        var door = GARAGEDOORS[i];
        findObjectSide(door, door.object, shedPoints);
        door.createBoundingBox();
    }
}

function getShedPoint(ray, origin, dest, cord){
    ray.set(origin, dest);
    var intersect = ray.intersectObjects(HOUSE.shed.children, true);
    var p = intersect[0]['point'];

    var offset = intersect[0]['face']['normal'];
    offset.multiplyScalar(.25);
    p.add(offset);

    return p[cord];
}

function removeMisplacedObjects(){
    var windows_to_remove = [];
    for (var i in WINDOWS){
        var object = WINDOWS[i];
        var door_hits = 0;

        for (var j in DOORS){
            if (DOORS[j].bbox.intersectsBox(object.bbox)){
                door_hits += 1;
            }
        }

        if (door_hits > 0){
            windows_to_remove.unshift(i);
        }
    }

    for (var i in windows_to_remove){
        WINDOWS[windows_to_remove[i]].remove();
    }

    var doors_to_remove = [];
    for (var i in DOORS){

    }

    for (var i in doors_to_remove){
        DOORS[doors_to_remove[i]].remove();
    }
}