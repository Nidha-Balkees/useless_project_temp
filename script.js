// =====================================================
// NATURALLY USELESS
// COMPLETE WORKING JAVASCRIPT
// =====================================================


// =====================================================
// GLOBAL VARIABLES
// =====================================================

let score = 0;
let lives = 3;
let timeLeft = 30;

let currentAnimal = "";

let timerInterval = null;
let newsInterval = null;
let newsCloseTimeout = null;

let squirrelStep = 1;

let fishX = 80;
let fishY = 220;

let birdX = 100;
let birdY = 220;
let birdVelocityY = 0;

let birdGameRunning = false;
let gameFinished = false;

let newsCount = 0;


// =====================================================
// BIRD SETTINGS
// =====================================================

const birdGravity = 0.4;
const birdFlapPower = -7;
const birdMoveSpeed = 12;


// =====================================================
// SCREEN FUNCTIONS
// =====================================================

function hideAllScreens() {

    const screens = [
        "homeScreen",
        "animalScreen",
        "gameScreen",
        "resultScreen"
    ];

    screens.forEach(function (id) {

        const screen = document.getElementById(id);

        if (screen) {
            screen.classList.add("hidden");
        }

    });

}


// =====================================================
// START TRAINING BUTTON
// =====================================================

function showAnimals() {

    stopTimer();
    stopBirdGame();

    hideAllScreens();

    const animalScreen =
        document.getElementById("animalScreen");

    if (animalScreen) {

        animalScreen.classList.remove("hidden");

    }

    // Ridiculous announcement
    setTimeout(function () {

        showRandomNews();

    }, 800);

}


// =====================================================
// GO HOME
// =====================================================

function goHome() {

    stopTimer();
    stopBirdGame();

    hideAllScreens();

    const homeScreen =
        document.getElementById("homeScreen");

    if (homeScreen) {

        homeScreen.classList.remove("hidden");

    }

}


// =====================================================
// GO TO ANIMAL SELECTION
// =====================================================

function goAnimals() {

    stopTimer();
    stopBirdGame();

    hideAllScreens();

    const animalScreen =
        document.getElementById("animalScreen");

    if (animalScreen) {

        animalScreen.classList.remove("hidden");

    }

}


// =====================================================
// UPDATE GAME STATS
// =====================================================

function updateStats() {

    const scoreElement =
        document.getElementById("score");

    const livesElement =
        document.getElementById("lives");

    const timerElement =
        document.getElementById("timer");


    if (scoreElement) {
        scoreElement.innerText = score;
    }

    if (livesElement) {
        livesElement.innerText = lives;
    }

    if (timerElement) {
        timerElement.innerText = timeLeft;
    }

}


// =====================================================
// START ANIMAL GAME
// =====================================================

