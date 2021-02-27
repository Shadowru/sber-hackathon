import { Shape, ShapeUtils, ShapeBufferGeometry, Mesh, Path, Vector3,MeshStandardMaterial,DoubleSide } from 'three';


export default class CreateEdge {

    static create( outside, height ){

        if ( !ShapeUtils.isClockWise( outside.points ) ) outside.points.reverse();

        let holes = outside.holes;
        let path = outside.points;


        let shape = new Shape();
        shape.moveTo( path[0].x,path[0].y);
        for( let i=1, len=path.length; i<len; i++ ) shape.lineTo( path[i].x,path[i].y );


        for (let hole of holes) {

            let hole_path = new Path();
            if ( ShapeUtils.isClockWise(hole) ) hole.reverse();
            shape.holes.push( hole_path.setFromPoints( hole ) );
        }


        const geo = new ShapeBufferGeometry( shape );
        const material = new MeshStandardMaterial({
            color: '#3f3f3f',
            side: DoubleSide,
        });
        const Edge_Mesh = new Mesh( geo, material );

        Edge_Mesh.castShadow = false;
        Edge_Mesh.receiveShadow = false;
        Edge_Mesh.rotation.x = -Math.PI / 2;
        Edge_Mesh.scale.set(1, -1, 1);
        Edge_Mesh.position.y = height;
        Edge_Mesh.name = 'edge';

        return Edge_Mesh

    };
}
