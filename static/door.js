function setupDoors(){
    var doorData = SHEDOBJECTSMAP[HOUSE.style];

    for (var i in doorData['doors']['positions']){
        var pos_data = doorData['doors']['positions'][i];
        var pos = new THREE.Vector3(pos_data.x, pos_data.y, pos_data.z);
        var rotate = doorData['doors']['rotate'][i];

        if (doorData['isGarage'][i]){
            var door = new Door();
            door.name = 'garage_9_7_no_window';
            door.longName = 'Garage 9x7 Steel';
            door.hingeName = '';
            door.isGarage = true;
            door.setDoor(door.name);
            GARAGEDOORS.push(door);

        } else {
            var door = new Door();
            door.create();

            if (doorData['doors']['names']){
                door.name = doorData['doors']['names'][i]['name'];
                door.longName = doorData['doors']['names'][i]['longName'];
                door.setDoor(door.name);
            }

            DOORS.push(door);
        }

        console.log(door.bbox, door.object.position);
        door.object.rotateY(rotate);
        door.createBoundingBox();

        pos.sub(door.center);
        door.object.position.copy(pos);

        if (door.hinges){
            door.hinges.position.set(pos.x + .03, pos.y, pos.z);
            door.hinges.rotateY(rotate);
        }
    }

     setTimeout(function(){
        for (var i in DOORS){
            DOORS[i].createBoundingBox();
            console.log(DOORS[i].bbox, DOORS[i].object.position);
        }

        for (var i in GARAGEDOORS){
            GARAGEDOORS[i].createBoundingBox();
        }

        checkGarageDoors();
    }, 100);
}

function createDoor(){
    var door = new Door();
    door.create();
    DOORS.push(door);
    PLACEMENTOBJECT = door.object;
    PLACEMENTOBJECT.visible = false;
    PLACEMENTOBJECT.jsParent.hinges.visible = false;
    $('.viewer').css('cursor', 'crosshair');

    calculateTotal();
}

function createGarageDoor(){
    var door = new Door();
    door.name = 'garage_9_7_no_window';
    door.hingeName = '';
    door.isGarage = true;
    door.setDoor(door.name);

    GARAGEDOORS.push(door);
    PLACEMENTOBJECT = door.object;
    PLACEMENTOBJECT.visible = false;
    $('.viewer').css('cursor', 'crosshair');

    calculateTotal();
}

function checkDoorSizes(){
    if (HOUSE.style == 'minibarnsheds'){
        var width = parseInt(HOUSE.size.split('x')[0]);
        if (width == '8'){
            var ratio = 4/6;
        } else if (width == '10'){
            var ratio = 5/6;
        } else {
            var ratio = 1;
        }

        MATERIALS['woodsidingdoor'].map.repeat.x = (4/3) * ratio;

        for (var i in DOORS){
            var door = DOORS[i];

            if (door.name.indexOf('smartside') > -1){
                door.object.scale.set(ratio, 1, 1);
                door.hinges.scale.set(ratio, 1, 1);
            }
        }
    } else {
        MATERIALS['woodsidingdoor'].map.repeat.x = (4/3);
    }
}


