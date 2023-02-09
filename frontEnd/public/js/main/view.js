import { navBarView } from "../navbar/view.js";
import { eventToChatBot } from "./event.js";
import { getChatBotTemplate, getMainViewContentTemplate, getManagerChatTemplate, getMyPageAnswerChatTemplate01, getMyPageAnswerChatTemplate02 } from "./template.js";

const mainView = () => {
    const $mainViewContainer = document.createElement("section");
    const $mainViewContent = document.createElement("section");

    $mainViewContent.innerHTML = getMainViewContentTemplate();

    const $chatBotImg = $mainViewContent.querySelector(".chatBotArea__img");
    
    eventToChatBot($chatBotImg);

    $mainViewContainer.appendChild(navBarView());
    $mainViewContainer.appendChild($mainViewContent);

    return $mainViewContainer;
}

const chatBotView = () => {
    const $chatBotContainer = document.createElement("section");
    $chatBotContainer.classList.add("chatBotArea");
    $chatBotContainer.innerHTML = getChatBotTemplate();

    return $chatBotContainer;
}

const chatBotManagerView = () => {
    const $chatBotManagerView = document.createElement("div");
    $chatBotManagerView.classList.add("chatBotArea__managerProfile");
    $chatBotManagerView.innerHTML = getManagerChatTemplate();

    return $chatBotManagerView;
}

const chatBotAnswerView__myPage01 = () => {
    const $answerMyPage01 = document.createElement("div");
    $answerMyPage01.classList.add("chatBotArea__answer");
    $answerMyPage01.innerHTML = getMyPageAnswerChatTemplate01();

    return $answerMyPage01;
}

const chatBotAnswerView__myPage02 = () => {
    const $answerMyPage02 = document.createElement("div");
    $answerMyPage02.classList.add("chatBotArea__answer");
    $answerMyPage02.innerHTML = getMyPageAnswerChatTemplate02();

    return $answerMyPage02;
}

export { 
    mainView, chatBotView, 
    chatBotAnswerView__myPage01, chatBotAnswerView__myPage02,
    chatBotManagerView
}