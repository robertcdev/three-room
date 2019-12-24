
var OBJECTS = [];
var OBJECTCOUNT = 0;
var OBJECTLOADED = false;

var OBJECTDATA = [
    {
        'name': 'window_with_shutters',
        'filename': 'window/window_with_shutters',
        'scale': {x:.085, y:.11, z:.11},
        'repeat': {x:10, y:10},
        'potScale': {x:.6, y:.6, z:.6},
        'potPosition': {x:0, y:0, z:0},
    },
    {
        'name': 'window_with_shutters_large',
        'filename': 'window/window_with_shutters_large',
        'scale': {x:.085, y:.11, z:.11},
        'repeat': {x:10, y:10},
        'potScale': {x:.9, y:.9, z:.9},
        'potPosition': {x:.3, y:-2.05, z:.1},
    },
    {
        'name': 'window_with_shutters_6',
        'filename': 'window/window_with_shutters_6',
        'scale': {x:.085, y:.11, z:.11},
        'repeat': {x:10, y:10},
        'potScale': {x:.6, y:.6, z:.6},
        'potPosition': {x:0, y:0, z:0},
    },
    {
        'name': 'window_with_shutters_large_6',
        'filename': 'window/window_with_shutters_large_6',
        'scale': {x:.085, y:.11, z:.11},
        'repeat': {x:10, y:10},
        'potScale': {x:.9, y:.9, z:.9},
        'potPosition': {x:.3, y:-2.05, z:.1},
    },
    {
        'name': 'window_with_shutters_30_36_6panel',
        'filename': 'window/window_with_shutters_30_36_6panel',
        'scale': {x:.085, y:.11, z:.11},
        'repeat': {x:10, y:10},
        'potScale': {x:.9, y:.9, z:.9},
        'potPosition': {x:.3, y:-2.05, z:.1},
    },

    {
        'name': 'Flower_Pot',
        'filename': 'flowerpot/Flower_Pot',
        'scale': {x:5, y:5, z:5},
        'repeat': {x:10, y:10},
    },

    {
        'name': 'Acorn Hinge Line Up Small',
        'filename': 'hinge/Hinge_WEH - Acorn Hinge Line Up Small',
        'scale': {x:10, y:10, z:10},
        'repeat': {x:1, y:1},
        'castShadow': false,
    },
    {
        'name': 'Acorn Hinge Line Up',
        'filename': 'hinge/Hinge_WEH - Acorn Hinge Line Up',
        'scale': {x:10, y:10, z:10},
        'repeat': {x:1, y:1},
        'castShadow': false,
    },
    {
        'name': 'Decorative 1T-Hinge',
        'filename': 'hinge/Hinge_WEH - Decorative 1T-Hinge',
        'scale': {x:10, y:10, z:10},
        'repeat': {x:1, y:1},
        'castShadow': false,
    },

    {
        'name': '4x4',
        'filename': 'ramp/Ramp_4x4',
        'scale': {x:10, y:10, z:10},
        'repeat': {x:1, y:1}
    },
    {
        'name': '4x5',
        'filename': 'ramp/Ramp_4x5',
        'scale': {x:10, y:10, z:10},
        'repeat': {x:1, y:1}
    },
    {
        'name': '4x6',
        'filename': 'ramp/Ramp_4x6',
        'scale': {x:10, y:10, z:10},
        'repeat': {x:1, y:1}
    },
    {
        'name': '4x9',
        'filename': 'ramp/Ramp_4x9',
        'scale': {x:10, y:10, z:10},
        'repeat': {x:1, y:1}
    },

    {
        'name': 'Gulfport',
        'filename': 'cupola/Cupola_18 inch Gulfport',
        'scale': {x:10, y:10, z:10},
        'repeat': {x:1, y:1}
    },
    {
        'name': 'Monterey',
        'filename': 'cupola/Cupola_18 inch Monterey',
        'scale': {x:10, y:10, z:10},
        'repeat': {x:1, y:1}
    },

    {
        'name': 'gable',
        'filename': 'vents/Gable_Vent',
        'scale': {x:10, y:10, z:10},
        'repeat': {x:1, y:1}
    },
    {
        'name': 'ridge',
        'filename': 'vents/RIDGE VENT',
        'scale': {x:10, y:10, z:10},
        'repeat': {x:1, y:1}
    },


    {
        'name': 'Three_Panel_Door',
        'filename': 'door/Three_Panel_Door',
        'scale': {x:1.08, y:1.08, z:1.08},
        'repeat': {x:1, y:1},
        'offset': new THREE.Vector3(3.8, 0, 0),
        'hingeOffset': [
            new THREE.Vector3(3.8, -.4, 0),
            new THREE.Vector3(3.8, -.4, 0),
            new THREE.Vector3(3.8, -.4, 0),
        ],
    },
    {
        'name': '3 ft smartside door',
        'filename': 'door/3 ft smartside door',
        'scale': {x:9.5, y:9.5, z:9.5},
        'repeat': {x:1, y:1},
        'offset': new THREE.Vector3(3.8, .5, -.245),
        'hingeOffset': [
            new THREE.Vector3(3, -.2, 0),
            new THREE.Vector3(3, .54, 0),
            new THREE.Vector3(3, -.2, 0),
        ],
    },

    {
        'name': 'Six_Panel_Door',
        'filename': 'door/Six_Panel_Door',
        'scale': {x:1.08, y:1.08, z:1.08},
        'repeat': {x:1, y:1},
        'offset': new THREE.Vector3(0, .5, 0),
        'hingeOffset': [
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(0, 0, 0),
        ],
    },
    {
        'name': '6 ft smartside door',
        'filename': 'door/6 ft smartside door',
        'scale': {x:9.5, y:9.5, z:9.5},
        'repeat': {x:1, y:1},
        'offset': new THREE.Vector3(0, .5, -.245),
        'hingeOffset': [
            new THREE.Vector3(-.825, -.2, 0),
            new THREE.Vector3(-.825, .54, 0),
            new THREE.Vector3(-.825, -.2, 0),
            new THREE.Vector3(.825, -.2, 0),
            new THREE.Vector3(.825, .54, 0),
            new THREE.Vector3(.825, -.2, 0),
        ],
    },
    {
        'name': 'Fiberglass_Prehung_36_Glass',
        'filename': 'door/Fiberglass_Prehung_36_Glass',
        'scale': {x:8.5, y:8.5, z:8.5},
        'repeat': {x:1, y:1},
        'offset': new THREE.Vector3(0, .3, .08),
        'hingeOffset': [
            new THREE.Vector3(3.975, -.5, -.21),
            new THREE.Vector3(3.975, -.5, -.21),
            new THREE.Vector3(3.975, -.5, -.21),
        ],
    },

    {
        'name': 'garage_9_7_no_window',
        'filename': 'door/garage_9_7_no_window',
        'scale': {x:10, y:10, z:10},
        'repeat': {x:1, y:1},
        'offset': new THREE.Vector3(0, .8, -.1),
        'hingeOffset': [
            new THREE.Vector3(3.975, 0, -.21),
            new THREE.Vector3(3.975, 0, -.21),
            new THREE.Vector3(3.975, 0, -.21),
        ],
    },
    {
        'name': 'Standard_Style_OBJ',
        'filename': 'door/Standard_Style_OBJ',
        'scale': {x:10, y:10, z:10},
        'repeat': {x:1, y:1},
        'offset': new THREE.Vector3(0, .8, -.1),
        'hingeOffset': [
            new THREE.Vector3(3.975, 0, -.21),
            new THREE.Vector3(3.975, 0, -.21),
            new THREE.Vector3(3.975, 0, -.21),
        ],
    },
    {
        'name': 'Carrige_Style_OBJ',
        'filename': 'door/Carrige_Style_OBJ',
        'scale': {x:10, y:10, z:10},
        'repeat': {x:1, y:1},
        'offset': new THREE.Vector3(0, .8, -.08),
        'hingeOffset': [
            new THREE.Vector3(3.975, 0, -.21),
            new THREE.Vector3(3.975, 0, -.21),
            new THREE.Vector3(3.975, 0, -.21),
        ],
    },

    {
        'name': 'overhang',
        'filename': 'overhang/Quaker Sheds_6in_Overhang_v001',
        'scale': {x:10, y:10, z:10},
        'repeat': {x:1, y:1},
        'offset': new THREE.Vector3(0, 0, .7),
    },
    {
        'name': 'overhang2',
        'filename': 'overhang/Quaker Sheds_6in_Overhang_v002',
        'scale': {x:10, y:10, z:10},
        'repeat': {x:1, y:1},
        'offset': new THREE.Vector3(0, 0, .7),
    },

    {
        'name': 'overhang_10_1',
        'filename': 'overhang/Quaker Sheds_6in_Overhang_10ft_1',
        'scale': {x:10, y:10, z:10},
        'repeat': {x:1, y:1},
        'offset': new THREE.Vector3(0, 0, .7),
    },
    {
        'name': 'overhang_10_2',
        'filename': 'overhang/Quaker Sheds_6in_Overhang_10ft_2',
        'scale': {x:10, y:10, z:10},
        'repeat': {x:1, y:1},
        'offset': new THREE.Vector3(0, 0, .7),
    },

    {
        'name': 'overhang_12_1',
        'filename': 'overhang/Quaker Sheds_6in_Overhang_12ft_1',
        'scale': {x:10, y:10, z:10},
        'repeat': {x:1, y:1},
        'offset': new THREE.Vector3(0, 0, .7),
    },
    {
        'name': 'overhang_12_2',
        'filename': 'overhang/Quaker Sheds_6in_Overhang_12ft_2',
        'scale': {x:10, y:10, z:10},
        'repeat': {x:1, y:1},
        'offset': new THREE.Vector3(0, 0, .7),
    },
];


