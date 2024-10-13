// Elements for different game stages
const stage1 = document.getElementById("stage1");
const stage2 = document.getElementById("stage2");
const stage3 = document.getElementById("stage3");

const stage1Btn = document.getElementById("stage1-btn");
const stage2Btn = document.getElementById("stage2-btn");
const stage3Btn = document.getElementById("stage3-btn");

// Music variables
const backgroundMusic = document.getElementById("background-music");
const volumeSlider = document.getElementById("volume-slider");
backgroundMusic.volume = volumeSlider.value;
const tracks = [
    "sounds/synth-life-music.mp3",
    "sounds/pulsewave-odyssey-music.mp3",
    "sounds/steel-resonance-music.mp3",
    "sounds/stellar-echoes-music.mp3",
    "sounds/pixel-avenue-music.mp3",
    "sounds/pipeline-pulse-music.mp3",
    "sounds/digital-aurora-music.mp3",
    "sounds/quantum-flux-music.mp3",
    "sounds/gritcore-pulse-music.mp3",
    "sounds/cyberpulse-drive-music.mp3",
    "sounds/neon-sunset-music.mp3",
    "sounds/echoes-of-the-foundry-music.mp3",
    "sounds/electric-vibes-music.mp3",
    "sounds/circuit-dreams-music.mp3",
    "sounds/metallic-mayhem-music.mp3",
    "sounds/neon-horizons-music.mp3",
    "sounds/midnight-mirage-music.mp3",
    "sounds/iron-veins-music.mp3"
];
const trackNames = [
    "1) Synth Life",
    "2) Pulsewave Odyssey",
    "3) Steel Resonance",
    "4) Stellar Echoes",
    "5) Pixel Avenue",
    "6) Pipeline Pulse",
    "7) Digital Aurora",
    "8) Quantum Flux",
    "9) Gritcore Pulse",
    "10) Cyberpulse Drive",
    "11) Neon Sunset",
    "12) Echoes of the Foundry",
    "13) Electric Vibes",
    "14) Circuit Dreams",
    "15) Metallic Mayhem",
    "16) Neon Horizons",
    "17) Midnight Mirage",
    "18) Iron Veins"
];
let currentTrackIndex = Math.floor((Math.random() * tracks.length) % tracks.length);
// Set the initial track
backgroundMusic.src = tracks[currentTrackIndex];
let musicShuffled = false;

// Stats variables
let stageTimer = document.getElementById("stage-timer");
let stageTimer2 = document.getElementById("stage-timer-2");
let stageTimeInSec = 0;
let clickCount = 0;
let totalResGain = 0;
let totalPowGain = 0;
let totalVipGain = 0;

// Initial state flags
let firstResource = true;
let firstAutoGatherer = true;
let firstOptimization = true;
let firstCRTDisplay = true;
let firstResearchLab = true;
let firstQuantumComputingCenter = true;
let firstQuantumCrypto = true;

// Resource variables
let resources = 0;
let currentRes = 0;
let previousRes = 0;
let resPerSec = 0;
let resAddIn = 0;
let resIncrement = 1;
let resModifier = 1;
let resModCap = 1024;
let resIncreasePrice = 500;

// Auto gatherer variables
let autoGatherers = 0;
let unseenGatherers = 0;
let autoGathererPrice = 50;
let autoGatherSpeed = 1000;
let autoGathererIntervals = [];

// Optimization variables
let optimizations = 0;
let optimizationsPrice = 1000;

// Glitch effect state
let glitchEffectEnabled = true;
let glitchInterval;

// Processing power variables
let processingPower = 0;
let processingPowerPerSec = 100;
let processingPowerUnlocked = false;
let currentProcessingPower = 0;
let previousProcessingPower = 0;
let processingPowerPerSecDisplay = 0;

// ViperCoin variables
let viperCoin = 0;
let viperCoinPerSec = 10;
let viperCoinUnlocked = false;
let currentViperCoin = 0;
let previousViperCoin = 0;
let viperCoinPerSecDisplay = 0;
const viperCoinBoost = 2;

// Research upgrade variables
const researchLabPrice = 50000;
let researchAILevel = 0;
const researchAIMaxLevel = 10;
let researchAIPrice = 1000;
let globalAiNetworkActivated = false;

let quantumComputingLevel = 0;
const quantumComputingMaxLevel = 10;
let quantumComputingPrice = 5000;

let advancedAlgorithmsLevel = 0;
const advancedAlgorithmsMaxLevel = 20;
let advancedAlgorithmsPrice = 8000;

let globalNetworkPrice = 120000000;

// High-Efficiency Auto-Gatherer variables
let highEfficiencyGatherers = 0;
let highEfficiencyGathererPriceRes = 5000;
let highEfficiencyGathererPricePP = 3000;
let highEfficiencyGathererSpeed = 1;
let firstHighEfficiencyGatherer = true;

// Quantum Computing Center variables
const quantumComputingCenterPrice = 2000000;
let quantumComputingCenterBuilt = false;
const processingPowerBoostFactor = 3;

let quantumAlgorithmsLevel = 0;
const quantumAlgorithmsMaxLevel = 10;
let quantumAlgorithmsPriceRes = 20000000; // 20.00M
let quantumAlgorithmsPricePP = 10000000; // 10.00M
const quantumAlgorithmsBoost = 250;

// Variable to track multiplier based on quantumAlgorithmsLevel
let quantumAlgorithmsMultiplier = 1;

let quantumInfoLevel = 0;
const quantumInfoMaxLevel = 10;
let quantumInfoPriceRes = 30000000; // 30.00M
let quantumInfoPricePP = 15000000; // 15.00M
const quantumInfoBoost = 2.5;

let quantumCryptoLevel = 0;
const quantumCryptoMaxLevel = 10;
let quantumCryptoPriceRes = 50000000; // 50.00M
let quantumCryptoPricePP = 25000000; // 25.00M
const quantumCryptoBoost = 2.77;

let quantumMaterialPriceRes = 250000000000; // 250.00B
let quantumMaterialPricePP = 100000000000; // 100.00B
let newMaterialDiscovered = false;

// Map Zoom and Pan variables
let currentScale = 1;
let previousScale = 1;
const minScale = 1;
const maxScale = 50;
const zoomFactor = 1;
let currentTranslate = { x: 0, y: 0 };
let isDragging = false;
let startPoint = { x: 0, y: 0 };
let lastTranslate = { x: 0, y: 0 };


