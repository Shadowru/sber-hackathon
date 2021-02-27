import { Group } from 'three';
import { CreateRoom } from 'CreateRoom.js';
import { CreateEdge } from 'CreateEdge.js';
import { CreateWall } from 'CreateWall.js';

export var CreateView = async function( data ){

    let group = new Group();

    for( let room of data.rooms )         await group.add( await CreateRoom( room ) );
    for( let wall of data.outside.walls ) await group.add( await CreateWall( wall ) );
                                          await group.add( await CreateEdge( data.outside, data.height ) );


    return  group;

};
