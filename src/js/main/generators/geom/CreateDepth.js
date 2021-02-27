import { Shape, ShapeUtils, ShapeBufferGeometry, Mesh, Path, Vector3,MeshStandardMaterial,DoubleSide } from 'three';
import {sort_ccw} from "./calculus/sort_ccw.js";
import {Vector2} from 'three';

export var CreateDepth = async function( path ){

/*    if ( !ShapeUtils.isClockWise( outside.points ) ) outside.points.reverse();

    let holes = outside.holes;
    let path = outside.points;*/

    let p = sort_ccw( path.points.map(p => new Vector2(p[0], p[1])));

    let shape = new Shape();
    shape.moveTo( path[0].x,path[0].y);
    for( let i=1, len=path.length; i<len; i++ ) shape.lineTo( path[i].x,path[i].y, );



    const geo = new ShapeBufferGeometry( shape );
    const material = new MeshStandardMaterial({
        color: '#ffffff',
        side: DoubleSide,
    });
    const Depth_Mesh = new Mesh( geo, material );

    Depth_Mesh.castShadow = false;
    Depth_Mesh.receiveShadow = false;
    Depth_Mesh.rotation.x = -Math.PI / 2;
    Depth_Mesh.scale.set(1, -1, 1);
    Depth_Mesh.position.y = height;
    Depth_Mesh.name = 'depth';

    return Depth_Mesh

};
