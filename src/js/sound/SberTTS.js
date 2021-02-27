
export default class SberTTS {


  constructor() {
    this._url = "https://dh.arvr.sberlabs.com/dh/api/v1/tts";
    this._params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer aEdza4JybX84D6Zz',
        'mode': 'no-cors'
      }
    }
  }

  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  getSound(text, callback){
    const data = {
      "data":
        {
          "id": this.uuidv4(),
          "type": "textToSpeech",
          "attributes":
            {
              "tts": {
                "text": text,
                "textType": "application/text"
              }
            }
        }
    };

    this._params.body = JSON.stringify(data);

    fetch(this._url, this._params)
      .then(response => response.blob())
      .then(myBlob => {
        console.log(myBlob);
        callback(myBlob);
      });

  }

}
