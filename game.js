const stage1 = document.getElementById("stage1");
const stage2 = document.getElementById("stage2");
const stage3 = document.getElementById("stage3");

const stage1Btn = document.getElementById("stage1-btn");
const stage2Btn = document.getElementById("stage2-btn");
const stage3Btn = document.getElementById("stage3-btn");

var firstAutoGatherer = true;
var firstOptimization = true;
var firstCRTDisplay = true;
var firstMainframe = true;

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

var glitchEffectEnabled = true; // Track glitch effect state
var glitchInterval;

var processingPower = 0;
var processingPowerPerSec = 100; // Initial generation rate
var processingPowerUnlocked = false;
var currentProcessingPower = 0;
var previousProcessingPower = 0;
var processingPowerPerSecDisplay = 0;

var researchAILevel = 0;
var researchAIPrice = 1000;

var quantumComputingLevel = 0;
var quantumComputingPrice = 5000;

var advancedAlgorithmsLevel = 0;
var advancedAlgorithmsPrice = 8000;

var globalNetworkLevel = 0;
var globalNetworkPrice = 12000;

// Add resources
function addResource() {
    resources += resIncrement * resModifier;
    if (resources >= 20000 && firstCRTDisplay) {
        typeFirstMission();
    }
    document.getElementById("resourceCounter").innerHTML = resources.toLocaleString() + " Resources";
    setButtonColors();
    if (resources >= autoGathererPrice && firstAutoGatherer) {
        blipInAutoGatherer();
    }
    if (resources >= optimizationsPrice && firstOptimization) {
        blipInOptimizeButton();
    }
    if (resources >= resIncreasePrice && resModifier < resModCap) {
        showResModButton();
    }
    if (resources >= 500000 && firstMainframe) {
        document.getElementById("mainframe-button").style.display = "block";
        firstMainframe = false;
    }
}


// Buy auto gatherer
function buyAutoGatherer() {
    if (resources >= autoGathererPrice) {
        resources -= autoGathererPrice;
        resAddIn += autoGathererPrice;
        autoGatherers++;
        setButtonColors();
        autoGathererPrice = Math.round(autoGathererPrice * 1.25);
        document.getElementById("autoGathererButton").innerHTML = "Buy Auto Gatherer (" + autoGathererPrice.toLocaleString() + " Resources)";
        if (autoGatherers === 1) {
            document.getElementById("autoGathererCounter").innerHTML = autoGatherers.toLocaleString() + " Auto Gatherer";
        } else {
            document.getElementById("autoGathererCounter").innerHTML = autoGatherers.toLocaleString() + " Auto Gatherers";
        }
        setInterval(function () { autoGather(); }, autoGatherSpeed);
    }
}

// Auto gather resources
function autoGather() {
    resources += autoGatherers;
    resources += unseenGatherers;
    if (firstCRTDisplay) {
        typeFirstMission();
    }
    setButtonColors();
    if (resources >= resIncreasePrice && resModifier < resModCap) {
        showResModButton();
    }
    document.getElementById("resourceCounter").innerHTML = resources.toLocaleString() + " Resources";
    if (resources >= optimizationsPrice && firstOptimization) {
        blipInOptimizeButton();
    }
}

// Optimize code
function optimizeCode() {
    if (resources >= optimizationsPrice) {
        resources -= optimizationsPrice;
        resAddIn += optimizationsPrice;
        setButtonColors();
        optimizations++;
        optimizationsPrice = Math.round(optimizationsPrice * 1.5);
        document.getElementById("optimizeButton").innerHTML = "Optimize Code (" + optimizationsPrice.toLocaleString() + " Resources)";
        unseenGatherers = Math.round(Math.pow(optimizations, 2) / 2);
        if (optimizations === 1) {
            document.getElementById("optimizationsCounter").innerHTML = optimizations.toLocaleString() + " Optimization";
        } else {
            document.getElementById("optimizationsCounter").innerHTML = optimizations.toLocaleString() + " Optimizations";
        }
    }
}