function Door(){
    this.helper = new ThreeObject();
    this.createBoundingBox = this.helper.createBoundingBox.bind(this);
    this.checkCollisions = this.helper.checkCollisions.bind(this);
    this.object;

    this.create = function (){
        this.name = 'Six_Panel_Door';
        this.longName = 'Double Fiberglass Slabs';
        this.hingeName = 'Decorative 1T-Hinge';
        this.rampName = 'none';
        this.setDoor(this.name);
    }

    this.setDoor = function (name){
        this.name = name;
        var object = copyObject(OBJECTS[name]);

        var currentPos = new THREE.Vector3(0,0.7,0);
        var currentRot = null;
        if (typeof(this.object) != 'undefined'){
            SCENE.remove(this.object);
            currentPos = this.object.position.clone();
            currentRot = this.object.quaternion.clone();
            this.helper.removeMeshes(this.object);
        }

        for (var i in object.children){
            var child = object.children[i];
            child.position.copy(OBJECTS[name].offset);
        }

        this.object = object;
        this.object.jsParent = this;
        this.object.position.set(currentPos.x, currentPos.y, currentPos.z);
        if (currentRot){
            this.object.quaternion.copy(currentRot);
        }

        this.applyTextures();
        SCENE.add(this.object);

        MESHES.push.apply(MESHES, this.object.children);

        this.setHinge(this.hingeName);
        this.createBoundingBox();

        if (this.name == "Fiberglass_Prehung_36_Glass"){
            $('.door-context .ramp-options').hide();
        } else {
            $('.door-context .ramp-options').show();
        }

        checkDoorSizes();
        calculateTotal();
        removeMisplacedObjects();
    }

    this.setHinge = function(name){
        this.hingeName = name;

        if (name == ''){
            return false;
        }

        if (typeof(this.hinges) != 'undefined'){
            SCENE.remove(this.hinges);
        }

        this.hinges = new THREE.Group();
        for (var i=0; i<6; i++){
            if (i >= OBJECTS[this.name]['hingeOffset'].length){
                break;
            }

            var hinge = copyObject(OBJECTS[name]);
            hinge.children[0].material = MATERIALS['black'];

            var position = HINGEMAP[name]['positions'][i].clone();
            position.add(OBJECTS[this.name]['hingeOffset'][i]);

            var rotation = HINGEMAP[name]['rotations'][i];

            hinge.position.copy(position);
            hinge.rotateX(rotation[0]);
            hinge.rotateY(rotation[1]);
            hinge.rotateZ(rotation[2]);
            this.hinges.add(hinge);
        }
        this.hinges.position.copy(this.object.position);
        this.hinges.quaternion.copy(this.object.quaternion);
        SCENE.add(this.hinges);
    }

    this.setRamp = function(name){
        this.rampName = name;

        if (typeof(this.ramp) != 'undefined'){
            SCENE.remove(this.ramp);
        }

        if (OBJECTS[name]){
            this.ramp = new THREE.Group();
            var ramp = copyObject(OBJECTS[name]);
            ramp.children[0].material = MATERIALS['wood_woodiest'];
            var position = RAMPMAP[name]['positions'][0];
            var rotation = RAMPMAP[name]['rotations'][0];

            ramp.position.set(position[0], position[1], position[2]);
            ramp.rotateX(rotation[0]);
            ramp.rotateY(rotation[1]);
            ramp.rotateZ(rotation[2]);

            this.ramp.add(ramp);
            this.ramp.position.copy(this.object.position);
            this.ramp.quaternion.copy(this.object.quaternion);
            SCENE.add(this.ramp);
        }

        calculateTotal();
    }

    this.changeColor = function (value){
        this.object.childDict['Door'][0].material.color.set('#' + value);
    }

    this.applyTextures = function (){
        var textDict = DOORTEXTUREMAP[this.name];

        this.helper.updateChildMaterials(textDict, this.object);
    }

    this.move = function(intersect){
        var hit = false;
        var currentPos = this.object.position.clone();
        var currentRot = this.object.quaternion.clone();

        this.helper.move(this.object, intersect, .1);
        this.createBoundingBox(intersect[0].face.normal);
        this.checkCollisions(currentPos, currentRot, intersect);

        var position = this.object.position
        if (this.hinges){
            this.hinges.position.copy(position);
            this.hinges.quaternion.copy(this.object.quaternion);
        }

        if (this.ramp){
            this.ramp.position.copy(position);
            this.ramp.quaternion.copy(this.object.quaternion);
        }
    }

    this.showContext = function(mouse) {
        this.helper.positionContext();

        $('.window-context').hide();

        if (this.isGarage){
            $('.garage-door-context').show();
            $('.door-context').hide();
        } else {
            $('.garage-door-context').hide();
            $('.door-context').show();
        }


        $('.door-context .ramp-options').show();
        if (this.name == "Fiberglass_Prehung_36_Glass"){
            $('.door-context .ramp-options').hide();
        }

        // Set current options as active radio button
        var inputs = $('.door-context input[type=radio][name=doorType][value="'+ this.name +'"]').toArray();
        for (var i in inputs){
            var input = $(inputs[i]);
            var text = input.parent().text().trim();
            if (text == this.longName){
                input.prop('checked','checked');
            }
        }

        $('.door-context input[type=radio][name=hingeType]').prop('checked',false);
        $('.door-context input[type=radio][name=rampType][value=none').prop('checked','checked');
        $('.door-context input[type=radio][name=diamond][value=0]').prop('checked','checked');

        $('.door-context input[type=radio][name=hingeType][value="'+ this.hingeName +'"]').prop('checked','checked');
        $('.door-context input[type=radio][name=rampType][value="'+ this.rampName +'"]').prop('checked','checked');
        $('.door-context input[type=radio][name=diamond][value="'+ this.diamond +'"]').prop('checked','checked');
    }

    this.remove = function(){
        this.helper.removeMeshes(this.object);
        SCENE.remove(this.object);
        SCENE.remove(this.hinges);
        if (this.ramp){
            SCENE.remove(this.ramp);
        }

        if (this.isGarage){
            var newGarageDoors = [];
            for (var i in GARAGEDOORS){
                if (GARAGEDOORS[i] != this){
                    newGarageDoors.push(GARAGEDOORS[i]);
                }
            }

            GARAGEDOORS = newGarageDoors;
        } else {
            var newDoors = [];
            for (var i in DOORS){
                if (DOORS[i] != this){
                    newDoors.push(DOORS[i]);
                }
            }

            DOORS = newDoors;
        }

        checkGarageDoors();

        closeCover();
        calculateTotal();
    }
}

function checkGarageDoors(){
    if (GARAGEDOORS.length > 0){
        $('.garagedoorColors').show();
    } else {
        $('.garagedoorColors').hide();
    }

}