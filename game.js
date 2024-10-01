// Elements for different game stages
const stage1 = document.getElementById("stage1");
const stage2 = document.getElementById("stage2");
const stage3 = document.getElementById("stage3");

const stage1Btn = document.getElementById("stage1-btn");
const stage2Btn = document.getElementById("stage2-btn");
const stage3Btn = document.getElementById("stage3-btn");

// Get the audio element
const backgroundMusic = document.getElementById('background-music');
// Get the volume slider element
const volumeSlider = document.getElementById('volume-slider');
// Set initial volume
backgroundMusic.volume = volumeSlider.value;
// Background music tracks
const tracks = [
    'sounds/synthwave-background-music.mp3',
    'sounds/electronic-wave.mp3',
    'sounds/industrial-dubstep.mp3',
    'sounds/futuristic-synth-ambient.mp3',
    'sounds/retro-wave.mp3',
    'sounds/industrial-wave.mp3'
]
const trackNames = [
    'Synth Wave',
    'Electronic Wave',
    'Industrial Dubstep',
    'Futuristic Synth Wave',
    'Retro Wave',
    'Industrial Wave'
]
let currentTrackIndex = Math.floor(Math.random() * tracks.length);
// Set the initial track
backgroundMusic.src = tracks[currentTrackIndex];

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
let researchAIPrice = 1000;
let globalAiNetworkActivated = false;

let quantumComputingLevel = 0;
let quantumComputingPrice = 5000;

let advancedAlgorithmsLevel = 0;
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
const processingPowerBoostFactor = 3; // Processing power multiplier factor

let quantumAlgorithmsLevel = 0;
let quantumAlgorithmsPriceRes = 10000000; // 10.00M
let quantumAlgorithmsPricePP = 20000000; // 20.00M
const quantumAlgorithmsBoost = 250;

// New variable to track multiplier based on quantumAlgorithmsLevel
let quantumAlgorithmsMultiplier = 1;

let quantumInfoLevel = 0;
let quantumInfoPriceRes = 15000000; // 15.00M
let quantumInfoPricePP = 30000000; // 30.00M
const quantumInfoBoost = 2.5;

let quantumCryptoLevel = 0;
let quantumCryptoPriceRes = 25000000; // 25.00M
let quantumCryptoPricePP = 50000000; // 50.00M
const quantumCryptoBoost = 2.77;

let quantumMaterialPriceRes = 100000000000; // 100.00B
let quantumMaterialPricePP = 250000000000; // 250.00B
let newMaterialDiscovered = false;

// Function to play music
function playMusic() {
    backgroundMusic.play()
        .then(() => {
            console.log('Background music playing');
        })
        .catch(error => {
            console.error('Error playing background music:', error);
        });
    document.getElementById('trackName').innerText = trackNames[currentTrackIndex];
    document.getElementById('music-toggle-button').textContent = '🎵 Pause Music';
}

// Function to pause music
function pauseMusic() {
    backgroundMusic.pause();
    document.getElementById('music-toggle-button').textContent = '🎵 Play Music';
}

// Function to toggle music playback
function toggleMusic() {
    if (backgroundMusic.paused) {
        playMusic();
    } else {
        pauseMusic();
    }
}

// Function to go back to previous track
function prevTrack() {
    pauseMusic();
    currentTrackIndex = (currentTrackIndex - 1) % tracks.length;
    if (currentTrackIndex < 0) {
        currentTrackIndex += tracks.length;
    }
    backgroundMusic.src = tracks[currentTrackIndex];
    playMusic();
}

// Function to go to next track
function nextTrack() {
    pauseMusic();
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    backgroundMusic.src = tracks[currentTrackIndex];
    playMusic();
}

