const categories = {
    'Landmarks': [
        'Bridge Of Sighs',
        'Eiffel Tower',
        'Statue Of Liberty',
        'Great Wall Of China'
    ],
    'Food Pairs': [
        'Macaroni And Cheese',
        'Peanut Butter And Jelly',
        'Fish And Chips',
        'Spaghetti And Meatballs'
    ],
    'Duos': [
        'Sherlock Holmes And John Watson',
        'Batman And Robin',
        'Lilo And Stitch',
        'Frodo Baggins And Samwise Gamgee'
    ],
    'Things found in an office': [
        'Stapler',
        'Binder Clip',
        'Coffee machine',
        'Jim Halpert'
    ],
    'Things Found In Space': [
        'Horsehead Nebula',
        'Black Hole',
        'Supernova',
        'International Space Station'
    ],
    'Superheroes And Their Weaknesses': [
        'Superman And Kryptonite',
        'Magneto And Magnetic Fields',
        'Green Lantern And Yellow Lanterns',
        'Aquaman And Water Deprivation'
    ],
    'Unusual Pets': [
        'Ferret',
        'Capybara',
        'Axolotl',
        'Sugar Glider'
    ],
    'Roald Dahl Books': [
        'Charlie And The Chocolate Factory',
        'James And The Giant Peach',
        'Matilda',
        'The Enormous Crocodile'
    ],
    'Breakfast Foods': [
        'Omelette',
        'Full English',
        'Sausage And Eggs',
        'Breakfast Burrito'
    ],
    'Film Titles Off By One': [
        'Eleven Angry Men',
        'Four Billboards Outside Ebbing, Missouri',
        'Thirteen Years A Slave',
        'District Ten'
    ],
    'Disney Film Opposites': [
        'The Big Mermaid',
        'Awake Beauty',
        'The Prince And The Frog',
        'Down'
    ],
    'Classic Cocktails': [
        'Dark And Stormy',
        'Painkiller',
        'White Negroni',
        'French Seventy-Five'
    ],
    'Things With Horns': [
        'Rhinoceros',
        'Hercules Beetle',
        'Brass Band',
        'Toyota Camry'
    ],
    'Things With Keys': [
        'Computer Keyboard',
        'Grand Piano',
        'Treasure Chest',
        'Florida'
    ],
    'Chess openings': [
        'King\'s Pawn',
        'Ruy Lopez',
        'Scandinavian Defence',
        'Bongcloud'
    ],
    'Actors who have played Batman': [
        'Christian Bale',
        'Adam West',
        'George Clooney',
        'Val Kilmer'
    ],
    'Countries and their largest export': [
        'United Kingdom and gold',
        'United States and oil',
        'Brazil and iron ore',
        'Germany and cars'
    ],
    'London Underground stations': [
        'Piccadilly Circus',
        'Brixton',
        'Tottenham Court Road',
        'Waterloo'
    ],
    'Baseball terms': [
        'Home run',
        'Grand slam',
        'Stolen base',
        'Double play'
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
    'Let\'s go.',
    'Yeehaw.',
    'Allons y.',
    'Let\'s roll.',
    'Make it happen.'
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
    if (!event.target.closest('a')) {
        advanceRound();
    }
});

updateDisplay();