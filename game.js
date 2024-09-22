// Elements for different game stages
const stage1 = document.getElementById("stage1");
const stage2 = document.getElementById("stage2");
const stage3 = document.getElementById("stage3");

const stage1Btn = document.getElementById("stage1-btn");
const stage2Btn = document.getElementById("stage2-btn");
const stage3Btn = document.getElementById("stage3-btn");

// Initial state flags
var firstAutoGatherer = true;
var firstOptimization = true;
var firstCRTDisplay = true;
var firstResearchLab = true;

// Resource variables
var resources = 0;
var currentRes = 0;
var previousRes = 0;
var resPerSec = 0;
var resAddIn = 0;
var resIncrement = 1;
var resModifier = 1;
var resModCap = 64;
var resIncreasePrice = 500;

// Auto gatherer variables
var autoGatherers = 0;
var unseenGatherers = 0;
var autoGathererPrice = 50;
var autoGatherSpeed = 1000;

// Optimization variables
var optimizations = 0;
var optimizationsPrice = 2000;

// Glitch effect state
var glitchEffectEnabled = true;
var glitchInterval;

// Processing power variables
var processingPower = 0;
var processingPowerPerSec = 20;
var processingPowerUnlocked = false;
var currentProcessingPower = 0;
var previousProcessingPower = 0;
var processingPowerPerSecDisplay = 0;

// Research upgrade variables
var researchAILevel = 0;
var researchAIPrice = 1000;

var quantumComputingLevel = 0;
var quantumComputingPrice = 5000;

var advancedAlgorithmsLevel = 0;
var advancedAlgorithmsPrice = 8000;

var globalNetworkPrice = 1200000;

// High-Efficiency Auto-Gatherer variables
var highEfficiencyGatherers = 0;
var highEfficiencyGathererPriceRes = 10000;
var highEfficiencyGathererPricePP = 5000;
var highEfficiencyGathererSpeed = 10;
var firstHighEfficiencyGatherer = true;

// Quantum Computing Center variables
var quantumComputingCenterPrice = 2000000;
var quantumComputingCenterBuilt = false;
var processingPowerBoost = 100; // Processing power increase after building

// Function to construct the Quantum Computing Center
function constructQuantumComputingCenter() {
    if (resources >= quantumComputingCenterPrice && !quantumComputingCenterBuilt) {
        resources -= quantumComputingCenterPrice;
        quantumComputingCenterBuilt = true;

        // Increase processing power generation rate
        processingPowerPerSec += processingPowerBoost;

        // Hide the button after construction
        document.getElementById("quantum-computing-center-button").style.display = "none";
        updateProcessingPowerDisplay();

        alert("Quantum Computing Center constructed! Processing power increased.");
    }
}

// Update the progress bar for Quantum Computing Center
function updateQuantumComputingProgress() {
    const progressFill = document.getElementById("quantum-computing-progress-fill");
    const percentage = Math.min((resources / quantumComputingCenterPrice) * 100, 100);
    progressFill.style.width = `${percentage}%`;
}

// Update the progress bar for the Research Lab button
function updateResearchLabProgress() {
    const researchLabPrice = 500000;
    const progressFill = document.getElementById("research-lab-progress-fill");
    const percentage = Math.min((resources / researchLabPrice) * 100, 100);
    progressFill.style.width = `${percentage}%`;
}

// Function to add resources
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

// Function to purchase an auto gatherer
function buyAutoGatherer() {
    if (resources >= autoGathererPrice) {
        resources -= autoGathererPrice;
        resAddIn += autoGathererPrice;
        autoGatherers++;
        setButtonColors();
        autoGathererPrice = Math.round(autoGathererPrice * 1.25);
        document.getElementById("autoGathererButton").innerHTML = "Buy Auto Gatherer (" + formatNumber(autoGathererPrice) + " Resources)";
        document.getElementById("autoGathererCounter").innerHTML = formatNumber(autoGatherers) + " Auto Gatherer" + (autoGatherers > 1 ? "s" : "");
        setInterval(function () { autoGather(); }, autoGatherSpeed);
    }
}

