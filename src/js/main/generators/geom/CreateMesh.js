import {
  BufferGeometry,
  BufferAttribute,
  MeshStandardMaterial,
  DoubleSide,
  Color,
  Mesh
} from 'three';

//import { envMap } from "./textures.js";

export default class CreateMesh {
  static create(wall) {

    let numVertices = wall.vertices.length;
    let positionNumComponents = 3;
    let uvNumComponents = 2;
    let positions = new Float32Array(numVertices * positionNumComponents);
    let uvs = new Float32Array(numVertices * uvNumComponents);
    let posNdx = 0;
    let uvNdx = 0;


    for (let vertex of wall.vertices) {
      positions.set(vertex.pos, posNdx);
      uvs.set(vertex.uv, uvNdx);
      posNdx += positionNumComponents;
      uvNdx += uvNumComponents;
    }

    let geometry = new BufferGeometry();
    geometry.setAttribute('position', new BufferAttribute(positions, positionNumComponents));
    geometry.setAttribute('uv', new BufferAttribute(uvs, uvNumComponents));
    geometry.setIndex(wall.faces);
    geometry.computeVertexNormals();

    const material = new MeshStandardMaterial({
        side: DoubleSide,
        color: new Color('#ffffff'),
        //envMap: envMap,
        roughness: 0.3,
        metalness: 0.01
      }
    );

    const object = new Mesh(geometry, material);

    object.name = 'wall_' + wall.id;
    object.castShadow = true;
    object.receiveShadow = true;

    return object;
  };
}
