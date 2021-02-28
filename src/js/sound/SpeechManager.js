import WebVoiceCommand from "web-voice-command";

import SoundProducer from "./SoundProducer"
import ChatBotManager from "./ChatBotManager"

import SberTTS from "./SberTTS"

export default class SpeechManager {

  constructor(document) {

    this._audioConfig = {
      'background': 'bensound-jazzyfrenchy.mp3',
      'words': {
        'hello': ['привет', 'ты кто', 'здравствуйте'],
        'property': ['расскажи дом'],
        'flat': ['расскажи квартир'],
        '_room': ['расскажи комнат'],
        'kitchen': ['расскажи кухн'],
        'bedroom': ['расскажи спальн'],
        'corridor': ['расскажи коридо', 'расскажи корридо'],
        '_disable_light': ['выключ'],
        '_enable_light': ['включ'],
        '_gray_wall': ['серы'],
        '_white_wall': ['белы'],
        '_green_wall': ['зелён'],
        '_wooden_floor': ['деревянный'],
        '_floor': ['плитка'],
        '_standard': ['стандарт'],
        '_premial': ['премиал']
      }
    }

    this._soundProducer = new SoundProducer(this._audioConfig);

    this._soundButton = document.getElementById('soundButton');
    this._soundState = false;

    this._setButtonState(this._soundState)

    if (this._soundButton.addEventListener) {
      this._soundButton.addEventListener('click', () => {
        const state = this._swapState();
        this._setButtonState(state);
      })
    } else if (this._soundButton.attachEvent) {
      this._soundButton.attachEvent('onclick', () => {
        const state = this._swapState();
        this._setButtonState(state);
      });
    }

    this._mainInstance = undefined;

    this._webVoiceCommand = WebVoiceCommand;

    this._prevListenWords = '';

    this._chatBotManager = new ChatBotManager();
    this._sberTTS = new SberTTS();

  }

  _playSound(audioBlob) {
    // const sound = this._soundProducer.getEmptySound();
    //
    // sound.rawAudioData = buffer;
    // sound.init();
    //
    // sound.play();
    //
    // console.log(sound);

    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    audio.play();
  }

  say(speechId, progressCallback) {
    const sound = this._soundProducer.say(speechId);

    progressCallback('speak');

    sound.onEnd = function () {
      progressCallback('stop');
      console.log('sound playback ended');
      sound.onEnd = null;
      // this._soundProducer.enableMicrophone();
    };

  }

  mute() {
    this._soundProducer.stopSpeaking();
  }

  _swapState() {
    this._soundState = !this._soundState;
    return this._soundState;
  }

  _setButtonState(state) {
    const text = this._soundButton.firstChild;
    if (state) {
      text.data = 'MUTE';
      this._soundProducer.unmute();
      this._initMicrophone();
    } else {
      text.data = 'UNMUTE';
      this._soundProducer.mute();
    }
  }

  _initMicrophone() {
    const webVoiceCommand = this._webVoiceCommand;

    webVoiceCommand.setOptions({
      persistentListening: true,
      listenOnLoad: false,
      language: 'ru-RU' //set language to ro-RO Romanian Romania
    });

    webVoiceCommand.results((result) => {

      console.log(result);

      const words = this._audioConfig.words;

      const listenWords = result.join(' ').toLowerCase();

      return this._searchWordsEntry(words, listenWords);
    });
  }

  enableMicrophone() {
    try {
      this._webVoiceCommand.startStop(2, 'start');
    } catch (e) {
      console.error(e);
    }
  }

  disableMicrophone() {
    try {
      this._webVoiceCommand.startStop(2, 'stop');
    } catch (e) {
      console.error(e);
    }
  }

  _searchWordsEntry(words, listenWords) {

    console.log('Listen words', listenWords);

    if (this._prevListenWords === listenWords) {
      return;
    }

    console.log('Listen words diff [', this._prevListenWords, '][', listenWords, ']');

    console.log('Start search');

    this._prevListenWords = listenWords;

    let stopSearch = false;

    Object.keys(words).forEach((key, index) => {
      if (stopSearch) {
        return;
      }
      const wordList = words[key];
      for (const wordListElement of wordList) {
        const wordListElements = wordListElement.split(' ');
        const found = this._searchWordEntry(wordListElements, listenWords);
        if (found) {
          console.log('found : ' + key);
          this.sayAvatar(key);
          stopSearch = true;
          return;
        }
      }
    });

    console.log('End search');

  }

  _searchWordEntry(wordListElements, listenWords) {
    let count = 0;
    for (const wordListElement of wordListElements) {
      if (listenWords.indexOf(wordListElement) !== -1) {
        count++;
      }
    }
    return count === wordListElements.length;
  }

  setMain(mainInstance) {
    this._mainInstance = mainInstance;
  }

  sayAvatar(id) {
    if (this._mainInstance !== undefined) {

      const avatarManager = this._mainInstance.getAvatarManager();

      if (id.startsWith('_')) {
        if (id === '_room') {
          this._sayAboutObject(id, avatarManager);
        } else if (id === '_disable_light') {
          avatarManager.setLight(0.0);
        } else if (id === '_enable_light') {
          avatarManager.setLight(0.8);
        }
        else if (id === '_white_wall') {
          avatarManager.setWallColor(0xA0A0A0);
        } else if (id === '_gray_wall') {
          avatarManager.setWallColor(0x111111);
        } else if (id === '_green_wall') {
          avatarManager.setWallColor(0x71b76f);
        } else if (id === '_wooden_floor') {
          avatarManager.setFloorMaterial('floor_wooden');
        } else if (id === '_floor') {
          avatarManager.setFloorMaterial('floor');
        }
        else if (id === '_standard') {
          avatarManager.jumpTo('standard');
        }
        else if (id === '_premial') {
          avatarManager.jumpTo('premial');
        }
      } else {
        avatarManager._speakAboutRoom(id);
      }
    }
  }

  _sayAboutObject(id, avatarManager) {
    if (this._mainInstance !== undefined) {
      if (id === '_room') {
        avatarManager.proceedSpeak();
      }
    }
  }
}
