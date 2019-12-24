var TEXTURELOADED = false;
var MATERIALS = {};

var TEXTURES = [
    {
        'name': 'roofgrey',
        'image': 'Shingles_Go_Cambridge-Charcoal-Grey.jpg',
        'bump': 'Shingles_Go_Bump.jpg',
        'ao': 'Shingles_Go_AO.png',
        'repeat': [8, 10],
        'scale': [1, 1],
        'shininess': 30,
    },
    {
        'name': 'roofwood',
        'image': 'Shingles_Go_Cambridge-Driftwood.jpg',
        'bump': 'Shingles_Go_Bump.jpg',
        'ao': 'Shingles_Go_AO.png',
        'repeat': [8, 10],
        'scale': [1, 1],
        'shininess': 30,
    },
    {
        'name': 'roofblack',
        'image': 'Shingles_Go_Cambridge-Dual-Black.jpg',
        'bump': 'Shingles_Go_Bump.jpg',
        'ao': 'Shingles_Go_AO.png',
        'repeat': [8, 10],
        'scale': [1, 1],
        'shininess': 30,
    },
    {
        'name': 'roofbrown',
        'image': 'Shingles_Go_Cambridge-Dual-Brown.jpg',
        'bump': 'Shingles_Go_Bump.jpg',
        'ao': 'Shingles_Go_AO.png',
        'repeat': [8, 10],
        'scale': [1, 1],
        'shininess': 30,
    },
    {
        'name': 'roofcedar',
        'image': 'Shingles_Go_Cambridge-Earthtone-Cedar.jpg',
        'bump': 'Shingles_Go_Bump.jpg',
        'ao': 'Shingles_Go_AO.png',
        'repeat': [8, 10],
        'scale': [1, 1],
        'shininess': 30,
    },


    {
        'name': 'wall',
        'image': 'Wall_Siding_001_COLOR.jpg',
        'bump': 'Wall_Siding_001_Bump.png',
        'bumpT': false,
        'repeat': [8, 8],
        'scale': [.1, .1],
    },
    {
        'name': 'wood',
        'image': 'wood_13.jpg',
        'norm': 'wood_13n.jpg',
        'bump': 'wood_13b.jpg',
        'repeat': [20, 20],
        'scale': [.1, .1],
    },

    {
        'name': 'wood_woodiest',
        'image': 'wood_08.jpg',
        'bump': 'wood_08b.jpg',
        'repeat': [8, 8],
        'scale': [.1, .1],
    },

    {
        'name': 'woodsiding',
        'image': 'wood17.jpg',
        'bump': 'wood17b.jpg',
        'repeat': [10, 10],
        'scale': [.1, .1],
        'bumpScale': .08,
    },

    {
        'name': 'woodsidingdoor',
        'image': 'wood17.jpg',
        'bump': 'wood17b.jpg',
        'repeat': [20, 20],
        'scale': [.1, .1],
        'bumpScale': .08,
    },

    {
        'name': 'grass',
        'image': 'Grass_001_COLOR.jpg',
        'norm': 'Grass_001_NORM.jpg',
        'repeat': [1500, 1500],
        'scale': [.2, .2],
    },
    {
        'name': 'siding',
        'image': 'siding_fffef9.jpg',
        'repeat': [15, 15],
        'scale': [.1, .1],
    },
    {
        'name': 'trim',
        'image': 'siding_fffef9.jpg',
        'repeat': [15, 15],
        'scale': [.1, .1],
    },
    {
        'name': 'whitewindow',
        'image': 'siding_fffef9.jpg',
        'repeat': [15, 15],
        'scale': [.1, .1],
    },
    {
        'name': 'whiteflower',
        'image': 'siding_fffef9.jpg',
        'repeat': [15, 15],
        'scale': [.1, .1],
        'side': THREE.DoubleSide,
    },
    {
        'name': 'whitedoor',
        'image': 'Wall_Siding_001_COLOR.jpg',
        'norm': 'wood_13n.jpg',
        'bump': 'wood_13b.jpg',
        'repeat': [20, 20],
        'scale': [.1, .1],
    },
    {
        'name': 'whitegaragedoor',
        'image': 'Wall_Siding_001_COLOR.jpg',
        'norm': 'wood_13n.jpg',
        'bump': 'wood_13b.jpg',
        'repeat': [20, 20],
        'scale': [.1, .1],
    },
    {
        'name': 'black',
        'image': 'black_color.jpg',
        'repeat': [15, 15],
        'scale': [.1, .1],
    },
    {
        'name': 'blackmetal',
        'image': 'black_metal.jpg',
        'repeat': [15, 15],
        'scale': [.1, .1],
        'shininess': 80,
    },
    {
        'name': 'white',
        'image': 'siding_fffef9.jpg',
        'repeat': [15, 15],
        'scale': [.1, .1],
    },
]


