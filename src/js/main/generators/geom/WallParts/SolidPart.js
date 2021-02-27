export var SolidPart = function( s_p ) {

    let p1x = s_p.distanceTo( this.e ) / 100;

    this.vertices.push({pos: [s_p.x, 0,           s_p.y],  uv: [0, 0],});
    this.vertices.push({pos: [this.e.x, 0,           this.e.y],  uv: [p1x, 0],});
    this.vertices.push({pos: [s_p.x, this.height, s_p.y],  uv: [0, this.height / 100],});
    this.vertices.push({pos: [this.e.x, this.height, this.e.y],  uv: [p1x, this.height / 100], });

    this.faces.push(
        this.v_n + 0, this.v_n + 3, this.v_n + 2, this.v_n + 0, this.v_n + 1, this.v_n + 3
    );

};