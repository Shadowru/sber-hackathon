import { Group } from 'three';

import CreateMesh from "./CreateMesh";
import WindowDepth from "./WallDepths/WindowDepth";
import SolidPart from "./WallParts/SolidPart";
import DoorPart from "./WallParts/DoorPart";
import WindowPart from "./WallParts/WindowPart";
import DoorDepth from "./WallDepths/DoorDepth";

export default class CreateWall {

    static create(wall) {

        let group = new Group();

        let wall_parts = [];

        for (let door of wall.doors) {
            if (wall.s.distanceTo(door.s) > wall.s.distanceTo(door.e)) console.log("door direct error");

            let distance = wall.s.distanceTo(door.s);
            wall_parts.push({
                distance: distance,
                type: "door",
                object: door
            });
        }

        for (let window of wall.windows) {
            if (wall.s.distanceTo(window.s) > wall.s.distanceTo(window.e)) console.log("window direct error");

            let distance = wall.s.distanceTo(window.s);
            wall_parts.push({
                distance: distance,
                type: "window",
                object: window
            });
        }


        if (wall_parts.length > 1) {
            wall_parts.sort(function (a, b) {
                if (a.distance > b.distance) return 1;
                if (a.distance == b.distance) return 0;
                if (a.distance < b.distance) return -1;
            })
        }

        wall_parts = wall_parts.filter((thing, index, self) =>
          index === self.findIndex((t) => (
            t.distance === thing.distance && t.type === thing.type
          ))
        );


        let s_p = wall.s;

        const doorDepth = new DoorDepth();

        for (let part of wall_parts) {

            if (part.type === 'window') {
                const window = part.object;

                if (wall.type === "room") group.add(WindowDepth.create(window));

                //WindowPart.bind(wall)(s_p, window);

                wall.v_n += 8;
                s_p = window.e;

            } else if (part.type === 'door') {
                const door = part.object;

                const doorDepthElement = doorDepth.create(door);
                if (doorDepthElement !== undefined){
                    group.add(doorDepthElement);
                }

                //DoorPart.create.bind(wall)(s_p, door);

                wall.v_n += 7;
                s_p = door.e;
            }

        }
        //SolidPart.create.bind(wall)(s_p);
        group.add(CreateMesh.create(wall));


        return group;
    };
}
