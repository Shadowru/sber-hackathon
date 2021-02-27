import Detector from "./utils/detector.js";
import PreloadScene from './utils/preloadScene.js';
import SpeechManager from './sound/SpeechManager.js'
import Main from './main/Main.js'


// Styles
import './../css/app.scss';

console.log('Start sequor.edu');

const detector = new Detector();

const preloadScene = new PreloadScene(document);

const speechManager = new SpeechManager(document);

if (detector.webgl()) {

  preloadScene.showLoading();

  const container = document.getElementById('appContainer');

  let configPromise = fetch('./assets/config.json');

  configPromise.then(
    response => response.json()
  )
    .then((json) => {
      console.log(json);

      const main = new Main(
        container,
        {
          sky: false,
          scene: json
        },
        speechManager
      );

      //TODO: finish promise + progress callback
      main.start((progress, text) => {
          preloadScene.progress(progress, text);
          if (progress > 99) {
            preloadScene.hideLoading();
            main.run();
          }
        }
      );
    });


} else {

  preloadScene.hideLoading();

  detector.addGetWebGLMessage(
    {
      parent: document.getElementById('appContainer'),
      id: 'webgl-error'
    }
  );

}
