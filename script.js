const categories = {
    'Landmarks': [
        'BRIDGE OF SIGHS',
        'EIFFEL TOWER',
        'STATUE OF LIBERTY',
        'GREAT WALL OF CHINA'
    ],
    'Food pairs': [
        'MACARONI AND CHEESE',
        'PEANUT BUTTER AND JELLY',
        'FISH AND CHIPS',
        'SPAGHETTI AND MEATBALLS'
    ],
    'Duos': [
        'SHERLOCK HOLMES AND JOHN WATSON',
        'BATMAN AND ROBIN',
        'LILO AND STITCH',
        'FRODO BAGGINS AND SAMWISE GAMGEE'
    ],
    'Office supplies': [
        'STAPLER',
        'PAPER CLIP',
        'RUBBER BAND',
        'POST IT NOTE'
    ],
    'Things found in space': [
        'NEBULA',
        'BLACK HOLE',
        'SUPERNOVA',
        'COMET TRAIL'
    ],
    'Superheroes and their weaknesses': [
        'SUPERMAN AND KRYPTONITE',
        'MAGNETO AND MAGNETIC FIELDS',
        'GREEN LANTERN AND YELLOW LANTERNS',
        'AQUAMAN AND WATER DEPRIVATION'
    ],
    'Unusual pets': [
        'FERRET',
        'CAPYBARA',
        'AXOLOTL',
        'SUGAR GLIDER'
    ],
    'Roald Dahl books': [
        'CHARLIE AND THE CHOCOLATE FACTORY',
        'JAMES AND THE GIANT PEACH',
        'MATILDA',
        'THE ENORMOUS CROCODILE'
    ],
    'Breakfast foods': [
        'OMELETTE',
        'FULL ENGLISH',
        'SAUSAGE AND EGGS',
        'BREAKFAST BURRITO'
    ],
    'Film titles off by one': [
        'ELEVEN ANGRY MEN',
        'FOUR BILLBOARDS OUTSIDE EBBING, MISSOURI',
        'THIRTEEN YEARS A SLAVE',
        'DISTRICT TEN'
    ],
    'Disney film opposites': [
        'THE BIG MERMAID',
        'AWAKE BEAUTY',
        'THE PRINCE AND THE FROG',
        'DOWN'
    ],
    'Classic Cocktails': [
        'DARK AND STORMY',
        'PAINKILLER',
        'WHITE NEGRONI',
        'FRENCH SEVENTY-FIVE'
    ],
    'Things with horns': [
        'RHINOCEROUS',
        'HERCULES BEETLE',
        'BRASS BAND',
        'TOYOTA CAMRY',
    ],
    'Things with keys': [
        'COMPUTER KEYBOARD',
        'GRAND PIANO',
        'TREASURE CHEST',
        'FLORIDA',
    ],
};

const nextRoundPhrases = [
    'Get ready.',
    'Here we go.',
    'Next category.',
    'Brace yourself.',
    'Onward.',
    'Ready for more?',
    'Let\'s keep going.',
    'Another one coming up.',
    'Hold on tight.',
    'Get ready for the next challenge.',
    'Here we go.',
    'Next category coming up.',
    'Brace yourself.',
    'Moving on.',
    'Are you prepared?',
    'Let\'s continue.',
    'The next awaits.',
    'Stay focused.',
    'Prepare yourself.',
    'Time for the next challenge.',
    'Advancing to the next category.',
    'Let\'s push ahead.',
    'Let\'s see what\'s next.',
    'Onto the next one.',
    'Get set for more.',
    'The journey continues.',
    'Next.',
    'Time for another.',
];

const rounds = [];
const shuffledCategories = Object.keys(categories).sort(() => Math.random() - 0.5);
for (const category of shuffledCategories) {
    const randomPhrase = nextRoundPhrases[Math.floor(Math.random() * nextRoundPhrases.length)];
    rounds.push({ answer: category, category: category, isInterstitial: true, introPhrase: randomPhrase });
    categories[category].forEach(answer => {
        rounds.push({ answer, category, isInterstitial: false });
    });
}

let currentIndex = 0;
const categoryElement = document.getElementById('category');
const clueElement = document.getElementById('clue');

function removeVowelsAndRandomizeSpaces(answer) {
    const noVowels = answer.replace(/[aeiouAEIOU]/g, '').replace(/[\s',\.-]/g, '').toUpperCase();

    let chars = noVowels.split('');

    for (let i = chars.length - 1; i > 0; i--) {
        if (Math.random() > 0.7) { // 30% chance to add a space
            chars.splice(i, 0, ' ');
        }
    }

    return chars.join('');
}

function updateDisplay() {
    const currentRound = rounds[currentIndex];
    if (currentRound.isInterstitial) {
        clueElement.classList.add('interstitial');
        categoryElement.textContent = currentRound.introPhrase.toUpperCase();
        clueElement.textContent = currentRound.answer.toUpperCase();
    } else {
        clueElement.classList.remove('interstitial');
        categoryElement.textContent = currentRound.category.toUpperCase();
        clueElement.textContent = removeVowelsAndRandomizeSpaces(currentRound.answer);
    }
}

function advanceRound() {
    if (!rounds[currentIndex].isInterstitial && clueElement.textContent !== rounds[currentIndex].answer.toUpperCase()) {
        clueElement.textContent = rounds[currentIndex].answer.toUpperCase();
    } else {
        // Go to the next clue
        currentIndex = (currentIndex + 1) % rounds.length;
        updateDisplay();
    }
}

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        event.preventDefault();
        advanceRound();
    }
});

document.addEventListener('click', (event) => {
    advanceRound();
});

updateDisplay();