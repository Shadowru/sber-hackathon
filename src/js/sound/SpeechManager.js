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

    this._chatBotManager = new ChatBotManager();

    this._prevListenWords = '';

    this._sberTTS = new SberTTS();

  }

  _playSound(audioBlob){
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


    this._prevListenWords = listenWords;

    Object.keys(words).forEach((key, index) => {
      const wordList = words[key];
      for (const wordListElement of wordList) {
        const wordListElements = wordListElement.split(' ');
        const found = this._searchWordEntry(wordListElements, listenWords);
        if (found) {
          console.log(key);
          if (key.startsWith('_')) {
            this.sayAboutObject(key);
          } else {
            this.say(key);
          }
          return;
        }
      }
    });

    console.log('Listen words', listenWords);

    this._chatBotManager.chat(listenWords, (result) => {
      console.log(result);

      this._sberTTS.getSound(result, (wavBuffer) => {
        this._playSound(wavBuffer)
      });

    });

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

  sayAboutObject(key) {
    if (this._mainInstance !== undefined) {
      if (key === '_room') {
        const avatarManager = this._mainInstance.getAvatarManager();
        if (avatarManager !== undefined) {
          avatarManager.proceedSpeak();
        }
      }
    }
  }
}