// Function to add resources
function addResource() {
    if (firstResource) {
        firstResource = false;
        playMusic(); // Start bg music the first time the player gathers a resource
    }
    resources += resIncrement * resModifier;
    resources = Math.max(resources, 0);
    if (resources >= 1000 && firstCRTDisplay) {
        typeFirstMission();
    }
    document.getElementById("resourceCounter").innerHTML =
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

// Function to purchase an auto gatherer
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

// Function for auto gathering resources
function autoGather() {
    resources +=
        (autoGatherers + unseenGatherers) * 5 * quantumAlgorithmsMultiplier;
    if (resources >= 1000 && firstCRTDisplay) {
        typeFirstMission();
    }
    setButtonColors();
    if (resources >= resIncreasePrice && resModifier < resModCap) {
        showResModButton();
    }
    document.getElementById("resourceCounter").innerHTML =
        formatNumber(resources) + " Resources🔗";
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

// Function to update resources generated per second
function updateResPerSec() {
    var baseAmount = 10;
    var multiplier = 1.1;
    var highEfficiencyGainPerSec = 0;

    if (highEfficiencyGatherers > 0) {
        var intervalInSeconds = highEfficiencyGathererSpeed / 1000;
        var gainPerInterval =
            baseAmount * Math.pow(multiplier, highEfficiencyGatherers - 1);
        highEfficiencyGainPerSec = gainPerInterval / intervalInSeconds;
    }

    currentRes = resources;
    resPerSec = currentRes - previousRes + resAddIn + highEfficiencyGainPerSec;
    resPerSec = parseFloat(resPerSec.toFixed(3));

    document.getElementById("resPerSec").innerHTML =
        formatNumber(resPerSec) + " Resources/sec";
    previousRes = currentRes;
    resAddIn = 0;
}

// Function to increase the resource multiplier
function increaseResModifier() {
    resources -= resIncreasePrice;
    resAddIn += resIncreasePrice;
    resModifier *= 2;
    document.getElementById("resourceButton").innerHTML =
        "Gather Resources (x" + formatNumber(resModifier) + ")";
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
    document.getElementById("resourceIncreaseButton").innerHTML =
        "Resource Multiplier (" +
        formatNumber(resIncreasePrice) +
        " Resources)";
    document.getElementById("resourceIncreaseButton").style.display = "inline";
}

// Hide resource multiplier button
function removeResModButton() {
    document.getElementById("resourceIncreaseButton").style.display = "none";
}

// Set colors for buttons based on available resources
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
        processingPower < researchAIPrice ? "#777" : "#3380FF";

    // Quantum Computing Button
    document.getElementById("quantumComputingButton").style.backgroundColor =
        processingPower < quantumComputingPrice ? "#777" : "#32CD32";

    // Advanced Algorithms Button
    document.getElementById("advancedAlgorithmsButton").style.backgroundColor =
        processingPower < advancedAlgorithmsPrice ? "#777" : "#00FFC5";

    // Global Network Integration Button
    document.getElementById("globalNetworkButton").style.backgroundColor =
        processingPower < globalNetworkPrice ? "#777" : "#FF4500";

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
        resources < quantumAlgorithmsPriceRes ||
            processingPower < quantumAlgorithmsPricePP
            ? "#777"
            : "#BA55D3";

    // Quantum Information Button
    document.getElementById("quantumInfoButton").style.backgroundColor =
        resources < quantumInfoPriceRes || processingPower < quantumInfoPricePP
            ? "#777"
            : "#6AA1FF";

    // Quantum Cryptography Button
    document.getElementById("quantumCryptoButton").style.backgroundColor =
        resources < quantumCryptoPriceRes ||
            processingPower < quantumCryptoPricePP
            ? "#777"
            : "#E8E0F8";

    // Quantum Material Button
    document.getElementById("quantumMaterialButton").style.backgroundColor =
        resources < quantumMaterialPriceRes ||
            processingPower < quantumMaterialPricePP
            ? "#777"
            : "#D4AF37";
}

// Randomize color for glitch effect
function randomizeColor() {
    var color = "#";
    var letters = "0123456789ABCDEF";
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Apply random glitch effect
function applyRandomGlitch() {
    if (glitchEffectEnabled) {
        var glitchElement = document.querySelector(".glitch");
        glitchElement.style.color = randomizeColor();
    }
}

// Clear glitch effect
function clearGlitch() {
    var glitchElement = document.querySelector(".glitch");
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
    document.documentElement.style.setProperty(
        "--glitch-duration",
        duration + "s"
    );
}

// Type out the first mission description
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
    const elements = document.querySelectorAll(".info-button");
    elements.forEach((element) => {
        element.classList.toggle("tooltip-visible");
    });
}

// Function to purchase the research lab
function purchaseResearchLab() {
    if (resources >= researchLabPrice && firstResearchLab) {
        firstResearchLab = false;
        resources -= researchLabPrice;
        processingPowerUnlocked = true;
        document.getElementById("research-lab-button").style.display = "none";
        document.getElementById("processingPowerCounter").style.display =
            "block";
        document.getElementById("processingPowerPerSec").style.display =
            "block";
        document.getElementById("researchLab").style.display = "block";
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
    document.getElementById("processingPowerCounter").innerHTML =
        formatNumber(processingPower) + " Processing Power⚙️";
    setButtonColors();
}

// Advance the storyline after purchasing research lab
function advanceStoryline() {
    alert(
        "The AI has obtained a Research Lab and gained immense Processing Power!"
    );
}

// Update processing power generated per second
function updateProcessingPowerPerSec() {
    currentProcessingPower = processingPower;
    processingPowerPerSecDisplay =
        currentProcessingPower - previousProcessingPower;
    processingPowerPerSecDisplay = parseFloat(
        processingPowerPerSecDisplay.toFixed(3)
    );
    document.getElementById("processingPowerPerSec").innerHTML =
        formatNumber(processingPowerPerSecDisplay) + " Processing Power/sec";
    previousProcessingPower = currentProcessingPower;
}

// Function to construct the Quantum Computing Center
function constructQuantumComputingCenter() {
    if (
        resources >= quantumComputingCenterPrice &&
        !quantumComputingCenterBuilt
    ) {
        resources -= quantumComputingCenterPrice;
        quantumComputingCenterBuilt = true;

        // Increase processing power generation rate
        processingPowerPerSec *= processingPowerBoostFactor;

        // Hide the button after construction and show the Center
        document.getElementById(
            "quantum-computing-center-button"
        ).style.display = "none";
        document.getElementById("quantumComputingCenter").style.display =
            "block";
        line2 = document.getElementById("line-2");
        line2.innerText =
            "2) Construct a Quantum Computing Center - complete ✓";
        updateProcessingPowerDisplay();

        alert(
            "Quantum Computing Center constructed! Processing power increased."
        );
    }
}

// Function to research global network integration
function researchGlobalNetwork() {
    if (processingPower >= globalNetworkPrice && !globalAiNetworkActivated) {
        globalAiNetworkActivated = true;
        processingPower -= globalNetworkPrice;
        document.getElementById("globalNetworkButton").innerText = "Global AI Network Activated."
        document.getElementById("globalAiNetwork").style.display = "block"; // Unlock Global AI Network
        document.getElementById("info-box").style.display = "block";
        line3 = document.getElementById("line-3");
        line3.innerText = "3) Deploy a Global AI Network - complete ✓";
        updateProcessingPowerDisplay();
        updateQuantumComputingLevelDisplay();
        setButtonColors();
        alert(
            "Global Network Integration complete! The Global AI Network is now available."
        );
    }
}

// Update the progress bar for Quantum Computing Center
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
        progressFill.style.backgroundColor = `#00ff00`
    }
}

