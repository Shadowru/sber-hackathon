import * as THREE from 'three';

import earcut from 'earcut'
import {Vector2} from "three";

import {ThreeBSP} from 'three-js-csg-es6'

export default class RoomGenerator {

  generate(rooms, doors, walls, windows, textureManager) {

    const roomMeshes = [];


    for (const room of rooms) {

      const roomMesh = this._generateShape(
        room.points,
        0.01,
        new THREE.MeshStandardMaterial({map: textureManager.getTexture('floor'), side: THREE.DoubleSide})
      );

      roomMesh.userData = {
        id: 'floor',
        roomId: room.type
      }

      roomMesh.receiveShadow = true;

      roomMeshes.push(
        roomMesh
      );

    }

    const doorMeshes = [];

    for (const door of doors) {

      const doorMesh = this._generateShape(
        door,
        -2.00,
        new THREE.MeshStandardMaterial({color: 0xfff400, side: THREE.DoubleSide}),
        1.002
      );

      //doorMesh.scale.set(2.0, 2.0, 2.0);

      doorMesh.receiveShadow = true;

      doorMeshes.push(doorMesh);

      // roomMeshes.push(
      //   doorMesh
      // );

    }

    const roomHeight = 2.6;
    const wall_mesh = this._generateWalls(
      roomHeight,
      rooms,
      walls,
      doorMeshes,
      windows
    );

    wall_mesh.material = new THREE.MeshStandardMaterial({color: 0x71b76f, side: THREE.DoubleSide});

    wall_mesh.geometry.computeFaceNormals();
    wall_mesh.geometry.computeVertexNormals();

    wall_mesh.translateZ(-roomHeight);

    wall_mesh.userData.id = 'walls';

    wall_mesh.receiveShadow = true;

    roomMeshes.push(wall_mesh);


    const roomHeightTop = 0.01;
    const wall_mesh_top = this._generateWalls(
      roomHeightTop,
      rooms,
      walls,
      doorMeshes,
      windows
    );

    wall_mesh_top.material = new THREE.MeshStandardMaterial({color: 0x1c211c, side: THREE.DoubleSide});

    wall_mesh_top.geometry.computeFaceNormals();
    wall_mesh_top.geometry.computeVertexNormals();

    wall_mesh_top.translateZ(-roomHeight - roomHeightTop);

    wall_mesh_top.userData.id = 'wallstop';

    roomMeshes.push(wall_mesh_top);

    const windowHeight = 1.2;

    for (const window of windows) {

      const windowMesh = this._windowMesh(window, windowHeight);

      roomMeshes.push(windowMesh);
    }

    return roomMeshes;
  }

  _windowMesh(window, windowHeight) {
    const windowMesh = this._generateShape(
      window,
      windowHeight,
      new THREE.MeshStandardMaterial({color: 0xdddddd, side: THREE.DoubleSide}),
      1.05,
      true
    );

    windowMesh.translateX(-0.03);
    windowMesh.translateY(-0.07);
    windowMesh.translateZ(-2.0);
    return windowMesh;
  }

  _generateWalls(roomHeight, rooms, walls, doors, windows) {

    let externalWall = this._generateShape(
      walls,
      roomHeight
    );

    for (const room of rooms) {

      const roomMesh = this._generateShape(
        room.points,
        roomHeight,
        undefined
      );

      externalWall = this.subtract(externalWall, roomMesh).toMesh();
    }

    for (const door of doors) {

      //externalWall = this.subtract(externalWall, door).toMesh();

    }

    const windowHeight = 1.2;

    for (const window of windows) {

      const windowMesh = this._windowMesh(window, windowHeight);

      externalWall = this.subtract(externalWall, windowMesh).toMesh();
    }

    return externalWall;

  }

  subtract(obj1, obj2) {

    var o1BSP = new ThreeBSP(obj1);
    var o2BSP = new ThreeBSP(obj2);

    return o1BSP.subtract(o2BSP);
  }

  _generateShape(vertices, height, material, proportions = 1.0, rotate = true) {

    const vectorArray = [];

    for (const vertex of vertices) {
      vectorArray.push(
        new THREE.Vector2(
          this._transform(vertex[0] * proportions),
          this._transform(vertex[1] * proportions)
        )
      )
    }

    const shape = new THREE.Shape(vectorArray);
    const extrudeSettings = {depth: height, bevelEnabled: false};

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

    const mesh = new THREE.Mesh(geometry,
      material
    );
    mesh.receiveShadow = true;
    if (rotate) {
      mesh.rotateX(Math.PI / 2);
    }

    return mesh;

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

  _getBB(object) {
    object.geometry.computeBoundingBox();
    object.updateMatrixWorld();

    const box3 = object.geometry.boundingBox.clone();

    const dimensions = new THREE.Vector3().subVectors(box3.max, box3.min);

    console.log(dimensions);

    // const boxGeo = new THREE.BoxBufferGeometry(dimensions.x, dimensions.y, dimensions.z);
    //
    // const mesh = new THREE.Mesh(boxGeo, new THREE.MeshBasicMaterial( { color: 0xffcc55 } ));

    const box = new THREE.Mesh(new THREE.BoxGeometry(dimensions.x, dimensions.y, dimensions.z));
    // var polyhedronG = new THREE.Geometry();
    // polyhedronG.vertices.push(
    //   new THREE.Vector3(dimensions.x, dimensions.y, dimensions.z),   //A 0
    //   new THREE.Vector3(-200,-200,200),   //B 1
    //   new THREE.Vector3(200,-200,-200),   //D 2
    //   new THREE.Vector3(-1,-1,-1)         //O 3
    // );
    // polyhedronG.faces.push(
    //   new THREE.Face3( 0, 1, 2 ),
    //   new THREE.Face3( 0, 2, 3 ),
    //   new THREE.Face3( 0, 3, 1 ),
    //   new THREE.Face3( 3, 2, 1 )
    // );
    //
    // return polyhedronG;

    return box;
  }

}
