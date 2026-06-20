const { DatabaseSync } = require('node:sqlite');
const path = require('path');

const db = new DatabaseSync(path.join(__dirname, 'histography.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS figures (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    acceptable_names TEXT NOT NULL,
    birth_lat REAL NOT NULL,
    birth_lon REAL NOT NULL,
    birth_year INTEGER NOT NULL,
    death_lat REAL NOT NULL,
    death_lon REAL NOT NULL,
    death_year INTEGER NOT NULL,
    hints TEXT NOT NULL
  )
`);

const figures = [
  {
    name: 'Albert Einstein',
    acceptable_names: ['albert einstein', 'einstein'],
    birth_lat: 48.4011, birth_lon: 9.9877, birth_year: 1879,
    death_lat: 40.3573, death_lon: -74.6596, death_year: 1955,
    hints: [
      'This physicist changed our understanding of space, time, and gravity with his theories of relativity.',
      'Born in the German Empire, this Nobel Prize winner later emigrated to the United States fleeing Nazi Germany.',
      'His famous equation E=mc² is one of the most recognized formulas in all of science.'
    ]
  },
  {
    name: 'Napoleon Bonaparte',
    acceptable_names: ['napoleon bonaparte', 'napoleon'],
    birth_lat: 41.9194, birth_lon: 8.7386, birth_year: 1769,
    death_lat: -15.9391, death_lon: -5.7179, death_year: 1821,
    hints: [
      'This military genius crowned himself Emperor of France and conquered much of continental Europe.',
      'His catastrophic invasion of Russia in 1812 marked the beginning of his downfall.',
      'He was exiled twice — ultimately dying on a remote island in the South Atlantic, far from Europe.'
    ]
  },
  {
    name: 'Marie Curie',
    acceptable_names: ['marie curie', 'curie', 'maria sklodowska', 'maria sklodowska-curie'],
    birth_lat: 52.2297, birth_lon: 21.0122, birth_year: 1867,
    death_lat: 45.8630, death_lon: 6.8500, death_year: 1934,
    hints: [
      'This scientist was the first woman to win a Nobel Prize and the only person to win in two different sciences.',
      'She discovered two new elements — polonium, named after her homeland, and radium.',
      'Her groundbreaking research on radioactivity was conducted largely in a leaky shed in Paris.'
    ]
  },
  {
    name: 'Leonardo da Vinci',
    acceptable_names: ['leonardo da vinci', 'leonardo', 'da vinci'],
    birth_lat: 43.7811, birth_lon: 10.9241, birth_year: 1452,
    death_lat: 47.4130, death_lon: 0.9834, death_year: 1519,
    hints: [
      'This Renaissance polymath painted the Mona Lisa and The Last Supper while also filling thousands of notebook pages with scientific drawings.',
      'He designed flying machines, armored vehicles, and solar power concepts centuries before they were invented.',
      'This Italian genius spent his final years in the Loire Valley of France under the patronage of King Francis I.'
    ]
  },
  {
    name: 'Mahatma Gandhi',
    acceptable_names: ['mahatma gandhi', 'gandhi', 'mohandas gandhi', 'mohandas karamchand gandhi'],
    birth_lat: 21.6417, birth_lon: 69.6293, birth_year: 1869,
    death_lat: 28.6139, death_lon: 77.2090, death_year: 1948,
    hints: [
      'This leader\'s philosophy of nonviolent resistance inspired independence movements around the world.',
      'He led the famous Salt March of 1930, walking 240 miles to protest British taxation.',
      'Often called the "Father of the Nation," he was assassinated in New Delhi\'s Birla House garden.'
    ]
  },
  {
    name: 'Nikola Tesla',
    acceptable_names: ['nikola tesla', 'tesla'],
    birth_lat: 44.5582, birth_lon: 15.3330, birth_year: 1856,
    death_lat: 40.7128, death_lon: -74.0060, death_year: 1943,
    hints: [
      'This inventor held over 300 patents and his alternating current system powers the modern electrical grid.',
      'His famous rivalry with Thomas Edison over AC vs DC power became known as the "War of Currents."',
      'This Serbian-American genius died penniless in a New York hotel room despite his revolutionary contributions.'
    ]
  },
  {
    name: 'Alexander the Great',
    acceptable_names: ['alexander the great', 'alexander'],
    birth_lat: 40.7714, birth_lon: 22.5183, birth_year: -356,
    death_lat: 32.5431, death_lon: 44.4220, death_year: -323,
    hints: [
      'This ancient conqueror built one of history\'s largest empires, stretching from Greece to northwestern India.',
      'Tutored by Aristotle, he became king at just 20 years old and never lost a battle.',
      'He died at age 32 in the ancient city of Babylon, leaving behind an empire with no clear successor.'
    ]
  },
  {
    name: 'Genghis Khan',
    acceptable_names: ['genghis khan', 'chinggis khan', 'temujin'],
    birth_lat: 48.8000, birth_lon: 109.0000, birth_year: 1162,
    death_lat: 35.5000, death_lon: 106.3000, death_year: 1227,
    hints: [
      'This ruler founded the largest contiguous land empire in history.',
      'His military campaigns are estimated to have killed tens of millions, reshaping the demographics of Asia.',
      'He united warring Mongolian tribes and went on to conquer much of the known world.'
    ]
  },
  {
    name: 'Christopher Columbus',
    acceptable_names: ['christopher columbus', 'columbus', 'cristoforo colombo', 'cristobal colon'],
    birth_lat: 44.4056, birth_lon: 8.9463, birth_year: 1451,
    death_lat: 41.6523, death_lon: -4.7245, death_year: 1506,
    hints: [
      'This explorer completed four voyages across the Atlantic, opening permanent contact between Europe and the Americas.',
      'Funded by the Spanish Crown, he set sail westward hoping to find a new trade route to Asia.',
      'He died in Spain believing he had reached Asia, not realizing he had stumbled upon a continent unknown to Europeans.'
    ]
  },
  {
    name: 'Frédéric Chopin',
    acceptable_names: ['frederic chopin', 'chopin', 'fryderyk chopin'],
    birth_lat: 52.2263, birth_lon: 20.3104, birth_year: 1810,
    death_lat: 48.8566, death_lon: 2.3522, death_year: 1849,
    hints: [
      'This composer wrote almost exclusively for the piano and is considered one of the greatest Romantic composers.',
      'Though he spent most of his adult life in Paris, his heart was returned to Warsaw per his dying wish.',
      'He left his homeland at age 20 and never returned, dying of tuberculosis in Paris at 39.'
    ]
  },
  {
    name: 'Karl Marx',
    acceptable_names: ['karl marx', 'marx'],
    birth_lat: 49.7596, birth_lon: 6.6441, birth_year: 1818,
    death_lat: 51.5074, death_lon: -0.1278, death_year: 1883,
    hints: [
      'This philosopher and economist co-authored The Communist Manifesto and wrote Das Kapital.',
      'His ideas about class struggle and capitalism profoundly influenced 20th-century politics and revolutions.',
      'Though born in Prussia, he spent the last 34 years of his life in London, writing his most influential works.'
    ]
  },
  {
    name: 'Che Guevara',
    acceptable_names: ['che guevara', 'guevara', 'che', 'ernesto guevara'],
    birth_lat: -32.9468, birth_lon: -60.6393, birth_year: 1928,
    death_lat: -18.6157, death_lon: -64.2834, death_year: 1967,
    hints: [
      'This Argentine-born Marxist revolutionary played a key role in the Cuban Revolution alongside Fidel Castro.',
      'His iconic portrait became one of the most reproduced photographs in history.',
      'He was captured and executed by Bolivian forces, becoming a global symbol of rebellion and counterculture.'
    ]
  },
  {
    name: 'Sigmund Freud',
    acceptable_names: ['sigmund freud', 'freud'],
    birth_lat: 49.6428, birth_lon: 18.1477, birth_year: 1856,
    death_lat: 51.5284, death_lon: -0.1753, death_year: 1939,
    hints: [
      'This neurologist founded psychoanalysis and introduced concepts like the unconscious mind, the id, ego, and superego.',
      'He famously analyzed dreams as pathways to the unconscious in his landmark 1899 work.',
      'He fled Vienna after the Nazi annexation of Austria and spent his final year in London.'
    ]
  },
  {
    name: 'Mao Zedong',
    acceptable_names: ['mao zedong', 'mao tse-tung', 'mao'],
    birth_lat: 27.9145, birth_lon: 112.5362, birth_year: 1893,
    death_lat: 39.9042, death_lon: 116.4074, death_year: 1976,
    hints: [
      'This revolutionary founded the People\'s Republic of China in 1949 and led the country for nearly three decades.',
      'His Little Red Book of quotations became one of the most printed books in history during the Cultural Revolution.',
      'Born to a peasant family in Hunan province, he rose to become the most powerful figure in modern Chinese history.'
    ]
  },
  {
    name: 'Nelson Mandela',
    acceptable_names: ['nelson mandela', 'mandela'],
    birth_lat: -31.7269, birth_lon: 28.7278, birth_year: 1918,
    death_lat: -26.2041, death_lon: 28.0473, death_year: 2013,
    hints: [
      'This anti-apartheid activist spent 27 years in prison before becoming his country\'s first Black president.',
      'He shared the Nobel Peace Prize in 1993 with his former adversary F.W. de Klerk.',
      'Born in a small rural village in the Eastern Cape, he grew up to dismantle the system of racial segregation that defined his nation.'
    ]
  },
  {
    name: 'Simón Bolívar',
    acceptable_names: ['simon bolivar', 'bolivar', 'simon', 'el libertador'],
    birth_lat: 10.4806, birth_lon: -66.9036, birth_year: 1783,
    death_lat: 11.2408, death_lon: -74.1990, death_year: 1830,
    hints: [
      'Known as "El Libertador," this revolutionary leader freed six South American nations from Spanish colonial rule.',
      'He traveled over 75,000 miles on horseback during his military campaigns across the continent.',
      'Born into a wealthy family in Caracas, he died in poverty in Colombia after his dream of a unified South American republic collapsed.'
    ]
  },
  {
    name: 'Wolfgang Amadeus Mozart',
    acceptable_names: ['wolfgang amadeus mozart', 'mozart', 'amadeus mozart'],
    birth_lat: 47.8095, birth_lon: 13.0550, birth_year: 1756,
    death_lat: 48.2082, death_lon: 16.3738, death_year: 1791,
    hints: [
      'This child prodigy composed his first symphony at age eight and performed before royalty across Europe.',
      'He created over 800 works — symphonies, operas, and chamber music — in just 35 years of life.',
      'Despite being one of the most celebrated composers of his time, he died in poverty and was buried in an unmarked grave.'
    ]
  },
  {
    name: 'Hannibal Barca',
    acceptable_names: ['hannibal barca', 'hannibal'],
    birth_lat: 36.8567, birth_lon: 10.3349, birth_year: -247,
    death_lat: 40.7200, death_lon: 29.6700, death_year: -183,
    hints: [
      'This Carthaginian general famously crossed the Alps with war elephants to invade the Roman Republic.',
      'His tactics at the Battle of Cannae are still studied at military academies as one of history\'s greatest battlefield victories.',
      'After decades of fighting Rome, he fled to the eastern Mediterranean and took his own life rather than be captured.'
    ]
  },
  {
    name: 'Catherine the Great',
    acceptable_names: ['catherine the great', 'catherine ii', 'catherine', 'ekaterina'],
    birth_lat: 53.4285, birth_lon: 14.5528, birth_year: 1729,
    death_lat: 59.9311, death_lon: 30.3609, death_year: 1796,
    hints: [
      'This ruler presided over the golden age of the Russian Empire, vastly expanding its territory.',
      'Born a minor German princess, she overthrew her own husband in a coup to become Empress of Russia.',
      'A passionate patron of the arts, she corresponded with Voltaire and Diderot and founded the Hermitage Museum.'
    ]
  },
  {
    name: 'Charles Darwin',
    acceptable_names: ['charles darwin', 'darwin'],
    birth_lat: 52.7081, birth_lon: -2.7549, birth_year: 1809,
    death_lat: 51.3218, death_lon: 0.0485, death_year: 1882,
    hints: [
      'This naturalist proposed the theory of evolution by natural selection in his 1859 work On the Origin of Species.',
      'A five-year voyage on HMS Beagle, including time in the Galápagos Islands, inspired his revolutionary ideas.',
      'He spent over 20 years gathering evidence before publishing his theory, anxious about the religious controversy it would cause.'
    ]
  },
  {
    name: 'Joan of Arc',
    acceptable_names: ['joan of arc', 'jeanne d\'arc', 'jeanne darc', 'joan'],
    birth_lat: 48.4422, birth_lon: 5.6769, birth_year: 1412,
    death_lat: 49.4432, death_lon: 1.0993, death_year: 1431,
    hints: [
      'This teenage girl claimed to hear voices from saints and led French armies to crucial victories during the Hundred Years\' War.',
      'She was captured by the English and burned at the stake at age 19, later declared a martyr and canonized as a saint.',
      'Born to a peasant family in a small French village, she convinced the Dauphin to let her command his army.'
    ]
  }
];

// Seed only if table is empty
const existing = db.prepare('SELECT COUNT(*) as count FROM figures').get();
if (existing.count === 0) {
  const insert = db.prepare(`
    INSERT INTO figures (name, acceptable_names, birth_lat, birth_lon, birth_year, death_lat, death_lon, death_year, hints)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  for (const f of figures) {
    insert.run(
      f.name,
      JSON.stringify(f.acceptable_names),
      f.birth_lat, f.birth_lon, f.birth_year,
      f.death_lat, f.death_lon, f.death_year,
      JSON.stringify(f.hints)
    );
  }
  console.log(`Seeded ${figures.length} historical figures.`);
}

module.exports = db;