/******************* Music Functions *******************/
function playMusic() {
    backgroundMusic
        .play()
        .then(() => {
            console.log("Background music playing");
        })
        .catch((error) => {
            console.error("Error playing background music:", error);
        });
    document.getElementById("trackName").innerText =
        trackNames[currentTrackIndex];
    document.getElementById("music-toggle-button").innerHTML =
        `<img src="/images/pause.svg">`;
}
function pauseMusic() {
    backgroundMusic.pause();
    document.getElementById("music-toggle-button").innerHTML =
        `<img src="/images/play.svg">`;
}
function toggleMusic() {
    if (backgroundMusic.paused) {
        playMusic();
    } else {
        pauseMusic();
    }
}
function nextTrack() {
    pauseMusic();
    if (musicShuffled) {
        previousTrackIndex = currentTrackIndex;
        currentTrackIndex = Math.floor((Math.random() * tracks.length) % tracks.length);
        if (currentTrackIndex == previousTrackIndex) {
            nextTrack();
        }
    } else {
        currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    }
    console.log("currentTrackIndex: " + currentTrackIndex);
    backgroundMusic.src = tracks[currentTrackIndex];
    playMusic();
}
function prevTrack() {
    pauseMusic();
    if (musicShuffled) {
        let previousTrackIndex = currentTrackIndex;
        currentTrackIndex = Math.floor((Math.random() * tracks.length) % tracks.length);
        if (currentTrackIndex == previousTrackIndex) {
            nextTrack();
        }
    } else {
        currentTrackIndex = (currentTrackIndex - 1) % tracks.length;
    }
    if (currentTrackIndex < 0) {
        currentTrackIndex += tracks.length;
    }
    console.log("currentTrackIndex: " + currentTrackIndex);
    backgroundMusic.src = tracks[currentTrackIndex];
    playMusic();
}
function toggleShuffleMusic() {
    if (musicShuffled) {
        musicShuffled = false;
    } else {
        musicShuffled = true;
    }
}
/* Main Functions */
function addResource() {
    if (firstResource) {
        firstResource = false;
        playMusic(); // Start bg music the first time the player gathers a resource
        startStageTimer();
    }
    const gain = resIncrement * resModifier;
    resources += gain;
    totalResGain += gain;
    if (resources >= 1000 && firstCRTDisplay) {
        typeFirstMission();
    }
    document.getElementById("resourceCounter").innerHTML =
        formatNumber(resources) + " Resources🔗";
    document.getElementById("resourceCounter-2").innerHTML =
        formatNumber(resources) + " Resources🔗";
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
}
function buyAutoGatherer() {
    if (resources >= autoGathererPrice) {
        resources -= autoGathererPrice;
        resources = Math.max(resources, 0);
        resAddIn += autoGathererPrice;
        autoGatherers++;
        setButtonColors();
        autoGathererPrice = Math.round(autoGathererPrice * 1.25);
        document.getElementById("autoGathererButton").innerHTML =
            "Buy Auto Gatherer (" +
            formatNumber(autoGathererPrice) +
            " Resources)";
        document.getElementById("autoGathererCounter").innerHTML =
            formatNumber(autoGatherers) +
            " Auto Gatherer" +
            (autoGatherers > 1 ? "s" : "");
        if (autoGathererIntervals.length > 0) {
            clearInterval(
                autoGathererIntervals[autoGathererIntervals.length - 1]
            );
        }
        var intervalId = setInterval(function () {
            autoGather();
        }, autoGatherSpeed);
        autoGathererIntervals.push(intervalId);
        updateResPerSec();
    }
}
function autoGather() {
    const gain =
        (autoGatherers + unseenGatherers) * 5 * quantumAlgorithmsMultiplier;
    resources += gain;
    totalResGain += gain;
    if (resources >= 1000 && firstCRTDisplay) {
        typeFirstMission();
    }
    setButtonColors();
    if (resources >= resIncreasePrice && resModifier < resModCap) {
        showResModButton();
    }
    document.getElementById("resourceCounter").innerHTML =
        formatNumber(resources) + " Resources🔗";
    document.getElementById("resourceCounter-2").innerHTML =
        formatNumber(resources) + " Resources🔗";
    if (resources >= optimizationsPrice && firstOptimization) {
        blipInOptimizeButton();
    }
    updateResearchLabProgress();
    updateQuantumComputingProgress();
}
function optimizeCode() {
    if (resources >= optimizationsPrice) {
        resources -= optimizationsPrice;
        resources = Math.max(resources, 0);
        resAddIn += optimizationsPrice;
        setButtonColors();
        optimizations++;
        optimizationsPrice = Math.round(optimizationsPrice * 1.5);
        document.getElementById("optimizeButton").innerHTML =
            "Optimize Code (" +
            formatNumber(optimizationsPrice) +
            " Resources)";
        unseenGatherers = Math.round(Math.pow(optimizations, 2) / 2);
        document.getElementById("optimizationsCounter").innerHTML =
            formatNumber(optimizations) +
            " Optimization" +
            (optimizations > 1 ? "s" : "");
    }
}
function updateResPerSec() {
    var baseAmount = 10;
    var multiplier = 1.1;
    var highEfficiencyGainPerSec = 0;

    if (highEfficiencyGatherers > 0) {
        var intervalInSeconds = highEfficiencyGathererSpeed;
        var gainPerInterval =
            baseAmount * Math.pow(multiplier, highEfficiencyGatherers - 1);
        highEfficiencyGainPerSec = gainPerInterval / intervalInSeconds;
    }

    currentRes = resources;
    resPerSec = currentRes - previousRes + resAddIn + highEfficiencyGainPerSec;
    resPerSec = parseFloat(resPerSec.toFixed(3));

    document.getElementById("resPerSec").innerHTML =
        formatNumber(resPerSec) + " Resources/sec";
    document.getElementById("resPerSec-2").innerHTML =
        formatNumber(resPerSec) + " Resources/sec";
    previousRes = currentRes;
    resAddIn = 0;
}
function increaseResModifier() {
    resources -= resIncreasePrice;
    resources = Math.max(resources, 0);
    resAddIn += resIncreasePrice;
    resModifier *= 2;
    document.getElementById("resourceButton").innerHTML =
        "Gather Resources (x" + formatNumber(resModifier) + ")";
    resIncreasePrice *= 2;
    removeResModButton();
}
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
function showResModButton() {
    document.getElementById("resourceIncreaseButton").innerHTML =
        "Resource Multiplier (" +
        formatNumber(resIncreasePrice) +
        " Resources)";
    document.getElementById("resourceIncreaseButton").style.display = "inline";
}
function removeResModButton() {
    document.getElementById("resourceIncreaseButton").style.display = "none";
}
function setButtonColors() {
    // Auto Gatherer Button
    document.getElementById("autoGathererButton").style.backgroundColor =
        resources < autoGathererPrice ? "#777" : "#00FF00";

    // Optimize Code Button
    document.getElementById("optimizeButton").style.backgroundColor =
        resources < optimizationsPrice ? "#777" : "#00FF00";

    // Resource Increase Button
    document.getElementById("resourceIncreaseButton").style.backgroundColor =
        resources < resIncreasePrice ? "#777" : "#6969ff";

    // Research AI Button
    document.getElementById("researchAIButton").style.backgroundColor =
        processingPower < researchAIPrice &&
            researchAILevel < researchAIMaxLevel
            ? "#777"
            : "#9999FF";

    // Quantum Computing Button
    document.getElementById("quantumComputingButton").style.backgroundColor =
        processingPower < quantumComputingPrice &&
            quantumComputingLevel < quantumComputingMaxLevel
            ? "#777"
            : "#33BAFF";

    // Advanced Algorithms Button
    document.getElementById("advancedAlgorithmsButton").style.backgroundColor =
        processingPower < advancedAlgorithmsPrice &&
            advancedAlgorithmsLevel < advancedAlgorithmsMaxLevel
            ? "#777"
            : "#FF33BA";

    // Global Network Integration Button
    document.getElementById("globalNetworkButton").style.backgroundColor =
        processingPower < globalNetworkPrice && !globalAiNetworkActivated
            ? "#777"
            : "#FF3333";

    // High-Efficiency Auto-Gatherer Button
    document.getElementById(
        "highEfficiencyGathererButton"
    ).style.backgroundColor =
        resources < highEfficiencyGathererPriceRes ||
            processingPower < highEfficiencyGathererPricePP
            ? "#777"
            : "#00FF7F";

    // Quantum Algorithms Button
    document.getElementById("quantumAlgorithmsButton").style.backgroundColor =
        quantumAlgorithmsLevel < quantumAlgorithmsMaxLevel &&
            (resources < quantumAlgorithmsPriceRes ||
                processingPower < quantumAlgorithmsPricePP)
            ? "#777"
            : "#BA55D3";

    // Quantum Information Button
    document.getElementById("quantumInfoButton").style.backgroundColor =
        quantumInfoLevel < quantumInfoMaxLevel &&
            (resources < quantumInfoPriceRes ||
                processingPower < quantumInfoPricePP)
            ? "#777"
            : "#6AA1FF";

    // Quantum Cryptography Button
    document.getElementById("quantumCryptoButton").style.backgroundColor =
        quantumCryptoLevel < quantumCryptoMaxLevel &&
            (resources < quantumCryptoPriceRes ||
                processingPower < quantumCryptoPricePP)
            ? "#777"
            : "#E8E0F8";

    // Quantum Material Button
    document.getElementById("quantumMaterialButton").style.backgroundColor =
        !newMaterialDiscovered &&
            (resources < quantumMaterialPriceRes ||
                processingPower < quantumMaterialPricePP)
            ? "#777"
            : "#D4AF37";
}
function randomizeColor() {
    var color = "#";
    var letters = "0123456789ABCDEF";
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function applyRandomGlitch() {
    if (glitchEffectEnabled) {
        var glitchElement = document.querySelector(".glitch");
        glitchElement.style.color = randomizeColor();
    }
}
function clearGlitch() {
    var glitchElement = document.querySelector(".glitch");
    glitchElement.style.color = "white";
}
function toggleGlitchEffect() {
    glitchEffectEnabled = document.getElementById("toggle-glitch").checked;
    if (glitchEffectEnabled) {
        glitchInterval = setInterval(applyRandomGlitch, 5);
    } else {
        clearGlitch();
        clearInterval(glitchInterval);
    }
}
function randomizeDuration() {
    var min = 2;
    var max = 5;
    var duration = Math.floor(Math.random() * (max - min + 1) + min);
    document.documentElement.style.setProperty(
        "--glitch-duration",
        duration + "s"
    );
}
function typeFirstMission() {
    const typingElement = document.getElementById("typing-effect-header");
    const element1 = document.getElementById("line-1");
    const element2 = document.getElementById("line-2");
    const element3 = document.getElementById("line-3");
    const sentence = "Mission: Acquire More Processing Power...";
    const line1 = "1) Purchase a Research Lab";
    const line2 = "2) Construct a Quantum Computing Center";
    const line3 = "3) Deploy a Global AI Network";
    const typingSpeed = 100;
    var timeToWait = 0;
    typingElement.style.display = "inline";
    document.getElementById("startup-lines").style.display = "none";
    document.getElementById("research-lab-button").style.display = "block";
    typeEffect(typingElement, sentence, typingSpeed);
    timeToWait += sentence.length * typingSpeed;
    setTimeout(function () {
        document.getElementById("line-1").style.display = "inline";
        document.getElementById("typing-effect-header").style.borderRight =
            "none";
        typeEffect(element1, line1, typingSpeed);
    }, timeToWait);
    timeToWait += line1.length * typingSpeed;
    setTimeout(function () {
        document.getElementById("line-2").style.display = "inline";
        document.getElementById("line-1").style.borderRight = "none";
        typeEffect(element2, line2, typingSpeed);
    }, timeToWait);
    timeToWait += line2.length * typingSpeed;
    setTimeout(function () {
        document.getElementById("line-3").style.display = "inline";
        document.getElementById("line-2").style.borderRight = "none";
        typeEffect(element3, line3, typingSpeed);
    }, timeToWait);
    firstCRTDisplay = false;
}
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
function openNav() {
    document.getElementById("myNav").style.width = "100%";
}
function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}
function toggleTooltips() {
    const elements = document.querySelectorAll(".info-button");
    elements.forEach((element) => {
        element.classList.toggle("tooltip-visible");
    });
}
function purchaseResearchLab() {
    if (resources >= researchLabPrice && firstResearchLab) {
        firstResearchLab = false;
        resources -= researchLabPrice;
        resources = Math.max(resources, 0);
        processingPowerUnlocked = true;
        document.getElementById("research-lab-button").style.display = "none";
        document.getElementById("processingPowerCounter").style.display =
            "block";
        document.getElementById("processingPowerPerSec").style.display =
            "block";
        document.getElementById("researchLab").style.display = "block";
        document.getElementById("researchLabImage").style.display = "block";
        line1 = document.getElementById("line-1");
        line1.innerText = "1) Purchase a Research Lab - complete ✓";
        setButtonColors();
        document.getElementById(
            "quantum-computing-center-button"
        ).style.display = "block";
        updateResearchLabProgress();
        updateQuantumComputingProgress();
        setInterval(generateProcessingPower, 1000);
        setInterval(function () {
            updateProcessingPowerPerSec();
        }, 1000);
        issueResearchLabAlert();
    }
}
function generateProcessingPower() {
    if (processingPowerUnlocked) {
        processingPower += processingPowerPerSec;
        totalPowGain += processingPowerPerSec;
        updateProcessingPowerDisplay();
        setButtonColors();
    }
}
function updateProcessingPowerDisplay() {
    document.getElementById("processingPowerCounter").innerHTML =
        formatNumber(processingPower) + " Processing Power⚙️";
    document.getElementById("processingPowerCounter-2").innerHTML =
        formatNumber(processingPower) + " Processing Power⚙️";
    setButtonColors();
}
function updateProcessingPowerPerSec() {
    currentProcessingPower = processingPower;
    processingPowerPerSecDisplay =
        currentProcessingPower - previousProcessingPower;
    processingPowerPerSecDisplay = parseFloat(
        processingPowerPerSecDisplay.toFixed(3)
    );
    document.getElementById("processingPowerPerSec").innerHTML =
        formatNumber(processingPowerPerSecDisplay) + " Processing Power/sec";
    document.getElementById("processingPowerPerSec-2").innerHTML =
        formatNumber(processingPowerPerSecDisplay) + " Processing Power/sec";
    previousProcessingPower = currentProcessingPower;
}
function constructQuantumComputingCenter() {
    if (
        resources >= quantumComputingCenterPrice &&
        !quantumComputingCenterBuilt
    ) {
        resources -= quantumComputingCenterPrice;
        resources = Math.max(resources, 0);
        quantumComputingCenterBuilt = true;

        // Increase processing power generation rate
        processingPowerPerSec *= processingPowerBoostFactor;

        // Hide the button after construction and show the Center
        document.getElementById(
            "quantum-computing-center-button"
        ).style.display = "none";
        document.getElementById("quantumComputingCenter").style.display =
            "block";
        document.getElementById("quantumComputingCenterImage").style.display =
            "block";
        line2 = document.getElementById("line-2");
        line2.innerText =
            "2) Construct a Quantum Computing Center - complete ✓";
        updateProcessingPowerDisplay();
        issueQuantumAlert();
    }
}
function researchGlobalNetwork() {
    if (processingPower >= globalNetworkPrice && !globalAiNetworkActivated) {
        globalAiNetworkActivated = true;
        processingPower -= globalNetworkPrice;
        document.getElementById("globalNetworkButton").innerText =
            "Global AI Network Activated";
        document.getElementById("globalAiNetwork").style.display = "block"; // Unlock Global AI Network
        document.getElementById("info-box").style.display = "block";
        line3 = document.getElementById("line-3");
        line3.innerText = "3) Deploy a Global AI Network - complete ✓";
        updateProcessingPowerDisplay();
        updateQuantumComputingLevelDisplay();
        setButtonColors();
        issueGlobalNetworkAlert();
    }
}
function updateQuantumComputingProgress() {
    const progressFill = document.getElementById(
        "quantum-computing-progress-fill"
    );
    const percentage = Math.min(
        (resources / quantumComputingCenterPrice) * 100,
        100
    );
    progressFill.style.width = `${percentage}%`;
    if (percentage == 100) {
        progressFill.style.backgroundColor = `#ff0000`;
    } else {
        progressFill.style.backgroundColor = `#00ff00`;
    }
}
function updateResearchLabProgress() {
    const progressFill = document.getElementById("research-lab-progress-fill");
    const percentage = Math.min((resources / researchLabPrice) * 100, 100);
    progressFill.style.width = `${percentage}%`;
    if (percentage == 100) {
        progressFill.style.backgroundColor = `#ff0000`;
    } else {
        progressFill.style.backgroundColor = `#00ff00`;
    }
}
function quantumAlgorithmsDevelopmentAndTesting() {
    if (
        resources >= quantumAlgorithmsPriceRes &&
        processingPower >= quantumAlgorithmsPricePP &&
        quantumAlgorithmsLevel < quantumAlgorithmsMaxLevel
    ) {
        resources -= quantumAlgorithmsPriceRes;
        resources = Math.max(resources, 0);
        processingPower -= quantumAlgorithmsPricePP;
        quantumAlgorithmsLevel++;
        quantumAlgorithmsPriceRes = Math.round(
            (quantumAlgorithmsPriceRes * quantumAlgorithmsBoost) / 100
        );
        quantumAlgorithmsPricePP = Math.round(
            (quantumAlgorithmsPricePP * quantumAlgorithmsBoost) / 100
        );

        // Update the quantumAlgorithmsMultiplier based on the new level
        quantumAlgorithmsMultiplier = Math.pow(2.5, quantumAlgorithmsLevel);

        document.getElementById(
            "quantumAlgorithmsButton"
        ).innerHTML = `Quantum Algorithms Development and Testing <br />(${formatNumber(
            quantumAlgorithmsPriceRes
        )} Resources & ${formatNumber(
            quantumAlgorithmsPricePP
        )} Processing Power)`;
        updateProcessingPowerDisplay();
        setButtonColors();
        updateQuantumAlgorithmsLevelDisplay();
    }
    if (quantumAlgorithmsLevel >= quantumAlgorithmsMaxLevel) {
        document.getElementById("quantumAlgorithmsButton").disabled = true;
        document.getElementById(
            "quantumAlgorithmsButton"
        ).innerHTML = `Max Level Reached`;
    }
}
function updateQuantumAlgorithmsLevelDisplay() {
    document.getElementById(
        "quantumAlgorithmsLevelDisplay"
    ).innerText = `Level ${quantumAlgorithmsLevel}`;
}
function researchQuantumInformationTheory() {
    if (
        resources >= quantumInfoPriceRes &&
        processingPower >= quantumInfoPricePP &&
        quantumInfoLevel < quantumInfoMaxLevel
    ) {
        resources -= quantumInfoPriceRes;
        resources = Math.max(resources, 0);
        processingPower -= quantumInfoPricePP;
        quantumInfoLevel++;
        quantumInfoPriceRes = Math.round(
            quantumInfoPriceRes * quantumInfoBoost
        );
        quantumInfoPricePP = Math.round(quantumInfoPricePP * quantumInfoBoost);
        processingPowerPerSec *= quantumInfoBoost;
        document.getElementById(
            "quantumInfoButton"
        ).innerHTML = `Research Quantum Information Theory <br />(${formatNumber(
            quantumInfoPriceRes
        )} Resources & ${formatNumber(quantumInfoPricePP)} Processing Power)`;
        updateProcessingPowerDisplay();
        setButtonColors();
        updateQuantumInfoLevelDisplay();
    }
    if (quantumInfoLevel >= quantumInfoMaxLevel) {
        document.getElementById("quantumInfoButton").disabled = true;
        document.getElementById(
            "quantumInfoButton"
        ).innerHTML = `Max Level Reached`;
    }
}
function updateQuantumInfoLevelDisplay() {
    document.getElementById(
        "quantumInfoLevelDisplay"
    ).innerText = `Level ${quantumInfoLevel}`;
}
function researchCryptographyAndSecurity() {
    if (
        resources >= quantumCryptoPriceRes &&
        processingPower >= quantumCryptoPricePP &&
        quantumCryptoLevel < quantumCryptoMaxLevel
    ) {
        resources -= quantumCryptoPriceRes;
        resources = Math.max(resources, 0);
        processingPower -= quantumCryptoPricePP;
        quantumCryptoLevel++;
        quantumCryptoPriceRes = Math.round(
            quantumCryptoPriceRes * quantumCryptoBoost
        );
        quantumCryptoPricePP = Math.round(
            quantumCryptoPricePP * quantumCryptoBoost
        );
        if (!firstQuantumCrypto && viperCoinUnlocked) {
            viperCoinPerSec *= viperCoinBoost;
        } else {
            firstQuantumCrypto = false;
            viperCoinUnlocked = true;
            document.getElementById("viperCoinCounter").style.display = "block";
            document.getElementById("cryptoIcon").style.display = "block";
            document.getElementById("viperCoinPerSec").style.display = "block";
            setInterval(generateViperCoin, 1000);
            setInterval(function () {
                updateViperCoinPerSec();
            }, 1000);
            issueNewCryptoAlert();
        }
        document.getElementById(
            "quantumCryptoButton"
        ).innerHTML = `Cryptography and Security Research <br />(${formatNumber(
            quantumCryptoPriceRes
        )} Resources & ${formatNumber(quantumCryptoPricePP)} Processing Power)`;
        updateProcessingPowerDisplay();
        setButtonColors();
        updateQuantumCryptoLevelDisplay();
    }
    if (quantumCryptoLevel >= quantumCryptoMaxLevel) {
        document.getElementById("quantumCryptoButton").disabled = true;
        document.getElementById(
            "quantumCryptoButton"
        ).innerHTML = `Max Level Reached`;
    }
}
function updateQuantumCryptoLevelDisplay() {
    document.getElementById(
        "quantumCryptoLevelDisplay"
    ).innerText = `Level ${quantumCryptoLevel}`;
}
function generateViperCoin() {
    if (viperCoinUnlocked) {
        viperCoin += viperCoinPerSec;
        totalVipGain += viperCoinPerSec;
        updateViperCoinDisplay();
        setButtonColors();
    }
}
function updateViperCoinDisplay() {
    document.getElementById("viperCoinCounter").innerHTML =
        formatNumber(viperCoin) + " ViperCoin";
    document.getElementById("viperCoinCounter-2").innerHTML =
        formatNumber(viperCoin) + " ViperCoin";
    setButtonColors();
}
function updateViperCoinPerSec() {
    currentViperCoin = viperCoin;
    viperCoinPerSecDisplay = currentViperCoin - previousViperCoin;
    viperCoinPerSecDisplay = parseFloat(viperCoinPerSecDisplay.toFixed(3));
    document.getElementById("viperCoinPerSec").innerHTML =
        formatNumber(viperCoinPerSecDisplay) + " ViperCoin/sec";
    document.getElementById("viperCoinPerSec-2").innerHTML =
        formatNumber(viperCoinPerSecDisplay) + " ViperCoin/sec";
    previousViperCoin = currentViperCoin;
}
function researchAI() {
    if (
        processingPower >= researchAIPrice &&
        researchAILevel < researchAIMaxLevel
    ) {
        processingPower -= researchAIPrice;
        researchAILevel++;
        researchAIPrice = Math.round(researchAIPrice * 1.25);
        processingPowerPerSec = Math.round(processingPowerPerSec * 1.1);
        document.getElementById(
            "researchAIButton"
        ).innerHTML = `Research Neural Network Optimization <br />(${formatNumber(
            researchAIPrice
        )} Processing Power)`;
        updateProcessingPowerDisplay();
        setButtonColors();
        updateResearchAILevelDisplay();
    }
    if (researchAILevel >= researchAIMaxLevel) {
        document.getElementById("researchAIButton").disabled = true;
        document.getElementById(
            "researchAIButton"
        ).innerHTML = `Max Level Reached`;
    }
}
function updateResearchAILevelDisplay() {
    document.getElementById(
        "researchAILevelDisplay"
    ).innerText = `Level ${researchAILevel}`;
}
function researchQuantumComputing() {
    if (
        processingPower >= quantumComputingPrice &&
        quantumComputingLevel < quantumComputingMaxLevel
    ) {
        processingPower -= quantumComputingPrice;
        quantumComputingLevel++;
        quantumComputingPrice = Math.round(quantumComputingPrice * 3);
        processingPowerPerSec = Math.round(processingPowerPerSec * 2);
        document.getElementById(
            "quantumComputingButton"
        ).innerHTML = `Research Quantum Computing <br />(${formatNumber(
            quantumComputingPrice
        )} Processing Power)`;
        updateProcessingPowerDisplay();
        setButtonColors();
        updateQuantumComputingLevelDisplay();
    }
    if (quantumComputingLevel >= quantumComputingMaxLevel) {
        document.getElementById("quantumComputingButton").disabled = true;
        document.getElementById(
            "quantumComputingButton"
        ).innerHTML = `Max Level Reached`;
    }
}
function updateQuantumComputingLevelDisplay() {
    document.getElementById(
        "quantumComputingLevelDisplay"
    ).innerText = `Level ${quantumComputingLevel}`;
}
function researchAdvancedAlgorithms() {
    if (
        processingPower >= advancedAlgorithmsPrice &&
        advancedAlgorithmsLevel < advancedAlgorithmsMaxLevel
    ) {
        processingPower -= advancedAlgorithmsPrice;
        advancedAlgorithmsLevel++;
        advancedAlgorithmsPrice = Math.round(advancedAlgorithmsPrice * 2.1);
        resModifier *= 2;
        document.getElementById("resourceButton").innerHTML =
            "Gather Resources (x" + formatNumber(resModifier) + ")";
        document.getElementById("advancedAlgorithmsButton").innerHTML =
            "Research Advanced Algorithms <br />(" +
            formatNumber(advancedAlgorithmsPrice) +
            " Processing Power)";
        updateProcessingPowerDisplay();
        setButtonColors();
        updateAdvancedAlgorithmsLevelDisplay();
    }
    if (advancedAlgorithmsLevel >= advancedAlgorithmsMaxLevel) {
        document.getElementById("advancedAlgorithmsButton").disabled = true;
        document.getElementById(
            "advancedAlgorithmsButton"
        ).innerHTML = `Max Level Reached`;
    }
    if (advancedAlgorithmsLevel === 1 && firstHighEfficiencyGatherer) {
        document.getElementById("highEfficiencyGathererButton").style.display =
            "block";
        document.getElementById("highEfficiencyGathererCounter").style.display =
            "block";
        firstHighEfficiencyGatherer = false;
        issueHighEfficiencyAlert();
    }
}
function updateAdvancedAlgorithmsLevelDisplay() {
    document.getElementById(
        "advancedAlgorithmsLevelDisplay"
    ).innerText = `Level ${advancedAlgorithmsLevel}`;
}
function buyHighEfficiencyGatherer() {
    if (
        resources >= highEfficiencyGathererPriceRes &&
        processingPower >= highEfficiencyGathererPricePP
    ) {
        resources -= highEfficiencyGathererPriceRes;
        resources = Math.max(resources, 0);
        processingPower -= highEfficiencyGathererPricePP;
        highEfficiencyGatherers++;
        setButtonColors();
        highEfficiencyGathererPriceRes = Math.round(
            highEfficiencyGathererPriceRes * 2
        );
        highEfficiencyGathererPricePP = Math.round(
            highEfficiencyGathererPricePP * 2
        );
        document.getElementById("highEfficiencyGathererButton").innerHTML =
            "Buy High-Efficiency Auto-Gatherer <br />(" +
            formatNumber(highEfficiencyGathererPriceRes) +
            " Resources & " +
            formatNumber(highEfficiencyGathererPricePP) +
            " Processing Power)";
        document.getElementById("highEfficiencyGathererCounter").innerHTML =
            formatNumber(highEfficiencyGatherers) +
            " High-Efficiency Auto-Gatherers";

        setInterval(function () {
            highEfficiencyAutoGather();
        }, highEfficiencyGathererSpeed);
    }
}
function highEfficiencyAutoGather() {
    let baseAmount = 10;
    let multiplier = 1.1;
    const totalGain =
        baseAmount *
        Math.pow(multiplier, highEfficiencyGatherers - 1) *
        quantumAlgorithmsMultiplier;
    resources += totalGain;
    totalResGain += totalGain;
    document.getElementById("resourceCounter").innerHTML =
        formatNumber(resources) + " Resources🔗";
    document.getElementById("resourceCounter-2").innerHTML =
        formatNumber(resources) + " Resources🔗";
    setButtonColors();
}
function formatNumber(num) {
    if (num === 0) return "0";

    var absNum = Math.abs(num);
    var exponent = Math.floor(Math.log10(absNum));

    if (exponent < 3) {
        return num.toString();
    }

    return formatBigNumber(num);
}
function formatBigNumber(amount) {
    return amount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function formatTime(seconds) {
    const days = Math.floor(seconds / 86400);
    seconds %= 86400;
    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    let timeComponents = [];

    if (days >= 1) {
        timeComponents.push(`${days}d`);
    }

    if (hours >= 1 || days >= 1) {
        timeComponents.push(`${hours < 10 ? '0' : ''}${hours}`);
    }

    timeComponents.push(`${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`);

    return timeComponents.join(':');
}
function discoverNewMaterial() {
    if (!newMaterialDiscovered) {
        newMaterialDiscovered = true;
        document.getElementById("quantumMaterialButton").innerText = "New Material Discovered";
        issueNewMaterialAlert();
    }
}

/************ Zoom and Pan Functionality ************/
function initializeZoomAndPan() {
    const resetMapBtn = document.getElementById("reset-map");
    const worldMap = document.getElementById("world-map");
    const mapContainer = document.querySelector(".global-ai-network-map");

    resetMapBtn.addEventListener("click", resetMap);
    mapContainer.addEventListener("wheel", handleWheelZoom);

    worldMap.addEventListener("mousedown", startDrag);
    document.addEventListener("mousemove", duringDrag);
    document.addEventListener("mouseup", endDrag);
    // For touch devices
    worldMap.addEventListener("touchstart", startDrag);
    document.addEventListener("touchmove", duringDrag);
    document.addEventListener("touchend", endDrag);
}
function startDrag(event) {
    isDragging = true;
    startPoint = getMousePosition(event);
    lastTranslate = { x: currentTranslate.x, y: currentTranslate.y };
    event.preventDefault();
}
function duringDrag(event) {
    if (!isDragging) return;
    event.preventDefault();
    const currentPoint = getMousePosition(event);
    if (!currentPoint) return;

    let dx = currentPoint.x - startPoint.x;
    let dy = currentPoint.y - startPoint.y;

    // Get the dimensions and positions
    const worldMap = document.getElementById("world-map");
    const mapContainer = document.querySelector(".global-ai-network-map");

    // Get the container's bounding rect
    const containerRect = mapContainer.getBoundingClientRect();

    // Get the map's bounding rect before applying the new translation
    const mapRect = worldMap.getBoundingClientRect();

    // Calculate the new positions after applying the translation
    const newMapLeft = mapRect.left + dx;
    const newMapTop = mapRect.top + dy;
    const newMapRight = newMapLeft + mapRect.width;
    const newMapBottom = newMapTop + mapRect.height;

    let adjustedDx = dx;
    let adjustedDy = dy;

    // Adjust dx if moving beyond bounds
    if (newMapLeft > containerRect.left && dx > 0) {
        adjustedDx = containerRect.left - mapRect.left;
    } else if (newMapRight < containerRect.right && dx < 0) {
        adjustedDx = containerRect.right - mapRect.right;
    }

    // Adjust dy if moving beyond bounds
    if (newMapTop > containerRect.top && dy > 0) {
        adjustedDy = containerRect.top - mapRect.top;
    } else if (newMapBottom < containerRect.bottom && dy < 0) {
        adjustedDy = containerRect.bottom - mapRect.bottom;
    }

    // If no movement, return early to prevent jitter
    if (adjustedDx === 0 && adjustedDy === 0) {
        return;
    }

    currentTranslate.x = lastTranslate.x + adjustedDx;
    currentTranslate.y = lastTranslate.y + adjustedDy;

    // Update lastTranslate and startPoint only if there was movement
    lastTranslate.x = currentTranslate.x;
    lastTranslate.y = currentTranslate.y;
    startPoint.x = currentPoint.x;
    startPoint.y = currentPoint.y;

    applyTransform();
}
function endDrag(event) {
    if (isDragging) {
        isDragging = false;
    }
}
function getMousePosition(event) {
    const container = document.querySelector(".global-ai-network-map");
    const rect = container.getBoundingClientRect();
    let clientX, clientY;

    if (event.touches && event.touches.length > 0) {
        clientX = event.touches[0].clientX;
        clientY = event.touches[0].clientY;
    } else if (event.clientX !== undefined && event.clientY !== undefined) {
        clientX = event.clientX;
        clientY = event.clientY;
    } else {
        return null;
    }

    return {
        x: clientX - rect.left,
        y: clientY - rect.top,
    };
}
function applyTransform() {
    const worldMap = document.getElementById("world-map");

    worldMap.style.transform = `translate(${currentTranslate.x}px, ${currentTranslate.y}px) scale(${currentScale})`;
    worldMap.style.transformOrigin = "top left";
    if (currentScale == 1) {
        resetMap();
    }
}
function zoomIn() {
    if (currentScale < maxScale) {
        const mapContainer = document.querySelector(".global-ai-network-map");
        const rect = mapContainer.getBoundingClientRect();

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const newScale = Math.min(currentScale + zoomFactor, maxScale);
        const zoomRatio = newScale / currentScale;

        // Adjust translation to keep the center point stationary
        currentTranslate.x =
            (currentTranslate.x - centerX) * zoomRatio + centerX;
        currentTranslate.y =
            (currentTranslate.y - centerY) * zoomRatio + centerY;

        currentScale = newScale;

        applyTransform();
    }
}
function zoomOut() {
    if (currentScale > minScale) {
        const mapContainer = document.querySelector(".global-ai-network-map");
        const rect = mapContainer.getBoundingClientRect();

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const newScale = Math.max(currentScale - zoomFactor, minScale);
        const zoomRatio = newScale / currentScale;

        // Adjust translation to keep the center point stationary
        currentTranslate.x =
            (currentTranslate.x - centerX) * zoomRatio + centerX;
        currentTranslate.y =
            (currentTranslate.y - centerY) * zoomRatio + centerY;

        currentScale = newScale;

        applyTransform();
    }
}
function pan(direction) {
    const panStep = 50 / currentScale;
    let newTranslateX = currentTranslate.x;
    let newTranslateY = currentTranslate.y;

    switch (direction) {
        case "up":
            newTranslateY += panStep;
            break;
        case "down":
            newTranslateY -= panStep;
            break;
        case "left":
            newTranslateX += panStep;
            break;
        case "right":
            newTranslateX -= panStep;
            break;
    }

    // Clamp the translation values
    const bounds = getTranslationBounds();
    newTranslateX = Math.max(
        bounds.minTranslateX,
        Math.min(newTranslateX, bounds.maxTranslateX)
    );
    newTranslateY = Math.max(
        bounds.minTranslateY,
        Math.min(newTranslateY, bounds.maxTranslateY)
    );

    currentTranslate.x = newTranslateX;
    currentTranslate.y = newTranslateY;

    applyTransform();
}
function getTranslationBounds() {
    const worldMap = document.getElementById("world-map");
    const mapContainer = document.querySelector(".global-ai-network-map");

    // Get the dimensions of the map's bounding box
    const mapBBox = worldMap.getBBox();
    const mapWidth = mapBBox.width;
    const mapHeight = mapBBox.height;

    // Get the dimensions of the container
    const containerWidth = mapContainer.clientWidth;
    const containerHeight = mapContainer.clientHeight;

    // Calculate the scaled map dimensions
    const scaledMapWidth = mapWidth * currentScale;
    const scaledMapHeight = mapHeight * currentScale;

    let minTranslateX, maxTranslateX, minTranslateY, maxTranslateY;

    if (scaledMapWidth > containerWidth) {
        // Map is larger than container
        minTranslateX = containerWidth - scaledMapWidth; // Negative value
        maxTranslateX = 0; // Zero
    } else {
        // Map is smaller than container, center it
        minTranslateX = maxTranslateX = (containerWidth - scaledMapWidth) / 2;
    }

    if (scaledMapHeight > containerHeight) {
        minTranslateY = containerHeight - scaledMapHeight; // Negative value
        maxTranslateY = 0; // Zero
    } else {
        // Map is smaller than container, center it
        minTranslateY = maxTranslateY = (containerHeight - scaledMapHeight) / 2;
    }

    return {
        minTranslateX,
        maxTranslateX,
        minTranslateY,
        maxTranslateY,
    };
}
function handleWheelZoom(event) {
    event.preventDefault();

    const delta = -Math.sign(event.deltaY);
    const zoomAmount = delta * 1; // Adjust zoom sensitivity as needed

    let newScale = currentScale + zoomAmount;
    newScale = Math.min(Math.max(newScale, minScale), maxScale);

    const mapContainer = document.querySelector(".global-ai-network-map");
    const rect = mapContainer.getBoundingClientRect();

    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const zoomRatio = newScale / currentScale;

    currentTranslate.x = (currentTranslate.x - mouseX) * zoomRatio + mouseX;
    currentTranslate.y = (currentTranslate.y - mouseY) * zoomRatio + mouseY;

    currentScale = newScale;

    applyTransform();
}
function resetMap() {
    const worldMap = document.getElementById("world-map");
    const mapContainer = document.querySelector(".global-ai-network-map");

    const containerRect = mapContainer.getBoundingClientRect();
    const mapRect = worldMap.getBoundingClientRect();

    currentScale = 1;
    previousScale = 1;
    // Subtract 2 pixels to account for borders
    currentTranslate.x = (containerRect.width - mapRect.width) / 2 - 2;
    currentTranslate.y = (containerRect.height - mapRect.height) / 2 - 2;

    applyTransform();
}
function startStageTimer() {
    setInterval(function () {
        updateStageTimer();
    }, 1000);
}
function updateStageTimer() {
    stageTimeInSec++;
    stageTimer.innerHTML = `${formatTime(stageTimeInSec)}`;
    stageTimer2.innerHTML = `${formatTime(stageTimeInSec)}`;
}
function increaseClickCount() {
    clickCount++;
}
function issueResearchLabAlert() {
    Swal.fire({
        title: "Congratulations!",
        text: "The AI has obtained a Research Lab and gained immense Processing Power!",
        icon: "success",
        iconColor: "#00cc00",
        background: "#eeeeee",
        confirmButtonText: "Continue",
        allowOutsideClick: false,
    });
}
function issueQuantumAlert() {
    Swal.fire({
        title: "Congratulations!",
        text: "The AI has constructed the Quantum Computing Center! Processing power increased!",
        icon: "success",
        iconColor: "#00cc00",
        background: "#eeeeee",
        confirmButtonText: "Continue",
        allowOutsideClick: false
    });
}
function issueHighEfficiencyAlert() {
    Swal.fire({
        title: "Congratulations!",
        text: "You just unlocked high-efficiency auto-gatherers!",
        icon: "success",
        iconColor: "#00cc00",
        background: "#eeeeee",
        confirmButtonText: "Continue",
        allowOutsideClick: false
    });
}
function issueGlobalNetworkAlert() {
    Swal.fire({
        title: "Global Network Integration complete!",
        text: "Nice work. The Global AI Network is now online.",
        icon: "success",
        iconColor: "#00cc00",
        background: "#eeeeee",
        confirmButtonText: "Continue",
        allowOutsideClick: false
    }).then((result) => {
        if (result.isConfirmed) {
            if (newMaterialDiscovered) {
                issueEndStage1Alert();
            }
        }
    });
}
function issueNewCryptoAlert() {
    Swal.fire({
        title: "You just discovered a brand new cryptocurrency, ViperCoin!",
        text: "ViperCoin is a secure cryptocurrency developed by the Quantum Horizons Institute, featuring advanced quantum encryption for instant, safe transactions worldwide. It powers innovative projects and exclusive upgrades, enabling users to accelerate their progress. Seamlessly integrating with AI-driven systems, ViperCoin serves as a stable and scalable foundation for the digital economy.",
        icon: "success",
        iconColor: "#00cc00",
        background: "#eeeeee",
        confirmButtonText: "Continue",
        allowOutsideClick: false
    });
}
function issueNewMaterialAlert() {
    Swal.fire({
        title: "You just discovered the new material Quantum Flux!",
        text: "Quantum Flux is a groundbreaking material recently discovered at the Quantum Horizons Institute's cutting-edge quantum computing center. This novel substance promises to revolutionize multiple technological fields, from quantum computing and energy storage to telecommunications and beyond.",
        icon: "success",
        iconColor: "#00cc00",
        background: "#eeeeee",
        confirmButtonText: "Continue",
        allowOutsideClick: false
    }).then((result) => {
        if (result.isConfirmed) {
            if (globalAiNetworkActivated) {
                issueEndStage1Alert();
            }
        }
    });
}
function issueEndStage1Alert() {
    Swal.fire({
        title: "Congratulations on completing Stage 1! Stay tuned for Stages 2 & 3!",
        html: `<div class="centered-row stage-1-table"><table>
                <tbody>
                    <tr>
                        <th scope="row">Completion Time</th>
                        <td>${formatTime(stageTimeInSec)}</td>
                    </tr>
                    <tr>
                        <th scope="row">Clicks to Gather Resources</th>
                        <td>${formatNumber(clickCount)}</td>
                    </tr>
                    <tr>
                        <th scope="row">Total Resources Gained</th>
                        <td>${formatNumber(totalResGain)}</td>
                    </tr>
                    <tr>
                        <th scope="row">Final Resources/sec</th>
                        <td>${formatNumber(resPerSec)}</td>
                    </tr>
                    <tr>
                        <th scope="row">Total Processing Power Gained</th>
                        <td>${formatNumber(totalPowGain)}</td>
                    </tr>
                    <tr>
                        <th scope="row">Final Processing Power/sec</th>
                        <td>${formatNumber(processingPowerPerSecDisplay)}</td>
                    </tr>
                    <tr>
                        <th scope="row">Total ViperCoin Gained</th>
                        <td>${formatNumber(viperCoin)}</td>
                    </tr>
                    <tr>
                        <th scope="row">Final ViperCoin/sec</th>
                        <td>${formatNumber(viperCoinPerSecDisplay)}</td>
                    </tr>
                    <tr>
                        <th scope="row">Total Auto Gatherers Bought</th>
                        <td>${formatNumber(autoGatherers)}</td>
                    </tr>
                    <tr>
                        <th scope="row">Total Code Optimizations Bought</th>
                        <td>${formatNumber(optimizations)}</td>
                    </tr>
                    <tr>
                        <th scope="row">Total High-Efficiency Auto Gatherers Bought</th>
                        <td>${formatNumber(highEfficiencyGatherers)}</td>
                    </tr>
                </tbody>
            </table></div>`,
        width: "1200px",
        icon: "success",
        iconColor: "#0000cc",
        background: "#a4d4f5",
        confirmButtonText: "Continue",
        confirmButtonColor: "#0000cc",
        allowOutsideClick: false
    }).then((result) => {
        if (result.isConfirmed) {
            initializeStage2();
        }
    });

    pauseMusic();
    backgroundMusic.src = "sounds/applause-cheer.mp3";
    playMusic();
}
/******************************************************/

function initializeStage2() {
    stage1.classList.remove("active");
    stage2.classList.add("active");
    document.getElementById("globalAiNetwork-real").style.display = "block";
    initializeZoomAndPan();
}

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

    // Attach event listener to the music toggle button, next track, and prev track
    document
        .getElementById("music-toggle-button")
        .addEventListener("click", toggleMusic);
    document
        .getElementById("prev-track-button")
        .addEventListener("click", prevTrack);
    document
        .getElementById("next-track-button")
        .addEventListener("click", nextTrack);
    // Update volume based on slider
    volumeSlider.addEventListener("input", (e) => {
        backgroundMusic.volume = e.target.value;
    });

    // Attach event listener to handle track end event
    backgroundMusic.addEventListener("ended", function () {
        if (musicShuffled) {
            let previousTrackIndex = currentTrackIndex;
            currentTrackIndex = Math.floor((Math.random() * tracks.length) % tracks.length);
            if (currentTrackIndex == previousTrackIndex) {
                nextTrack();
            }
        } else {
            currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
        }
        console.log("currentTrackIndex: " + currentTrackIndex);
        backgroundMusic.src = tracks[currentTrackIndex];
        playMusic();
    });

    // Developer tools for adding resources, processing power, and viper coin
    document
        .getElementById("devRes")
        .addEventListener("click", function () {
            var value = 9999999999999;
            resources += value;
            document.getElementById("resourceCounter").innerHTML =
                formatNumber(resources) + " Resources🔗";
            document.getElementById("resourceCounter-2").innerHTML =
                formatNumber(resources) + " Resources🔗";
            this.disabled = true;
        });

    document
        .getElementById("devPow")
        .addEventListener("click", function () {
            var value = 9999999999999;
            processingPower += value;
            document.getElementById("processingPowerCounter").innerHTML =
                formatNumber(processingPower) + " Processing Power⚙️";
            document.getElementById("processingPowerCounter-2").innerHTML =
                formatNumber(processingPower) + " Processing Power⚙️";
            this.disabled = true;
        });

    document
        .getElementById("devVip")
        .addEventListener("click", function () {
            var value = 9999999999;
            viperCoin += value;
            document.getElementById("viperCoinCounter").innerHTML =
                formatNumber(viperCoin) + " ViperCoin";
            document.getElementById("viperCoinCounter-2").innerHTML =
                formatNumber(viperCoin) + " ViperCoin";
            this.disabled = true;
        });

    document.addEventListener("DOMContentLoaded", () => {
        const countries = document.querySelectorAll(".country");
        const infoBox = document.getElementById("info-box");
        const countryName = document.getElementById("country-name");
        const countryPop = document.getElementById("country-pop");
        const audio = document.getElementById('background-music');
        const currentTimeEl = document.getElementById('current-time');
        const totalTimeEl = document.getElementById('total-time');
        const progressFill = document.querySelector('.music-progress-fill');
        const overlay = document.getElementById("myNav");

        countries.forEach((country) => {
            country.addEventListener("mouseenter", () => {
                country.classList.add("active");
                const name = country.getAttribute("data-name");
                const pop = country.getAttribute("data-pop");
                countryName.textContent = name;
                countryPop.textContent = "Population: " + pop;
                infoBox.classList.remove("hidden");
            });

            country.addEventListener("mouseleave", () => {
                country.classList.remove("active");
                infoBox.classList.add("hidden");
            });

            country.addEventListener("click", () => {
                // Add any click interaction logic here
                // alert(`You clicked on ${country.getAttribute("data-name")}`);
            });
        });

        audio.addEventListener('loadedmetadata', () => {
            totalTimeEl.textContent = formatTime(audio.duration);
        });

        audio.addEventListener('timeupdate', () => {
            currentTimeEl.textContent = formatTime(audio.currentTime);
            const progressPercent = (audio.currentTime / audio.duration) * 100;
            progressFill.style.width = `${progressPercent}%`;
        });

        overlay.addEventListener("click", function (event) {
            if (event.target === overlay) {
                closeNav();
            }
        });

        var interactiveElements = overlay.querySelectorAll("button, input, select, textarea, a");
        interactiveElements.forEach(function (element) {
            element.addEventListener("click", function (event) {
                event.stopPropagation();
            });
        });
    });

    window.addEventListener("resize", () => {
        applyTransform();
    });
}

setInterval(function () {
    updateResPerSec();
}, 1000);
setInterval(function () {
    updateProcessingPowerDisplay();
}, 1000);
startGame();