function startGame(animal) {

    currentAnimal = animal;

    score = 0;
    lives = 3;
    timeLeft = 30;

    squirrelStep = 1;

    fishX = 80;
    fishY = 220;

    birdX = 100;
    birdY = 220;
    birdVelocityY = 0;

    gameFinished = false;

    stopTimer();
    stopBirdGame();

    updateStats();

    hideAllScreens();


    // =================================================
    // SHOW GAME SCREEN
    // =================================================

    const gameScreen =
        document.getElementById("gameScreen");

    if (gameScreen) {

        gameScreen.classList.remove("hidden");

    }


    // =================================================
    // HIDE ALL ANIMAL GAMES
    // =================================================

    const games = [
        "squirrelGame",
        "fishGame",
        "birdGame"
    ];

    games.forEach(function (id) {

        const game =
            document.getElementById(id);

        if (game) {

            game.classList.add("hidden");

        }

    });


    // =================================================
    // RESET SQUIRREL
    // =================================================

    const squirrel =
        document.getElementById("squirrel");

    if (squirrel) {

        squirrel.style.bottom = "20px";
        squirrel.style.left = "47%";

    }


    // =================================================
    // RESET FISH
    // =================================================

    const fish =
        document.getElementById("fish");

    if (fish) {

        fish.style.left = fishX + "px";
        fish.style.top = fishY + "px";

    }


    // =================================================
    // RESET BIRD
    // =================================================

    const bird =
        document.getElementById("bird");

    if (bird) {

        bird.style.left = birdX + "px";
        bird.style.top = birdY + "px";

    }


    // =================================================
    // SQUIRREL
    // =================================================

    if (animal === "squirrel") {

        const squirrelGame =
            document.getElementById("squirrelGame");

        if (squirrelGame) {

            squirrelGame.classList.remove("hidden");

        }

        const title =
            document.getElementById("gameTitle");

        const subtitle =
            document.getElementById("gameSubtitle");

        if (title) {

            title.innerText =
                "🐿️ Squirrel Training";

        }

        if (subtitle) {

            subtitle.innerText =
                "Teaching a squirrel how to climb a tree.";

        }

    }


    // =================================================
    // FISH
    // =================================================

    if (animal === "fish") {

        const fishGame =
            document.getElementById("fishGame");

        if (fishGame) {

            fishGame.classList.remove("hidden");

        }

        const title =
            document.getElementById("gameTitle");

        const subtitle =
            document.getElementById("gameSubtitle");

        if (title) {

            title.innerText =
                "🐟 Fish Training";

        }

        if (subtitle) {

            subtitle.innerText =
                "Teaching a fish how to swim.";

        }

    }


    // =================================================
    // BIRD
    // =================================================

    if (animal === "bird") {

        const birdGame =
            document.getElementById("birdGame");

        if (birdGame) {

            birdGame.classList.remove("hidden");

        }

        const title =
            document.getElementById("gameTitle");

        const subtitle =
            document.getElementById("gameSubtitle");

        if (title) {

            title.innerText =
                "🐦 Bird Training";

        }

        if (subtitle) {

            subtitle.innerText =
                "Teaching a bird how to fly.";

        }

        // START BIRD PHYSICS
        startBirdGame();

    }


    // =================================================
    // START MESSAGE
    // =================================================

    const message =
        document.getElementById("message");

    if (message) {

        message.innerText =
            "Training started! This animal already knows this. 🤡";

    }


    // =================================================
    // START TIMER
    // =================================================

    startTimer();


    // =================================================
    // RANDOM EMERGENCY
    // =================================================

    setTimeout(function () {

        if (!gameFinished) {

            showRandomNews();

        }

    }, 2000);

}


// =====================================================
// TIMER
// =====================================================

function startTimer() {

    stopTimer();

    timerInterval =
        setInterval(function () {

            if (gameFinished) {
                return;
            }

            timeLeft--;

            if (timeLeft < 0) {
                timeLeft = 0;
            }

            updateStats();


            if (timeLeft <= 0) {

                stopTimer();

                finishGame();

            }

        }, 1000);

}


// =====================================================
// STOP TIMER
// =====================================================

function stopTimer() {

    if (timerInterval !== null) {

        clearInterval(timerInterval);

        timerInterval = null;

    }

}


// =====================================================
// SQUIRREL GAME
// =====================================================

function squirrelClimb(branch) {

    if (gameFinished) {
        return;
    }

    if (currentAnimal !== "squirrel") {
        return;
    }


    const message =
        document.getElementById("message");

    const squirrel =
        document.getElementById("squirrel");


    // =================================================
    // CORRECT BRANCH
    // =================================================

    if (branch === squirrelStep) {

        score += 20;

        squirrelStep++;


        if (message) {

            message.innerText =
                "🐿️ Correct! The squirrel has discovered... climbing.";

        }


        if (squirrel) {

            if (branch === 1) {

                squirrel.style.bottom = "110px";
                squirrel.style.left = "25%";

            }

            if (branch === 2) {

                squirrel.style.bottom = "200px";
                squirrel.style.left = "60%";

            }

            if (branch === 3) {

                squirrel.style.bottom = "290px";
                squirrel.style.left = "30%";

            }

            if (branch === 4) {

                squirrel.style.bottom = "380px";
                squirrel.style.left = "65%";

            }

            if (branch === 5) {

                squirrel.style.bottom = "470px";
                squirrel.style.left = "40%";

                score = 100;

                if (message) {

                    message.innerText =
                        "🏆 AMAZING! You successfully taught a squirrel to climb.";

                }

                updateStats();

                setTimeout(function () {

                    finishGame();

                }, 1000);

                return;
            }

        }

    }


    // =================================================
    // WRONG BRANCH
    // =================================================

    else {

        lives--;

        if (message) {

            message.innerText =
                "❌ Wrong branch! The squirrel is questioning your teaching qualifications.";

        }


        if (lives <= 0) {

            lives = 0;

            updateStats();

            finishGame();

            return;

        }

    }


    updateStats();

}


