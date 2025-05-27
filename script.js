const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");


let random = 0;
function randomNumber() {
    random = Math.ceil(Math.random() * 10);
}

async function getQuote() {
    quoteText.textContent = "Loading...";
    quoteAuthor.textContent = "";

    randomNumber();
    console.log(random);

  try {
    const response = await fetch("https://api.freeapi.app/api/v1/public/quotes");
    const data = await response.json();

    const quote = data.data.data;
    // console.log(data);
    
    let randomQuote = quote[random];

    quoteText.textContent = `" ${randomQuote.content} "`;
    quoteAuthor.textContent = `${randomQuote.author}`;

    // Change background
    document.body.style.backgroundImage = `url('https://source.unsplash.com/random/1920x1080?sig=${Math.random()}')`;

  } catch (error) {
    quoteText.textContent = "Failed to fetch quote.";
    // console.error(error);
  }
}

function copyQuote() {
  const text = `${quoteText.textContent} ${quoteAuthor.textContent}`;
  navigator.clipboard.writeText(text);
  alert("Quote copied to clipboard!");
}

function tweetQuote() {
  const text = `${quoteText.textContent} ${quoteAuthor.textContent}`;
  const url = `https://x.com/intent/post?text=${text}`;
  window.open(url, "_blank");
}

function exportImage() {
  html2canvas(document.getElementById("quote-container")).then(canvas => {
    const link = document.createElement("a");
    link.download = "quote.png";
    link.href = canvas.toDataURL();
    link.click();
  });
}

// Load first quote
getQuote();
