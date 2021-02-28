import * as THREE from "three";

export default class TextureManager {


  constructor() {

    this.textures = {};

    this._loadTextures(this.textures);
  }

  _loadTextures(textures) {

    const loader = new THREE.TextureLoader();

    const texture = loader.load(
      "assets/textures/floor_tiles_06_diff_1k.png"
    );

    // it's necessary to apply these settings in order to correctly display the texture on a shape geometry

    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 2, 2 );

    textures['floor'] = texture;

    const texture2 = loader.load( "assets/textures/door_texture_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_963788_o.jpg" );

    // it's necessary to apply these settings in order to correctly display the texture on a shape geometry

    texture2.wrapS = texture2.wrapT = THREE.RepeatWrapping;
    texture2.repeat.set( 1,1 );

    textures['door'] = texture2;

    const texture3 = loader.load( "assets/textures/plywood_diff_1k.png" );

    // it's necessary to apply these settings in order to correctly display the texture on a shape geometry

    texture3.wrapS = texture3.wrapT = THREE.RepeatWrapping;
    texture3.repeat.set( 1, 1 );

    textures['floor_wooden'] = texture3;

  }

  getTexture(alias){
    return this.textures[alias];
  }
}