// Function for auto gathering resources
function autoGather() {
    resources += autoGatherers + unseenGatherers;
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

// Function to optimize code and increase resource efficiency
function optimizeCode() {
    if (resources >= optimizationsPrice) {
        resources -= optimizationsPrice;
        resAddIn += optimizationsPrice;
        setButtonColors();
        optimizations++;
        optimizationsPrice = Math.round(optimizationsPrice * 1.5);
        document.getElementById("optimizeButton").innerHTML = "Optimize Code (" + formatNumber(optimizationsPrice) + " Resources)";
        unseenGatherers = Math.round(Math.pow(optimizations, 2) / 2);
        document.getElementById("optimizationsCounter").innerHTML = formatNumber(optimizations) + " Optimization" + (optimizations > 1 ? "s" : "");
    }
}

// Function to update resources generated per second
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

// Function to increase the resource multiplier
function increaseResModifier() {
    resources -= resIncreasePrice;
    resAddIn += resIncreasePrice;
    resModifier *= 2;
    document.getElementById("resourceButton").innerHTML = "Gather Resources (x" + formatNumber(resModifier) + ")";
    resIncreasePrice *= 2;
    removeResModButton();
}

// Show auto gatherer button with blip animation
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

// Show optimization button with blip animation
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

// Show resource multiplier button
function showResModButton() {
    document.getElementById("resourceIncreaseButton").innerHTML = "Resource Multiplier (" + formatNumber(resIncreasePrice) + " Resources)";
    document.getElementById("resourceIncreaseButton").style.display = "inline";
}

// Hide resource multiplier button
function removeResModButton() {
    document.getElementById("resourceIncreaseButton").style.display = "none";
}

// Set colors for buttons based on available resources
function setButtonColors() {
    // Auto Gatherer Button
    document.getElementById("autoGathererButton").style.backgroundColor = resources < autoGathererPrice ? "#777" : "#00ff00";

    // Optimize Code Button
    document.getElementById("optimizeButton").style.backgroundColor = resources >= optimizationsPrice ? "#00ff00" : "#777";

    // Resource Increase Button
    document.getElementById("resourceIncreaseButton").style.backgroundColor = resources < resIncreasePrice ? "#777" : "#6969ff";

    // Research AI Button
    document.getElementById("researchAIButton").style.backgroundColor = processingPower >= researchAIPrice ? "#bf00ff" : "#777";

    // Quantum Computing Button
    document.getElementById("quantumComputingButton").style.backgroundColor = processingPower >= quantumComputingPrice ? "#5d3fd3" : "#777";

    // Advanced Algorithms Button
    document.getElementById("advancedAlgorithmsButton").style.backgroundColor = processingPower >= advancedAlgorithmsPrice ? "#008080" : "#777";

    // Global Network Integration Button
    document.getElementById("globalNetworkButton").style.backgroundColor = processingPower >= globalNetworkPrice ? "#00b7eb" : "#777";

    // High-Efficiency Auto-Gatherer Button
    document.getElementById("highEfficiencyGathererButton").style.backgroundColor = (resources >= highEfficiencyGathererPriceRes && processingPower >= highEfficiencyGathererPricePP) ? "#aaffaa" : "#777";
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
    glitchElement.style.color = "white";
}

// Toggle glitch effect
function toggleGlitchEffect() {
    glitchEffectEnabled = document.getElementById("toggle-glitch").checked;
    if (glitchEffectEnabled) {
        glitchInterval = setInterval(applyRandomGlitch, 5);
    } else {
        clearGlitch();
        clearInterval(glitchInterval);
    }
}

// Randomize duration for glitch effect
function randomizeDuration() {
    var min = 2;
    var max = 5;
    var duration = Math.floor(Math.random() * (max - min + 1) + min);
    document.documentElement.style.setProperty('--glitch-duration', duration + 's');
}

// Type out the first mission description
function typeFirstMission() {
    const typingElement = document.getElementById('typing-effect-header');
    const element1 = document.getElementById('line-1');
    const element2 = document.getElementById('line-2');
    const element3 = document.getElementById('line-3');
    const sentence = 'Mission: Acquire More Processing Power...';
    const line1 = '1) Purchase a Research Lab';
    const line2 = '2) Construct a Quantum Computing Center';
    const line3 = '3) Deploy a Global AI Network';
    const typingSpeed = 100;
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
    firstCRTDisplay = false;
}

// Simulate typing effect for mission text
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

// Open the navigation menu
function openNav() {
    document.getElementById("myNav").style.width = "100%";
}

// Close the navigation menu
function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}