// =====================================================
// FISH GAME
// =====================================================

function moveFish(event) {

    if (currentAnimal !== "fish") {
        return;
    }

    if (gameFinished) {
        return;
    }


    const fish =
        document.getElementById("fish");

    const water =
        document.querySelector(".water");


    if (!fish || !water) {
        return;
    }


    const allowedKeys = [
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight"
    ];


    if (!allowedKeys.includes(event.key)) {
        return;
    }


    event.preventDefault();


    const step = 20;


    // =================================================
    // MOVE FISH
    // =================================================

    if (event.key === "ArrowUp") {

        fishY -= step;

    }

    if (event.key === "ArrowDown") {

        fishY += step;

    }

    if (event.key === "ArrowLeft") {

        fishX -= step;

    }

    if (event.key === "ArrowRight") {

        fishX += step;

    }


    // =================================================
    // DYNAMIC BOUNDARIES
    // =================================================

    const maxX =
        water.clientWidth - fish.offsetWidth;

    const maxY =
        water.clientHeight - fish.offsetHeight;


    fishX =
        Math.max(
            0,
            Math.min(maxX, fishX)
        );


    fishY =
        Math.max(
            0,
            Math.min(maxY, fishY)
        );


    fish.style.left =
        fishX + "px";

    fish.style.top =
        fishY + "px";


    // =================================================
    // CHECK FOOD
    // =================================================

    const food =
        document.getElementById("food");

    if (!food) {

        updateStats();

        return;

    }


    const fishRect =
        fish.getBoundingClientRect();

    const foodRect =
        food.getBoundingClientRect();


    const fishCenterX =
        fishRect.left +
        fishRect.width / 2;

    const fishCenterY =
        fishRect.top +
        fishRect.height / 2;


    const foodCenterX =
        foodRect.left +
        foodRect.width / 2;

    const foodCenterY =
        foodRect.top +
        foodRect.height / 2;


    const distance =
        Math.sqrt(

            Math.pow(
                fishCenterX - foodCenterX,
                2
            )

            +

            Math.pow(
                fishCenterY - foodCenterY,
                2
            )

        );


    if (distance < 80) {

        score = 100;

        const message =
            document.getElementById("message");

        if (message) {

            message.innerText =
                "🐟 SUCCESS! You taught a fish to swim toward food.";

        }

        updateStats();


        setTimeout(function () {

            finishGame();

        }, 1000);

        return;

    }


    updateStats();

}


// =====================================================
// FISH KEYBOARD LISTENER
// =====================================================

document.addEventListener(
    "keydown",
    moveFish
);


// =====================================================
// 🐦 BIRD GAME
// GRAVITY + SPACE + LEFT/RIGHT
// =====================================================

function startBirdGame() {

    birdX = 100;
    birdY = 220;
    birdVelocityY = 0;

    birdGameRunning = true;


    const bird =
        document.getElementById("bird");


    if (bird) {

        bird.style.left =
            birdX + "px";

        bird.style.top =
            birdY + "px";

    }


    requestAnimationFrame(
        birdPhysics
    );

}


// =====================================================
// BIRD PHYSICS
// =====================================================

function birdPhysics() {

    if (
        !birdGameRunning ||
        currentAnimal !== "bird" ||
        gameFinished
    ) {

        return;

    }


    const bird =
        document.getElementById("bird");

    const sky =
        document.querySelector(".sky");


    if (!bird || !sky) {

        return;

    }


    // =================================================
    // GRAVITY
    // =================================================

    birdVelocityY += birdGravity;

    birdY += birdVelocityY;


    // =================================================
    // BOUNDARIES
    // =================================================

    const maxY =
        sky.clientHeight -
        bird.offsetHeight;


    const maxX =
        sky.clientWidth -
        bird.offsetWidth;


    // Bottom
    if (birdY >= maxY) {

        birdY = maxY;

        birdVelocityY = 0;


        const message =
            document.getElementById("message");


        if (message) {

            message.innerText =
                "🚨 EMERGENCY! THE BIRD IS FALLING! PRESS SPACE! 🐦";

        }

    }


    // Top
    if (birdY <= 0) {

        birdY = 0;

        birdVelocityY = 0;

    }


    // Left
    if (birdX < 0) {

        birdX = 0;

    }


    // Right
    if (birdX > maxX) {

        birdX = maxX;

    }


    // =================================================
    // UPDATE POSITION
    // =================================================

    bird.style.left =
        birdX + "px";

    bird.style.top =
        birdY + "px";


    requestAnimationFrame(
        birdPhysics
    );

}


