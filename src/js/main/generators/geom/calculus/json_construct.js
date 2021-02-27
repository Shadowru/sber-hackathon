import {Vector2} from 'three';

import Geometry from "./Geometry";

export default class JsonConstruct {

  static json_construct(drawingData) {

    let rooms = [];

    const height = 270;
    const door_height = 210;
    const window_height = 150;
    const window_floor_height = 85;

    let outside = {walls: [], holes: []};
    outside.points = Geometry.simplify(drawingData.external_walls, 3).map(p => new Vector2(p[0], p[1]));

    let rooms_data = drawingData.rooms;
    let doors = drawingData.doors;
    let entrance_doors = drawingData.entrance_doors;
    let windows = drawingData.windows;

    function camera_pos(roomsData) {

      let Xs = 0;
      let Ys = 0;

      let i = 0;
      for (let p of roomsData) {

        i++;
        Xs += p.center.x;
        Ys += p.center.y;
      }

      return {x: Xs / i, y: Ys / i};

    }

    let r_num = 0;

    let wall = {};
    let room = {};
    let door = {};
    let window = {};


    for (let r of rooms_data) {

      r_num++;

      room = {
        type: r.type,
        id: r.type + '_' + r_num,
        doorsteps: [],
        walls: [],
        floor: r.points.map(p => new Vector2(p[0], p[1])),
        height: height,
        objects: r.objects,
        center: Geometry.polygon_centr(r.points.map(p => new Vector2(p[0], p[1])))
      };

      outside.holes.push(room.floor);

      //INNER WALLS
      for (let i = 0, l = room.floor.length; i < l; i++) {

        const vec_s = room.floor[i];
        const vec_e = room.floor[i + 1 === l ? 0 : i + 1];

        wall = {
          height: height,
          id: room.id + "_" + i,
          type: "room",
          s: vec_s,
          e: vec_e,
          vertices: [],
          faces: [],
          v_n: 0,
          doors: [],
          windows: []
        };

        //doors
        door:
          for (let h = 0, k = doors.length; h < k; h++) {

            for (let j = 0, m = doors[h].length; j < m; j++) {

              const d_s1 = new Vector2(doors[h][j][0], doors[h][j][1]);
              const d_s2 = new Vector2(doors[h][j + 1 === m ? 0 : j + 1][0], doors[h][j + 1 === m ? 0 : j + 1][1]);

              if (Geometry.point_on_line(vec_s, vec_e, Geometry.middle_point(d_s1, d_s2))) {

                room.doorsteps.push(doors[h].map(p => new Vector2(p[0], p[1])));

                door = {
                  room_id: room.id,
                  wall_id: wall.id,
                  id: "room_" + h,
                  e: d_s1,
                  s: d_s2,
                  points: doors[h],
                  height: door_height,
                };

                wall.doors.push(door);
                //break door;

              }
            }

          }

        //entrance_doors
        for (let h = 0, k = entrance_doors.length; h < k; h++) {

          for (let j = 0, m = entrance_doors[h].length; j < m; j++) {

            const d_s1 = new Vector2(entrance_doors[h][j][0], entrance_doors[h][j][1]);
            const d_s2 = new Vector2(entrance_doors[h][j + 1 === m ? 0 : j + 1][0], entrance_doors[h][j + 1 === m ? 0 : j + 1][1]);

            if (Geometry.point_on_line(vec_s, vec_e, Geometry.middle_point(d_s1, d_s2))) {
              room.doorsteps.push(entrance_doors[h].map(p => new Vector2(p[0], p[1])));
              door = {
                room_id: room.id,
                wall_id: wall.id,
                id: "entry_" + h,
                e: d_s1,
                s: d_s2,
                points: entrance_doors[h],
                height: door_height,
              };

              wall.doors.push(door);
              //break door;

            }
          }

        }

        //windows
        window:
          for (let h = 0, k = windows.length; h < k; h++) {

            for (let j = 0, m = windows[h].length; j < m; j++) {

              const w_s1 = new Vector2(windows[h][j][0], windows[h][j][1]);
              const w_s2 = new Vector2(windows[h][j + 1 === m ? 0 : j + 1][0], windows[h][j + 1 === m ? 0 : j + 1][1]);

              if (Geometry.point_on_line(vec_s, vec_e, Geometry.middle_point(w_s1, w_s2))) {

                window = {
                  room_id: room.id,
                  wall_id: wall.id,
                  id: wall.id + "_" + h,
                  e: w_s1,
                  s: w_s2,
                  points: windows[h],
                  height: window_height,
                  floor_height: window_floor_height,
                  is_created: false
                };

                wall.windows.push(window);
                break window;
              }
            }
          }

        room.walls.push(wall);
      }

      //OUTSIDE WALLS
      for (let i = 0, l = outside.points.length; i < l; i++) {

        const vec_s = outside.points[i];
        const vec_e = outside.points[i + 1 === l ? 0 : i + 1];

        wall = {
          height: height,
          id: "outside_" + i,
          type: "outside",
          s: vec_s,
          e: vec_e,
          vertices: [],
          faces: [],
          v_n: 0,
          doors: [],
          windows: []
        };

        //doors
        for (let h = 0, k = doors.length; h < k; h++) {

          for (let j = 0, m = doors[h].length; j < m; j++) {

            const d_s1 = new Vector2(doors[h][j][0], doors[h][j][1]);
            const d_s2 = new Vector2(doors[h][j + 1 === m ? 0 : j + 1][0], doors[h][j + 1 === m ? 0 : j + 1][1]);

            if (Geometry.point_on_line(vec_s, vec_e, Geometry.middle_point(d_s1, d_s2))) {

              door = {
                room_id: 'outside',
                wall_id: wall.id,
                id: wall.id + "_" + h,
                s: d_s2,
                e: d_s1,
                points: doors[h],
                height: door_height,
                is_created: false
              };

              wall.doors.push(door);

            }
          }
        }

        //entrance_doors
        for (let h = 0, k = entrance_doors.length; h < k; h++) {

          for (let j = 0, m = entrance_doors[h].length; j < m; j++) {

            const d_s1 = new Vector2(entrance_doors[h][j][0], entrance_doors[h][j][1]);
            const d_s2 = new Vector2(entrance_doors[h][j + 1 === m ? 0 : j + 1][0], entrance_doors[h][j + 1 === m ? 0 : j + 1][1]);

            if (Geometry.point_on_line(vec_s, vec_e, Geometry.middle_point(d_s1, d_s2))) {

              door = {
                room_id: room.id,
                wall_id: wall.id,
                id: wall.id + "_" + h,
                e: d_s1,
                s: d_s2,
                points: entrance_doors[h],
                height: door_height,
                is_created: false
              };

              wall.doors.push(door);
            }
          }
        }

        //windows
        for (let h = 0, k = windows.length; h < k; h++) {

          for (let j = 0, m = windows[h].length; j < m; j++) {

            const w_s1 = new Vector2(windows[h][j][0], windows[h][j][1]);
            const w_s2 = new Vector2(windows[h][j + 1 === m ? 0 : j + 1][0], windows[h][j + 1 === m ? 0 : j + 1][1]);

            if (Geometry.point_on_line(vec_s, vec_e, Geometry.middle_point(w_s1, w_s2))) {

              window = {
                room_id: room.id,
                wall_id: wall.id,
                id: wall.id + "_" + h,
                e: w_s1,
                s: w_s2,
                points: windows[h],
                height: window_height,
                floor_height: window_floor_height,
                is_created: false
              };

              wall.windows.push(window);
            }
          }
        }

        outside.walls.push(wall);
      }

      rooms.push(room);
    }

    return {rooms: rooms, center: camera_pos(rooms), height: height, outside: outside}
  };
}
