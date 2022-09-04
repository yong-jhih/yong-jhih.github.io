var list = []; // 1~28
var oddsList = []; // 1~9
for (i = 1; i <= 28; i++) {
    list.push(i);
}
for (i = 1; i <= 9; i++) {
    oddsList.push(i);
}
var odds = [10, 6, 5, 4, 3.5, 3, 2.5, 2, 1.5];
var typeOf = {
    "1": "carrot",
    "2": "strawberry",
    "3": "cherry",
    "4": "watermelon",
    "5": "orange",
    "6": "cranberry",
    "7": "tomato",
    "8": "grape",
    "9": "cherry",
    "10": "strawberry",
    "11": "cranberry",
    "12": "carrot",
    "13": "orange",
    "14": "tomato",
    "15": "carrot",
    "16": "orange",
    "17": "tomato",
    "18": "cherry",
    "19": "cranberry",
    "20": "watermelon",
    "21": "grape",
    "22": "tomato",
    "23": "cherry",
    "24": "carrot",
    "25": "strawberry",
    "26": "carrot",
    "27": "pineapple",
    "28": "cranberry"
};
fruitName = ["pineapple", "watermelon", "grape", "strawberry", "orange", "cherry", "tomato", "cranberry", "carrot"];
var coinAdjustList = new Array(9); // bet money Matrix
var totallInsert = 0; // totall bet money
var runEndNum = 0; // stop at list[0~27]
var result = 0; // bonus
var randNum = 0; // number 1~28
var insertMoney = 1000;
var increseMoney = 100;
var decreseMoney = 100;

// set bet money
function changeMode(setCoin) {
    increseMoney = parseInt(setCoin);
    decreseMoney = parseInt(setCoin);
    switch (setCoin) {
        case 100:
            document.getElementById("100").style.opacity = 0.5;
            document.getElementById("200").style.opacity = 1;
            document.getElementById("500").style.opacity = 1;
            break;
        case 200:
            document.getElementById("100").style.opacity = 1;
            document.getElementById("200").style.opacity = 0.5;
            document.getElementById("500").style.opacity = 1;
            break;
        case 500:
            document.getElementById("100").style.opacity = 1;
            document.getElementById("200").style.opacity = 1;
            document.getElementById("500").style.opacity = 0.5;
            break;
    }
}

// Odds & Board Set
$(document).ready(function () {
    for (i = 1; i <= 28; i++) {
        document.getElementById(i).style.backgroundImage = `url("img/${typeOf[i]}.png")`;
    }
    document.getElementById("100").style.opacity = 0.5;
    for (i = 1; i <= 9; i++) {
        new Vue({
            el: `#odds${i}`,
            data: {
                messege: `X${odds[i-1]}`,
                pic: `img/${fruitName[i-1]}.png`
            }
        })
    }
})

// +bet money
function increse(i) {
    var Id = ("coinAdjust" + i);
    if (coin.value >= increseMoney) {
        document.getElementById(Id).value = parseInt(document.getElementById(Id).value) + increseMoney;
        coin.value = coin.value - increseMoney;
    } else {
        alert("請投幣");
    }
}

// -bet money
function decrese(i) {
    var Id = ("coinAdjust" + i);
    if (document.getElementById(Id).value >= decreseMoney) {
        document.getElementById(Id).value = parseInt(document.getElementById(Id).value) - decreseMoney;
        coin.value = parseInt(coin.value) + decreseMoney;
    }
}

// coinAdjustList
function coinAdjust() {
    for (i = 0; i <= 8; i++) {
        coinAdjustList[i] = document.getElementById("coinAdjust" + parseInt(i + 1)).value;
    }
}

// totallInsert
function totall() {
    for (i = 0; i <= 8; i++) {
        totallInsert = parseInt(totallInsert) + parseInt(coinAdjustList[i]);
    }
}

// clearn coinAdjustList & totallInsert
function clearAdjust() {
    coinAdjustList = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    totallInsert = 0;
    result = 0;
}

// give money
function btnInsert() {
    coin.value = parseInt(coin.value) + insertMoney;
}

// lock startButton
var isClick = false;

function lockClick() {
    isClick = !isClick;
    document.getElementById("startButton").disabled = isClick ? true : false;
}

var lightClean = 0;

function btnStart() {
    document.getElementById("Gold").innerHTML = "";
    document.getElementById("Gold").classList.remove("font");
    document.getElementById("odds" + oddsList[lightClean]).classList.remove("yellowLight");
    clearAdjust();
    lockClick();
    coinAdjust();
    totall();
    if (totallInsert != 0) {
        randNum = Math.floor(Math.random() * 28 + 1);
        for (i = 0; i <= 8; i++) {
            if (fruitName[i] == typeOf[randNum]) {
                result = odds[i] * parseInt(coinAdjustList[i]) + parseInt(result);
            }
        }
        var t = 40;
        var times = 1;
        let startGame = setTimeout(function go() {
            for (j = 1; j <= 28; j++) {
                document.getElementById(j).className = "normal";
            }
            if (runEndNum >= 28) {
                runEndNum = 0;
            }
            document.getElementById(list[runEndNum]).className = "yellowLight";
            times++;
            runEndNum++;
            if (times > 28) { // speed down
                if (randNum - 14 > 0 && randNum - 14 == runEndNum) {
                    t = 500;
                } else if (randNum - 14 <= 0 && randNum + 14 == runEndNum) {
                    t = 500;
                }
            }
            startGame = setTimeout(go, t);
            if (t == 500 && randNum == runEndNum) {
                clearTimeout(startGame);
                for (i = 0; i <= 8; i++) {
                    if (fruitName[i] == typeOf[randNum]) {
                        lightClean = i;
                    }
                }
                document.getElementById("odds" + oddsList[lightClean]).className = "yellowLight";
                if (result != 0 && totallInsert < result) {
                    document.getElementById("Gold").innerHTML = "Congratulations~" + result;
                } else if (result != 0 && totallInsert >= result) {
                    document.getElementById("Gold").innerHTML = "Congratulations~" + result + " , but you still lose " + (totallInsert - result);
                } else {
                    document.getElementById("Gold").innerHTML = "thank you for letting everybody have game to play";
                }
                document.getElementById("Gold").className = "font";
                coin.value = parseInt(coin.value) + result;
                // clear bet money or not
                if (coin.value < totallInsert) {
                    for (i = 0; i <= 8; i++) {
                        document.getElementById("coinAdjust" + parseInt(i + 1)).value = 0;
                    }
                } else {
                    coin.value = coin.value - totallInsert;
                }
                lockClick();
            }
        }, 20);

    } else {
        lockClick();
        alert("please bet money");
    }
}