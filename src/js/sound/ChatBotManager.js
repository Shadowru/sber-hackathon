export default class ChatBotManager {


  constructor() {

    this._url = "https://dh.arvr.sberlabs.com/dh/api/v1/chat";
    this._params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer aEdza4JybX84D6Zz',
        'mode': 'no-cors'//'cors', // no-cors, *cors, same-origin
      }
    }

    this.history = [];

  }

  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  chat(listenWords, callback) {

    const maxHistory = 10;

    if(this.history.length > maxHistory){
      this.history = this.history.slice(this.history.length - maxHistory);
    }

    this.history.push(listenWords);

    const data = {
      "data":
        {
          // (опционально) произвольный uuid-v4 запроса (генерируется на клиенте)
          // в дальнейшем может быть использован для отладки сервера
          "id": this.uuidv4(),

          // зарезервировано, всегда равен 'chat'
          "type": "chat",

          "attributes":
            {
              "chat": {
                "engine": "latest",
                "history": this.history
              }
            }
        }
    };

    this._params.body = JSON.stringify(data);

    fetch(this._url, this._params)
      .then(response => response.json())
      .then(json => {
        //console.log(json);
        callback(json.reply);
      });
  }
}