function loadObjects(){
    var data = OBJECTDATA[OBJECTCOUNT];
    loadOBJModel(PATH, data['filename'], data, objectLoaded);
}

function objectLoaded( object ) {
    // do something with the texture
    var data = OBJECTDATA[OBJECTCOUNT];

    object.secretName = data['name'];
    if ('offset' in data){
        object.offset = data['offset'];
        object.hingeOffset = data['hingeOffset'];
    }

    OBJECTS[data['name']] = object;

    console.log(data['name'] + '.obj');

    OBJECTCOUNT += 1;
    if (OBJECTCOUNT < OBJECTDATA.length){
        var data = OBJECTDATA[OBJECTCOUNT];
        loadOBJModel(PATH, data['filename'], data, objectLoaded);
    } else {
        OBJECTLOADED = true;
    }
}


function loadOBJModel(path, name, data, callback){
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setPath(path);
    mtlLoader.load(name + '.mtl', function (tempMaterials) {

        tempMaterials.preload();
        //materials.materials.default.map.magFilter = THREE.NearestFilter;
        //materials.materials.default.map.minFilter = THREE.LinearFilter;

        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(tempMaterials);
        objLoader.setPath(path);

        objLoader.load(name + '.obj', function (object) {
            object.childDict = createChildDict(object);

            setObjectProperties(object, name, data);

            console.log("Loaded: " + name);

            if (typeof(callback) != 'undefined'){
                callback(object);
            }


        });

    });
}

