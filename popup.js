document.addEventListener('DOMContentLoaded', main, false)

function main() {

    var shortenButton = document.getElementById("shorten");
    if(shortenButton) {
        shortenButton.addEventListener('click', onClick);
    }

}

function onClick() {

  let result = document.getElementById("result");
  let resultAlt = document.getElementById("result-alt");
    
  chrome.tabs.query({
      active: true,
      currentWindow: true
  }, function(tabs) {
    var activeURL = tabs[0].url;
    shortenUrl(activeURL).then(data => {
      shortenedUrl = data["URL"];
      if (shortenedUrl) {
        shortUrl = shortenedUrl.split("/")[2]
        result.innerHTML = "www.goshort.xyz/s/"+shortUrl;
        navigator.clipboard.writeText("www.goshort.xyz/s/"+shortUrl)
        resultAlt.innerHTML = "Copied to clipboard!"
      }
    })
  })
    
    // let activeUrl = window.location.href;
    // let result = document.getElementById("result");

    // shortenUrl(activeUrl).then(data => {
    //     console.log(data["URL"])
    //     result.innerHTML = data["URL"]
    // })

}

// function shortenTab(tabs) {
//     var activeTab = tabs[0];
//     var activeTabURL = activeTab.url;
//     alert(activeTabURL);
//     let result = document.getElementById("result");

//     shortenUrl(activeTabURL).then(data => {
//         result.innerHTML = data["URL"];
//     });

// }

async function shortenUrl(url) {
    let apiUrl = "https://goshrt.herokuapp.com/api/latest/shorten";

    var data = JSON.stringify({
        "url": url
    })

    var reqHeaders = {
        'Content-Type': 'application/json'
    }

    var options = {
        method: 'POST',
        headers: reqHeaders,
        mode: 'cors',
        body: data
    }

    const res = await fetch(apiUrl, options)

    return res.json()

}