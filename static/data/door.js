

var DOOR_TYPES = [
    "Three_Panel_Door",
    "Fiberglass_Prehung_36_Glass",
    "Three_Panel_Door",
    "Fiberglass_Prehung_36_Glass",
    "3 ft smartside door",
    "6 ft smartside door",
    "Six_Panel_Door",
];

var SMALL_DOORS = [
    "Three_Panel_Door",
    "Fiberglass_Prehung_36_Glass",
    "Three_Panel_Door",
    "Fiberglass_Prehung_36_Glass",
];

var LARGE_DOORS = [
    "Six_Panel_Door",
];

var WOOD_DOORS = [
    "3 ft smartside door",
    "6 ft smartside door",
];

var HINGEMAP = {
    'Acorn Hinge Line Up Small': {
        'positions': [
            new THREE.Vector3(-7.575,1.6,.26),
            new THREE.Vector3(-7.575,9,.26),
            new THREE.Vector3(-7.575,18.4,.26),
            new THREE.Vector3(7.575,1.6,.26),
            new THREE.Vector3(7.575,9,.26),
            new THREE.Vector3(7.575,18.4,.26),
        ],
        'rotations': [
            [0,0,0], [0,0,0], [0,0,0],
            [0,0,Math.PI], [0,0,Math.PI], [0,0,Math.PI],
        ],
    },
    'Acorn Hinge Line Up': {
        'positions': [
            new THREE.Vector3(-7.575,1.6,.26),
            new THREE.Vector3(-7.575,9,.26),
            new THREE.Vector3(-7.575,18.4,.26),
            new THREE.Vector3(7.575,1.6,.26),
            new THREE.Vector3(7.575,9,.26),
            new THREE.Vector3(7.575,18.4,.26),
        ],
        'rotations': [
            [0,0,0], [0,0,0], [0,0,0],
            [0,0,Math.PI], [0,0,Math.PI], [0,0,Math.PI],
        ],
    },
    'Decorative 1T-Hinge': {
        'positions': [
            new THREE.Vector3(-7.575,1.6,.26),
            new THREE.Vector3(-7.575,9,.26),
            new THREE.Vector3(-7.575,18.4,.26),
            new THREE.Vector3(7.575,1.6,.26),
            new THREE.Vector3(7.575,9,.26),
            new THREE.Vector3(7.575,18.4,.26),
        ],
        'rotations': [
            [0,0,0], [0,0,0], [0,0,0],
            [0,0,Math.PI], [0,0,Math.PI], [0,0,Math.PI],
        ],
    },
    'Straight T Hinges': {
        'positions': [
            new THREE.Vector3(-7.575,1.6,.26),
            new THREE.Vector3(-7.575,9,.26),
            new THREE.Vector3(-7.575,18.4,.26),
            new THREE.Vector3(7.575,1.6,.26),
            new THREE.Vector3(7.575,9,.26),
            new THREE.Vector3(7.575,18.4,.26),
        ],
        'rotations': [
            [0,0,0], [0,0,0], [0,0,0],
            [0,0,Math.PI], [0,0,Math.PI], [0,0,Math.PI],
        ],
    },
}

var RAMPMAP = {
    '4x4': {
        'positions': [[0,-1.55,6.4]],
        'rotations': [[0,0,0]],
    },
    '4x5': {
        'positions': [[0,-1.55,6.4]],
        'rotations': [[0,0,0]],
    },
    '4x6': {
        'positions': [[0,-1.55,6.4]],
        'rotations': [[0,0,0]],
    },
    '4x9': {
        'positions': [[0,-1.55,6.4]],
        'rotations': [[0,0,0]],
    },
}

var DOORTEXTUREMAP = {
    "Three_Panel_Door": {
        'Door': 'whitedoor',
        'Metal': 'black',
        'Trim': 'trim',
        'Wood': 'wood',
        'Window': 'trim',
        'Windows': 'black',
    },
    "3 ft smartside door": {
        'Door': 'woodsidingdoor',
        'Metal': 'black',
        'Trim': 'trim',
        'Wood': 'wood',
        'Window': 'trim',
        'Windows': 'black',
    },

    "Six_Panel_Door": {
        'Door': 'whitedoor',
        'Metal': 'black',
        'Trim': 'trim',
        'Wood': 'wood',
        'Window': 'trim',
        'Windows': 'black',
    },

    "Fiberglass_Prehung_36_Glass": {
        'Door': 'whitedoor',
        'Metal': 'black',
        'Trim': 'trim',
        'Wood': 'wood',
        'Window': 'trim',
        'Windows': 'black',
    },

    "6 ft smartside door": {
        'Door': 'woodsidingdoor',
        'Metal': 'black',
        'Trim': 'trim',
        'Wood': 'wood',
        'Window': 'trim',
        'Windows': 'black',
    },

    "Standard_Style_OBJ": {
        'Door': 'whitegaragedoor',
        'Metal': 'black',
        'Trim': 'trim',
        'Wood': 'wood',
        'Window': 'trim',
        'Windows': 'black',
    },

    "garage_9_7_no_window": {
        'Door': 'whitegaragedoor',
        'Metal': 'black',
        'Trim': 'trim',
        'Wood': 'wood',
        'Window': 'trim',
        'Windows': 'black',
    },

    "Carrige_Style_OBJ": {
        'Door': 'whitegaragedoor',
        'Insets': 'whitegaragedoor',

        'Metal': 'black',
        'Trim': 'trim',
        'Wood': 'wood',
        'Window': 'black',
    },
}