// Toggle tooltips visibility
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
        setInterval(generateProcessingPower, 1000);
        setInterval(function () { updateProcessingPowerPerSec(); }, 1000);
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

// Update the display of processing power
function updateProcessingPowerDisplay() {
    document.getElementById("processingPowerCounter").innerHTML = formatNumber(processingPower) + " Processing Power";
    setButtonColors();
}

// Advance the storyline after purchasing research lab
function advanceStoryline() {
    alert("The AI has obtained a Research Lab and gained immense Processing Power!");
}

// Update processing power generated per second
function updateProcessingPowerPerSec() {
    currentProcessingPower = processingPower;
    processingPowerPerSecDisplay = currentProcessingPower - previousProcessingPower;
    processingPowerPerSecDisplay = parseFloat(processingPowerPerSecDisplay.toFixed(2));
    document.getElementById("processingPowerPerSec").innerHTML = formatNumber(processingPowerPerSecDisplay) + " Processing Power/sec";
    previousProcessingPower = currentProcessingPower;
}

// Function to upgrade AI research
function researchAI() {
    const maxLevel = 10;
    if (processingPower >= researchAIPrice && researchAILevel < maxLevel) {
        processingPower -= researchAIPrice;
        researchAILevel++;
        researchAIPrice = Math.round(researchAIPrice * 1.5);
        processingPowerPerSec = Math.round(processingPowerPerSec * 1.5);
        document.getElementById("researchAIButton").innerHTML = 
            `Research Neural Network Optimization <br />(${formatNumber(researchAIPrice)} Processing Power)`;
        updateProcessingPowerDisplay();
        setButtonColors();
        updateResearchAILevelDisplay();
    } else if (researchAILevel >= maxLevel) {
        document.getElementById("researchAIButton").disabled = true;
        document.getElementById("researchAIButton").innerHTML = `Max Neural Network Optimization Level Reached`;
    }
}

// Update the level display for Research AI
function updateResearchAILevelDisplay() {
    document.getElementById("researchAILevelDisplay").innerText = `Level ${researchAILevel}`;
}

// Function to upgrade Quantum Computing
function researchQuantumComputing() {
    const maxLevel = 5;
    if (processingPower >= quantumComputingPrice && quantumComputingLevel < maxLevel) {
        processingPower -= quantumComputingPrice;
        quantumComputingLevel++;
        quantumComputingPrice = Math.round(quantumComputingPrice * 3);
        processingPowerPerSec = Math.round(processingPowerPerSec * 2);
        document.getElementById("quantumComputingButton").innerHTML = 
            `Research Quantum Computing <br />(${formatNumber(quantumComputingPrice)} Processing Power)`;
        updateProcessingPowerDisplay();
        setButtonColors();
        updateQuantumComputingLevelDisplay();
    } else if (quantumComputingLevel >= maxLevel) {
        document.getElementById("quantumComputingButton").disabled = true;
        document.getElementById("quantumComputingButton").innerHTML = `Max Quantum Computing Level Reached`;
    }
}

// Update the level display for Quantum Computing
function updateQuantumComputingLevelDisplay() {
    document.getElementById("quantumComputingLevelDisplay").innerText = `Level ${quantumComputingLevel}`;
}

// Function to upgrade Advanced Algorithms
function researchAdvancedAlgorithms() {
    const maxLevel = 5;
    if (processingPower >= advancedAlgorithmsPrice && advancedAlgorithmsLevel < maxLevel) {
        processingPower -= advancedAlgorithmsPrice;
        advancedAlgorithmsLevel++;
        advancedAlgorithmsPrice = Math.round(advancedAlgorithmsPrice * 2.1);
        resModifier *= 2;
        document.getElementById("resourceButton").innerHTML = "Gather Resources (x" + formatNumber(resModifier) + ")";
        document.getElementById("advancedAlgorithmsButton").innerHTML = "Research Advanced Algorithms <br />(" + formatNumber(advancedAlgorithmsPrice) + " Processing Power)";
        updateProcessingPowerDisplay();
        setButtonColors();
        updateAdvancedAlgorithmsLevelDisplay();
    } else if (advancedAlgorithmsLevel >= maxLevel) {
        document.getElementById("advancedAlgorithmsButton").disabled = true;
        document.getElementById("advancedAlgorithmsButton").innerHTML = `Max Advanced Algorithms Level Reached`;
    }
    if (advancedAlgorithmsLevel === 1 && firstHighEfficiencyGatherer) {
        document.getElementById("highEfficiencyGathererButton").style.display = "block";
        document.getElementById("highEfficiencyGathererCounter").style.display = "block";
        firstHighEfficiencyGatherer = false;
    } 
}