// =====================================================
// BIRD KEYBOARD CONTROLS
// =====================================================

function controlBird(event) {

    if (currentAnimal !== "bird") {
        return;
    }

    if (gameFinished) {
        return;
    }


    const bird =
        document.getElementById("bird");

    const sky =
        document.querySelector(".sky");


    if (!bird || !sky) {
        return;
    }


    // =================================================
    // SPACE = FLY UP
    // =================================================

    if (event.code === "Space") {

        event.preventDefault();

        birdVelocityY =
            birdFlapPower;


        score += 5;

        score =
            Math.min(
                score,
                100
            );


        const message =
            document.getElementById("message");


        if (message) {

            message.innerText =
                "🐦 FLAP! The bird is flying HIGH!";

        }


        updateStats();

    }


    // =================================================
    // LEFT ARROW
    // =================================================

    if (event.key === "ArrowLeft") {

        event.preventDefault();

        birdX -= birdMoveSpeed;


        if (birdX < 0) {

            birdX = 0;

        }


        const message =
            document.getElementById("message");


        if (message) {

            message.innerText =
                "🐦 The bird is moving LEFT!";

        }

    }


    // =================================================
    // RIGHT ARROW
    // =================================================

    if (event.key === "ArrowRight") {

        event.preventDefault();

        birdX += birdMoveSpeed;


        const maxX =
            sky.clientWidth -
            bird.offsetWidth;


        if (birdX > maxX) {

            birdX = maxX;

        }


        const message =
            document.getElementById("message");


        if (message) {

            message.innerText =
                "🐦 The bird is moving RIGHT!";

        }

    }


    updateStats();

}


// =====================================================
// BIRD KEYBOARD LISTENER
// =====================================================

document.addEventListener(
    "keydown",
    controlBird
);


// =====================================================
// STOP BIRD GAME
// =====================================================

function stopBirdGame() {

    birdGameRunning = false;

}


// =====================================================
// RESULT SCREEN
// =====================================================

