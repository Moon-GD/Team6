import { pipe } from "../common/function.js";

NodeList.prototype.forEach = Array.prototype.forEach;

const getChatTextArray = ($chatBotContent) => $chatBotContent.querySelectorAll(".chatBotArea__chat");

const deleteChatNode = () => pipe(
    ($chatTextArray) => $chatTextArray.forEach(($chatText) => $chatText.remove())
)(document.querySelectorAll(".chatBotArea__chat"));

const initializeChatBotContent = ($chatBotContent) => {
    $chatBotContent.remove();
}

export { getChatTextArray, initializeChatBotContent, deleteChatNode }