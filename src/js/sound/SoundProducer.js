import AudioManager from 'audio-manager';

export default class SoundProducer {

  constructor(audioConfig) {

    this._audioConfig = audioConfig;

    this._audioInited = false;

    const channelIds = ['speech', 'music'];

    this._audioManager = new AudioManager(channelIds);
    this._audioManager.settings.audioPath = 'assets/audio/';

    this._audioManager.settings.getFileUri = this._getAudioPath;

    this._currentSound = undefined;

    this._preloadMusic(this._audioManager);
  }

  _getAudioPath(audioPath, id) {
    return audioPath + id;
  }

  mute() {
    if (this._audioInited) {
      this._audioManager.setMute();
    }
  }

  unmute() {
    if (!this._audioInited) {
      this._audioManager.init();
      this._setAudioVolume(this._audioManager);
      this._playBackgroundAudio(this._audioManager);
      this._audioInited = true;
    }
  }

  _setAudioVolume(audioManager) {
    audioManager.setVolume('speech', 0.4);
    audioManager.setVolume('music', 0.03);
  }

  _preloadMusic(audioManager) {
    audioManager.createSound(this._getAudio('background')).load();
  }

  _getAudio(audioId) {
    return audioId + '.wav';//'.mp3';
  }

  _playBackgroundAudio(audioManager) {
    const panoramic = 0.9;

    //audioManager.playSound('music', this._getAudio('background'));
  }

  say(id) {

    this.stopSpeaking();

    //this.disableMicrophone();

    const sound = this._playSound(this._audioManager, 'speech', id);

    this._currentSound = sound;

    return sound;
  }

  _playSound(audioManager, channel, id) {
    return audioManager.playSound(channel, this._getAudio(id));
  }

  stopSpeaking() {
    if (this._currentSound !== undefined) {
      this._currentSound.stop();
      this._currentSound = undefined;
    }
  }

  getEmptySound(){
    return this._audioManager.getEmptySound('speech');
  }
}
