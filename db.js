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
  },
  // 20th century and beyond — writers, artists, scientists, musicians, athletes, politicians
  {
    name: 'Ernest Hemingway',
    acceptable_names: ['ernest hemingway', 'hemingway'],
    birth_lat: 41.8827, birth_lon: -87.6233, birth_year: 1899,
    death_lat: 43.6921, death_lon: -114.3635, death_year: 1961,
    hints: [
      'This Nobel Prize-winning American author pioneered the "iceberg theory" of spare, understated prose.',
      'He lived in Paris in the 1920s among the "Lost Generation" of expatriate writers, then later in Cuba for two decades.',
      'He wrote The Sun Also Rises, A Farewell to Arms, and The Old Man and the Sea, and died by suicide in Ketchum, Idaho.'
    ]
  },
  {
    name: 'Pablo Picasso',
    acceptable_names: ['pablo picasso', 'picasso'],
    birth_lat: 36.7213, birth_lon: -4.4214, birth_year: 1881,
    death_lat: 43.6167, death_lon: 7.0500, death_year: 1973,
    hints: [
      'This artist co-founded Cubism and produced around 20,000 works across painting, sculpture, and ceramics.',
      'His 1937 painting depicting the bombing of a Basque town became an iconic anti-war statement.',
      'Born in Málaga, Spain, he spent most of his adult life in France, dying at his villa on the French Riviera.'
    ]
  },
  {
    name: 'Franz Kafka',
    acceptable_names: ['franz kafka', 'kafka'],
    birth_lat: 50.0880, birth_lon: 14.4208, birth_year: 1883,
    death_lat: 48.3069, death_lon: 16.0769, death_year: 1924,
    hints: [
      'This German-language novelist wrote The Metamorphosis and The Trial, giving rise to the adjective "Kafkaesque."',
      'He worked as an insurance officer and asked his friend Max Brod to burn his manuscripts after his death — Brod refused.',
      'Born in Prague, he died of tuberculosis at a sanatorium near Vienna at just 40 years old.'
    ]
  },
  {
    name: 'Frida Kahlo',
    acceptable_names: ['frida kahlo', 'kahlo'],
    birth_lat: 19.3550, birth_lon: -99.1625, birth_year: 1907,
    death_lat: 19.3550, death_lon: -99.1625, death_year: 1954,
    hints: [
      'This Mexican painter is celebrated for her deeply personal self-portraits blending folk art with surrealism.',
      'She survived a devastating bus accident at 18 that left her in lifelong pain, and began painting during her recovery.',
      'She was married twice to the muralist Diego Rivera and died in the same house in Coyoacán where she was born.'
    ]
  },
  {
    name: 'Winston Churchill',
    acceptable_names: ['winston churchill', 'churchill'],
    birth_lat: 51.8414, birth_lon: -1.3592, birth_year: 1874,
    death_lat: 51.5074, death_lon: -0.1278, death_year: 1965,
    hints: [
      'This British Prime Minister led the United Kingdom through the Second World War with defiant speeches that rallied the nation.',
      'He won the Nobel Prize in Literature in 1953 for his historical writings and memoirs.',
      'Born at Blenheim Palace, he died in London and received one of the largest state funerals in world history.'
    ]
  },
  {
    name: 'Vladimir Lenin',
    acceptable_names: ['vladimir lenin', 'lenin', 'vladimir ilyich ulyanov'],
    birth_lat: 54.3282, birth_lon: 48.3866, birth_year: 1870,
    death_lat: 55.9607, death_lon: 37.1853, death_year: 1924,
    hints: [
      'This Marxist revolutionary led the Bolshevik seizure of power in Russia\'s 1917 October Revolution.',
      'He founded the Soviet Union and served as its first head of government.',
      'Born in Simbirsk on the Volga, he died at a government estate outside Moscow; his embalmed body remains on display in Red Square.'
    ]
  },
  {
    name: 'Charlie Chaplin',
    acceptable_names: ['charlie chaplin', 'chaplin', 'charles chaplin'],
    birth_lat: 51.4607, birth_lon: -0.1160, birth_year: 1889,
    death_lat: 46.4312, death_lon: 6.9160, death_year: 1977,
    hints: [
      'This British comedian and filmmaker created the iconic "Little Tramp" character in the silent film era.',
      'His film The Great Dictator (1940) was a bold satire of Hitler and fascism.',
      'After being banned from re-entering the United States during the Red Scare, he settled in Switzerland, where he died.'
    ]
  },
  {
    name: 'Jimi Hendrix',
    acceptable_names: ['jimi hendrix', 'hendrix', 'james hendrix'],
    birth_lat: 47.6062, birth_lon: -122.3321, birth_year: 1942,
    death_lat: 51.5074, death_lon: -0.1278, death_year: 1970,
    hints: [
      'This American guitarist is widely regarded as the greatest electric guitarist in history.',
      'His performance of the Star-Spangled Banner at Woodstock in 1969 became one of rock music\'s defining moments.',
      'Born in Seattle, he was discovered while playing in New York clubs and achieved his greatest fame after moving to London, where he died aged 27.'
    ]
  },
  {
    name: 'Bob Marley',
    acceptable_names: ['bob marley', 'marley', 'robert marley'],
    birth_lat: 18.3180, birth_lon: -77.3950, birth_year: 1945,
    death_lat: 25.7617, death_lon: -80.1918, death_year: 1981,
    hints: [
      'This Jamaican singer-songwriter brought reggae to a worldwide audience and became a symbol of the Rastafari movement.',
      'His albums Exodus and Legend are among the best-selling records of all time.',
      'Born in Nine Mile, Jamaica, he died of cancer in Miami while en route home from Germany for cancer treatment.'
    ]
  },
  {
    name: 'Édith Piaf',
    acceptable_names: ['edith piaf', 'piaf', 'la mome piaf'],
    birth_lat: 48.8722, birth_lon: 2.3976, birth_year: 1915,
    death_lat: 43.6698, death_lon: 6.9197, death_year: 1963,
    hints: [
      'Known as "The Little Sparrow," this singer became France\'s greatest popular music icon.',
      'Her signature songs include La Vie en rose and Non, je ne regrette rien.',
      'Born in the Belleville quarter of Paris, she died at a villa on the Côte d\'Azur and was buried at Père Lachaise cemetery.'
    ]
  },
  {
    name: 'Freddie Mercury',
    acceptable_names: ['freddie mercury', 'mercury', 'farrokh bulsara'],
    birth_lat: -4.0210, birth_lon: 39.6682, birth_year: 1946,
    death_lat: 51.4994, death_lon: -0.1999, death_year: 1991,
    hints: [
      'This flamboyant rock vocalist was the lead singer of the British band Queen.',
      'He was born in Zanzibar to Parsi Indian parents and moved to England in his teens.',
      'His performance at Live Aid in 1985 is considered one of the greatest in rock history; he died of AIDS-related pneumonia at his home in Kensington, London.'
    ]
  },
  {
    name: 'Michael Jackson',
    acceptable_names: ['michael jackson', 'jackson', 'mj', 'king of pop'],
    birth_lat: 41.5548, birth_lon: -87.2000, birth_year: 1958,
    death_lat: 34.0659, death_lon: -118.3985, death_year: 2009,
    hints: [
      'Known as the "King of Pop," this American entertainer sold over 750 million records worldwide.',
      'His 1982 album Thriller remains the best-selling album of all time.',
      'Born in Gary, Indiana, he died of acute propofol intoxication at his rented Holmby Hills mansion in Los Angeles.'
    ]
  },
  {
    name: 'Coco Chanel',
    acceptable_names: ['coco chanel', 'chanel', 'gabrielle chanel'],
    birth_lat: 47.5000, birth_lon: -0.5667, birth_year: 1883,
    death_lat: 48.8682, death_lon: 2.3291, death_year: 1971,
    hints: [
      'This French fashion designer revolutionized women\'s fashion by replacing corsets with comfortable, elegant clothing.',
      'She created one of the world\'s most famous perfumes — Chanel No. 5 — and the iconic little black dress.',
      'Born in Saumur and raised in an orphanage, she built her empire in Paris, dying in her suite at the Hôtel Ritz.'
    ]
  },
  {
    name: 'Salvador Dalí',
    acceptable_names: ['salvador dali', 'dali', 'salvador dalí'],
    birth_lat: 42.2669, birth_lon: 2.9613, birth_year: 1904,
    death_lat: 42.2669, death_lon: 2.9613, death_year: 1989,
    hints: [
      'This Spanish surrealist painter is best known for The Persistence of Memory with its melting clocks.',
      'He collaborated with filmmaker Luis Buñuel and had a lifelong muse in his wife Gala.',
      'Born and buried in Figueres, Catalonia, he requested interment in the crypt beneath his own Theatre-Museum.'
    ]
  },
  {
    name: 'James Joyce',
    acceptable_names: ['james joyce', 'joyce'],
    birth_lat: 53.2941, birth_lon: -6.2148, birth_year: 1882,
    death_lat: 47.3769, death_lon: 8.5417, death_year: 1941,
    hints: [
      'This Irish novelist transformed modern literature with his stream-of-consciousness technique in Ulysses and Finnegans Wake.',
      'Though his works are set almost entirely in Dublin, he spent most of his adult life abroad.',
      'He died in Zurich after intestinal surgery, having lived as an expatriate in Trieste, Paris, and Switzerland.'
    ]
  },
  {
    name: 'Ayrton Senna',
    acceptable_names: ['ayrton senna', 'senna'],
    birth_lat: -23.5505, birth_lon: -46.6333, birth_year: 1960,
    death_lat: 44.1390, death_lon: 12.2497, death_year: 1994,
    hints: [
      'This Brazilian Formula 1 driver won three World Championships and is considered the greatest racing driver of all time by many.',
      'His on-track rivalry with Alain Prost in the late 1980s was one of the most intense in sport.',
      'Born in São Paulo, he died after crashing his Williams at the San Marino Grand Prix at Imola, Italy.'
    ]
  },
  {
    name: 'Bruce Lee',
    acceptable_names: ['bruce lee', 'lee jun-fan', 'lee'],
    birth_lat: 37.7749, birth_lon: -122.4194, birth_year: 1940,
    death_lat: 22.3193, death_lon: 114.1694, death_year: 1973,
    hints: [
      'This martial artist and actor founded Jeet Kune Do and brought kung fu films to a global audience.',
      'Born in San Francisco to a Hong Kong father, he grew up in Hong Kong and later returned to the US to study philosophy.',
      'He died unexpectedly at 32 from cerebral edema in Hong Kong, shortly before the release of Enter the Dragon.'
    ]
  },
  {
    name: 'Marilyn Monroe',
    acceptable_names: ['marilyn monroe', 'monroe', 'norma jeane mortenson', 'norma jeane baker'],
    birth_lat: 34.0522, birth_lon: -118.2437, birth_year: 1926,
    death_lat: 34.0540, death_lon: -118.4380, death_year: 1962,
    hints: [
      'This actress and model became the defining Hollywood sex symbol of the 1950s and early 1960s.',
      'She sang "Happy Birthday, Mr. President" to John F. Kennedy at Madison Square Garden in 1962.',
      'Born and died in Los Angeles, she was found dead of a barbiturate overdose at her Brentwood home aged 36.'
    ]
  },
  {
    name: 'Audrey Hepburn',
    acceptable_names: ['audrey hepburn', 'hepburn'],
    birth_lat: 50.8503, birth_lon: 4.3517, birth_year: 1929,
    death_lat: 46.2044, death_lon: 6.1432, death_year: 1993,
    hints: [
      'This actress won an Academy Award, a Tony, an Emmy, and a Grammy — one of the rare EGOT recipients.',
      'After her Hollywood career, she became a UNICEF Goodwill Ambassador, traveling the world for humanitarian causes.',
      'Born in Brussels to a Dutch mother and British father, she spent her final years at her home in Tolochenaz, Switzerland, where she died.'
    ]
  },
  {
    name: 'Walt Disney',
    acceptable_names: ['walt disney', 'disney', 'walter disney'],
    birth_lat: 41.8827, birth_lon: -87.6233, birth_year: 1901,
    death_lat: 34.1808, death_lon: -118.3090, death_year: 1966,
    hints: [
      'This American entrepreneur created Mickey Mouse and built the world\'s most famous entertainment company.',
      'He pioneered the full-length animated feature film with Snow White and the Seven Dwarfs in 1937.',
      'Born in Chicago, he moved to Los Angeles to build his studio empire and died there while planning Disney World.'
    ]
  },
  {
    name: 'Nikita Khrushchev',
    acceptable_names: ['nikita khrushchev', 'khrushchev'],
    birth_lat: 51.5522, birth_lon: 35.5672, birth_year: 1894,
    death_lat: 55.7558, death_lon: 37.6176, death_year: 1971,
    hints: [
      'This Soviet leader led the USSR during the Cuban Missile Crisis, the most dangerous nuclear standoff of the Cold War.',
      'His "Secret Speech" denouncing Stalin\'s cult of personality in 1956 was a historic turning point.',
      'Born in a village in Kursk Oblast, he rose to lead the Soviet Union and died in Moscow after being ousted in a political coup.'
    ]
  },
  {
    name: 'Ho Chi Minh',
    acceptable_names: ['ho chi minh', 'ho', 'nguyen sinh cung'],
    birth_lat: 18.6796, birth_lon: 105.6813, birth_year: 1890,
    death_lat: 21.0285, death_lon: 105.8542, death_year: 1969,
    hints: [
      'This Vietnamese communist revolutionary led his country\'s independence movement against France and later the United States.',
      'He lived and worked in Paris, Moscow, and China before returning to lead the Viet Minh.',
      'Born in Nghe An province in central Vietnam, he died in Hanoi; the city was later renamed after him.'
    ]
  },
  {
    name: 'Mother Teresa',
    acceptable_names: ['mother teresa', 'teresa', 'anjeze gonxhe bojaxhiu', 'saint teresa of calcutta'],
    birth_lat: 41.9961, birth_lon: 21.4317, birth_year: 1910,
    death_lat: 22.5726, death_lon: 88.3639, death_year: 1997,
    hints: [
      'This Roman Catholic nun founded the Missionaries of Charity and devoted her life to serving the poorest of the poor.',
      'She received the Nobel Peace Prize in 1979 and was canonized as a saint in 2016.',
      'Born in Skopje (now North Macedonia) to Albanian parents, she moved to India at 19 and spent the rest of her life in Calcutta.'
    ]
  },
  {
    name: 'Yuri Gagarin',
    acceptable_names: ['yuri gagarin', 'gagarin'],
    birth_lat: 55.0283, birth_lon: 35.2303, birth_year: 1934,
    death_lat: 55.9849, death_lon: 38.2095, death_year: 1968,
    hints: [
      'This Soviet cosmonaut became the first human to travel into outer space on April 12, 1961.',
      'His Vostok spacecraft completed one orbit of Earth in just 108 minutes.',
      'Born in the Smolensk Oblast of Russia, he died in a MiG-15 training jet crash near the town of Kirzhach.'
    ]
  },
  {
    name: 'Alan Turing',
    acceptable_names: ['alan turing', 'turing'],
    birth_lat: 51.5074, birth_lon: -0.1278, birth_year: 1912,
    death_lat: 53.4808, death_lon: -2.2426, death_year: 1954,
    hints: [
      'This mathematician and logician is considered the father of theoretical computer science and artificial intelligence.',
      'During World War II he led the team that broke the German Enigma cipher at Bletchley Park, helping to shorten the war.',
      'Born in London, he died in Manchester from cyanide poisoning — likely suicide — after being chemically castrated by the British government for his homosexuality.'
    ]
  },
  {
    name: 'Anne Frank',
    acceptable_names: ['anne frank', 'frank', 'annelies frank'],
    birth_lat: 50.1109, birth_lon: 8.6821, birth_year: 1929,
    death_lat: 53.1061, death_lon: 9.9868, death_year: 1945,
    hints: [
      'This Jewish teenager kept a diary while hiding from the Nazis in a concealed apartment in Amsterdam during World War II.',
      'Her diary was published posthumously by her father Otto and became one of the most widely read books in the world.',
      'Born in Frankfurt, she died in the Bergen-Belsen concentration camp in Germany, weeks before the camp\'s liberation.'
    ]
  },
  {
    name: 'Martin Luther King Jr.',
    acceptable_names: ['martin luther king', 'martin luther king jr', 'mlk', 'king'],
    birth_lat: 33.7490, birth_lon: -84.3880, birth_year: 1929,
    death_lat: 35.1495, death_lon: -90.0490, death_year: 1968,
    hints: [
      'This Baptist minister and civil rights leader delivered the "I Have a Dream" speech to 250,000 people in Washington D.C.',
      'He received the Nobel Peace Prize in 1964 at age 35, the youngest recipient at the time.',
      'Born in Atlanta, Georgia, he was assassinated on the balcony of the Lorraine Motel in Memphis, Tennessee.'
    ]
  },
  {
    name: 'Indira Gandhi',
    acceptable_names: ['indira gandhi', 'indira'],
    birth_lat: 25.4358, birth_lon: 81.8463, birth_year: 1917,
    death_lat: 28.6139, death_lon: 77.2090, death_year: 1984,
    hints: [
      'This politician was the first and only female Prime Minister of India, serving for a total of fifteen years.',
      'She led India to victory in the 1971 war against Pakistan, which led to the creation of Bangladesh.',
      'Born in Allahabad, she was assassinated by her own bodyguards at her official residence in New Delhi.'
    ]
  },
  {
    name: 'Pelé',
    acceptable_names: ['pele', 'pelé', 'edson arantes do nascimento'],
    birth_lat: -20.7333, birth_lon: -46.6167, birth_year: 1940,
    death_lat: -23.5505, death_lon: -46.6333, death_year: 2022,
    hints: [
      'This Brazilian footballer is widely regarded as the greatest player in the history of the sport.',
      'He won three FIFA World Cups with Brazil — in 1958, 1962, and 1970 — the only player to do so.',
      'Born in Três Corações, Minas Gerais, he died of colon cancer in São Paulo.'
    ]
  },
  {
    name: 'Marcel Proust',
    acceptable_names: ['marcel proust', 'proust'],
    birth_lat: 48.8068, birth_lon: 2.2381, birth_year: 1871,
    death_lat: 48.8566, death_lon: 2.3522, death_year: 1922,
    hints: [
      'This French author wrote In Search of Lost Time, one of the longest and most celebrated novels in world literature.',
      'He spent his later years in a cork-lined bedroom in Paris, writing in bed to avoid noise and allergens.',
      'Born in Auteuil, a suburb of Paris, he lived and died in the city that so thoroughly defined his work.'
    ]
  },
  {
    name: 'Simone de Beauvoir',
    acceptable_names: ['simone de beauvoir', 'beauvoir', 'de beauvoir'],
    birth_lat: 48.8566, birth_lon: 2.3522, birth_year: 1908,
    death_lat: 48.8566, death_lon: 2.3522, death_year: 1986,
    hints: [
      'This French existentialist philosopher and writer authored The Second Sex, a foundational text of feminist theory.',
      'She had a lifelong intellectual and romantic partnership with Jean-Paul Sartre.',
      'Born and buried in Paris, she was interred alongside Sartre at Montparnasse Cemetery.'
    ]
  },
  {
    name: 'Joseph Stalin',
    acceptable_names: ['joseph stalin', 'stalin', 'iosif dzhugashvili'],
    birth_lat: 42.2679, birth_lon: 41.6429, birth_year: 1878,
    death_lat: 55.7558, death_lon: 37.6176, death_year: 1953,
    hints: [
      'This Soviet dictator led the USSR through World War II and created the gulag system of forced labour camps.',
      'Born in Gori, Georgia, he rose from a humble background to become the unchallenged ruler of the Soviet Union.',
      'He died in Moscow, having transformed the USSR into a superpower at an enormous human cost estimated at millions of lives.'
    ]
  },
  {
    name: 'Marlene Dietrich',
    acceptable_names: ['marlene dietrich', 'dietrich'],
    birth_lat: 52.5200, birth_lon: 13.4050, birth_year: 1901,
    death_lat: 48.8566, death_lon: 2.3522, death_year: 1992,
    hints: [
      'This actress and singer became an international superstar in the 1930s, famous for her androgynous glamour.',
      'She became an American citizen and performed for Allied troops during World War II, opposing the Nazi regime of her homeland.',
      'Born in Berlin, she spent her final years as a recluse in her Paris apartment, where she died.'
    ]
  },
  {
    name: 'Gabriel García Márquez',
    acceptable_names: ['gabriel garcia marquez', 'garcia marquez', 'gabo', 'gabriel garcía márquez'],
    birth_lat: 10.4619, birth_lon: -74.1943, birth_year: 1927,
    death_lat: 19.4326, death_lon: -99.1332, death_year: 2014,
    hints: [
      'This Colombian novelist won the Nobel Prize in Literature in 1982 and pioneered magical realism.',
      'His novel One Hundred Years of Solitude sold more than 50 million copies and has been translated into 46 languages.',
      'Born in Aracataca, Colombia, he spent much of his later life in Mexico City, where he died.'
    ]
  },
  {
    name: 'Diego Maradona',
    acceptable_names: ['diego maradona', 'maradona', 'diego armando maradona'],
    birth_lat: -34.6037, birth_lon: -58.3816, birth_year: 1960,
    death_lat: -34.5333, death_lon: -58.7167, death_year: 2020,
    hints: [
      'This Argentine footballer scored the infamous "Hand of God" goal against England at the 1986 World Cup.',
      'He led Argentina to World Cup victory in 1986 and revitalized Napoli, winning two Serie A titles.',
      'Born in Lanús, Buenos Aires, he died of cardiac arrest at his home in Tigre, Buenos Aires.'
    ]
  },
  {
    name: 'Ayatollah Khomeini',
    acceptable_names: ['ayatollah khomeini', 'khomeini', 'ruhollah khomeini'],
    birth_lat: 34.0917, birth_lon: 49.7014, birth_year: 1902,
    death_lat: 35.6892, death_lon: 51.3890, death_year: 1989,
    hints: [
      'This Shia cleric led the 1979 Iranian Revolution that overthrew the Shah and established the Islamic Republic.',
      'He spent 14 years in exile in Iraq and France before returning triumphantly to Tehran in 1979.',
      'Born in Khomein, Iran, he served as Supreme Leader of Iran until his death in Tehran.'
    ]
  },
  {
    name: 'Mikhail Gorbachev',
    acceptable_names: ['mikhail gorbachev', 'gorbachev'],
    birth_lat: 45.7522, birth_lon: 43.0125, birth_year: 1931,
    death_lat: 55.7558, death_lon: 37.6176, death_year: 2022,
    hints: [
      'This Soviet leader introduced the reforms of glasnost and perestroika that ultimately led to the fall of the USSR.',
      'He was awarded the Nobel Peace Prize in 1990 for his role in ending the Cold War.',
      'Born in Privolnoye in Stavropol Krai, he died in Moscow at age 91 — the last leader of the Soviet Union.'
    ]
  },
  {
    name: 'Louis Armstrong',
    acceptable_names: ['louis armstrong', 'armstrong', 'satchmo'],
    birth_lat: 29.9511, birth_lon: -90.0715, birth_year: 1901,
    death_lat: 40.7128, death_lon: -74.0060, death_year: 1971,
    hints: [
      'This jazz trumpeter and singer from New Orleans is widely considered the most influential figure in jazz history.',
      'His recordings in the 1920s with his Hot Five and Hot Seven groups defined early jazz.',
      'Born in a poor neighbourhood of New Orleans, he became a global ambassador for jazz and died in his sleep in New York.'
    ]
  },
  {
    name: 'Josephine Baker',
    acceptable_names: ['josephine baker', 'baker', 'freda josephine mcdonald'],
    birth_lat: 38.6270, birth_lon: -90.1994, birth_year: 1906,
    death_lat: 48.8566, death_lon: 2.3522, death_year: 1975,
    hints: [
      'This American-born French entertainer became the most successful Black performer in European history in the 1920s–30s.',
      'She was a French Resistance spy during World War II and a civil rights activist who refused to perform before segregated audiences.',
      'Born in St. Louis, Missouri, she renounced her American citizenship and became a French national, dying in Paris.'
    ]
  },
  {
    name: 'Rainer Maria Rilke',
    acceptable_names: ['rainer maria rilke', 'rilke'],
    birth_lat: 50.0880, birth_lon: 14.4208, birth_year: 1875,
    death_lat: 46.1060, death_lon: 7.1000, death_year: 1926,
    hints: [
      'This Bohemian-Austrian poet wrote the Duino Elegies and Letters to a Young Poet, considered pinnacles of German-language poetry.',
      'He lived as a nomad across Europe — Russia, Paris, Spain, and Switzerland — relying on patrons for support.',
      'Born in Prague, he died in Val-Mont sanatorium near Montreux, Switzerland, from complications of leukemia.'
    ]
  },
  {
    name: 'Igor Stravinsky',
    acceptable_names: ['igor stravinsky', 'stravinsky'],
    birth_lat: 59.9311, birth_lon: 29.1283, birth_year: 1882,
    death_lat: 40.7128, death_lon: -74.0060, death_year: 1971,
    hints: [
      'This Russian composer\'s Rite of Spring caused a riot at its Paris premiere in 1913 and transformed Western music.',
      'He lived in Switzerland, France, and the United States, becoming an American citizen in 1945.',
      'Born near St. Petersburg, he died in New York and was buried in Venice at the cemetery island of San Michele.'
    ]
  },
  {
    name: 'Pablo Neruda',
    acceptable_names: ['pablo neruda', 'neruda', 'neftali reyes basoalto'],
    birth_lat: -36.0100, birth_lon: -72.0000, birth_year: 1904,
    death_lat: -33.4489, death_lon: -70.6693, death_year: 1973,
    hints: [
      'This Chilean poet won the Nobel Prize in Literature in 1971 and is celebrated for his passionate love poems.',
      'He served as a Chilean diplomat and senator, was forced into exile, and remained a committed communist throughout his life.',
      'Born in Parral, southern Chile, he died in Santiago just days after the coup that brought Pinochet to power.'
    ]
  },
  // Ancient history
  {
    name: 'Julius Caesar',
    acceptable_names: ['julius caesar', 'caesar', 'gaius julius caesar'],
    birth_lat: 41.8967, birth_lon: 12.4822, birth_year: -100,
    death_lat: 41.8967, death_lon: 12.4822, death_year: -44,
    hints: [
      'This Roman general and statesman conquered Gaul and crossed the Rubicon, triggering a civil war that ended the Roman Republic.',
      'He reformed the Roman calendar, creating the Julian calendar that was used for 1,600 years.',
      'He was assassinated on the Ides of March by a group of senators including his ally Brutus, at the Theatre of Pompey in Rome.'
    ]
  },
  {
    name: 'Cleopatra',
    acceptable_names: ['cleopatra', 'cleopatra vii', 'cleopatra philopator'],
    birth_lat: 31.2001, birth_lon: 29.9187, birth_year: -69,
    death_lat: 31.2001, death_lon: 29.9187, death_year: -30,
    hints: [
      'This last active ruler of the Ptolemaic Kingdom of Egypt was the first in her dynasty to learn the Egyptian language.',
      'She formed powerful alliances — and romantic relationships — with Julius Caesar and Mark Antony.',
      'Born and died in Alexandria, she took her own life after Octavian\'s forces defeated Antony\'s fleet at the Battle of Actium.'
    ]
  },
  {
    name: 'Socrates',
    acceptable_names: ['socrates'],
    birth_lat: 37.9838, birth_lon: 23.7275, birth_year: -470,
    death_lat: 37.9838, death_lon: 23.7275, death_year: -399,
    hints: [
      'This Athenian philosopher developed the Socratic method of questioning and is considered the founder of Western philosophy.',
      'He wrote nothing himself — all we know of him comes through the dialogues of his student Plato.',
      'He was tried for impiety and corrupting the youth of Athens, sentenced to death, and drank hemlock in prison.'
    ]
  },
  {
    name: 'Archimedes',
    acceptable_names: ['archimedes'],
    birth_lat: 37.0755, birth_lon: 15.2866, birth_year: -287,
    death_lat: 37.0755, death_lon: 15.2866, death_year: -212,
    hints: [
      'This ancient Greek mathematician and inventor is considered the greatest mathematician of antiquity.',
      'He discovered the principle of buoyancy while stepping into a bath, reportedly shouting "Eureka!"',
      'Born and died in Syracuse, Sicily, he was killed by a Roman soldier during the siege of the city, despite orders to spare him.'
    ]
  },
  {
    name: 'Attila the Hun',
    acceptable_names: ['attila the hun', 'attila'],
    birth_lat: 47.1625, birth_lon: 19.5033, birth_year: 406,
    death_lat: 47.1625, death_lon: 19.5033, death_year: 453,
    hints: [
      'Called the "Scourge of God," this ruler of the Hunnic Empire led devastating raids across both the Eastern and Western Roman Empires.',
      'He came within striking distance of Rome and Constantinople, extracting enormous tribute payments from both empires.',
      'He died on the night of his wedding — likely from a hemorrhage — and was buried in a secret location in the Hungarian plains.'
    ]
  },
  // Renaissance
  {
    name: 'Michelangelo',
    acceptable_names: ['michelangelo', 'michelangelo buonarroti'],
    birth_lat: 43.6567, birth_lon: 11.9847, birth_year: 1475,
    death_lat: 41.8967, death_lon: 12.4822, death_year: 1564,
    hints: [
      'This Italian sculptor and painter spent four years lying on scaffolding to paint the ceiling of the Sistine Chapel.',
      'His marble sculptures David and Pietà are considered among the greatest works of art ever created.',
      'Born in Caprese, Tuscany, he spent the last decades of his life in Rome, where he died at age 88.'
    ]
  },
  {
    name: 'Nicolaus Copernicus',
    acceptable_names: ['nicolaus copernicus', 'copernicus', 'mikolaj kopernik'],
    birth_lat: 53.0138, birth_lon: 18.5981, birth_year: 1473,
    death_lat: 54.3520, death_lon: 20.6143, death_year: 1543,
    hints: [
      'This Renaissance polymath proposed the heliocentric model of the solar system, placing the Sun at its center.',
      'He worked most of his life as a canon of the Catholic Church, developing his revolutionary theory on the side.',
      'Born in Royal Prussia (now Poland), he died in Frombork, where his manuscript De revolutionibus was published in the year of his death.'
    ]
  },
  {
    name: 'Galileo Galilei',
    acceptable_names: ['galileo galilei', 'galileo'],
    birth_lat: 43.7228, birth_lon: 10.4017, birth_year: 1564,
    death_lat: 43.7606, death_lon: 11.2558, death_year: 1642,
    hints: [
      'This Italian astronomer improved the telescope and made observations that confirmed the heliocentric model of the solar system.',
      'The Inquisition forced him to recant his findings and placed him under house arrest for the rest of his life.',
      'Born in Pisa, he spent his final years confined to his villa in Arcetri near Florence, where he died blind.'
    ]
  },
  {
    name: 'Raphael',
    acceptable_names: ['raphael', 'raffaello sanzio', 'raffaello'],
    birth_lat: 43.7270, birth_lon: 12.6362, birth_year: 1483,
    death_lat: 41.8967, death_lon: 12.4822, death_year: 1520,
    hints: [
      'This Italian painter is celebrated for the grace and beauty of his Madonnas and for the Vatican fresco The School of Athens.',
      'He was one of the three great masters of the High Renaissance alongside Leonardo da Vinci and Michelangelo.',
      'Born in Urbino, he died in Rome on his 37th birthday and was buried in the Pantheon.'
    ]
  },
  {
    name: 'Erasmus of Rotterdam',
    acceptable_names: ['erasmus', 'erasmus of rotterdam', 'desiderius erasmus'],
    birth_lat: 51.9225, birth_lon: 4.4792, birth_year: 1469,
    death_lat: 47.5596, death_lon: 7.5886, death_year: 1536,
    hints: [
      'This Dutch humanist scholar was the greatest intellectual of the Northern Renaissance and a sharp critic of Church corruption.',
      'His satirical work In Praise of Folly, written in a week at Thomas More\'s house, became the Renaissance\'s bestselling book.',
      'Born in Rotterdam, he spent his life wandering between England, France, Italy, and Switzerland, dying in Basel.'
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
