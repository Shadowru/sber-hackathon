import { CreateWall } from './CreateWall.js';
import { CreateFloor } from './CreateFloor.js';
import { Group } from './../libs/build/three.module.js';

export var CreateRoom = async function( room ){

    let group = new Group();

                                          await group.add( await CreateFloor( room.floor, room.id ) );
    for( let doorstep of room.doorsteps ) await group.add( await CreateFloor( doorstep, room.id ) );
    for( let wall of room.walls )         await group.add( await CreateWall( wall ) );


    return group;
};
