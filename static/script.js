document
  .getElementById("transpileForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const inputLanguageSelect = document.getElementById("inputLanguage");
    const inputLanguage =
      inputLanguageSelect.value === "other"
        ? document.getElementById("otherLanguage").value
        : inputLanguageSelect.value;

    const targetLanguageSelect = document.getElementById("targetLanguage");
    const targetLanguage =
      targetLanguageSelect.value === "other"
        ? document.getElementById("otherTargetLanguage").value
        : targetLanguageSelect.value;

    const codeInput = document.getElementById("code").value;

    
    fetch("/transpile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputLanguage, targetLanguage, code: codeInput }),
    })
      .then((response) => response.json())
  .then((data) => {
    const responseElement = document.getElementById("response");
    const codePre = document.createElement("pre");
    codePre.textContent = data.response;
    responseElement.innerHTML = "";  // Clear existing content
    responseElement.appendChild(codePre);
  })
      .catch((error) => {
        console.error("Error:", error);
      });
  });


//   .then((data) => {
//     const responseElement = document.getElementById("response");
//     const codePre = document.createElement("pre");
//     codePre.textContent = data.response;
//     responseElement.innerHTML = "";  // Clear existing content
//     responseElement.appendChild(codePre);
// })
// .catch((error) => {
//     console.error("Error:", error);
// });

// Handle the display of the "Other" input field
document
  .getElementById("inputLanguage")
  .addEventListener("change", function () {
    const otherLanguageGroup = document.getElementById("otherLanguageGroup");
    if (this.value === "other") {
      otherLanguageGroup.style.display = "block";
    } else {
      otherLanguageGroup.style.display = "none";
    }
  });

document
  .getElementById("targetLanguage")
  .addEventListener("change", function () {
    const otherTargetLanguageGroup = document.getElementById(
      "otherTargetLanguageGroup"
    );
    if (this.value === "other") {
      otherTargetLanguageGroup.style.display = "block";
    } else {
      otherTargetLanguageGroup.style.display = "none";
    }
  });
