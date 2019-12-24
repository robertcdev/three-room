var WINDOW_SHUTTERS = true;

var FLOWERMAP = {
    'Flower_Pot': {
        'window_with_shutters': {
            'positions': [new THREE.Vector3(0,-3.9,0.2)],
            'rotations': [[0,0,0]],
        },
        'window_with_shutters_large': {
            'positions': [new THREE.Vector3(0,-4.4,0.2)],
            'rotations': [[0,0,0]],
        },
        'window_with_shutters_30_36_6panel': {
            'positions': [new THREE.Vector3(0,-4.4,0.2)],
            'rotations': [[0,0,0]],
        },
        'window_with_shutters_6': {
            'positions': [new THREE.Vector3(0,-3.9,0.2)],
            'rotations': [[0,0,0]],
        },
        'window_with_shutters_large_6': {
            'positions': [new THREE.Vector3(0,-4.4,0.2)],
            'rotations': [[0,0,0]],
        },
    }
}



var DEFAULT_WINDOW_TYPES = {
    'aframe': [
        'window_with_shutters',
        'window_with_shutters_6'
    ],
    'classic': [
        'window_with_shutters',
        'window_with_shutters_6',
        'window_with_shutters_large',
        'window_with_shutters_large_6'
    ],
    '7aframe': [
        'window_with_shutters',
        'window_with_shutters_6'
    ],
    'doublegarage': [
        'window_with_shutters',
        'window_with_shutters_6'
    ],
    'dutchbarn': [
        'window_with_shutters',
        'window_with_shutters_6',
        'window_with_shutters_large',
        'window_with_shutters_large_6'
    ],
    'elitegarage': [
        'window_with_shutters',
        'window_with_shutters_6'
    ],
    'highwallbarns': [
        'window_with_shutters',
        'window_with_shutters_6'
    ],
    'highwallgarage': [
        'window_with_shutters',
        'window_with_shutters_6'
    ],
    'minibarnsheds': [
        'window_with_shutters',
        'window_with_shutters_6'
    ],
    'quaker': [
        'window_with_shutters',
        'window_with_shutters_6'
    ],
    'singlegarage': [
        'window_with_shutters',
        'window_with_shutters_6'
    ],
    'twostorygarage': [
        'window_with_shutters',
        'window_with_shutters_6'
    ],
    'gambrel': [
        'window_with_shutters',
        'window_with_shutters_6'
    ],
    'victorian': [
        'window_with_shutters',
        'window_with_shutters_6',
        'window_with_shutters_large',
        'window_with_shutters_large_6'
    ],
}




function setupWindows(){
    if (!SHEDOBJECTSMAP[HOUSE.style]['windows']){
        return false;
    }

    var pos_data1 = SHEDOBJECTSMAP[HOUSE.style]['windows']['positions'][0];
    var pos_data2 = SHEDOBJECTSMAP[HOUSE.style]['windows']['positions'][1];

    var pos1 = new THREE.Vector3(pos_data1.x, pos_data1.y, pos_data1.z);
    var pos2 = new THREE.Vector3(pos_data2.x, pos_data2.y, pos_data2.z);
    var rotate = SHEDOBJECTSMAP[HOUSE.style]['windows']['rotate'][0];

    var width = 3 * parseInt(HOUSE.size.split('x')[0]) / 2;
    var length = 3 * parseInt(HOUSE.size.split('x')[1]) / 2;

    if (pos1.y < 40){
        if (HOUSE.style == 'victorian' || HOUSE.style == 'quaker'){
            var distance = length - (length - 8) / 2;
            pos1.x = distance + .1;
            pos2.x = -1 * distance - .1;
        } else if (pos1.z == 13.4){
            var distance = length - (length - 8) / 2
            pos1.z = distance + .1;
            pos2.z = -1 * distance - .1;
        } else {
            var distance = width - (width - 8) / 2;
            pos1.x = distance + .1;
            pos2.x = -1 * distance - .1;
        }

        if (distance < 13){
            return false;
        } else if (length <= 12 && HOUSE.style != 'victorian' && HOUSE.style != 'quaker'){
            return false;
        }
    }

    var window = new Window();
    window.create();

    var window2 = new Window();
    window2.create();

    window.object.rotateY(rotate);
    window.createBoundingBox();
    window2.object.rotateY(rotate);
    window2.createBoundingBox();

    pos1.sub(window.center);
    pos2.sub(window.center);
    window.object.position.copy(pos1);
    window2.object.position.copy(pos2);

    window.createBoundingBox();
    window2.createBoundingBox();

    WINDOWS.push(window);
    WINDOWS.push(window2);
}

function createWindow(){
    var window = new Window();
    window.create();
    window.object.position.set(0, 15, 0);
    WINDOWS.push(window);
    PLACEMENTOBJECT = window.object;
    PLACEMENTOBJECT.visible = false;
    $('.viewer').css('cursor', 'crosshair');

    calculateTotal();
}

function updateWindowOptions(){
    if (HOUSE.size == '10x12' || HOUSE.size == '10x10'){
        var inputs = $('.window-context input');
        for (var i=0;i<inputs.length;i++){
            if ($(inputs[i]).attr('value').indexOf('large') != -1){
                $(inputs[i]).closest('div').hide();
            }
        }
    } else {
        $('.window-context .form-check').show();
    }
}