function finishGame() {

    if (gameFinished) {
        return;
    }


    gameFinished = true;

    stopTimer();
    stopBirdGame();


    hideAllScreens();


    const resultScreen =
        document.getElementById("resultScreen");


    if (resultScreen) {

        resultScreen.classList.remove("hidden");

    }


    // =================================================
    // FINAL SCORE
    // =================================================

    const finalScore =
        document.getElementById("finalScore");


    if (finalScore) {

        finalScore.innerText =
            score;

    }


    // =================================================
    // ANIMAL INFORMATION
    // =================================================

    let animalName = "";
    let animalEmoji = "";


    if (currentAnimal === "squirrel") {

        animalName = "Squirrel";
        animalEmoji = "🐿️";

    }


    if (currentAnimal === "fish") {

        animalName = "Fish";
        animalEmoji = "🐟";

    }


    if (currentAnimal === "bird") {

        animalName = "Bird";
        animalEmoji = "🐦";

    }


    const resultAnimal =
        document.getElementById("resultAnimal");


    if (resultAnimal) {

        resultAnimal.innerText =
            animalEmoji +
            " " +
            animalName;

    }


    // =================================================
    // SKILL
    // =================================================

    const skill =
        Math.min(
            score,
            100
        );


    // =================================================
    // SPEED
    // =================================================

    const speed =
        Math.min(
            Math.round(
                (timeLeft / 30) * 100
            ),
            100
        );


    // =================================================
    // SKILL BAR
    // =================================================

    const skillBar =
        document.getElementById("skillBar");

    const skillPercent =
        document.getElementById("skillPercent");


    if (skillBar) {

        skillBar.style.width =
            skill + "%";

    }


    if (skillPercent) {

        skillPercent.innerText =
            skill + "%";

    }


    // =================================================
    // SPEED BAR
    // =================================================

    const speedBar =
        document.getElementById("speedBar");

    const speedPercent =
        document.getElementById("speedPercent");


    if (speedBar) {

        speedBar.style.width =
            speed + "%";

    }


    if (speedPercent) {

        speedPercent.innerText =
            speed + "%";

    }


    // =================================================
    // NATURAL ABILITY
    // =================================================

    const naturalBar =
        document.getElementById("naturalBar");

    const naturalPercent =
        document.getElementById("naturalPercent");


    if (naturalBar) {

        naturalBar.style.width =
            "100%";

    }


    if (naturalPercent) {

        naturalPercent.innerText =
            "100%";

    }


    // =================================================
    // USELESSNESS
    // =================================================

    const uselessBar =
        document.getElementById("uselessBar");

    const uselessPercent =
        document.getElementById("uselessPercent");


    if (uselessBar) {

        uselessBar.style.width =
            "100%";

    }


    if (uselessPercent) {

        uselessPercent.innerText =
            "100%";

    }


    // =================================================
    // AI FEEDBACK
    // =================================================

    const feedbackText =
        document.getElementById("feedbackText");


    if (feedbackText) {

        feedbackText.innerText =
            "Excellent! You successfully taught " +
            animalName +
            " something it already knew. " +
            "Your training was completely unnecessary. 🤡";

    }


    // =================================================
    // CERTIFICATE
    // =================================================

    const certificateTitle =
        document.getElementById("certificateTitle");


    if (certificateTitle) {

        certificateTitle.innerText =
            "Certified " +
            animalName +
            " Trainer 🏅";

    }


    // =================================================
    // FINAL RIDICULOUS NEWS
    // =================================================

    setTimeout(function () {

        showRandomNews();

    }, 1500);

}


// =====================================================
// PLANNING / EMERGENCY NOTICES
// =====================================================

const planningNotices = [

    {
        department:
            "🏢 Urban Planning Department",

        headline:
            "BUILDING MAY FALL ON YOUR HEAD",

        text:
            "A nearby building has been scheduled for unexpected horizontal relocation. Officials recommend standing somewhere else."
    },


    {
        department:
            "🪐 Planetary Planning Authority",

        headline:
            "JUPITER HAS LOST SOME PIECES",

        text:
            "Scientists report that several completely imaginary pieces of Jupiter are travelling toward Earth. Please continue the animal training."
    },


    {
        department:
            "🐿️ Urban Wildlife Planning",

        headline:
            "SQUIRREL CLIMBS WITHOUT PERMIT",

        text:
            "Authorities are investigating a squirrel for climbing a tree without submitting Form 17-B."
    },


    {
        department:
            "🐟 Marine Planning Department",

        headline:
            "FISH ENTERS RESTRICTED SWIMMING ZONE",

        text:
            "The fish has moved into a highly regulated area of the ocean. A permit is being prepared."
    },


    {
        department:
            "✈️ Aviation Planning Authority",

        headline:
            "BIRD TAKES OFF WITHOUT PERMISSION",

        text:
            "A bird has begun flying without filing a flight plan."
    },


    {
        department:
            "🏗️ Construction Planning Department",

        headline:
            "CONSTRUCTION HAS BECOME CONFUSED",

        text:
            "Workers accidentally constructed a building where the road was supposed to be."
    },


    {
        department:
            "🌍 Global Planning Committee",

        headline:
            "WORLD MAY COLLAPSE SOON",

        text:
            "Experts have detected an extremely serious imaginary situation. Fortunately, your animal training remains unaffected."
    },


    {
        department:
            "📋 Department of Unnecessary Affairs",

        headline:
            "IMPORTANT NOTICE ABOUT NOTHING",

        text:
            "After a 7-hour emergency meeting, officials have concluded that nothing needs to happen."
    },


    {
        department:
            "🚦 Traffic Planning Authority",

        headline:
            "ROAD HAS MOVED 3 METRES",

        text:
            "Officials confirm that the road has apparently relocated itself. Drivers are advised to follow the road wherever it goes."
    },


    {
        department:
            "☁️ Weather Planning Department",

        headline:
            "CLOUD REFUSES TO MOVE",

        text:
            "A cloud has been stationary for 4 minutes. Authorities have classified this as extremely suspicious."
    },


    {
        department:
            "🍌 National Banana Infrastructure Board",

        headline:
            "BANANA DECLARED STRUCTURALLY UNSAFE",

        text:
            "Engineers are investigating whether bananas can support a building. Initial results are not encouraging."
    },


    {
        department:
            "📢 Department of Extremely Serious Problems",

        headline:
            "NOTHING HAS HAPPENED",

        text:
            "Officials have issued an emergency announcement confirming that absolutely nothing has happened."
    }

];


