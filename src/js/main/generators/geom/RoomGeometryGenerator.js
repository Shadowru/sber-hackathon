import { Group } from 'three';
import CreateRoom from "./CreateRoom";
import CreateEdge from "./CreateEdge";
import CreateWall from "./CreateWall";

export default class RoomGeometryGenerator {

  generate( data ) {

    let group = new Group();

    for (let room of data.rooms) group.add(CreateRoom.create(room));
    for (let wall of data.outside.walls) group.add(CreateWall.create(wall));
    group.add(CreateEdge.create(data.outside, data.height));

    return group;
  }
}
