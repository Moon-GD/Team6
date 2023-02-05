import { navBarView } from "./navBarView.js";

const mainView = () => {
    const $mainViewContainer = document.createElement("section");
    const $mainViewContent = document.createElement("section");

    $mainViewContent.innerHTML = `
        <section class="main">
            <section class="searchBar">
                <div class="searchBar__left">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="60" viewBox="0 0 120 120" fill="#fff">
                        <path xmlns="http://www.w3.org/2000/svg" d="M32.0993 0.386597V17.3706H20.2353C9.47856 17.3706 0.461898 27.0515 0.461898 38.6007V47.0927C0.461898 58.6419 7.42213 68.1529 17.7043 71.0402L58.2002 82.2497C60.4148 82.929 63.5785 87.175 63.5785 89.7227V98.2147C63.5785 100.592 61.8385 102.461 59.6238 102.461H20.0771C18.1788 102.461 16.7552 101.781 16.1224 101.442V85.4766H0.303711V102.461C0.303711 108.235 3.46745 113.161 7.26394 115.708C10.9022 118.426 15.4897 119.445 20.0771 119.445H31.9411V136.429H47.7598V119.445H59.6238C70.5387 119.445 79.3972 109.934 79.3972 98.2147V89.7227C79.3972 78.1735 72.437 68.6624 62.1548 65.7752L21.659 54.5657C19.4443 53.8863 16.2806 49.6403 16.2806 47.0927V38.6007C16.2806 36.2229 18.0207 34.3547 20.2353 34.3547H59.782C61.5221 34.3547 63.104 35.034 63.7367 35.3737V51.3387H79.5554V34.3547C79.5554 28.5801 76.3917 23.6547 72.5952 21.1071C68.9569 18.3897 64.3695 17.3706 59.782 17.3706H47.918V0.386597L32.0993 0.386597Z" fill="#fff"/>
                    </svg>
                    <h1>나의 절약 현황</h1>
                </div>
                <div class="searchBar__right">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="60" viewBox="0 0 100 120" fill="#fff">
                        <path xmlns="http://www.w3.org/2000/svg" d="M65.172 100.621H64.8371C63.6085 100.547 62.4389 100.069 61.5101 99.2614C60.5813 98.4538 59.9455 97.3618 59.7016 96.1554L51.1052 53.899C50.8864 52.8262 50.357 51.8415 49.5828 51.0673C48.8086 50.2931 47.8239 49.7637 46.7511 49.5449L4.49469 40.9485C3.28601 40.7085 2.19072 40.0752 1.37963 39.1475C0.568541 38.2197 0.0872346 37.0497 0.0107628 35.8198C-0.065709 34.5899 0.266953 33.3692 0.956876 32.3481C1.6468 31.3271 2.6552 30.563 3.82484 30.1751L93.1383 0.422536C94.1409 0.0085846 95.2423 -0.104334 96.3079 0.0975839C97.3736 0.299502 98.3574 0.807508 99.139 1.55951C99.9206 2.31151 100.466 3.27493 100.709 4.33201C100.952 5.38909 100.882 6.49404 100.507 7.51179L70.7541 96.8253C70.3657 97.9807 69.6098 98.9771 68.6019 99.6626C67.5939 100.348 66.3893 100.685 65.172 100.621Z" fill="#fff"/>
                    </svg>
                    <h1>출발지/도착지 주유소 검색</h1>
                </div>
                </section>
                <img class="chatBotArea__img" src="./public/img/chatBot.png" alt="chatBot">
                <section class="explainAreaArray">
                <section class="explainArea" id="explainArea--1">
                    <div class="explainArea__text">
                        <h1>간단한 회원가입 폼</h1>
                        <h2>ID와 비밀번호만을 통해 가입할 수 있어요.</h2>
                    </div>
                    <img class="explainArea__phone" src="./public/img/phone_01.png" alt="phone_01">
                </section>
                <section class="explainArea" id="explainArea--2">
                    <div class="explainArea__text">
                        <h1>깔끔한 검색 뷰와 편리한 가격 비교</h1>
                        <h2>
                            현재 위치에서 가격순, 거리순, 인기순을 선택하여 <br>
                            주유소 기름 가격을 검색할 수 있어요. <br>
                        </h2>
                    </div>
                    <img class="explainArea__phone" src="./public/img/phone_02.png" alt="phone_02">
                </section>
                <section class="explainArea" id="explainArea--3">
                    <div class="explainArea__text">
                        <h1>출발지와 도착지의 경로를 통한 검색</h1>
                        <h2>
                            출발지와 도착지를 검색하면 경로를 예상해요. <br>
                            예상된 경로 중 당신에게 알맞은 주유소를 보여줘요. <br>
                        </h2>
                    </div>
                    <img class="explainArea__phone" src="./public/img/phone_03.png" alt="phone_03">
                </section>
            </section>
        </section>
    `

    $mainViewContainer.appendChild(navBarView());
    $mainViewContainer.appendChild($mainViewContent);


    return $mainViewContainer;
}

export { mainView }