import CreateWall from "./CreateWall";
import CreateFloor from "./CreateFloor";
import {Group} from 'three';

export default class CreateRoom {

  static create(room) {

    let group = new Group();

    group.add(
      CreateFloor.create(room.floor, room.id)
    );

    for (let doorstep of room.doorsteps)
    {
      group.add(CreateFloor.create(doorstep, room.id));
    }

    for (let wall of room.walls) {
      group.add(CreateWall.create(wall));
    }


    return group;
  }
};
