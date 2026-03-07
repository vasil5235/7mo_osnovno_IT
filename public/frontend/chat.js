const websocket = new WebSocket('ws://192.168.1.116:3000/messages');

let message = document.getElementById('message');
let container = document.getElementById('messages');
websocket.onopen = () => {
    document.addEventListener('submit', function (event) {
        event.preventDefault();
        console.log(message.value);
        websocket.send(message.value);

    })

};

websocket.onmessage = function (event) {
    console.log(event.data);
    let p = document.createElement('p');
    let div = document.createElement('div');
    p.innerText = event.data;
    if(message.value !== event.data) {
        div.style.backgroundColor = "green";

    }
    else {
        div.style.backgroundColor = "blue";
        message.value = "";
    }
    div.appendChild(p);
    container.appendChild(div);
}