// Update resources per second
function updateResPerSec() {
    currentRes = resources;
    resPerSec = currentRes - previousRes + resAddIn;
    document.getElementById("resPerSec").innerHTML = resPerSec.toLocaleString() + " Resources/sec";
    previousRes = currentRes;
    resAddIn = 0;
}

// Increase resource modifier
function increaseResModifier() {
    resources -= resIncreasePrice;
    resAddIn += resIncreasePrice;
    resModifier *= 2;
    document.getElementById("resourceButton").innerHTML = "Gather Resources (x" + resModifier.toLocaleString() + ")";
    resIncreasePrice *= 2;
    removeResModButton();
}

// Show auto gatherer button
function blipInAutoGatherer() {
    var count = 0;
    var intervalId = setInterval(function () {
        var button = document.getElementById("autoGathererButton");
        var label = document.getElementById("autoGathererCounter");
        var rps = document.getElementById("resPerSec");
        if (count % 2 === 0) {
            button.style.display = "block";
            label.style.display = "block";
            rps.style.display = "block";
        } else {
            button.style.display = "none";
            label.style.display = "none";
            rps.style.display = "none";
        }
        count++;
        if (count > 8) {
            clearInterval(intervalId);
        }
    }, 45);
    firstAutoGatherer = false;
}

// Show optimization button
function blipInOptimizeButton() {
    var count = 0;
    var intervalId = setInterval(function () {
        var optimizeButton = document.getElementById("optimizeButton");
        var optimizeLabel = document.getElementById("optimizationsCounter");
        if (count % 2 === 0) {
            optimizeButton.style.display = "block";
            optimizeLabel.style.display = "block";
        } else {
            optimizeButton.style.display = "none";
            optimizeLabel.style.display = "none";
        }
        count++;
        if (count > 8) {
            clearInterval(intervalId);
        }
    }, 45);
    firstOptimization = false;
}

// Show resource modifier button
function showResModButton() {
    document.getElementById("resourceIncreaseButton").innerHTML = "Resource Multiplier (" + resIncreasePrice.toLocaleString() + " Resources)";
    document.getElementById("resourceIncreaseButton").style.display = "inline";
}

// Remove resource modifier button
function removeResModButton() {
    document.getElementById("resourceIncreaseButton").style.display = "none";
}

// Set button colors based on resources
function setButtonColors() {
    // Auto Gatherer Button
    if (resources < autoGathererPrice) {
        document.getElementById("autoGathererButton").style.backgroundColor = "#777";
    } else {
        document.getElementById("autoGathererButton").style.backgroundColor = "#00ff00";
    }
    // Optimize Code Button
    if (resources > optimizationsPrice) {
        document.getElementById("optimizeButton").style.backgroundColor = "#00ff00";
    } else {
        document.getElementById("optimizeButton").style.backgroundColor = "#777";
    }
    // Resource Increase Button
    if (resources < resIncreasePrice) {
        document.getElementById("resourceIncreaseButton").style.backgroundColor = "#777";
    } else {
        document.getElementById("resourceIncreaseButton").style.backgroundColor = "#6969ff";
    }
    // Research AI Button
    if (processingPower >= researchAIPrice) {
        document.getElementById("researchAIButton").style.backgroundColor = "#bf00ff";
    } else {
        document.getElementById("researchAIButton").style.backgroundColor = "#777";
    }
    // Quantum Computing Button
    if (processingPower < quantumComputingPrice) {
        document.getElementById("quantumComputingButton").style.backgroundColor = "#777";
    } else {
        document.getElementById("quantumComputingButton").style.backgroundColor = "#5d3fd3";
    }
    // Advanced Algorithms Button
    if (processingPower < advancedAlgorithmsPrice) {
        document.getElementById("advancedAlgorithmsButton").style.backgroundColor = "#777";
    } else {
        document.getElementById("advancedAlgorithmsButton").style.backgroundColor = "#008080";
    }
    // Global Network Integration Button
    if (processingPower < globalNetworkPrice) {
        document.getElementById("globalNetworkButton").style.backgroundColor = "#777";
    } else {
        document.getElementById("globalNetworkButton").style.backgroundColor = "#00b7eb";
    }
}

