export var DoorPart = function( s, door  ){

    const door_h = door.height;
    const wall_h = this.height;

    let p1_u = s.distanceTo( door.s )/100;
    let p3_u = s.distanceTo( door.e )/100;

    let d_p = {
        0: { x: s.x,       y: 0,       z: s.y,       uv: [0, 0],             },
        1: { x: door.s.x,  y: 0,       z: door.s.y,  uv: [p1_u, 0],          },
        2: { x: door.s.x,  y: door_h,  z: door.s.y,  uv: [p1_u, door_h/100], },
        3: { x: door.e.x,  y: door_h,  z: door.e.y,  uv: [p3_u, door_h/100], },
        4: { x: s.x,       y: wall_h,  z: s.y,       uv: [0, wall_h/100],    },
        5: { x: door.e.x,  y: wall_h,  z: door.e.y,  uv: [p3_u, wall_h/100], },
        6: { x: door.e.x,  y: 0,       z: door.e.y,  uv: [p3_u, 0],          }
    };

    for (let i = 0; i < Object.keys(d_p).length; i++ ){
           this.vertices.push({ pos: [ d_p[i].x, d_p[i].y, d_p[i].z ], uv: d_p[i].uv, })
    }

    this.faces.push(
        this.v_n+0, this.v_n+2, this.v_n+4,
        this.v_n+1, this.v_n+2, this.v_n+0,
        this.v_n+4, this.v_n+2, this.v_n+5,
        this.v_n+5, this.v_n+2, this.v_n+3,
    )
    

/*    if ( this.direction ){

           this.faces.push(
            this.v_n+0, this.v_n+2, this.v_n+4,
            this.v_n+1, this.v_n+2, this.v_n+0,
            this.v_n+4, this.v_n+2, this.v_n+5,
            this.v_n+5, this.v_n+2, this.v_n+3,
        );

    } else {
           this.faces.push(
            this.v_n+3, this.v_n+2, this.v_n+5,
            this.v_n+5, this.v_n+2, this.v_n+4,
            this.v_n+0, this.v_n+2, this.v_n+1,
            this.v_n+4, this.v_n+2, this.v_n+0,
        );
    }*/

};