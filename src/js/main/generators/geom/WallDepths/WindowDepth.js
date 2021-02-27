import { BufferGeometry, Mesh, Float32BufferAttribute,Vector2,DoubleSide, MeshStandardMaterial} from './../libs/build/three.module.js';
import {sort_ccw} from "./../calculus/sort_ccw.js";

export var WindowDepth = function( window ){

    let geometry = new BufferGeometry();
    let indices = [];
    let vertices = [];

    let height = window.height + window.floor_height;

    let p = sort_ccw( window.points.map(p => new Vector2(p[0], p[1])));

    for( let i=0, len=p.length; i<len; i++ ){
        if (p[i].equals(window.s) && i !== 0) {
            p = p.concat(p.splice(0, p.length - (len - i)));
            break;
        }
    }

    vertices.push(

        p[0].x, window.floor_height, p[0].y ,
        p[1].x, window.floor_height, p[1].y ,
        p[0].x, height,              p[0].y ,
        p[1].x, height,              p[1].y ,
        p[3].x, window.floor_height, p[3].y ,
        p[2].x, window.floor_height, p[2].y ,
        p[3].x, height,             p[3].y ,
        p[2].x, height,             p[2].y ,
    );

    indices.push(
        0, 4, 6,
        0, 6, 2,
        2, 6, 7,
        2, 7, 3,
        1, 5, 7,
        1, 7, 3,
        0, 4, 5,
        0, 5, 1
    );

    geometry.setAttribute('position', new Float32BufferAttribute( vertices, 3 ));
    geometry.setIndex( indices );
    geometry.computeVertexNormals();
    const material = new MeshStandardMaterial({
        color: '#ffffff',
        side: DoubleSide,
    });
    const object = new Mesh( geometry, material );

    object.receiveShadow = false;
    object.castShadow = false;

    return object


};