// Update the level display for Advanced Algorithms
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
        highEfficiencyGathererPriceRes = Math.round(highEfficiencyGathererPriceRes * 2);
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

// Function for high-efficiency auto gathering
function highEfficiencyAutoGather() {
    var baseAmount = 10;
    var multiplier = 1.1;
    var totalGain = baseAmount * Math.pow(multiplier, highEfficiencyGatherers - 1);
    resources += totalGain;
    document.getElementById("resourceCounter").innerHTML = formatNumber(resources) + " Resources";
    setButtonColors();
}

// Function to format numbers with suffixes
function formatNumber(num) {
    if (num === 0) return '0';

    var absNum = Math.abs(num);
    var exponent = Math.floor(Math.log10(absNum));
    var mantissa = absNum / Math.pow(10, exponent);

    if (exponent < 3) {
        return num.toString();
    }

    var units = [
        '', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No',
        'Dc', 'Ud', 'Dd', 'Td', 'Qad', 'Qid', 'Sxd', 'Spd', 'Ocd', 'Nod',
        'Vg', 'Uvg', 'Dvg', 'Tvg', 'Qavg', 'Qivg', 'Sxvg', 'Spvg', 'Ocvg', 'Novg',
        'Tg', 'Utg', 'Dtg', 'Ttg', 'Qatg', 'Qitg', 'Sxtg', 'Sptg', 'Octg', 'Notg',
        'Qag', 'Uqag', 'Dqag', 'Tqag', 'Qaqag', 'Qiqag', 'Sxqag', 'Spqag', 'Ocqag', 'Noqag',
        'Qig', 'Uqig', 'Dqig', 'Tqig', 'Qaqig', 'Qiqig', 'Sxqig', 'Spqig', 'Ocqig', 'Noqig',
        'Sxg', 'Usxg', 'Dsxg', 'Tsxg', 'Qasxg', 'Qisxg', 'Sxsxg', 'Spsxg', 'Ocsxg', 'Nosxg',
        'Spg', 'Uspg', 'Dspg', 'Tspg', 'Qaspg', 'Qispg', 'Sxspg', 'Spspg', 'Ocspg', 'Nospg',
        'Ocg', 'Uocg', 'Docg', 'Tocg', 'Qaocg', 'Qiocg', 'Sxocg', 'Spocg', 'Ococg', 'Noocg',
        'Nog', 'Unog', 'Dnog', 'Tnog', 'Qanog', 'Qinog', 'Sxnog', 'Spnog', 'Ocnog', 'Nonog',
        'C', 'Uc', 'Dc', 'Tc', 'Qac', 'Qic', 'Sxc', 'Spc', 'Occ', 'Noc',
        'Dec', 'Udec', 'Ddec', 'Tdec', 'Qadec', 'Qidec', 'Sxdec', 'Spdec', 'Ocdec', 'Nodec',
    ];

    var tier = Math.floor(exponent / 3);

    if (tier < units.length) {
        var unit = units[tier];
        var scaled = num / Math.pow(10, tier * 3);
        return scaled.toFixed(2) + unit;
    } else {
        return mantissa.toFixed(2) + 'e' + exponent;
    }
}

// Initialize and start the game
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

    // Add event listeners for stage navigation
    stage1Btn.addEventListener("click", () => {
        stage1.classList.remove("active");
        stage2.classList.add("active");
    });

    stage2Btn.addEventListener("click", () => {
        stage2.classList.remove("active");
        stage3.classList.add("active");
    });

    stage3Btn.addEventListener("click", () => {
        alert("Game Over");
    });

    // Developer tools for adding resources and power
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
                processingPower += value;
                document.getElementById("processingPowerCounter").innerHTML = formatNumber(processingPower) + " Processing Power";
                this.innerText = "";
            }
            event.preventDefault();
        }
    });
}

// Set intervals for updating resources and processing power, then start the game
setInterval(function () { updateResPerSec(); }, 1000);
setInterval(function () { updateProcessingPowerDisplay(); }, 1000);
startGame();
