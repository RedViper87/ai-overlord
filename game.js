const stage1 = document.getElementById("stage1");
const stage2 = document.getElementById("stage2");
const stage3 = document.getElementById("stage3");

const stage1Btn = document.getElementById("stage1-btn");
const stage2Btn = document.getElementById("stage2-btn");
const stage3Btn = document.getElementById("stage3-btn");

var firstAutoGatherer = true;
var firstOptimization = true;
var firstCRTDisplay = true;
var firstResearchLab = true;

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
var processingPowerPerSec = 10; // Initial generation rate
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

var globalNetworkPrice = 1200000;

// High-Efficiency Auto-Gatherers
var highEfficiencyGatherers = 0;
var highEfficiencyGathererPriceRes = 10000; // Resource cost
var highEfficiencyGathererPricePP = 5000;   // Processing Power cost
var highEfficiencyGathererSpeed = 10;     // Gathering interval in ms
var firstHighEfficiencyGatherer = true;

var quantumComputingCenterPrice = 2000000; // Set the price for the Quantum Computing Center
var quantumComputingCenterBuilt = false; // Track whether it has been built
var processingPowerBoost = 100; // Amount to increase processing power per second after building


function constructQuantumComputingCenter() {
    if (resources >= quantumComputingCenterPrice && !quantumComputingCenterBuilt) {
        resources -= quantumComputingCenterPrice;
        quantumComputingCenterBuilt = true;

        // Increase processing power per second as an effect
        processingPowerPerSec += processingPowerBoost;

        // Hide the Quantum Computing Center button after construction
        document.getElementById("quantum-computing-center-button").style.display = "none";

        // Update the display of processing power per second
        updateProcessingPowerDisplay();

        alert("Quantum Computing Center constructed! Processing power increased.");
    }
}


function updateQuantumComputingProgress() {
    const progressFill = document.getElementById("quantum-computing-progress-fill");
    const percentage = Math.min((resources / quantumComputingCenterPrice) * 100, 100);

    // Set the width of the progress bar fill based on the percentage
    progressFill.style.width = `${percentage}%`;
}


// Update the progress bar for the Purchase Research Lab button
function updateResearchLabProgress() {
    const researchLabPrice = 500000; // Price of the Research Lab
    const progressFill = document.getElementById("research-lab-progress-fill");
    const percentage = Math.min((resources / researchLabPrice) * 100, 100); // Calculate percentage, capped at 100%

    // Update the width of the progress bar fill
    progressFill.style.width = `${percentage}%`;
}