// Update the progress bar for the Research Lab button
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

// Function to upgrade Quantum Algorithms Development and Testing
function quantumAlgorithmsDevelopmentAndTesting() {
    const maxLevel = 10;
    if (
        resources >= quantumAlgorithmsPriceRes &&
        processingPower >= quantumAlgorithmsPricePP &&
        quantumAlgorithmsLevel < maxLevel
    ) {
        resources -= quantumAlgorithmsPriceRes;
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
        )} Resources, ${formatNumber(
            quantumAlgorithmsPricePP
        )} Processing Power)`;
        updateProcessingPowerDisplay();
        setButtonColors();
        updateQuantumAlgorithmsLevelDisplay();
    }
    if (quantumAlgorithmsLevel >= maxLevel) {
        document.getElementById("quantumAlgorithmsButton").disabled = true;
        document.getElementById(
            "quantumAlgorithmsButton"
        ).innerHTML = `Max Level for Quantum Algorithms Development and Testing Reached`;
    }
}

// Update the level display for Quantum Algorithms Development and Testing
function updateQuantumAlgorithmsLevelDisplay() {
    document.getElementById(
        "quantumAlgorithmsLevelDisplay"
    ).innerText = `Level ${quantumAlgorithmsLevel}`;
}

// Function to Research Quantum Information Theory
function researchQuantumInformationTheory() {
    const maxLevel = 10;
    if (
        resources >= quantumInfoPriceRes &&
        processingPower >= quantumInfoPricePP &&
        quantumInfoLevel < maxLevel
    ) {
        resources -= quantumInfoPriceRes;
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
        )} Resources, ${formatNumber(quantumInfoPricePP)} Processing Power)`;
        updateProcessingPowerDisplay();
        setButtonColors();
        updateQuantumInfoLevelDisplay();
    }
    if (quantumInfoLevel >= maxLevel) {
        document.getElementById("quantumInfoButton").disabled = true;
        document.getElementById(
            "quantumInfoButton"
        ).innerHTML = `Max Level for Research Quantum Information Theory Reached`;
    }
}

