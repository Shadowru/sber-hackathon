export var WindowPart = function( s, window ){
    
    let p1x = s.distanceTo( window.e )/100;
    let p2x = s.distanceTo( window.s )/100;

    let window_h = window.floor_height + window.height;
    let uvHeightWindow = 85+150;


    /* 0 */ this.vertices.push({ pos: [s.x,        0,                       s.y], uv: [0, 0], });
/* 1 */ this.vertices.push({ pos: [window.e.x, 0,                           window.e.y],         uv: [p1x, 0], });
    /* 2 */   this.vertices.push({ pos: [window.s.x, window.floor_height, window.s.y],  uv: [p2x, 85/100], });
    /* 3 */   this.vertices.push({ pos: [window.e.x, window.floor_height, window.e.y],  uv: [p1x, 85/100], });
    /* 4 */   this.vertices.push({ pos: [window.s.x, window_h, window.s.y],             uv: [p2x, uvHeightWindow/100], });
    /* 5 */   this.vertices.push({ pos: [window.e.x, window_h, window.e.y],             uv: [p1x, uvHeightWindow/100], });
    /* 6 */   this.vertices.push({ pos: [s.x, this.height, s.y],                        uv: [0, this.height/100], });
    /* 7 */   this.vertices.push({ pos: [window.e.x, this.height, window.e.y],          uv: [p1x, this.height/100], });


    this.faces.push(

        this.v_n+0, this.v_n+1, this.v_n+3,
        this.v_n+3, this.v_n+2, this.v_n+0,
        this.v_n+2, this.v_n+6, this.v_n+0,
        this.v_n+6, this.v_n+2, this.v_n+4,
        this.v_n+6, this.v_n+4, this.v_n+7,
        this.v_n+7, this.v_n+4, this.v_n+5,
    );

};