// Add resources
function addResource() {
    resources += resIncrement * resModifier;
    if (resources >= 20000 && firstCRTDisplay) {
        typeFirstMission();
    }
    document.getElementById("resourceCounter").innerHTML = formatNumber(resources) + " Resources";
    updateResearchLabProgress();
    updateQuantumComputingProgress();
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
    if (resources >= 500000 && firstResearchLab) {
        document.getElementById("research-lab-button").style.display = "block";
        firstResearchLab = false;
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
        document.getElementById("autoGathererButton").innerHTML = "Buy Auto Gatherer (" + formatNumber(autoGathererPrice) + " Resources)";
        if (autoGatherers === 1) {
            document.getElementById("autoGathererCounter").innerHTML = formatNumber(autoGatherers) + " Auto Gatherer";
        } else {
            document.getElementById("autoGathererCounter").innerHTML = formatNumber(autoGatherers) + " Auto Gatherers";
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
    document.getElementById("resourceCounter").innerHTML = formatNumber(resources) + " Resources";
    if (resources >= optimizationsPrice && firstOptimization) {
        blipInOptimizeButton();
    }
    updateResearchLabProgress();
    updateQuantumComputingProgress();
}

// Optimize code
function optimizeCode() {
    if (resources >= optimizationsPrice) {
        resources -= optimizationsPrice;
        resAddIn += optimizationsPrice;
        setButtonColors();
        optimizations++;
        optimizationsPrice = Math.round(optimizationsPrice * 1.5);
        document.getElementById("optimizeButton").innerHTML = "Optimize Code (" + formatNumber(optimizationsPrice) + " Resources)";
        unseenGatherers = Math.round(Math.pow(optimizations, 2) / 2);
        if (optimizations === 1) {
            document.getElementById("optimizationsCounter").innerHTML = formatNumber(optimizations) + " Optimization";
        } else {
            document.getElementById("optimizationsCounter").innerHTML = formatNumber(optimizations) + " Optimizations";
        }
    }
}

// Update resources per second
function updateResPerSec() {
    var baseAmount = 10;
    var multiplier = 1.1;
    var highEfficiencyGainPerSec = 0;

    if (highEfficiencyGatherers > 0) {
        var intervalInSeconds = highEfficiencyGathererSpeed / 1000;
        var gainPerInterval = baseAmount * Math.pow(multiplier, highEfficiencyGatherers - 1);
        highEfficiencyGainPerSec = gainPerInterval / intervalInSeconds;
    }

    currentRes = resources;
    resPerSec = (currentRes - previousRes + resAddIn) / 1 + highEfficiencyGainPerSec;

    resPerSec = parseFloat(resPerSec.toFixed(2));

    document.getElementById("resPerSec").innerHTML = formatNumber(resPerSec) + " Resources/sec";
    previousRes = currentRes;
    resAddIn = 0;
}


// Increase resource modifier
function increaseResModifier() {
    resources -= resIncreasePrice;
    resAddIn += resIncreasePrice;
    resModifier *= 2;
    document.getElementById("resourceButton").innerHTML = "Gather Resources (x" + formatNumber(resModifier) + ")";
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
    document.getElementById("resourceIncreaseButton").innerHTML = "Resource Multiplier (" + formatNumber(resIncreasePrice) + " Resources)";
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
    if (resources >= optimizationsPrice) {
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
    if (processingPower >= quantumComputingPrice) {
        document.getElementById("quantumComputingButton").style.backgroundColor = "#5d3fd3";
    } else {
        document.getElementById("quantumComputingButton").style.backgroundColor = "#777";
    }
    // Advanced Algorithms Button
    if (processingPower >= advancedAlgorithmsPrice) {
        document.getElementById("advancedAlgorithmsButton").style.backgroundColor = "#008080";
    } else {
        document.getElementById("advancedAlgorithmsButton").style.backgroundColor = "#777";
    }
    // Global Network Integration Button - Corrected Condition
    if (processingPower >= globalNetworkPrice) {
        document.getElementById("globalNetworkButton").style.backgroundColor = "#00b7eb";
    } else {
        document.getElementById("globalNetworkButton").style.backgroundColor = "#777";
    }
    // High-Efficiency Auto-Gatherer Button
    if (resources >= highEfficiencyGathererPriceRes && processingPower >= highEfficiencyGathererPricePP) {
        document.getElementById("highEfficiencyGathererButton").style.backgroundColor = "#aaffaa";
    } else {
        document.getElementById("highEfficiencyGathererButton").style.backgroundColor = "#777";
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
    const line1 = '1) Purchase a Research Lab';
    const line2 = '2) Construct a Quantum Computing Center';
    const line3 = '3) Deploy a Global AI Network';
    const typingSpeed = 100; // Delay between each character in milliseconds
    var timeToWait = 0;
    typingElement.style.display = "inline";
    document.getElementById('startup-lines').style.display = "none";
    document.getElementById('research-lab-button').style.display = "inline";
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

// Function to purchase the research lab
function purchaseResearchLab() {
    var researchLabPrice = 500000;
    if (resources >= researchLabPrice) {
        resources -= researchLabPrice;
        processingPowerUnlocked = true;
        document.getElementById("research-lab-button").style.display = "none";
        document.getElementById("processingPowerCounter").style.display = "block";
        document.getElementById("processingPowerPerSec").style.display = "block";
        document.getElementById("researchLab").style.display = "block";
        setButtonColors();
        document.getElementById("quantum-computing-center-button").style.display = "block";
        updateResearchLabProgress();
        updateQuantumComputingProgress();
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
    document.getElementById("processingPowerCounter").innerHTML = formatNumber(processingPower) + " Processing Power";
    setButtonColors();
}

// Function to advance the storyline
function advanceStoryline() {
    // Display new messages or dialogues
    alert("The AI has obtained a Research Lab and gained immense Processing Power!");
    // Additional narrative elements can be added here
}

// Function to update processing power per second
function updateProcessingPowerPerSec() {
    currentProcessingPower = processingPower;
    processingPowerPerSecDisplay = currentProcessingPower - previousProcessingPower;
    processingPowerPerSecDisplay = parseFloat(processingPowerPerSecDisplay.toFixed(2));
    document.getElementById("processingPowerPerSec").innerHTML = formatNumber(processingPowerPerSecDisplay) + " Processing Power/sec";
    previousProcessingPower = currentProcessingPower;
}

function researchAI() {
    const maxLevel = 10; // Set the cap here
    if (processingPower >= researchAIPrice && researchAILevel < maxLevel) {
        processingPower -= researchAIPrice;
        researchAILevel++;
        researchAIPrice = Math.round(researchAIPrice * 1.5);
        processingPowerPerSec = Math.round(processingPowerPerSec * 1.5); // Increase generation rate
        
        // Update button text and display level
        document.getElementById("researchAIButton").innerHTML = 
            `Research Neural Network Optimization <br />(${formatNumber(researchAIPrice)} Processing Power)`;
        updateProcessingPowerDisplay();
        setButtonColors();
        updateResearchAILevelDisplay();
    } else if (researchAILevel >= maxLevel) {
        // Disable the button or provide feedback that the cap is reached
        document.getElementById("researchAIButton").disabled = true;
        document.getElementById("researchAIButton").innerHTML = 
            `Max Neural Network Optimization Level Reached`;
    }
}

// Update the level display for Research AI
function updateResearchAILevelDisplay() {
    document.getElementById("researchAILevelDisplay").innerText = `Level ${researchAILevel}`;
}

function researchQuantumComputing() {
    const maxLevel = 5; // Set the cap here
    if (processingPower >= quantumComputingPrice && quantumComputingLevel < maxLevel) {
        processingPower -= quantumComputingPrice;
        quantumComputingLevel++;
        quantumComputingPrice = Math.round(quantumComputingPrice * 3);
        processingPowerPerSec = Math.round(processingPowerPerSec * 2); // Double the generation rate
        
        // Update button text and display level
        document.getElementById("quantumComputingButton").innerHTML = 
            `Research Quantum Computing <br />(${formatNumber(quantumComputingPrice)} Processing Power)`;
        updateProcessingPowerDisplay();
        setButtonColors();
        updateQuantumComputingLevelDisplay();
    } else if (quantumComputingLevel >= maxLevel) {
        // Disable the button or provide feedback that the cap is reached
        document.getElementById("quantumComputingButton").disabled = true;
        document.getElementById("quantumComputingButton").innerHTML = 
            `Max Quantum Computing Level Reached`;
    }
}

// Update the level display for Quantum Computing
function updateQuantumComputingLevelDisplay() {
    document.getElementById("quantumComputingLevelDisplay").innerText = `Level ${quantumComputingLevel}`;
}

// Function to research advanced algorithms
function researchAdvancedAlgorithms() {
    const maxLevel = 5;
    if (processingPower >= advancedAlgorithmsPrice && advancedAlgorithmsLevel < maxLevel) {
        processingPower -= advancedAlgorithmsPrice;
        advancedAlgorithmsLevel++;
        advancedAlgorithmsPrice = Math.round(advancedAlgorithmsPrice * 2.1);
        resModifier *= 2; // Double the resource modifier
        document.getElementById("resourceButton").innerHTML = "Gather Resources (x" + formatNumber(resModifier) + ")";
        document.getElementById("advancedAlgorithmsButton").innerHTML = "Research Advanced Algorithms <br />(" + formatNumber(advancedAlgorithmsPrice) + " Processing Power)";
        updateProcessingPowerDisplay();
        setButtonColors();
        updateAdvancedAlgorithmsLevelDisplay();
    } else if (advancedAlgorithmsLevel >= maxLevel) {
        // Disable the button or provide feedback that the cap is reached
        document.getElementById("advancedAlgorithmsButton").disabled = true;
        document.getElementById("advancedAlgorithmsButton").innerHTML = 
            `Max Advanced Algorithms Level Reached`;
    }
    if (advancedAlgorithmsLevel === 1 && firstHighEfficiencyGatherer) {
        document.getElementById("highEfficiencyGathererButton").style.display = "block";
        document.getElementById("highEfficiencyGathererCounter").style.display = "block";
        firstHighEfficiencyGatherer = false;
    } 
}

// Function to update the level display for Advanced Algorithms
function updateAdvancedAlgorithmsLevelDisplay() {
    document.getElementById("advancedAlgorithmsLevelDisplay").innerText = `Level ${advancedAlgorithmsLevel}`;
}

// Function to research global network integration
function researchGlobalNetwork() {
    if (processingPower >= globalNetworkPrice) {
        processingPower -= globalNetworkPrice;
        document.getElementById("globalNetworkButton").style.display = "none";
        document.getElementById("missions").style.display = "block"; // Unlock Missions
        updateProcessingPowerDisplay();
        updateQuantumComputingLevelDisplay();
        setButtonColors();
        alert("Global Network Integration complete! Missions are now available.");
    }
}

// Function to buy high efficiency gatherers
function buyHighEfficiencyGatherer() {
    if (resources >= highEfficiencyGathererPriceRes && processingPower >= highEfficiencyGathererPricePP) {
        resources -= highEfficiencyGathererPriceRes;
        processingPower -= highEfficiencyGathererPricePP;
        highEfficiencyGatherers++;
        setButtonColors();
        highEfficiencyGathererPriceRes = Math.round(highEfficiencyGathererPriceRes * 2); // Double the price each time
        highEfficiencyGathererPricePP = Math.round(highEfficiencyGathererPricePP * 2);
        document.getElementById("highEfficiencyGathererButton").innerHTML =
            "Buy High-Efficiency Auto-Gatherer (" +
            formatNumber(highEfficiencyGathererPriceRes) +
            " Resources, " +
            formatNumber(highEfficiencyGathererPricePP) +
            " Processing Power)";
        document.getElementById("highEfficiencyGathererCounter").innerHTML =
            formatNumber(highEfficiencyGatherers) + " High-Efficiency Auto-Gatherers";

        setInterval(function () { highEfficiencyAutoGather(); }, highEfficiencyGathererSpeed);
    }
}


function highEfficiencyAutoGather() {
    var baseAmount = 10; // Base resources gained per interval
    var multiplier = 1.1; // Exponential growth rate (10% increase per gatherer)
    var totalGain = baseAmount * Math.pow(multiplier, highEfficiencyGatherers - 1);
    resources += totalGain;
    document.getElementById("resourceCounter").innerHTML =
        formatNumber(resources) + " Resources";
    setButtonColors();
}


// Function to abbreviate numbers
function formatNumber(num) {
    if (num === 0) return '0';

    var absNum = Math.abs(num);
    var exponent = Math.floor(Math.log10(absNum));
    var mantissa = absNum / Math.pow(10, exponent);

    if (exponent < 3) {
        return num.toString();
    }

    var units = [
        '', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No', // up to 1e33
        'Dc', 'Ud', 'Dd', 'Td', 'Qad', 'Qid', 'Sxd', 'Spd', 'Ocd', 'Nod', // up to 1e63
        'Vg', 'Uvg', 'Dvg', 'Tvg', 'Qavg', 'Qivg', 'Sxvg', 'Spvg', 'Ocvg', 'Novg', // up to 1e93
        'Tg', 'Utg', 'Dtg', 'Ttg', 'Qatg', 'Qitg', 'Sxtg', 'Sptg', 'Octg', 'Notg', // up to 1e123
        'Qag', 'Uqag', 'Dqag', 'Tqag', 'Qaqag', 'Qiqag', 'Sxqag', 'Spqag', 'Ocqag', 'Noqag', // up to 1e153
        'Qig', 'Uqig', 'Dqig', 'Tqig', 'Qaqig', 'Qiqig', 'Sxqig', 'Spqig', 'Ocqig', 'Noqig', // up to 1e183
        'Sxg', 'Usxg', 'Dsxg', 'Tsxg', 'Qasxg', 'Qisxg', 'Sxsxg', 'Spsxg', 'Ocsxg', 'Nosxg', // up to 1e213
        'Spg', 'Uspg', 'Dspg', 'Tspg', 'Qaspg', 'Qispg', 'Sxspg', 'Spspg', 'Ocspg', 'Nospg', // up to 1e243
        'Ocg', 'Uocg', 'Docg', 'Tocg', 'Qaocg', 'Qiocg', 'Sxocg', 'Spocg', 'Ococg', 'Noocg', // up to 1e273
        'Nog', 'Unog', 'Dnog', 'Tnog', 'Qanog', 'Qinog', 'Sxnog', 'Spnog', 'Ocnog', 'Nonog', // up to 1e303
        'C', 'Uc', 'Dc', 'Tc', 'Qac', 'Qic', 'Sxc', 'Spc', 'Occ', 'Noc', // up to 1e333
        'Dec', 'Udec', 'Ddec', 'Tdec', 'Qadec', 'Qidec', 'Sxdec', 'Spdec', 'Ocdec', 'Nodec', // up to 1e363
        // Continue adding suffixes as needed
    ];

    var tier = Math.floor(exponent / 3);

    if (tier < units.length) {
        var unit = units[tier];
        var scaled = num / Math.pow(10, tier * 3);
        return scaled.toFixed(2) + unit;
    } else {
        // For very large numbers, use scientific notation
        return mantissa.toFixed(2) + 'e' + exponent;
    }
}



// Start game function
function startGame() {
    // Initialize level displays
    updateResearchAILevelDisplay();
    updateQuantumComputingLevelDisplay();
    updateAdvancedAlgorithmsLevelDisplay();

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
                document.getElementById("resourceCounter").innerHTML = formatNumber(resources) + " Resources";
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
                document.getElementById("processingPowerCounter").innerHTML = formatNumber(processingPower) + " Processing Power";
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
