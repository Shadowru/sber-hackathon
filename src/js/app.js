import Detector from "./utils/detector.js";
import PreloadScene from './utils/preloadScene.js';
import Main from './main/Main.js'


// Styles
import './../css/app.scss';

console.log('Start sequor.edu');

const detector = new Detector();

const preloadScene = new PreloadScene(document);

if (detector.webgl()) {

    const container = document.getElementById('appContainer');

    const main = new Main(container);

    main.start();

    preloadScene.hideLoading();

    main.run();

} else {

    preloadScene.hideLoading();

    detector.addGetWebGLMessage(
        {
            parent: document.getElementById('appContainer'),
            id: 'webgl-error'
        }
    );

}
