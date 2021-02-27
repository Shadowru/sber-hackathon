import * as THREE from 'three';

import earcut from 'earcut'
import {Vector2} from "three";

export default class RoomGenerator {

  generate(rooms, doors, walls, textureManager) {

    const roomMeshes = [];

    const room_center = this._calcCenter(rooms);

    for (const room of rooms) {

      const roomMesh = this._generateShape(
        room.points,
        0.01,
        textureManager.getTexture('floor')
      );

      roomMesh.userData = {
        roomId: room.type
      }

      roomMeshes.push(
        roomMesh
      );

    }

    for (const door of doors) {

      const doorMesh = this._generateShape(
        door,
        -2.00,
        textureManager.getTexture('door')
      );

      roomMeshes.push(
        doorMesh
      );

    }

    return roomMeshes;
  }

  _generateShape(vertices, height, texture) {

    //console.log(vertices);

    const vectorArray = [];

    for (const vertex of vertices) {
      vectorArray.push(
        new THREE.Vector2(
          this._transform(vertex[0]),
          this._transform(vertex[1])
        )
      )
    }

    const shape = new THREE.Shape(vectorArray);
    const extrudeSettings = {depth: height, bevelEnabled: false};

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

    const mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({map: texture, side: THREE.DoubleSide}));
    mesh.receiveShadow = true;
    mesh.rotateX(Math.PI / 2);

    return mesh;

  }

  _calcCenter(rooms) {

    for (const room of rooms) {
      for (const point of room.points) {


      }
    }

  }

  generate2(rooms, walls) {


    const planeVertices = this._convertToVertices(rooms);

    const floorGeometry = new THREE.BufferGeometry();

    const vertices = new Float32Array(planeVertices);

    floorGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    const material = new THREE.MeshBasicMaterial({color: 0xff0000, side: THREE.DoubleSide});
    const mesh = new THREE.Mesh(floorGeometry, material);

    const coeff = 0.01;

    mesh.scale.set(
      coeff, coeff, coeff
    );

    const bbox = this._moveToCenter(mesh)

    const wall_mesh = this._generateWallExtrude(bbox);


    return [mesh, wall_mesh];

  }

  _generateWallExtrude(bbox) {

    const wallShapeVector = [];

    wallShapeVector.push(
      new Vector2(bbox.min.x, bbox.min.z)
    );
    wallShapeVector.push(
      new Vector2(bbox.min.x, bbox.max.z)
    );
    wallShapeVector.push(
      new Vector2(bbox.max.x, bbox.max.z)
    );
    wallShapeVector.push(
      new Vector2(bbox.max.x, bbox.min.z)
    );

    const wallShape = new THREE.Shape(wallShapeVector);
    const extrudeSettings = {depth: -2.60, bevelEnabled: false};

    const geometry = new THREE.ExtrudeGeometry(wallShape, extrudeSettings);

    const wall_mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({side: THREE.DoubleSide}));
    wall_mesh.rotateX(Math.PI / 2);

    wall_mesh.translateZ(-2);

    return wall_mesh;
  }

  _generateWall() {

    const wallShape = new THREE.Shape(this._convertToVector(walls));

    const extrudeSettings = {depth: -260};

    const geometry = new THREE.ExtrudeGeometry(wallShape, extrudeSettings);

    const wall_mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({side: THREE.DoubleSide}));
    wall_mesh.rotateY(Math.PI / 2);
    const coeff = 0.01;

    wall_mesh.scale.set(
      coeff, coeff, coeff
    );

    wall_mesh.translateX(-cent.x);
    wall_mesh.translateZ(-cent.z);

    //this._moveToCenter(mesh);


  }


  _generatePlane(planeVertices, roomPoints) {

    let vertices = [];

    for (const roomPoint of roomPoints) {
      vertices.push(roomPoint[0]);
      vertices.push(roomPoint[1]);
    }

    //vertices = vertices.reverse();

    //console.log(vertices);

    const faces = earcut(vertices);

    //console.log(faces);

    for (const face of faces) {
      const idx = face * 2;
      const x = vertices[idx];
      const y = 0;
      const z = vertices[idx + 1];

      planeVertices.push(
        -z
      );
      planeVertices.push(
        y
      );
      planeVertices.push(
        x
      );

    }


  }

  _convertToVertices(rooms) {
    const planeVertices = [];
    for (const room of rooms) {

      const roomPoints = room.points;

      this._generatePlane(
        planeVertices, roomPoints
      );

    }
    return planeVertices;
  }

  _convertToVector(walls) {
    const vectorArray = [];

    let idx = 5;

    for (const wall of walls) {
      vectorArray.push(
        new THREE.Vector2(wall[0], wall[1])
      );

      if (idx++ > 8) {
        break;
      }
    }

    console.log(vectorArray);

    return vectorArray;
  }

  _moveToCenter(mesh) {
    const bbox = new THREE.Box3().setFromObject(mesh);
    const cent = bbox.getCenter(new THREE.Vector3());
    const size = bbox.getSize(new THREE.Vector3());

    console.log(bbox);
    console.log(cent);

    mesh.translateX(-cent.x);
    mesh.translateZ(-cent.z);
    return new THREE.Box3().setFromObject(mesh);

  }

  _transform(coord) {
    return coord / 100;
  }
}
