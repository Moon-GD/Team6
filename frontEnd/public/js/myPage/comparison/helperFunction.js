import { _$, parseNumberToMoneyString, changeCSS } from "../../common/function";

const imageLocationMapper = {
    "사탕": "https://team6-public-image.s3.ap-northeast-2.amazonaws.com/food/candy.png",
    "아이스 아메리카노": "https://team6-public-image.s3.ap-northeast-2.amazonaws.com/food/coffee.png",
    "햄버거 세트": "https://team6-public-image.s3.ap-northeast-2.amazonaws.com/food/hamburger.png",
    "국밥": "https://team6-public-image.s3.ap-northeast-2.amazonaws.com/food/rice.png",
    "치킨": "https://team6-public-image.s3.ap-northeast-2.amazonaws.com/food/chicken.png",
};

const genderMapper = {
    "MALE": "남자",
    "FEMALE": "여자"
}

const getCompareText = (mySavePrice) => {
    if(mySavePrice > 0) {
        return `이번 달은 <span>${getImageName(mySavePrice)}</span> 만큼 절약했어요! 😁`;
    }
    else if(mySavePrice < 0) {
        return `이번 달은 <span>${getImageName(mySavePrice)}</span> 만큼 더 소비했어요! 🥲`;
    }

    return "이번 달은 다른 사람들만큼 사용했네요!";
}

const getImageName = (savePrice) => {
    if(savePrice >= 20_000) {
        return "치킨";
    }
    else if(savePrice >= 10_000) {
        return "국밥";
    }
    else if(savePrice >= 5_000) {
        return "햄버거 세트";
    }
    else if(savePrice >= 1_000) {
        return "아이스 아메리카노";
    }
    else if(savePrice >= 0) {
        return "사탕";
    }
}

const setImageByName = ($image, imageName) => $image.setAttribute("src", imageLocationMapper[imageName]);

const adjustChartsOnCard = (myPrice, commonPrice, $container) => {
    const $myChart = _$(".oilInfoArea__myChart", $container);
    const $commonChart = _$(".oilInfoArea__otherChart", $container);
    const upperBound = Math.max(myPrice, commonPrice);

    let myPercent = myPrice / upperBound * 100;
    let commonPercent = commonPrice / upperBound * 100;

    changeCSS($myChart, "height", `${myPercent}%`);
    changeCSS($commonChart, "height", `${commonPercent}%`);
}

const makeComparisonTitle = ($title, userSavePrice) => 
    $title.innerHTML = getCompareText(userSavePrice);

const makeUserOilExpenditureCard = ($userPriceText, userPrice) => 
    $userPriceText.innerHTML = parseNumberToMoneyString(userPrice);

const makeUserSaveCard = ($container, userSavePrice) => {
    const $commonPriceText = _$(".oilInfoArea__compareMySaveBox > h1", $container);
    $commonPriceText.innerHTML = parseNumberToMoneyString(userSavePrice);

    let priceDiffColor = "red";
    if(userSavePrice < 0) {
        priceDiffColor = "#3181F6";
    }
    else if(userSavePrice === 0) {
        priceDiffColor = "#000";
    }

    changeCSS($commonPriceText, "color", priceDiffColor);
}

const makeComparisonSecondTitle = ($title, age, gender, percent) => 
    $title.innerHTML = `절약 금액은 ${age} ${genderMapper[gender]} 중  <span>상위 ${percent}%</span>  입니다.`;

const makeCommonSaveCard = ($card, age, gender, commonSavePrice) => {
    const $cardTitle = _$("h3", $card);
    const $cardContent = _$("h1", $card);

    $cardTitle.innerHTML = `<span>${age} ${genderMapper[gender]}</span> 절약 금액`;
    $cardContent.innerHTML = parseNumberToMoneyString(commonSavePrice);
}

const makeChartCard = ($card, userSavePrice, commonSavePrice, userID, age, gender) => {
    const $userText = _$(".oilInfoArea__chartValueText--user", $card);
    const $commonText = _$(".oilInfoArea__chartValueText--common", $card);
    const $userInfoText = _$(".oilInfoArea__chartNameArea--name", $card);
    const $commonInfoText = _$(".oilInfoArea__chartNameArea--info", $card);

    $userText.innerHTML = parseNumberToMoneyString(userSavePrice);
    $commonText.innerHTML = parseNumberToMoneyString(commonSavePrice);
    $userInfoText.innerHTML = userID;
    $commonInfoText.innerHTML = `${age} ${gender}`;

    adjustChartsOnCard(userSavePrice, commonSavePrice, $card);
}

const makeComparisonCards = ($container, userOilPrice, averageEcoPrice, userSavePrice, percent, age, gender, userID) => {
    const $firstTitle = _$(".oilInfoArea__compareTitle", $container);
    const $userSaveCardContent = _$(".oilInfoArea__compareMyBox > h1", $container);
    const $secondTitle = _$(".oilInfoArea__otherText", $container);
    const $commonSaveCard = _$(".oilInfoArea__compareAgeCommonBox", $container);
    const $chartBox = _$(".oilInfoArea__chartBox", $container);
    const $compareImageBox = _$(".oilInfoArea__compareImgBox", $container);
    const $compareImage = document.createElement("img");

    $compareImageBox.appendChild($compareImage);

    makeComparisonTitle($firstTitle, userSavePrice);
    makeUserOilExpenditureCard($userSaveCardContent, userOilPrice);
    makeUserSaveCard($container, userSavePrice);
    makeComparisonSecondTitle($secondTitle, age, gender, percent);
    makeCommonSaveCard($commonSaveCard, age, gender, averageEcoPrice);
    makeChartCard($chartBox, userSavePrice, averageEcoPrice, userID, age, gender);
    setImageByName($compareImage, getImageName(userSavePrice));
}

export { makeComparisonCards }