function setObjectProperties(object, name, data){
    object.name = name;
    var scale = data['scale'];
    var repeat = data['repeat'];

    castShadow = true; //default is false
    if ('castShadow' in data && !(data['castShadow'])){
        castShadow = false;
    }
    object.castShadow = castShadow;
    object.receiveShadow = true; //default

    if ('potScale' in data){
        object.potScale = data['potScale'];
        object.potPosition = data['potPosition'];
    }

    for (var i = 0; i < object.children.length; i++){
        var child = object.children[i];
        child.castShadow = castShadow;
		child.receiveShadow = true;

		child.scale.set(scale.x, scale.y, scale.z);

        if (typeof(child.material.length) == "undefined"){
            mat = child.material;
            mat.side = THREE.DoubleSide;
            mat.shadowSide = THREE.DoubleSide;
            if (mat.map){
                mat.map.repeat.x = repeat.x;
                mat.map.repeat.y = repeat.y;
            }

            //MATERIALS.push(mat);
        } else {
            for (var j in child.material){
                mat = child.material[j];
                mat.side = THREE.DoubleSide;
                mat.shadowSide = THREE.DoubleSide;
                if (mat.map){
                    mat.map.repeat.x = repeat.x;
                    mat.map.repeat.y = repeat.y;
                }
                //MATERIALS.push(mat);
            }
        }
    }
}

