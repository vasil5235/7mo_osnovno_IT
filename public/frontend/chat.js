const websocket = new WebSocket('wss://liftup-rb7p.onrender.com/messages');

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
        event.data = "";
    }
    div.appendChild(p);
    container.appendChild(div);
}