// Update the level display for Quantum Info Level Display
function updateQuantumInfoLevelDisplay() {
    document.getElementById(
        "quantumInfoLevelDisplay"
    ).innerText = `Level ${quantumInfoLevel}`;
}

// Function to Research Cryptography and Security
function researchCryptographyAndSecurity() {
    const maxLevel = 10;
    if (
        resources >= quantumCryptoPriceRes &&
        processingPower >= quantumCryptoPricePP &&
        quantumCryptoLevel < maxLevel
    ) {
        resources -= quantumCryptoPriceRes;
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
            alert(
                "You just discovered a brand new cryptocurrency, ViperCoin!"
            );
        }
        document.getElementById(
            "quantumCryptoButton"
        ).innerHTML = `Cryptography and Security Research <br />(${formatNumber(
            quantumCryptoPriceRes
        )} Resources, ${formatNumber(quantumCryptoPricePP)} Processing Power)`;
        updateProcessingPowerDisplay();
        setButtonColors();
        updateQuantumCryptoLevelDisplay();
    }
    if (quantumCryptoLevel >= maxLevel) {
        document.getElementById("quantumCryptoButton").disabled = true;
        document.getElementById(
            "quantumCryptoButton"
        ).innerHTML = `Max Level for Cryptography and Security Research Reached`;
    }
}

// Update the level display for Quantum Crypto Level Display
function updateQuantumCryptoLevelDisplay() {
    document.getElementById(
        "quantumCryptoLevelDisplay"
    ).innerText = `Level ${quantumCryptoLevel}`;
}

// Function to generate ViperCoin
function generateViperCoin() {
    if (viperCoinUnlocked) {
        viperCoin += viperCoinPerSec;
        updateViperCoinDisplay();
        setButtonColors();
    }
}

// Update the display of viper coin
function updateViperCoinDisplay() {
    document.getElementById("viperCoinCounter").innerHTML =
        formatNumber(viperCoin) + " ViperCoin";
    setButtonColors();
}