function Window(){
    this.helper = new ThreeObject();
    this.createBoundingBox = this.helper.createBoundingBox.bind(this);
    this.checkCollisions = this.helper.checkCollisions.bind(this);
    this.object;

    this.create = function (){
        if (HOUSE.style && ['classic', 'dutchbarn', 'victorian'].indexOf(HOUSE.style) > -1){
            this.name = 'window_with_shutters_large';
            this.type = 'Aluminum Panes at 24"x36"';
        } else if (HOUSE.style && ['doublegarage', 'elitegarage', 'highwallgarage', 'singlegarage', 'twostorygarage', 'gambrel'].indexOf(HOUSE.style) > -1){
            this.name = 'window_with_shutters_30_36_6panel';
            this.type = 'Aluminum Panes at 30"x36"';
        } else {
            this.name = 'window_with_shutters';
            this.type = 'Aluminum Panes at 18"x24"';
        }

        this.flowerName = 'none';

        this.setWindow(copyObject(OBJECTS[this.name]));
    }

    this.toggleShutters = function (current){
        if (!(current)){
            this.shutters = false;
            this.object.childDict['ShutterPanes'][0].visible = false;
            this.object.childDict['ShutterEdge'][0].visible = false;
        } else {
            this.shutters = true;
            this.object.childDict['ShutterPanes'][0].visible = true;
            this.object.childDict['ShutterEdge'][0].visible = true;
        }
    }

    this.setWindow = function (object){
        var currentPos = new THREE.Vector3(0,0,0);
        var currentRot = null;
        if (typeof(this.object) != 'undefined'){
            SCENE.remove(this.object);
            currentPos = this.object.position.clone();
            currentRot = this.object.quaternion.clone();
            this.helper.removeMeshes(this.object);
        }

        this.name = object.secretName;
        this.object = object;
        this.object.jsParent = this;
        this.object.position.set(currentPos.x, currentPos.y, currentPos.z);
        if (currentRot){
            this.object.quaternion.copy(currentRot);
        }

        this.applyTextures();
        SCENE.add(this.object);
        MESHES.push.apply(MESHES, this.object.children);

        if (this.flowerName != ''){
            this.setFlower(this.flowerName);
        }

        this.toggleShutters(WINDOW_SHUTTERS);
        this.createBoundingBox();
        calculateTotal();
    }

    this.setFlower = function(name){
        if (typeof(this.flower) != 'undefined'){
            SCENE.remove(this.flower);
        }

        this.flowerName = name;

        if (OBJECTS[name]){
            this.flower = new THREE.Group();

            var flower = copyObject(OBJECTS[name]);
            flower.children[0].material = MATERIALS['whiteflower'];

            var data = FLOWERMAP[name][this.name];
            var position = data['positions'][0].clone();
            var rotation = data['rotations'][0];
            var scale = OBJECTS[this.name]['potScale'];
            position.add(OBJECTS[this.name]['potPosition']);

            flower.scale.set(scale.x, scale.y, scale.z);
            flower.position.copy(position);
            flower.rotateX(rotation[0]);
            flower.rotateY(rotation[1]);
            flower.rotateZ(rotation[2]);

            this.flower.add(flower);
            this.flower.position.copy(this.object.position);
            this.flower.quaternion.copy(this.object.quaternion);
            SCENE.add(this.flower);
        }

        calculateTotal();
    }

    this.applyTextures = function (){
        var textDict = {
            'Glass': 'black',
            'ShutterEdge': 'siding',
            'ShutterPanes': 'siding',
            'WindowFrame': 'whitewindow',
        }

        this.helper.updateChildMaterials(textDict, this.object);
    }

    this.changeColor = function (value){
        this.object.children[2].material.color.set('#' + value);
    }

    this.changeFlowerColor = function (value){
        MATERIALS['whiteflower'].color.set('#' + value);
    }


    this.move = function(intersect){
        var hit = false;
        var currentPos = this.object.position.clone();
        var currentRot = this.object.quaternion.clone();

        this.helper.move(this.object, intersect, 0.1);
        this.createBoundingBox(intersect[0].face.normal);

        this.checkCollisions(currentPos, currentRot, intersect);

        if (this.flower){
            this.flower.position.copy(this.object.position);
            this.flower.quaternion.copy(this.object.quaternion);
        }

    }

    this.showContext = function(mouse) {
        this.helper.positionContext();

        $('.door-context').hide();
        $('.garage-door-context').hide();
        $('.window-context').show();

        $('.window-context').find('input[type=radio][value='+ this.name +']').prop("checked", true);

        // Set current options as active radio button
        var inputs = $('.window-context input[type=radio][name=windowType][value="'+ this.name +'"]').toArray();
        for (var i in inputs){
            var input = $(inputs[i]);
            var text = input.parent().text().trim();
            if (text == this.type){
                input.prop('checked','checked');
            }
        }

        $('.window-context input[type=radio][name=flowerType][value=none').prop('checked','checked');
        $('.window-context input[type=radio][name=flowerType][value="'+ this.flowerName +'"]').prop('checked','checked');
    }

    this.remove = function(){
        this.helper.removeMeshes(this.object);
        SCENE.remove(this.object);
        if (this.flower){
            SCENE.remove(this.flower);
        }
        newWindows = [];
        for (var i in WINDOWS){
            if (WINDOWS[i] != this){
                newWindows.push(WINDOWS[i]);
            }
        }

        WINDOWS = newWindows;

        closeCover();
        calculateTotal();
    }
}