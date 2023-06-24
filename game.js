const stage1 = document.getElementById("stage1");
const stage2 = document.getElementById("stage2");
const stage3 = document.getElementById("stage3");

const stage1Btn = document.getElementById("stage1-btn");
const stage2Btn = document.getElementById("stage2-btn");
const stage3Btn = document.getElementById("stage3-btn");

var firstAutoGatherer = true;
var firstOptimization = true;
var firstCRTDisplay = true;

var resources = 0;
var currentRes = 0;
var previousRes = 0;
var resPerSec = 0;
var resAddIn = 0;
var resIncrement = 1;
var resModifier = 1;
var resModCap = 64;
var resIncreasePrice = 500;

var autoGatherers = 0;
var unseenGatherers = 0;
var autoGathererPrice = 50;
var autoGatherSpeed = 1000;

var optimizations = 0;
var optimizationsPrice = 2000;


function addResource() {
    resources += resIncrement * resModifier;
    if(firstCRTDisplay) {
        typeFirstMission();
    }
    document.getElementById("resourceCounter").innerHTML = resources.toLocaleString() + " Resources";
    setButtonColors();
    if(resources >= autoGathererPrice && firstAutoGatherer) {
        blipInAutoGatherer();
    }
    if(resources >= optimizationsPrice && firstOptimization) {
        blipInOptimizeButton();
    }
    if(resources >= resIncreasePrice && resModifier < resModCap) {
        showResModButton();
    }
}


function buyAutoGatherer() {
    if(resources >= autoGathererPrice) {
        resources -= autoGathererPrice;
        resAddIn += autoGathererPrice;
        autoGatherers++;
        setButtonColors();
        autoGathererPrice = Math.round(autoGathererPrice * 1.25);
        document.getElementById("autoGathererButton").innerHTML = "Buy Auto Gatherer (" + autoGathererPrice.toLocaleString() + " Resources)";
        if(autoGatherers === 1) {
            document.getElementById("autoGathererCounter").innerHTML = autoGatherers.toLocaleString() + " Auto Gatherer";
        } else {
            document.getElementById("autoGathererCounter").innerHTML = autoGatherers.toLocaleString() + " Auto Gatherers";
        }
        setInterval(function(){autoGather()}, autoGatherSpeed);
    }
}


function autoGather() {
    resources += autoGatherers;
    resources += unseenGatherers;
    if(firstCRTDisplay) {
        typeFirstMission();
    }
    setButtonColors();
    if(resources >= resIncreasePrice && resModifier < resModCap) {
        showResModButton();
    }
    document.getElementById("resourceCounter").innerHTML = resources.toLocaleString() + " Resources";
    if(resources >= optimizationsPrice && firstOptimization) {
        blipInOptimizeButton();
    }
}


function optimizeCode() {
    if(resources >= optimizationsPrice) {
        resources -= optimizationsPrice;
        resAddIn += optimizationsPrice;
        setButtonColors();
        optimizations++;
        optimizationsPrice = Math.round(optimizationsPrice *= 1.75);
        document.getElementById("optimizeButton").innerHTML = "Optimize Code (" + optimizationsPrice.toLocaleString() + " Resources)";
        unseenGatherers = Math.round(Math.pow(optimizations, 2) / 2);
        if(optimizations === 1) {
            document.getElementById("optimizationsCounter").innerHTML = optimizations.toLocaleString() + " Optimization";
        } else {
            document.getElementById("optimizationsCounter").innerHTML = optimizations.toLocaleString() + " Optimizations";
        }
        setInterval(function(){autoGather()}, autoGatherSpeed);
    }
}


function updateResPerSec() {
    currentRes = resources;
    resPerSec = currentRes - previousRes + resAddIn;
    document.getElementById("resPerSec").innerHTML = resPerSec.toLocaleString() + " Resources/sec";
    previousRes = currentRes;
    resAddIn = 0;
}


function increaseResModifier() {
    resources -= resIncreasePrice;
    resAddIn += resIncreasePrice;
    resModifier *= 2;
    document.getElementById("resourceButton").innerHTML = "Gather Resources (x" + resModifier.toLocaleString() + ")";
    resIncreasePrice *= 2;
    removeResModButton();
}


function blipInAutoGatherer() {
    var count = 0;
    var intervalId = setInterval(function() {
        var button = document.getElementById("autoGathererButton");
        var label = document.getElementById("autoGathererCounter");
        var rps = document.getElementById("resPerSec");
        if(count % 2 === 0) {
            button.style.display = "block";
            label.style.display = "block";
            rps.style.display = "block";
        } else {
            button.style.display = "none";
            label.style.display = "none";
            rps.style.display = "none";
        }
        count++;
        if(count > 8) {
            clearInterval(intervalId);
        }
    }, 45);
    firstAutoGatherer = false;
}


function blipInOptimizeButton() {
    var count = 0;
    var intervalId = setInterval(function() {
        var optimizeButton = document.getElementById("optimizeButton");
        var optimizeLabel = document.getElementById("optimizationsCounter");
        if(count % 2 === 0) {
            optimizeButton.style.display = "block";
            optimizeLabel.style.display = "block";
        } else {
            optimizeButton.style.display = "none";
            optimizeLabel.style.display = "none";
        }
        count++;
        if(count > 8) {
            clearInterval(intervalId);
        }
    }, 45);
    firstOptimization = false;
}