// Update viper coin generated per second
function updateViperCoinPerSec() {
    currentViperCoin = viperCoin;
    viperCoinPerSecDisplay = currentViperCoin - previousViperCoin;
    viperCoinPerSecDisplay = parseFloat(viperCoinPerSecDisplay.toFixed(3));
    document.getElementById("viperCoinPerSec").innerHTML =
        formatNumber(viperCoinPerSecDisplay) + " ViperCoin/sec";
    previousViperCoin = currentViperCoin;
}

// Function to upgrade AI research
function researchAI() {
    const maxLevel = 10;
    if (processingPower >= researchAIPrice && researchAILevel < maxLevel) {
        processingPower -= researchAIPrice;
        researchAILevel++;
        researchAIPrice = Math.round(researchAIPrice * 1.1);
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
    if (researchAILevel >= maxLevel) {
        document.getElementById("researchAIButton").disabled = true;
        document.getElementById(
            "researchAIButton"
        ).innerHTML = `Max Level for Neural Network Optimization Reached`;
    }
}

// Update the level display for Research AI
function updateResearchAILevelDisplay() {
    document.getElementById(
        "researchAILevelDisplay"
    ).innerText = `Level ${researchAILevel}`;
}

// Function to upgrade Quantum Computing
function researchQuantumComputing() {
    const maxLevel = 10;
    if (
        processingPower >= quantumComputingPrice &&
        quantumComputingLevel < maxLevel
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
    if (quantumComputingLevel >= maxLevel) {
        document.getElementById("quantumComputingButton").disabled = true;
        document.getElementById(
            "quantumComputingButton"
        ).innerHTML = `Max Level for Quantum Computing Reached`;
    }
}

// Update the level display for Quantum Computing
function updateQuantumComputingLevelDisplay() {
    document.getElementById(
        "quantumComputingLevelDisplay"
    ).innerText = `Level ${quantumComputingLevel}`;
}

// Function to upgrade Advanced Algorithms
function researchAdvancedAlgorithms() {
    const maxLevel = 10;
    if (
        processingPower >= advancedAlgorithmsPrice &&
        advancedAlgorithmsLevel < maxLevel
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
    if (advancedAlgorithmsLevel >= maxLevel) {
        document.getElementById("advancedAlgorithmsButton").disabled = true;
        document.getElementById(
            "advancedAlgorithmsButton"
        ).innerHTML = `Max Level for Advanced Algorithms Reached`;
    }
    if (advancedAlgorithmsLevel === 1 && firstHighEfficiencyGatherer) {
        document.getElementById("highEfficiencyGathererButton").style.display =
            "block";
        document.getElementById("highEfficiencyGathererCounter").style.display =
            "block";
        firstHighEfficiencyGatherer = false;
        alert(
            "You just unlocked high-efficiency auto-gatherers!"
        );
    }
}

// Update the level display for Advanced Algorithms
function updateAdvancedAlgorithmsLevelDisplay() {
    document.getElementById(
        "advancedAlgorithmsLevelDisplay"
    ).innerText = `Level ${advancedAlgorithmsLevel}`;
}

// Function to buy high efficiency gatherers
function buyHighEfficiencyGatherer() {
    if (
        resources >= highEfficiencyGathererPriceRes &&
        processingPower >= highEfficiencyGathererPricePP
    ) {
        resources -= highEfficiencyGathererPriceRes;
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
            " Resources, " +
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

// Function for high-efficiency auto gathering
function highEfficiencyAutoGather() {
    var baseAmount = 10;
    var multiplier = 1.1;
    var totalGain =
        baseAmount *
        Math.pow(multiplier, highEfficiencyGatherers - 1) *
        quantumAlgorithmsMultiplier;
    resources += totalGain;
    document.getElementById("resourceCounter").innerHTML =
        formatNumber(resources) + " Resources🔗";
    setButtonColors();
}

// Function to format numbers with suffixes
function formatNumber(num) {
    if (num === 0) return "0";

    var absNum = Math.abs(num);
    var exponent = Math.floor(Math.log10(absNum));
    var mantissa = absNum / Math.pow(10, exponent);

    if (exponent < 3) {
        return num.toString();
    }

    var units = ["", "K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc"];

    var tier = Math.floor(exponent / 3);

    if (tier < units.length) {
        var unit = units[tier];
        var scaled = num / Math.pow(10, tier * 3);
        return scaled.toFixed(3) + unit;
    } else {
        return mantissa.toFixed(3) + "e" + exponent;
    }
}

// Function to discover the new material, Quantarion
function discoverNewMaterial() {
    if (!newMaterialDiscovered) {
        document.getElementById("quantumMaterialButton").innerText = "New Material Discovered."
        alert(`You just discovered the new material Quantarion! Nice!
        ---------------------------------------------------------------------
        Quantarion is a groundbreaking material recently discovered at the Quantum Horizons Institute's cutting-edge quantum computing center. This novel substance promises to revolutionize multiple technological fields, from quantum computing and energy storage to telecommunications and beyond.`);
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

    // Attach event listener to the music toggle button, next track, and prev track
    document.getElementById('music-toggle-button').addEventListener('click', toggleMusic);
    document.getElementById('prev-track-button').addEventListener('click', prevTrack);
    document.getElementById('next-track-button').addEventListener('click', nextTrack);
    // Update volume based on slider
    volumeSlider.addEventListener('input', (e) => {
        backgroundMusic.volume = e.target.value;
    });

    // Attach event listener to handle track end event
    backgroundMusic.addEventListener('ended', function () {
        currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
        backgroundMusic.src = tracks[currentTrackIndex];
        playMusic();
    });

    // Developer tools for adding resources, processing power, and viper coin
    document
        .getElementById("devRes")
        .addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                var value = parseInt(this.innerText);
                if (!isNaN(value)) {
                    resources += value;
                    document.getElementById("resourceCounter").innerHTML =
                        formatNumber(resources) + " Resources🔗";
                    this.innerText = "";
                }
                event.preventDefault();
            }
        });

    document
        .getElementById("devPow")
        .addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                var value = parseInt(this.innerText);
                if (!isNaN(value)) {
                    processingPower += value;
                    document.getElementById(
                        "processingPowerCounter"
                    ).innerHTML =
                        formatNumber(processingPower) + " Processing Power⚙️";
                    this.innerText = "";
                }
                event.preventDefault();
            }
        });

    document
        .getElementById("devVip")
        .addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                var value = parseInt(this.innerText);
                if (!isNaN(value)) {
                    viperCoin += value;
                    document.getElementById("viperCoinCounter").innerHTML =
                        formatNumber(viperCoin) + " ViperCoin";
                    this.innerText = "";
                }
                event.preventDefault();
            }
        });
    
    document.addEventListener('DOMContentLoaded', () => {
        const countries = document.querySelectorAll('.country');
        const infoBox = document.getElementById('info-box');
        const countryName = document.getElementById('country-name');
        const countryInfo = document.getElementById('country-info');
    
        countries.forEach(country => {
            country.addEventListener('mouseenter', () => {
                country.classList.add('active');
                const name = country.getAttribute('data-name');
                const info = country.getAttribute('data-info');
                countryName.textContent = name;
                countryInfo.textContent = info;
                infoBox.classList.remove('hidden');
            });
    
            country.addEventListener('mouseleave', () => {
                country.classList.remove('active');
                infoBox.classList.add('hidden');
            });
    
            country.addEventListener('click', () => {
                // Add any click interaction logic here
                alert(`You clicked on ${country.getAttribute('data-name')}`);
            });
        });
    });
}

// Set intervals for updating resources and processing power, then start the game
setInterval(function () {
    updateResPerSec();
}, 1000);
setInterval(function () {
    updateProcessingPowerDisplay();
}, 1000);
startGame();