this.createChildDict = function(object){
    var childDict = {};

    for (var i in object.children){
        var childName = object.children[i].name.split('.')[0].split('_')[0];
        if (!(childName in childDict)){
            childDict[childName] = [];
        }
        childDict[childName].push(object.children[i]);
        //childDict[childName] = object.children[i];
    }

    return childDict;
}


function deleteObject(){
    if (typeof(CONTEXTOBJECT) != 'undefined'){
        CONTEXTOBJECT.remove();
        CONTEXTOBJECT = undefined;
    }
}

function copyObject(object){
    var newObject = object.clone();

    newObject.secretName = object.secretName;
    newObject.childDict = createChildDict(newObject);
    if (object.interior){
        newObject.interior = object.interior.clone();
    }

    return newObject;
}


function ThreeObject(){
    this.updateChildMaterials = function(mapping, object, vent){
        var groups = Object.keys(mapping);

        for (var i in groups){
            var group = groups[i];
            var tex = mapping[group];

            if (group in object.childDict){
                for (var j in object.childDict[group]){
                    var child = object.childDict[group][j];
                    var material = MATERIALS[tex];
                    if (vent){
                        material = MATERIALS[tex].clone();
                        var map = material.map.clone();

                        var length = parseInt(HOUSE.size.split('x')[1]);
                        map.repeat.x = (8/15) * 1.1 * (length/12);
                        map.needsUpdate = true;
                        material.map = map;
                    }

                    child.material = material;
                    child.material.side = THREE.DoubleSide;
                }
            }
        }
    }

    this.createBoundingBox = function(normal){
        //SCENE.remove(this.bboxHelp);
        this.bbox = new THREE.Box3().setFromObject(this.object);
        //this.bboxHelp = new THREE.BoxHelper( this.door, 0xff0000 );
        //SCENE.add(this.bboxHelp);

        this.points = this.helper.generateRearPoints(this.bbox, normal);
        this.center = this.helper.calculateObjectCenter(this.bbox, this.object.position);
    }

    this.calculateObjectCenter = function(bbox, position){
        var max = bbox.max.clone();
        var min = bbox.min.clone();

        var xdiff = (max.x + min.x - position.x)/2;
        var ydiff = (max.y + min.y - position.y)/2;
        var zdiff = (max.z + min.z - position.z)/2;

        var center = new THREE.Vector3(xdiff, 0, zdiff);
        return center;
    }

    this.generateRearPoints = function(bbox, normal){
        var points = [];
        var max = bbox.max.clone();
        var min = bbox.min.clone();

        var xdiff = max.x - min.x;
        var ydiff = max.y - min.y;
        var zdiff = max.z - min.z;

        if (!normal){
            normal = new THREE.Vector3(1,0,0);
        }

        normal = normal.normalize();
        //console.log(normal);

        normal = new THREE.Vector3(
            normal.x * xdiff * -2,
            normal.y * ydiff * -2,
            normal.z * zdiff * 2
        );
        max = max.add(normal);
        min = min.add(normal);

        if (xdiff < ydiff && xdiff < zdiff) {
            var x = (max.x + min.x)/2;
            max.z += 1;
            min.z -= 1;
            points.push(new THREE.Vector3(x, max.y, max.z));
            points.push(new THREE.Vector3(x, max.y, min.z));
            points.push(new THREE.Vector3(x, min.y, max.z));
            points.push(new THREE.Vector3(x, min.y, min.z));

        } else if (ydiff < xdiff && ydiff < zdiff) {
            var y = (max.y + min.y)/2;
            points.push(new THREE.Vector3(max.x, y, max.z));
            points.push(new THREE.Vector3(max.x, y, min.z));
            points.push(new THREE.Vector3(min.x, y, max.z));
            points.push(new THREE.Vector3(min.x, y, min.z));

        } else {
            var z = (max.z + min.z)/2;
            max.x += 1;
            min.x -= 1;
            points.push(new THREE.Vector3(max.x, max.y, z));
            points.push(new THREE.Vector3(min.x, max.y, z));
            points.push(new THREE.Vector3(max.x, min.y, z));
            points.push(new THREE.Vector3(min.x, min.y, z));
        }

        return points;
    }

    this.move = function(object, intersect, inset){
        var p = intersect[0]['point'];
        var offset = intersect[0]['face']['normal'];
        var normal = intersect[0].face.normal;

        offset.multiplyScalar(.25);
        p.add(offset);

        var height = object.position.y;
        if (object.jsParent instanceof Window && HOUSE.style == 'twostorygarage' || HOUSE.style == 'gambrel'){
            if (height < 25 && p.y > 25 && Math.abs(p.x) < SHEDOBJECTSMAP[HOUSE.style]['windowMax']){
                height = height*2.8;
            } else if (height > 25 && p.y < 25){
                height = height/2.8;
            } else if (height > 25 && Math.abs(p.x) > SHEDOBJECTSMAP[HOUSE.style]['windowMax']) {
                height = height/2.8;
            }
        }


        var newPos = new THREE.Vector3(p.x, height, p.z);
        var reduce = normal.multiplyScalar(inset);
        newPos = newPos.sub(reduce);
        object.position.set(newPos.x, newPos.y, newPos.z);

        //normal.x = normal.x * -1;
        normal.z = normal.z * -1;
        var up = new THREE.Vector3( 0, 0, -1 );
        object.quaternion.setFromUnitVectors(normal.clone().normalize(), up);
    }

    this.checkCollisions = function(currentPos, currentRot, intersect){
        var hits = 0;
        for (var i in WINDOWS){
            var window = WINDOWS[i];
            if (window != this){
                var compare = window.bbox;
                if (this.bbox.intersectsBox(compare)){
                    hits -= 4;
                }
            }
        }

        for (var i in DOORS){
            var door = DOORS[i];
            if (door != this){
                var compare = door.bbox;
                if (this.bbox.intersectsBox(compare)){
                    hits -= 4;
                }
            }
        }

        for (var i in GARAGEDOORS){
            var door = GARAGEDOORS[i];
            if (door != this){
                var compare = door.bbox;
                if (this.bbox.intersectsBox(compare)){
                    hits -= 4;
                }
            }
        }

        for (var i in this.points){
            var point = this.points[i];
            if (HOUSE.bbox.containsPoint(point)){
                hits += 1;
            }
        }

        if (hits < 4){
            this.object.position.set(currentPos.x, currentPos.y, currentPos.z);
            this.object.quaternion.copy(currentRot);
            this.createBoundingBox(intersect[0].face.normal);
        }
    }

    this.removeMeshes = function(object){
        var newMeshes = [];
        for (var j in MESHES){
            var found = false;
            for (var i in object.children){
                if (MESHES[j] == object.children[i]){
                    found = true;
                }
            }

            if (!found){
                newMeshes.push(MESHES[j]);
            }
        }
        MESHES = newMeshes;
    }

    this.positionContext = function(){
        var position = mouseToPixels(mouse);
        openCover();
        if (MOBILE){
            $('.contextcover .cover-inner').css('top', '0px');
            $('.contextcover .cover-inner').css('left', '0px');
        } else {
            $('.contextcover .cover-inner').css('top', position.y + 'px');
            $('.contextcover .cover-inner').css('left', (position.x + 100) + 'px');

            setTimeout(function(){
                var height = $('.contextcover .cover-inner').outerHeight();
                if (position.y + height > window.innerHeight){
                    $('.contextcover .cover-inner').css('top', (window.innerHeight - height) + 'px');
                }
            }, 20);
        }
    }
}



function findObjectSide(objClass, object, points){
    var deltaX = Math.round(((objClass.points[0].x + objClass.points[1].x + objClass.points[2].x) / 3) * 100);
    var deltaZ = Math.round(((objClass.points[0].z + objClass.points[1].z + objClass.points[2].z) / 3) * 100);

    if (deltaX == Math.round(objClass.points[0].x * 100)) {
        if (objClass.points[0].x > 0) {
            object.position.x = points[0];
        } else {
            object.position.x = points[1];
        }
    } else if (deltaZ == Math.round(objClass.points[0].z * 100)) {
        if (objClass.points[0].z > 0) {
            object.position.z = points[2];
        } else {
            object.position.z = points[3];
        }
    }
}