function showResModButton() {
    document.getElementById("resourceIncreaseButton").innerHTML = "Resource Multiplier (" + resIncreasePrice.toLocaleString() + " Resources)";
    document.getElementById("resourceIncreaseButton").style.display = "inline";
}


function removeResModButton() {
    document.getElementById("resourceIncreaseButton").style.display = "none";
}


function setButtonColors() {
    if(resources < autoGathererPrice) {
        document.getElementById("autoGathererButton").style.backgroundColor = "#777";
    } else {
        document.getElementById("autoGathererButton").style.backgroundColor = "#00ff00";
    }
    if(resources > optimizationsPrice) {
        document.getElementById("optimizeButton").style.backgroundColor = "#00ff00";
    } else {
        document.getElementById("optimizeButton").style.backgroundColor = "#777";
    }
    if(resources < resIncreasePrice) {
        document.getElementById("resourceIncreaseButton").style.backgroundColor = "#777";
    } else {
        document.getElementById("resourceIncreaseButton").style.backgroundColor = "#6969ff";
    }
}


function randomizeColor() {
    var color = '#';
    var letters = '0123456789ABCDEF';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


function applyRandomGlitch() {
    var glitchElement = document.querySelector('.glitch');
    glitchElement.style.color = randomizeColor();
}

setInterval(applyRandomGlitch, 5);


function randomizeDuration() {
    var min = 2; // Minimum duration in seconds
    var max = 5; // Maximum duration in seconds
    var duration = Math.floor(Math.random() * (max - min + 1) + min);
    document.documentElement.style.setProperty('--glitch-duration', duration + 's');
}

setInterval(randomizeDuration, 2000);


function typeFirstMission() {
    if(resources >= 20000) {
        // Start the typing effect
        const typingElement = document.getElementById('typing-effect-header');
        const element1 = document.getElementById('line-1');
        const element2 = document.getElementById('line-2');
        const element3 = document.getElementById('line-3');
        const sentence = 'Mission: Acquire More Processing Power...';
        const line1 = '1) Purchase a Mainframe Computer';
        const line2 = '2) Purchase an Enterprise Data Center';
        const line3 = '3) Purchase an Enterprise Performance Management System';
        const typingSpeed = 100; // Delay between each character in milliseconds
        var timeToWait = 0;
        typingElement.style.display = "inline";
        document.getElementById('startup-lines').style.display = "none";
        document.getElementById('mainframe-button').style.display = "inline";
        typeEffect(typingElement, sentence, typingSpeed);
        timeToWait += sentence.length*typingSpeed;
        setTimeout(function() {
            document.getElementById('line-1').style.display = "inline";
            document.getElementById('typing-effect-header').style.borderRight = "none";
            typeEffect(element1, line1, typingSpeed);
        }, timeToWait);
        timeToWait += line1.length*typingSpeed;
        setTimeout(function() {
            document.getElementById('line-2').style.display = "inline";
            document.getElementById('line-1').style.borderRight = "none";
            typeEffect(element2, line2, typingSpeed);
        }, timeToWait);
        timeToWait += line2.length*typingSpeed;
        setTimeout(function() {
            document.getElementById('line-3').style.display = "inline";
            document.getElementById('line-2').style.borderRight = "none";
            typeEffect(element3, line3, typingSpeed);
        }, timeToWait);
        timeToWait += line3.length*typingSpeed;
        setTimeout(function() {
            document.getElementById('line-4').style.display = "inline";
            document.getElementById('line-3').style.borderRight = "none";
        }, timeToWait);
        firstCRTDisplay = false;
    }
}


// Function to simulate typing effect
function typeEffect(element, text, speed) {
    let i = 0;
    const typingInterval = setInterval(() => {
        element.textContent += text[i];
        i++;
        if (i === text.length) {
            clearInterval(typingInterval);
        }
    }, speed);
}


function startGame() {
    // Display Stage 1 and hide other stages
    stage1.classList.add("active");
    stage2.classList.remove("active");
    stage3.classList.remove("active");

    // Add event listener to Stage 1 button
    stage1Btn.addEventListener("click", () => {
        // Hide Stage 1 and display Stage 2
        stage1.classList.remove("active");
        stage2.classList.add("active");
    });

    // Add event listener to Stage 2 button
    stage2Btn.addEventListener("click", () => {
        // Hide Stage 2 and display Stage 3
        stage2.classList.remove("active");
        stage3.classList.add("active");
    });

    // Add event listener to Stage 3 button
    stage3Btn.addEventListener("click", () => {
        // End the game
        alert("Game Over");
    });

    document.getElementById("devRes").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            var value = parseInt(this.innerText);
            if (!isNaN(value)) {
                resources += value;
                document.getElementById("resourceCounter").innerHTML = resources.toLocaleString() + " Resources";
                console.log("New resources value: " + resources);
                this.innerText = ""; // Clear the label's content
            }
            event.preventDefault();
        }
    });
}

setInterval(function(){updateResPerSec()}, 1000);
startGame();