var SIDINGS = [
    {
        'name': 'e1dcbf',
        'image': 'siding_e1dcbf.jpg',
        'repeat': [1, 1],
        'scale': [.1, .1],
    },
    {
        'name': 'a2bfcd',
        'image': 'siding_a2bfcd.jpg',
        'repeat': [1, 1],
        'scale': [.1, .1],
    },
    {
        'name': 'b0ab98',
        'image': 'siding_b0ab98.jpg',
        'repeat': [1, 1],
        'scale': [.1, .1],
    },
    {
        'name': 'f6f0cc',
        'image': 'siding_f6f0cc.jpg',
        'repeat': [1, 1],
        'scale': [.1, .1],
    },
    {
        'name': 'adaeb2',
        'image': 'siding_adaeb2.jpg',
        'repeat': [1, 1],
        'scale': [.1, .1],
    },
    {
        'name': 'dad5ca',
        'image': 'siding_dad5ca.jpg',
        'repeat': [1, 1],
        'scale': [.1, .1],
    },
    {
        'name': 'bcc1aa',
        'image': 'siding_bcc1aa.jpg',
        'repeat': [1, 1],
        'scale': [.1, .1],
    },
    {
        'name': 'f0ebd7',
        'image': 'siding_f0ebd7.jpg',
        'repeat': [1, 1],
        'scale': [.1, .1],
    },
    {
        'name': 'fffef9',
        'image': 'siding_fffef9.jpg',
        'repeat': [1, 1],
        'scale': [.1, .1],
    },
]


TEXTURECOUNT = 0;
function loadTextures(){
    TEXTURELOADER.load('static/materials/' + TEXTURES[TEXTURECOUNT]['image'], textureLoaded);
}
function textureLoaded( texture ) {
    // do something with the texture
    var textureData = TEXTURES[TEXTURECOUNT];
    var material = new THREE.MeshPhongMaterial({
        map: texture,
     });
    material.secretName = textureData['name'];

    if (material.map){
        material.map.repeat.x = textureData['repeat'][0]/15;
        material.map.repeat.y = textureData['repeat'][1]/15;
        material.map.wrapT = THREE.RepeatWrapping;
        material.map.wrapS = THREE.RepeatWrapping;
    }
    if ('shininess' in textureData){
        material.shininess = textureData['shininess'];
    }
    if ('side' in textureData){
        material.side = textureData['side'];
    }


    MATERIALS[textureData['name']] = material;

    console.log('static/materials/' + textureData['image']);
    var context = {'texture': textureData, 'material': material};

    if ('norm' in textureData){
        TEXTURELOADER.load('static/materials/' + textureData['norm'], normTextureLoaded.bind(context));
    }

    if ('bump' in textureData) {
        TEXTURELOADER.load('static/materials/' + textureData['bump'], bumpTextureLoaded.bind(context));
    }

    if ('ao' in textureData){
        TEXTURELOADER.load('static/materials/' + textureData['ao'], aoTextureLoaded.bind(context));
    }

    if ('disp' in textureData){
        TEXTURELOADER.load('static/materials/' + textureData['disp'], dispTextureLoaded.bind(context));
    }


    TEXTURECOUNT += 1;
    if (TEXTURECOUNT < TEXTURES.length){
        TEXTURELOADER.load('static/materials/' + TEXTURES[TEXTURECOUNT]['image'], textureLoaded);
    } else {
        TEXTURELOADED = true;
    }
}


function normTextureLoaded( texture ){
    var textureData = this.texture;
    var material = this.material;
    console.log('static/materials/' + textureData['norm']);

    material.normalMap = texture;
    material.normalMap.repeat.set(textureData['repeat'][0]/15, textureData['repeat'][1]/15);
    material.normalMap.wrapT = THREE.RepeatWrapping;
    material.normalMap.wrapS = THREE.RepeatWrapping;

    material.normalScale.set(textureData['scale'][0], textureData['scale'][1]);
}


function bumpTextureLoaded( texture ){
    var textureData = this.texture;
    var material = this.material;
    console.log('static/materials/' + textureData['bump']);

    material.bumpMap = texture;
    material.bumpMap.repeat.set(textureData['repeat'][0]/15, textureData['repeat'][1]/15);
    material.bumpMap.wrapT = THREE.RepeatWrapping;
    material.bumpMap.wrapS = THREE.RepeatWrapping;
    material.bumpScale = .2;
    if ('bumpScale' in textureData){
        material.bumpScale = textureData['bumpScale'];
    }

}

function aoTextureLoaded( texture ){
    var textureData = this.texture;
    var material = this.material;
    console.log('static/materials/' + textureData['ao']);

    material.aoMap = texture;
    material.aoMap.repeat.set(textureData['repeat'][0]/15, textureData['repeat'][1]/15);
    material.aoMap.wrapT = THREE.RepeatWrapping;
    material.aoMap.wrapS = THREE.RepeatWrapping;
    material.aoMapIntensity = 1;

}

function dispTextureLoaded( texture ){
    var textureData = this.texture;
    var material = this.material;
    console.log('static/materials/' + textureData['disp']);

    material.displacementMap = texture;
    material.displacementScale = textureData['dispScale'];
    material.displacementBias = textureData['dispBias'];
    material.displacementMap.repeat.set(textureData['repeat'][0]/15, textureData['repeat'][1]/15);
    material.displacementMap.wrapT = THREE.RepeatWrapping;
    material.displacementMap.wrapS = THREE.RepeatWrapping;


}


function applyTextures(){
    HOUSE.applyTextures();

    for (i in DOORS){
        DOORS[i].applyTextures();
    }

    for (i in WINDOWS){
        WINDOWS[i].applyTextures();
    }
}
