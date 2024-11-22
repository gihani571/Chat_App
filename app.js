const chatList = [];

function sendMassage() {
  console.log("Send!!");

  let txtUserInput = document.getElementById("txtUserInput").value;
  let chatBox = document.getElementById("chatBox").value;

  let chatBubble = "";

  chatBubble = `<p id="send" class="message sent">${txtUserInput}</p>`;

  chatList.push(chatBubble);
  loadChatBox();

  console.log("Hello");

  // --------------------------------------------------------------
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    contents: [
      {
        parts: [
          {
            text: txtUserInput,
          },
        ],
      },
    ],
  });
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=Your_API_KEY",
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      console.log(result.candidates[0].content.parts[0].text);

      chatBubble = `<p class="message received" id="received">${result.candidates[0].content.parts[0].text}</p>`;
      chatList.push(chatBubble);
      loadChatBox();
    })
    .catch((error) => console.error(error));

  // --------------------------------------------------------------
  loadChatBox();
}

function loadChatBox() {
  document.getElementById("chatBox").innerHTML = "";
  chatList.forEach((element) => {
    document.getElementById("chatBox").innerHTML += element;
  });
}

// ----------------------------------------------------------------------

function loadChatBox() {
  document.getElementById("chatBox").innerHTML = "";
  chatList.forEach((element) => {
    document.getElementById("chatBox").innerHTML += element;
  });
}