// Randomize color for glitch effect
function randomizeColor() {
    var color = '#';
    var letters = '0123456789ABCDEF';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Apply random glitch effect
function applyRandomGlitch() {
    if (glitchEffectEnabled) {
        var glitchElement = document.querySelector('.glitch');
        glitchElement.style.color = randomizeColor();
    }
}

// Clear glitch effect
function clearGlitch() {
    var glitchElement = document.querySelector('.glitch');
    glitchElement.style.color = "white"; // Set to plain white
}

// Toggle glitch effect
function toggleGlitchEffect() {
    glitchEffectEnabled = document.getElementById("toggle-glitch").checked;
    if (glitchEffectEnabled) {
        glitchInterval = setInterval(applyRandomGlitch, 5); // Apply glitch effect when enabled
    } else {
        clearGlitch(); // Clear effect when disabled
        clearInterval(glitchInterval); // Stop applying glitch effect
    }
}

// Randomize duration for glitch effect
function randomizeDuration() {
    var min = 2; // Minimum duration in seconds
    var max = 5; // Maximum duration in seconds
    var duration = Math.floor(Math.random() * (max - min + 1) + min);
    document.documentElement.style.setProperty('--glitch-duration', duration + 's');
}

// Type first mission
function typeFirstMission() {
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
    timeToWait += sentence.length * typingSpeed;
    setTimeout(function () {
        document.getElementById('line-1').style.display = "inline";
        document.getElementById('typing-effect-header').style.borderRight = "none";
        typeEffect(element1, line1, typingSpeed);
    }, timeToWait);
    timeToWait += line1.length * typingSpeed;
    setTimeout(function () {
        document.getElementById('line-2').style.display = "inline";
        document.getElementById('line-1').style.borderRight = "none";
        typeEffect(element2, line2, typingSpeed);
    }, timeToWait);
    timeToWait += line2.length * typingSpeed;
    setTimeout(function () {
        document.getElementById('line-3').style.display = "inline";
        document.getElementById('line-2').style.borderRight = "none";
        typeEffect(element3, line3, typingSpeed);
    }, timeToWait);
    timeToWait += line3.length * typingSpeed;
    setTimeout(function () {
        document.getElementById('line-4').style.display = "inline";
        document.getElementById('line-3').style.borderRight = "none";
    }, timeToWait);
    firstCRTDisplay = false;
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

// Navigation functions
function openNav() {
    document.getElementById("myNav").style.width = "100%";
}

function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}

// Tooltip toggle
function toggleTooltips() {
    const elements = document.querySelectorAll('.info-button');
    elements.forEach((element) => {
        element.classList.toggle('tooltip-visible');
    });
}

// Function to purchase the mainframe
function purchaseMainframe() {
    var mainframePrice = 500000;
    if (resources >= mainframePrice) {
        resources -= mainframePrice;
        processingPowerUnlocked = true;
        document.getElementById("mainframe-button").style.display = "none";
        document.getElementById("processingPowerCounter").style.display = "block";
        document.getElementById("processingPowerPerSec").style.display = "block";
        document.getElementById("researchLab").style.display = "block";
        setButtonColors();
        // Start generating processing power
        setInterval(generateProcessingPower, 1000); // Generates every second
        // Start updating processing power per second
        setInterval(function () { updateProcessingPowerPerSec(); }, 1000);
        // Advance the storyline
        advanceStoryline();
    }
}

// Function to generate processing power
function generateProcessingPower() {
    if (processingPowerUnlocked) {
        processingPower += processingPowerPerSec;
        updateProcessingPowerDisplay();
        setButtonColors();
    }
}

// Function to update the display of processing power
function updateProcessingPowerDisplay() {
    document.getElementById("processingPowerCounter").innerHTML = processingPower.toLocaleString() + " Processing Power";
    setButtonColors();
}

// Function to advance the storyline
function advanceStoryline() {
    // Display new messages or dialogues
    alert("The AI has integrated the mainframe and gained immense Processing Power!");
    // Additional narrative elements can be added here
}

// Function to update processing power per second
function updateProcessingPowerPerSec() {
    currentProcessingPower = processingPower;
    processingPowerPerSecDisplay = currentProcessingPower - previousProcessingPower;
    document.getElementById("processingPowerPerSec").innerHTML = processingPowerPerSecDisplay.toLocaleString() + " Processing Power/sec";
    previousProcessingPower = currentProcessingPower;
}

// Function to research AI
function researchAI() {
    if (processingPower >= researchAIPrice) {
        processingPower -= researchAIPrice;
        researchAILevel++;
        researchAIPrice = Math.round(researchAIPrice * 1.5);
        processingPowerPerSec = Math.round(processingPowerPerSec * 1.5); // Increase generation rate
        document.getElementById("researchAIButton").innerHTML = "Research Neural Network Optimization (" + researchAIPrice.toLocaleString() + " Processing Power)";
        updateProcessingPowerDisplay();
        setButtonColors();
    }
}

// Function to research quantum computing
function researchQuantumComputing() {
    if (processingPower >= quantumComputingPrice) {
        processingPower -= quantumComputingPrice;
        quantumComputingLevel++;
        quantumComputingPrice = Math.round(quantumComputingPrice * 2);
        processingPowerPerSec = Math.round(processingPowerPerSec * 2); // Double the generation rate
        document.getElementById("quantumComputingButton").innerHTML = "Research Quantum Computing (" + quantumComputingPrice.toLocaleString() + " Processing Power)";
        updateProcessingPowerDisplay();
        setButtonColors();
    }
}

// Function to research advanced algorithms
function researchAdvancedAlgorithms() {
    if (processingPower >= advancedAlgorithmsPrice) {
        processingPower -= advancedAlgorithmsPrice;
        advancedAlgorithmsLevel++;
        advancedAlgorithmsPrice = Math.round(advancedAlgorithmsPrice * 2);
        resModifier *= 2; // Double the resource modifier
        document.getElementById("resourceButton").innerHTML = "Gather Resources (x" + resModifier.toLocaleString() + ")";
        document.getElementById("advancedAlgorithmsButton").innerHTML = "Research Advanced Algorithms (" + advancedAlgorithmsPrice.toLocaleString() + " Processing Power)";
        updateProcessingPowerDisplay();
        setButtonColors();
    }
}

// Function to research global network integration
function researchGlobalNetwork() {
    if (processingPower >= globalNetworkPrice) {
        processingPower -= globalNetworkPrice;
        globalNetworkLevel++;
        document.getElementById("globalNetworkButton").style.display = "none";
        document.getElementById("missions").style.display = "block"; // Unlock Missions
        updateProcessingPowerDisplay();
        setButtonColors();
        alert("Global Network Integration complete! Missions are now available.");
    }
}


// Start game function
function startGame() {
    // Display Stage 1 and hide other stages
    stage1.classList.add("active");
    stage2.classList.remove("active");
    stage3.classList.remove("active");

    // Initialize glitch effect
    toggleGlitchEffect();

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

    document.getElementById("devRes").addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            var value = parseInt(this.innerText);
            if (!isNaN(value)) {
                resources += value;
                document.getElementById("resourceCounter").innerHTML = resources.toLocaleString() + " Resources";
                this.innerText = "";
            }
            event.preventDefault();
        }
    });

    document.getElementById("devPow").addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            var value = parseInt(this.innerText);
            if (!isNaN(value)) {
                processingPower +=value;
                document.getElementById("processingPowerCounter").innerHTML = processingPower.toLocaleString() + " Processing Power";
                this.innerText = "";
            }
            event.preventDefault();
        }
    })
}

// Set intervals for resource updates
setInterval(function () { updateResPerSec(); }, 1000);
setInterval(function () { updateProcessingPowerDisplay(); }, 1000);
startGame();