// =====================================================
// SHOW RANDOM NEWS
// =====================================================

function showRandomNews() {

    const toast =
        document.getElementById("newsToast");


    if (!toast) {

        console.warn(
            "newsToast was not found in index.html"
        );

        return;

    }


    const notice =
        planningNotices[
            Math.floor(
                Math.random() *
                planningNotices.length
            )
        ];


    newsCount++;


    const department =
        document.getElementById("newsDepartment");

    const headline =
        document.getElementById("newsHeadline");

    const text =
        document.getElementById("newsText");

    const ticker =
        document.getElementById("newsTicker");

    const tickerText =
        document.getElementById("tickerText");


    if (department) {

        department.innerText =
            notice.department;

    }


    if (headline) {

        headline.innerText =
            notice.headline;

    }


    if (text) {

        text.innerText =
            notice.text;

    }


    if (ticker) {

        ticker.classList.remove("hidden");

    }


    if (tickerText) {

        tickerText.innerText =
            "🚨 " +
            notice.headline;

    }


    toast.classList.remove("hidden");


    addNoticeToHistory(notice);


    const newsCountElement =
        document.getElementById("newsCount");


    if (newsCountElement) {

        newsCountElement.innerText =
            newsCount;

    }


    // Clear previous close timer
    if (newsCloseTimeout !== null) {

        clearTimeout(
            newsCloseTimeout
        );

    }


    // Close after 6 seconds
    newsCloseTimeout =
        setTimeout(function () {

            closeNews();

        }, 6000);

}


// =====================================================
// CLOSE NEWS
// =====================================================

function closeNews() {

    const toast =
        document.getElementById("newsToast");


    if (toast) {

        toast.classList.add("hidden");

    }

}


// =====================================================
// NOTICE HISTORY
// =====================================================

function addNoticeToHistory(notice) {

    const history =
        document.getElementById("noticeHistory");


    if (!history) {

        return;

    }


    const empty =
        history.querySelector(
            ".emptyHistory"
        );


    if (empty) {

        empty.remove();

    }


    const item =
        document.createElement("div");


    item.className =
        "noticeItem";


    const headline =
        document.createElement("strong");


    headline.innerText =
        notice.headline;


    const department =
        document.createElement("small");


    department.innerText =
        notice.department;


    item.appendChild(
        headline
    );

    item.appendChild(
        department
    );


    history.prepend(
        item
    );


    // Keep latest 10
    while (
        history.children.length > 10
    ) {

        history.removeChild(
            history.lastElementChild
        );

    }

}


// =====================================================
// AUTOMATIC RANDOM NEWS
// =====================================================

newsInterval =
    setInterval(function () {

        const toast =
            document.getElementById("newsToast");


        // Don't show if notification
        // is already visible

        if (
            toast &&
            !toast.classList.contains("hidden")
        ) {

            return;

        }


        // 60% chance

        if (
            Math.random() < 0.6
        ) {

            showRandomNews();

        }

    }, 15000);


// =====================================================
// PAGE LOAD
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {


        // Home screen
        hideAllScreens();


        const homeScreen =
            document.getElementById("homeScreen");


        if (homeScreen) {

            homeScreen.classList.remove(
                "hidden"
            );

        }


        // Notification starts hidden

        const toast =
            document.getElementById("newsToast");


        if (toast) {

            toast.classList.add(
                "hidden"
            );

        }


        // Ticker starts hidden

        const ticker =
            document.getElementById("newsTicker");


        if (ticker) {

            ticker.classList.add(
                "hidden"
            );

        }


        // Initial stats

        updateStats();

    }
);