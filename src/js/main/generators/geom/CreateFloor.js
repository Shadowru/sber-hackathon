import {
    Shape,
    ExtrudeBufferGeometry,
    MeshStandardMaterial,
    FrontSide,
    Color,
    Mesh,
    TextureLoader,
    sRGBEncoding,
    RepeatWrapping


} from './../libs/build/three.module.js';

import { envMap } from "./textures.js";


const path_diff = "./../img/floor/diff.png";
const path_rou = "/../img/floor/roughness.png";

let loaderTexture = new TextureLoader();




let diff = loaderTexture.load(
    path_diff,

    function ( t ) {
        t.encoding = sRGBEncoding;
        t.anisotropy = 16;
        t.flipY = false;
        t.wrapS = t.wrapT = RepeatWrapping;
        //t.repeat.set( tWidth * fix, tHeight * fix );
    }
);

let rou = loaderTexture.load(
    path_rou,

    function ( t ) {
        t.encoding = sRGBEncoding;
        t.anisotropy = 16;
        t.flipY = false;
        t.wrapS = t.wrapT = RepeatWrapping;
        //t.repeat.set( tWidth * fix, tHeight * fix );
    }
);

let floor_material = new MeshStandardMaterial({
    name: 'floor',
    side: FrontSide,
    color: new Color('#6b6b6b'),
    map: diff,
    envMap: envMap,
    roughnessMap: rou,
    roughness: 0.35,
    metalness: 0.2
});

export var CreateFloor = async function( points, room_id ){


        let floor_shape = new Shape();
        floor_shape.moveTo(points[0].x, points[0].y);

        for(let i=1, len=points.length; i<len; i++){
            floor_shape.lineTo(points[i].x , points[i].y);
        }


        let extrudeSettings = {
            steps: 2,
            depth: 5,
            bevelEnabled: true,
            bevelThickness: 1,
            bevelSize: 0.3,
            bevelOffset: 0,
            bevelSegments: 1
        };


        let floor_geom = new ExtrudeBufferGeometry(floor_shape, extrudeSettings );

        floor_geom.attributes.uv.array = floor_geom.attributes.uv.array.map(val => val * 0.01); //уменьшим масштаб Uv

        let floor_object = new Mesh( floor_geom, floor_material );

        floor_object.castShadow = false;
        floor_object.receiveShadow = true;
        floor_object.rotation.x = Math.PI / 2;
        floor_object.name = 'floor_' + room_id;


    return floor_object
};
