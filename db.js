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
      'This figure was a theoretical physicist.',
      'He won the Nobel Prize in Physics and is famous for developing the theory of relativity.',
      'This German-born scientist, who later became an American citizen, published his special theory of relativity in 1905 and his general theory in 1915.'
    ]
  },
  {
    name: 'Napoleon Bonaparte',
    acceptable_names: ['napoleon bonaparte', 'napoleon'],
    birth_lat: 41.9194, birth_lon: 8.7386, birth_year: 1769,
    death_lat: -15.9391, death_lon: -5.7179, death_year: 1821,
    hints: [
      'This figure was a military general and emperor.',
      'He rose from modest origins to dominate European politics, crowning himself Emperor after the French Revolution.',
      'This Corsican-born French ruler was defeated at Waterloo in 1815 and spent his final years exiled on the island of Saint Helena.'
    ]
  },
  {
    name: 'Marie Curie',
    acceptable_names: ['marie curie', 'curie', 'maria sklodowska', 'maria sklodowska-curie'],
    birth_lat: 52.2297, birth_lon: 21.0122, birth_year: 1867,
    death_lat: 45.8630, death_lon: 6.8500, death_year: 1934,
    hints: [
      'This figure was a chemist and physicist.',
      'She was the first person to win Nobel Prizes in two different scientific fields — physics and chemistry.',
      'This Polish-born scientist, working in France, pioneered research on radioactivity and discovered two new elements, one of which she named after her homeland.'
    ]
  },
  {
    name: 'Leonardo da Vinci',
    acceptable_names: ['leonardo da vinci', 'leonardo', 'da vinci'],
    birth_lat: 43.7811, birth_lon: 10.9241, birth_year: 1452,
    death_lat: 47.4130, death_lon: 0.9834, death_year: 1519,
    hints: [
      'This figure was a painter, sculptor, architect, and inventor.',
      'A true Renaissance polymath, he filled thousands of notebook pages with anatomical drawings, engineering designs, and scientific observations.',
      'This 15th–16th century Italian genius painted two of the most famous works in Western art and spent his final years in France under royal patronage.'
    ]
  },
  {
    name: 'Mahatma Gandhi',
    acceptable_names: ['mahatma gandhi', 'gandhi', 'mohandas gandhi', 'mohandas karamchand gandhi'],
    birth_lat: 21.6417, birth_lon: 69.6293, birth_year: 1869,
    death_lat: 28.6139, death_lon: 77.2090, death_year: 1948,
    hints: [
      'This figure was a political activist and independence leader.',
      'He developed a philosophy of nonviolent civil disobedience that inspired liberation movements around the world.',
      'This Indian leader led a famous 240-mile march to the sea to protest colonial salt taxes and is widely called the "Father of the Nation."'
    ]
  },
  {
    name: 'Nikola Tesla',
    acceptable_names: ['nikola tesla', 'tesla'],
    birth_lat: 44.5582, birth_lon: 15.3330, birth_year: 1856,
    death_lat: 40.7128, death_lon: -74.0060, death_year: 1943,
    hints: [
      'This figure was an inventor and electrical engineer.',
      'He held over 300 patents and his alternating current system became the basis of the modern electrical grid.',
      'This Serbian-American inventor\'s rivalry with Thomas Edison over AC vs DC power is known as the "War of Currents"; he died penniless in a New York hotel room.'
    ]
  },
  {
    name: 'Alexander the Great',
    acceptable_names: ['alexander the great', 'alexander'],
    birth_lat: 40.7714, birth_lon: 22.5183, birth_year: -356,
    death_lat: 32.5431, death_lon: 44.4220, death_year: -323,
    hints: [
      'This figure was a military general and king.',
      'Tutored by Aristotle, he became king at 20 and never lost a battle, building one of the largest empires in ancient history.',
      'This Macedonian conqueror stretched his empire from Greece to northwestern India before dying at 32 in Babylon.'
    ]
  },
  {
    name: 'Genghis Khan',
    acceptable_names: ['genghis khan', 'chinggis khan', 'temujin'],
    birth_lat: 48.8000, birth_lon: 109.0000, birth_year: 1162,
    death_lat: 35.5000, death_lon: 106.3000, death_year: 1227,
    hints: [
      'This figure was a military conqueror and ruler.',
      'He united warring steppe tribes and built the largest contiguous land empire in history.',
      'This 12th–13th century Mongol ruler\'s campaigns swept across Central Asia, China, Persia, and into Eastern Europe.'
    ]
  },
  {
    name: 'Christopher Columbus',
    acceptable_names: ['christopher columbus', 'columbus', 'cristoforo colombo', 'cristobal colon'],
    birth_lat: 44.4056, birth_lon: 8.9463, birth_year: 1451,
    death_lat: 41.6523, death_lon: -4.7245, death_year: 1506,
    hints: [
      'This figure was an explorer and navigator.',
      'Funded by the Spanish Crown, he completed four voyages westward across the Atlantic in the late 15th and early 16th centuries.',
      'This Italian-born explorer opened permanent contact between Europe and the Americas, yet died believing he had reached Asia.'
    ]
  },
  {
    name: 'Frédéric Chopin',
    acceptable_names: ['frederic chopin', 'chopin', 'fryderyk chopin'],
    birth_lat: 52.2263, birth_lon: 20.3104, birth_year: 1810,
    death_lat: 48.8566, death_lon: 2.3522, death_year: 1849,
    hints: [
      'This figure was a composer and pianist.',
      'He wrote almost exclusively for the piano and is considered one of the defining voices of the Romantic era.',
      'This Polish composer emigrated to Paris at 20 and never returned to his homeland; per his dying wish, his heart was sent back after his death.'
    ]
  },
  {
    name: 'Karl Marx',
    acceptable_names: ['karl marx', 'marx'],
    birth_lat: 49.7596, birth_lon: 6.6441, birth_year: 1818,
    death_lat: 51.5074, death_lon: -0.1278, death_year: 1883,
    hints: [
      'This figure was a philosopher, economist, and political theorist.',
      'His ideas about class struggle and the critique of capitalism shaped revolutions and governments across the 20th century.',
      'This 19th-century German thinker co-authored The Communist Manifesto and wrote Das Kapital while living in exile in London.'
    ]
  },
  {
    name: 'Che Guevara',
    acceptable_names: ['che guevara', 'guevara', 'che', 'ernesto guevara'],
    birth_lat: -32.9468, birth_lon: -60.6393, birth_year: 1928,
    death_lat: -18.6157, death_lon: -64.2834, death_year: 1967,
    hints: [
      'This figure was a Marxist revolutionary and guerrilla leader.',
      'He played a central role in the Cuban Revolution and his iconic portrait became one of the most reproduced images in history.',
      'This Argentine-born revolutionary was captured and executed by Bolivian forces in 1967, becoming a global symbol of rebellion.'
    ]
  },
  {
    name: 'Sigmund Freud',
    acceptable_names: ['sigmund freud', 'freud'],
    birth_lat: 49.6428, birth_lon: 18.1477, birth_year: 1856,
    death_lat: 51.5284, death_lon: -0.1753, death_year: 1939,
    hints: [
      'This figure was a neurologist and the founder of psychoanalysis.',
      'He introduced concepts such as the unconscious mind, the id, ego, and superego, and analyzed dreams as pathways to inner life.',
      'This Austrian thinker fled his home city after the Nazi annexation and spent his final year in London, where he died in 1939.'
    ]
  },
  {
    name: 'Mao Zedong',
    acceptable_names: ['mao zedong', 'mao tse-tung', 'mao'],
    birth_lat: 27.9145, birth_lon: 112.5362, birth_year: 1893,
    death_lat: 39.9042, death_lon: 116.4074, death_year: 1976,
    hints: [
      'This figure was a communist revolutionary and political leader.',
      'He founded a major East Asian republic in 1949 and launched sweeping campaigns — including the Cultural Revolution — that reshaped his country.',
      'This 20th-century Chinese leader rose from peasant origins in Hunan province to rule the world\'s most populous nation for nearly three decades.'
    ]
  },
  {
    name: 'Nelson Mandela',
    acceptable_names: ['nelson mandela', 'mandela'],
    birth_lat: -31.7269, birth_lon: 28.7278, birth_year: 1918,
    death_lat: -26.2041, death_lon: 28.0473, death_year: 2013,
    hints: [
      'This figure was an anti-apartheid activist and statesman.',
      'He spent 27 years imprisoned before being released and leading his country\'s transition away from racial segregation.',
      'This South African leader became his nation\'s first Black president in 1994 and shared the Nobel Peace Prize with F.W. de Klerk.'
    ]
  },
  {
    name: 'Simón Bolívar',
    acceptable_names: ['simon bolivar', 'bolivar', 'simon', 'el libertador'],
    birth_lat: 10.4806, birth_lon: -66.9036, birth_year: 1783,
    death_lat: 11.2408, death_lon: -74.1990, death_year: 1830,
    hints: [
      'This figure was a military general and revolutionary leader.',
      'Known as "El Libertador," he led independence movements that freed six South American nations from Spanish colonial rule.',
      'This early 19th-century Venezuelan-born general died in poverty after his dream of a unified South American republic fell apart.'
    ]
  },
  {
    name: 'Wolfgang Amadeus Mozart',
    acceptable_names: ['wolfgang amadeus mozart', 'mozart', 'amadeus mozart'],
    birth_lat: 47.8095, birth_lon: 13.0550, birth_year: 1756,
    death_lat: 48.2082, death_lon: 16.3738, death_year: 1791,
    hints: [
      'This figure was a composer and pianist.',
      'A child prodigy, he performed before European royalty at age six and went on to create over 800 works in just 35 years of life.',
      'This 18th-century Austrian composer produced celebrated symphonies, operas, and concertos yet died in poverty and was buried in an unmarked grave.'
    ]
  },
  {
    name: 'Hannibal Barca',
    acceptable_names: ['hannibal barca', 'hannibal'],
    birth_lat: 36.8567, birth_lon: 10.3349, birth_year: -247,
    death_lat: 40.7200, death_lon: 29.6700, death_year: -183,
    hints: [
      'This figure was a military general.',
      'He famously crossed the Alps with war elephants to invade the Roman Republic from the north.',
      'This Carthaginian commander\'s double-envelopment tactics at the Battle of Cannae are still studied at military academies today.'
    ]
  },
  {
    name: 'Catherine the Great',
    acceptable_names: ['catherine the great', 'catherine ii', 'catherine', 'ekaterina'],
    birth_lat: 53.4285, birth_lon: 14.5528, birth_year: 1729,
    death_lat: 59.9311, death_lon: 30.3609, death_year: 1796,
    hints: [
      'This figure was an empress and ruler.',
      'Born a minor German princess, she seized power by overthrowing her own husband and went on to preside over a golden age of the Russian Empire.',
      'This 18th-century Russian empress corresponded with Voltaire and Diderot, founded the Hermitage Museum, and vastly expanded her empire\'s territory.'
    ]
  },
  {
    name: 'Charles Darwin',
    acceptable_names: ['charles darwin', 'darwin'],
    birth_lat: 52.7081, birth_lon: -2.7549, birth_year: 1809,
    death_lat: 51.3218, death_lon: 0.0485, death_year: 1882,
    hints: [
      'This figure was a naturalist and biologist.',
      'A five-year voyage aboard HMS Beagle, with observations from the Galápagos Islands, laid the groundwork for his revolutionary theory.',
      'This 19th-century English scientist proposed the theory of evolution by natural selection in his landmark 1859 work, which he delayed publishing for over two decades.'
    ]
  },
  {
    name: 'Joan of Arc',
    acceptable_names: ['joan of arc', 'jeanne d\'arc', 'jeanne darc', 'joan'],
    birth_lat: 48.4422, birth_lon: 5.6769, birth_year: 1412,
    death_lat: 49.4432, death_lon: 1.0993, death_year: 1431,
    hints: [
      'This figure was a military leader and religious martyr.',
      'A teenage peasant girl, she claimed to receive divine visions and led French armies to critical victories during the Hundred Years\' War.',
      'This 15th-century French heroine was captured, tried for heresy, and burned at the stake at age 19; she was canonized as a saint centuries later.'
    ]
  },
  // 20th century and beyond — writers, artists, scientists, musicians, athletes, politicians
  {
    name: 'Ernest Hemingway',
    acceptable_names: ['ernest hemingway', 'hemingway'],
    birth_lat: 41.8827, birth_lon: -87.6233, birth_year: 1899,
    death_lat: 43.6921, death_lon: -114.3635, death_year: 1961,
    hints: [
      'This figure was a novelist and journalist.',
      'He pioneered a spare, minimalist prose style and spent years living as an expatriate in Paris among the "Lost Generation" of writers.',
      'This American Nobel laureate wrote The Sun Also Rises, A Farewell to Arms, and The Old Man and the Sea, and lived for two decades in Cuba.'
    ]
  },
  {
    name: 'Pablo Picasso',
    acceptable_names: ['pablo picasso', 'picasso'],
    birth_lat: 36.7213, birth_lon: -4.4214, birth_year: 1881,
    death_lat: 43.6167, death_lon: 7.0500, death_year: 1973,
    hints: [
      'This figure was a painter and sculptor.',
      'He co-founded Cubism and produced around 20,000 works across painting, sculpture, and ceramics over a career spanning eight decades.',
      'This Spanish artist\'s 1937 monumental painting depicting the aerial bombing of a Basque town became one of the most powerful anti-war images ever created.'
    ]
  },
  {
    name: 'Franz Kafka',
    acceptable_names: ['franz kafka', 'kafka'],
    birth_lat: 50.0880, birth_lon: 14.4208, birth_year: 1883,
    death_lat: 48.3069, death_lon: 16.0769, death_year: 1924,
    hints: [
      'This figure was a novelist and short story writer.',
      'He worked as an insurance officer by day and wrote at night, producing unsettling fiction about alienation and bureaucratic absurdity that gave rise to the adjective named after him.',
      'This early 20th-century German-language author from Prague wrote The Metamorphosis and The Trial; he asked his friend to burn his manuscripts after his death, but the friend refused.'
    ]
  },
  {
    name: 'Frida Kahlo',
    acceptable_names: ['frida kahlo', 'kahlo'],
    birth_lat: 19.3550, birth_lon: -99.1625, birth_year: 1907,
    death_lat: 19.3550, death_lon: -99.1625, death_year: 1954,
    hints: [
      'This figure was a painter.',
      'She survived a devastating bus accident at 18 that left her in chronic pain, and began painting during her long recovery.',
      'This Mexican artist is celebrated for intensely personal self-portraits that blend folk art with surrealism; she was married twice to the famous muralist Diego Rivera.'
    ]
  },
  {
    name: 'Winston Churchill',
    acceptable_names: ['winston churchill', 'churchill'],
    birth_lat: 51.8414, birth_lon: -1.3592, birth_year: 1874,
    death_lat: 51.5074, death_lon: -0.1278, death_year: 1965,
    hints: [
      'This figure was a politician, statesman, and writer.',
      'He led the United Kingdom through the Second World War with defiant speeches that rallied the nation against Nazi Germany.',
      'This British Prime Minister was born at Blenheim Palace, won the Nobel Prize in Literature in 1953, and received one of the largest state funerals in world history.'
    ]
  },
  {
    name: 'Vladimir Lenin',
    acceptable_names: ['vladimir lenin', 'lenin', 'vladimir ilyich ulyanov'],
    birth_lat: 54.3282, birth_lon: 48.3866, birth_year: 1870,
    death_lat: 55.9607, death_lon: 37.1853, death_year: 1924,
    hints: [
      'This figure was a Marxist revolutionary and political leader.',
      'He led the Bolshevik seizure of power in the 1917 October Revolution and became the first head of government of a new communist state.',
      'This Russian revolutionary founded the Soviet Union; his embalmed body has been on public display in a mausoleum on Red Square ever since his death in 1924.'
    ]
  },
  {
    name: 'Charlie Chaplin',
    acceptable_names: ['charlie chaplin', 'chaplin', 'charles chaplin'],
    birth_lat: 51.4607, birth_lon: -0.1160, birth_year: 1889,
    death_lat: 46.4312, death_lon: 6.9160, death_year: 1977,
    hints: [
      'This figure was a comedian, filmmaker, and actor.',
      'He created the iconic "Little Tramp" character and became the defining figure of the silent film era.',
      'This British entertainer\'s 1940 film was a bold satire of Hitler; he was later barred from re-entering the United States during the Red Scare and settled in Switzerland.'
    ]
  },
  {
    name: 'Jimi Hendrix',
    acceptable_names: ['jimi hendrix', 'hendrix', 'james hendrix'],
    birth_lat: 47.6062, birth_lon: -122.3321, birth_year: 1942,
    death_lat: 51.5074, death_lon: -0.1278, death_year: 1970,
    hints: [
      'This figure was a rock guitarist and singer-songwriter.',
      'Widely regarded as the greatest electric guitarist in history, his feedback-drenched style revolutionized rock music in the late 1960s.',
      'This American musician\'s performance of the Star-Spangled Banner at Woodstock in 1969 is legendary; he died in London at age 27.'
    ]
  },
  {
    name: 'Bob Marley',
    acceptable_names: ['bob marley', 'marley', 'robert marley'],
    birth_lat: 18.3180, birth_lon: -77.3950, birth_year: 1945,
    death_lat: 25.7617, death_lon: -80.1918, death_year: 1981,
    hints: [
      'This figure was a reggae singer and songwriter.',
      'He brought reggae music to a global audience and became the most prominent symbol of the Rastafari movement.',
      'This Jamaican musician\'s albums Exodus and Legend are among the best-selling records of all time; he died of cancer at age 36.'
    ]
  },
  {
    name: 'Édith Piaf',
    acceptable_names: ['edith piaf', 'piaf', 'la mome piaf'],
    birth_lat: 48.8722, birth_lon: 2.3976, birth_year: 1915,
    death_lat: 43.6698, death_lon: 6.9197, death_year: 1963,
    hints: [
      'This figure was a cabaret singer and songwriter.',
      'Known as "The Little Sparrow," she became France\'s greatest popular music icon with a voice described as raw and deeply emotional.',
      'This French singer\'s most famous songs include La Vie en rose and Non, je ne regrette rien; she was born and buried in Paris.'
    ]
  },
  {
    name: 'Freddie Mercury',
    acceptable_names: ['freddie mercury', 'mercury', 'farrokh bulsara'],
    birth_lat: -4.0210, birth_lon: 39.6682, birth_year: 1946,
    death_lat: 51.4994, death_lon: -0.1999, death_year: 1991,
    hints: [
      'This figure was a rock singer and songwriter.',
      'Born in Zanzibar to Parsi Indian parents, he became the flamboyant lead vocalist of one of the best-selling rock bands of all time.',
      'This British musician\'s performance at Live Aid in 1985 is widely considered one of the greatest in rock history; he died of AIDS-related illness in 1991.'
    ]
  },
  {
    name: 'Michael Jackson',
    acceptable_names: ['michael jackson', 'jackson', 'mj', 'king of pop'],
    birth_lat: 41.5548, birth_lon: -87.2000, birth_year: 1958,
    death_lat: 34.0659, death_lon: -118.3985, death_year: 2009,
    hints: [
      'This figure was a pop singer, dancer, and entertainer.',
      'Known as the "King of Pop," he sold over 750 million records worldwide and pioneered music video as an art form.',
      'This American entertainer\'s 1982 album remains the best-selling album of all time; he grew up performing with his siblings before launching a record-breaking solo career.'
    ]
  },
  {
    name: 'Coco Chanel',
    acceptable_names: ['coco chanel', 'chanel', 'gabrielle chanel'],
    birth_lat: 47.5000, birth_lon: -0.5667, birth_year: 1883,
    death_lat: 48.8682, death_lon: 2.3291, death_year: 1971,
    hints: [
      'This figure was a fashion designer.',
      'She revolutionized women\'s fashion by replacing restrictive corsets with comfortable, elegant clothing and created one of the world\'s most iconic perfumes.',
      'This French designer, raised in an orphanage, built a luxury empire in Paris and gave the world the little black dress and a fragrance that bears her name.'
    ]
  },
  {
    name: 'Salvador Dalí',
    acceptable_names: ['salvador dali', 'dali', 'salvador dalí'],
    birth_lat: 42.2669, birth_lon: 2.9613, birth_year: 1904,
    death_lat: 42.2669, death_lon: 2.9613, death_year: 1989,
    hints: [
      'This figure was a surrealist painter.',
      'He collaborated with filmmaker Luis Buñuel and cultivated an eccentric public persona as deliberately as he crafted his dreamlike canvases.',
      'This Spanish artist is best known for The Persistence of Memory with its melting clocks; he was born and buried in the same Catalan town where he built his own museum.'
    ]
  },
  {
    name: 'James Joyce',
    acceptable_names: ['james joyce', 'joyce'],
    birth_lat: 53.2941, birth_lon: -6.2148, birth_year: 1882,
    death_lat: 47.3769, death_lon: 8.5417, death_year: 1941,
    hints: [
      'This figure was a novelist and poet.',
      'He transformed modern literature with his stream-of-consciousness technique, writing works of extraordinary linguistic complexity.',
      'This Irish writer spent most of his adult life as an expatriate in Trieste, Paris, and Zurich; his novels Ulysses and Finnegans Wake are set almost entirely in Dublin.'
    ]
  },
  {
    name: 'Ayrton Senna',
    acceptable_names: ['ayrton senna', 'senna'],
    birth_lat: -23.5505, birth_lon: -46.6333, birth_year: 1960,
    death_lat: 44.1390, death_lon: 12.2497, death_year: 1994,
    hints: [
      'This figure was a racing driver.',
      'He won three Formula 1 World Championships and his fierce rivalry with a French competitor in the late 1980s was one of sport\'s most intense.',
      'This Brazilian driver, widely considered the greatest in motorsport history, died in a crash at the 1994 San Marino Grand Prix in Italy.'
    ]
  },
  {
    name: 'Bruce Lee',
    acceptable_names: ['bruce lee', 'lee jun-fan', 'lee'],
    birth_lat: 37.7749, birth_lon: -122.4194, birth_year: 1940,
    death_lat: 22.3193, death_lon: 114.1694, death_year: 1973,
    hints: [
      'This figure was a martial artist and actor.',
      'He founded his own martial arts philosophy and brought kung fu cinema to a global audience.',
      'This American-born Hong Kong actor died suddenly at 32, just weeks before the release of his breakthrough Hollywood film Enter the Dragon.'
    ]
  },
  {
    name: 'Marilyn Monroe',
    acceptable_names: ['marilyn monroe', 'monroe', 'norma jeane mortenson', 'norma jeane baker'],
    birth_lat: 34.0522, birth_lon: -118.2437, birth_year: 1926,
    death_lat: 34.0540, death_lon: -118.4380, death_year: 1962,
    hints: [
      'This figure was an actress and model.',
      'She became the defining Hollywood sex symbol of the 1950s and early 1960s, as famous for her personal life as for her films.',
      'This American actress famously sang "Happy Birthday, Mr. President" to John F. Kennedy in 1962 and died of a barbiturate overdose later that same year.'
    ]
  },
  {
    name: 'Audrey Hepburn',
    acceptable_names: ['audrey hepburn', 'hepburn'],
    birth_lat: 50.8503, birth_lon: 4.3517, birth_year: 1929,
    death_lat: 46.2044, death_lon: 6.1432, death_year: 1993,
    hints: [
      'This figure was an actress and humanitarian.',
      'One of the rare EGOT recipients, she won an Academy Award, a Tony, an Emmy, and a Grammy over her career.',
      'This Belgian-born actress, who rose to fame in the 1950s, later devoted herself to UNICEF humanitarian work around the world and spent her final years in Switzerland.'
    ]
  },
  {
    name: 'Walt Disney',
    acceptable_names: ['walt disney', 'disney', 'walter disney'],
    birth_lat: 41.8827, birth_lon: -87.6233, birth_year: 1901,
    death_lat: 34.1808, death_lon: -118.3090, death_year: 1966,
    hints: [
      'This figure was an animator, film producer, and entrepreneur.',
      'He pioneered the full-length animated feature film and built the world\'s most famous entertainment company.',
      'This American visionary created a beloved cartoon mouse in the 1920s and produced Snow White and the Seven Dwarfs in 1937; he died while planning a famous theme park in Florida.'
    ]
  },
  {
    name: 'Nikita Khrushchev',
    acceptable_names: ['nikita khrushchev', 'khrushchev'],
    birth_lat: 51.5522, birth_lon: 35.5672, birth_year: 1894,
    death_lat: 55.7558, death_lon: 37.6176, death_year: 1971,
    hints: [
      'This figure was a communist politician and Soviet leader.',
      'His 1956 "Secret Speech" denouncing his predecessor\'s cult of personality was a historic turning point in Soviet history.',
      'This Soviet leader presided over the Cuban Missile Crisis and the Space Race before being ousted by political rivals in 1964.'
    ]
  },
  {
    name: 'Ho Chi Minh',
    acceptable_names: ['ho chi minh', 'ho', 'nguyen sinh cung'],
    birth_lat: 18.6796, birth_lon: 105.6813, birth_year: 1890,
    death_lat: 21.0285, death_lon: 105.8542, death_year: 1969,
    hints: [
      'This figure was a communist revolutionary and political leader.',
      'He led his country\'s independence movement against French colonial rule and later against the United States during a decades-long conflict.',
      'This Vietnamese leader lived in Paris, Moscow, and China before returning home to lead his nation; the country\'s largest city was renamed in his honour after his death.'
    ]
  },
  {
    name: 'Mother Teresa',
    acceptable_names: ['mother teresa', 'teresa', 'anjeze gonxhe bojaxhiu', 'saint teresa of calcutta'],
    birth_lat: 41.9961, birth_lon: 21.4317, birth_year: 1910,
    death_lat: 22.5726, death_lon: 88.3639, death_year: 1997,
    hints: [
      'This figure was a Roman Catholic nun and missionary.',
      'She founded the Missionaries of Charity and devoted her life to serving the sick and destitute, winning the Nobel Peace Prize in 1979.',
      'This Albanian-born nun moved to India at 19 and spent the rest of her life in Calcutta caring for the poor; she was canonized as a saint in 2016.'
    ]
  },
  {
    name: 'Yuri Gagarin',
    acceptable_names: ['yuri gagarin', 'gagarin'],
    birth_lat: 55.0283, birth_lon: 35.2303, birth_year: 1934,
    death_lat: 55.9849, death_lon: 38.2095, death_year: 1968,
    hints: [
      'This figure was a cosmonaut and military pilot.',
      'He became the first human to travel into outer space, completing one orbit of Earth in just 108 minutes.',
      'This Soviet pilot made his historic flight on April 12, 1961, and became a global celebrity; he died seven years later in a training jet crash.'
    ]
  },
  {
    name: 'Alan Turing',
    acceptable_names: ['alan turing', 'turing'],
    birth_lat: 51.5074, birth_lon: -0.1278, birth_year: 1912,
    death_lat: 53.4808, death_lon: -2.2426, death_year: 1954,
    hints: [
      'This figure was a mathematician and logician.',
      'During World War II he led the codebreaking effort that cracked the German Enigma cipher, a contribution credited with shortening the war.',
      'This British scientist is considered the father of theoretical computer science and artificial intelligence; he was prosecuted by his own government for his homosexuality and died of cyanide poisoning in 1954.'
    ]
  },
  {
    name: 'Anne Frank',
    acceptable_names: ['anne frank', 'frank', 'annelies frank'],
    birth_lat: 50.1109, birth_lon: 8.6821, birth_year: 1929,
    death_lat: 53.1061, death_lon: 9.9868, death_year: 1945,
    hints: [
      'This figure was a diarist and Holocaust victim.',
      'She kept a diary for over two years while hiding with her family in a secret annex in Amsterdam to escape Nazi persecution.',
      'This German-born Jewish teenager\'s diary was published posthumously by her father and became one of the most widely read accounts of the Holocaust; she died in a concentration camp weeks before its liberation.'
    ]
  },
  {
    name: 'Martin Luther King Jr.',
    acceptable_names: ['martin luther king', 'martin luther king jr', 'mlk', 'king'],
    birth_lat: 33.7490, birth_lon: -84.3880, birth_year: 1929,
    death_lat: 35.1495, death_lon: -90.0490, death_year: 1968,
    hints: [
      'This figure was a Baptist minister and civil rights leader.',
      'He delivered the "I Have a Dream" speech to 250,000 people in Washington D.C. and received the Nobel Peace Prize in 1964 at age 35.',
      'This American activist led the Montgomery Bus Boycott and the march on Selma before being assassinated at a motel in Memphis, Tennessee in 1968.'
    ]
  },
  {
    name: 'Indira Gandhi',
    acceptable_names: ['indira gandhi', 'indira'],
    birth_lat: 25.4358, birth_lon: 81.8463, birth_year: 1917,
    death_lat: 28.6139, death_lon: 77.2090, death_year: 1984,
    hints: [
      'This figure was a politician and head of government.',
      'She was the first and only female Prime Minister of India, serving for a total of fifteen years across two terms.',
      'This Indian leader led her country to victory in the 1971 war that created Bangladesh and was assassinated by her own bodyguards in 1984.'
    ]
  },
  {
    name: 'Pelé',
    acceptable_names: ['pele', 'pelé', 'edson arantes do nascimento'],
    birth_lat: -20.7333, birth_lon: -46.6167, birth_year: 1940,
    death_lat: -23.5505, death_lon: -46.6333, death_year: 2022,
    hints: [
      'This figure was a footballer.',
      'He is the only player in history to win three FIFA World Cup titles, doing so in 1958, 1962, and 1970.',
      'This Brazilian striker is widely regarded as the greatest footballer of all time and began his international career as a teenager at the 1958 World Cup.'
    ]
  },
  {
    name: 'Marcel Proust',
    acceptable_names: ['marcel proust', 'proust'],
    birth_lat: 48.8068, birth_lon: 2.2381, birth_year: 1871,
    death_lat: 48.8566, death_lon: 2.3522, death_year: 1922,
    hints: [
      'This figure was a novelist and critic.',
      'He spent his later years in a cork-lined bedroom, writing in bed to avoid noise and allergens, producing one of the longest novels in world literature.',
      'This early 20th-century French author\'s masterwork, In Search of Lost Time, spans seven volumes and explores memory, time, and society in Belle Époque Paris.'
    ]
  },
  {
    name: 'Simone de Beauvoir',
    acceptable_names: ['simone de beauvoir', 'beauvoir', 'de beauvoir'],
    birth_lat: 48.8566, birth_lon: 2.3522, birth_year: 1908,
    death_lat: 48.8566, death_lon: 2.3522, death_year: 1986,
    hints: [
      'This figure was a philosopher, novelist, and feminist theorist.',
      'She had a lifelong intellectual and romantic partnership with Jean-Paul Sartre and was a leading voice of French existentialism.',
      'This 20th-century French thinker authored The Second Sex, a landmark work of feminist philosophy, and is buried alongside Sartre in Paris.'
    ]
  },
  {
    name: 'Joseph Stalin',
    acceptable_names: ['joseph stalin', 'stalin', 'iosif dzhugashvili'],
    birth_lat: 42.2679, birth_lon: 41.6429, birth_year: 1878,
    death_lat: 55.7558, death_lon: 37.6176, death_year: 1953,
    hints: [
      'This figure was a communist dictator.',
      'He led the Soviet Union through World War II and oversaw rapid industrialisation, but his rule was marked by purges and a vast system of forced labour camps.',
      'This Georgian-born leader rose from poverty to become the unchallenged ruler of the USSR for nearly three decades, at a human cost estimated in the millions.'
    ]
  },
  {
    name: 'Marlene Dietrich',
    acceptable_names: ['marlene dietrich', 'dietrich'],
    birth_lat: 52.5200, birth_lon: 13.4050, birth_year: 1901,
    death_lat: 48.8566, death_lon: 2.3522, death_year: 1992,
    hints: [
      'This figure was an actress and singer.',
      'She became an international superstar in the 1930s, famous for her androgynous glamour and smoky cabaret style.',
      'This German-born entertainer renounced her homeland, became an American citizen, and performed for Allied troops during World War II; she spent her final years as a recluse in Paris.'
    ]
  },
  {
    name: 'Gabriel García Márquez',
    acceptable_names: ['gabriel garcia marquez', 'garcia marquez', 'gabo', 'gabriel garcía márquez'],
    birth_lat: 10.4619, birth_lon: -74.1943, birth_year: 1927,
    death_lat: 19.4326, death_lon: -99.1332, death_year: 2014,
    hints: [
      'This figure was a novelist and journalist.',
      'He pioneered magical realism in Latin American literature and won the Nobel Prize in Literature in 1982.',
      'This Colombian author\'s novel One Hundred Years of Solitude sold over 50 million copies and has been translated into dozens of languages.'
    ]
  },
  {
    name: 'Diego Maradona',
    acceptable_names: ['diego maradona', 'maradona', 'diego armando maradona'],
    birth_lat: -34.6037, birth_lon: -58.3816, birth_year: 1960,
    death_lat: -34.5333, death_lon: -58.7167, death_year: 2020,
    hints: [
      'This figure was a footballer.',
      'He led Argentina to World Cup glory in 1986 with a tournament performance widely considered the greatest in football history, including the infamous "Hand of God" goal against England.',
      'This Argentine attacking midfielder also transformed an Italian club into a dominant force, winning two league titles with them in the late 1980s.'
    ]
  },
  {
    name: 'Ayatollah Khomeini',
    acceptable_names: ['ayatollah khomeini', 'khomeini', 'ruhollah khomeini'],
    birth_lat: 34.0917, birth_lon: 49.7014, birth_year: 1902,
    death_lat: 35.6892, death_lon: 51.3890, death_year: 1989,
    hints: [
      'This figure was a Shia cleric and revolutionary political leader.',
      'He spent 14 years in exile before returning to lead the 1979 revolution that overthrew a monarchy and established a theocratic republic.',
      'This Iranian religious leader became the founding Supreme Leader of the Islamic Republic of Iran and remained its highest authority until his death in 1989.'
    ]
  },
  {
    name: 'Mikhail Gorbachev',
    acceptable_names: ['mikhail gorbachev', 'gorbachev'],
    birth_lat: 45.7522, birth_lon: 43.0125, birth_year: 1931,
    death_lat: 55.7558, death_lon: 37.6176, death_year: 2022,
    hints: [
      'This figure was a communist politician and Soviet leader.',
      'His reforms of openness and restructuring in the late 1980s loosened the grip of the Soviet state and ultimately led to the dissolution of the USSR.',
      'This last leader of the Soviet Union was awarded the Nobel Peace Prize in 1990 for his role in ending the Cold War.'
    ]
  },
  {
    name: 'Louis Armstrong',
    acceptable_names: ['louis armstrong', 'armstrong', 'satchmo'],
    birth_lat: 29.9511, birth_lon: -90.0715, birth_year: 1901,
    death_lat: 40.7128, death_lon: -74.0060, death_year: 1971,
    hints: [
      'This figure was a jazz trumpeter and singer.',
      'His recordings in the 1920s with his Hot Five and Hot Seven ensembles are considered foundational works of jazz.',
      'This New Orleans-born musician is widely regarded as the most influential figure in jazz history and spent decades as a beloved global ambassador for American music.'
    ]
  },
  {
    name: 'Josephine Baker',
    acceptable_names: ['josephine baker', 'baker', 'freda josephine mcdonald'],
    birth_lat: 38.6270, birth_lon: -90.1994, birth_year: 1906,
    death_lat: 48.8566, death_lon: 2.3522, death_year: 1975,
    hints: [
      'This figure was an entertainer, dancer, and activist.',
      'She became the most celebrated Black performer in Europe in the 1920s and 1930s, and later worked as a spy for the French Resistance during World War II.',
      'This Missouri-born entertainer renounced her American citizenship, became a French national, and was a prominent civil rights activist who refused to perform before segregated audiences.'
    ]
  },
  {
    name: 'Rainer Maria Rilke',
    acceptable_names: ['rainer maria rilke', 'rilke'],
    birth_lat: 50.0880, birth_lon: 14.4208, birth_year: 1875,
    death_lat: 46.1060, death_lon: 7.1000, death_year: 1926,
    hints: [
      'This figure was a poet.',
      'He lived as a nomad across Europe — Russia, Paris, Spain, and Switzerland — relying on aristocratic patrons for support.',
      'This early 20th-century German-language poet, born in Prague, is celebrated for his Duino Elegies and Letters to a Young Poet, considered pinnacles of lyric poetry.'
    ]
  },
  {
    name: 'Igor Stravinsky',
    acceptable_names: ['igor stravinsky', 'stravinsky'],
    birth_lat: 59.9311, birth_lon: 29.1283, birth_year: 1882,
    death_lat: 40.7128, death_lon: -74.0060, death_year: 1971,
    hints: [
      'This figure was a composer and conductor.',
      'His ballet score The Rite of Spring caused a riot at its Paris premiere in 1913 and is considered one of the most influential works in Western music history.',
      'This Russian-born composer lived successively in Switzerland, France, and the United States, and was buried in Venice at his own request.'
    ]
  },
  {
    name: 'Pablo Neruda',
    acceptable_names: ['pablo neruda', 'neruda', 'neftali reyes basoalto'],
    birth_lat: -36.0100, birth_lon: -72.0000, birth_year: 1904,
    death_lat: -33.4489, death_lon: -70.6693, death_year: 1973,
    hints: [
      'This figure was a poet and diplomat.',
      'He won the Nobel Prize in Literature in 1971 and is celebrated for passionate love poems as well as politically charged verse.',
      'This Chilean poet served as a diplomat and senator, and died just days after the 1973 military coup that ended democracy in his country.'
    ]
  },
  // Ancient history
  {
    name: 'Julius Caesar',
    acceptable_names: ['julius caesar', 'caesar', 'gaius julius caesar'],
    birth_lat: 41.8967, birth_lon: 12.4822, birth_year: -100,
    death_lat: 41.8967, death_lon: 12.4822, death_year: -44,
    hints: [
      'This figure was a Roman general and statesman.',
      'He conquered Gaul and crossed the Rubicon river with his army, triggering a civil war that ended the Roman Republic.',
      'This 1st-century BC Roman leader reformed the calendar and was assassinated on the Ides of March by a group of senators, including his ally Brutus.'
    ]
  },
  {
    name: 'Cleopatra',
    acceptable_names: ['cleopatra', 'cleopatra vii', 'cleopatra philopator'],
    birth_lat: 31.2001, birth_lon: 29.9187, birth_year: -69,
    death_lat: 31.2001, death_lon: 29.9187, death_year: -30,
    hints: [
      'This figure was a queen and ruler.',
      'The last active ruler of ancient Egypt, she was the first in her dynasty to learn the Egyptian language and formed alliances with the two most powerful Romans of her era.',
      'This 1st-century BC Egyptian queen had relationships with Julius Caesar and Mark Antony, and took her own life after her forces were defeated by Octavian.'
    ]
  },
  {
    name: 'Socrates',
    acceptable_names: ['socrates'],
    birth_lat: 37.9838, birth_lon: 23.7275, birth_year: -470,
    death_lat: 37.9838, death_lon: 23.7275, death_year: -399,
    hints: [
      'This figure was a philosopher.',
      'He developed a method of inquiry through questioning that became the foundation of Western philosophy, yet he wrote nothing himself — all we know of him comes through his students.',
      'This ancient Athenian thinker was tried for impiety and corrupting the youth of his city, sentenced to death, and died by drinking hemlock.'
    ]
  },
  {
    name: 'Archimedes',
    acceptable_names: ['archimedes'],
    birth_lat: 37.0755, birth_lon: 15.2866, birth_year: -287,
    death_lat: 37.0755, death_lon: 15.2866, death_year: -212,
    hints: [
      'This figure was a mathematician, physicist, and inventor.',
      'He is considered the greatest mathematician of antiquity, credited with discovering the principle of buoyancy and developing early methods of calculating areas and volumes.',
      'This ancient Greek scholar lived in Syracuse, Sicily, and was killed by a Roman soldier during the city\'s siege despite orders to spare him.'
    ]
  },
  {
    name: 'Attila the Hun',
    acceptable_names: ['attila the hun', 'attila'],
    birth_lat: 47.1625, birth_lon: 19.5033, birth_year: 406,
    death_lat: 47.1625, death_lon: 19.5033, death_year: 453,
    hints: [
      'This figure was a nomadic ruler and conqueror.',
      'Called the "Scourge of God," he led devastating raids across both halves of the Roman Empire, extracting vast tribute payments.',
      'This 5th-century ruler of a steppe empire came within striking distance of both Rome and Constantinople, and died suddenly on his wedding night — likely from a hemorrhage.'
    ]
  },
  // Renaissance
  {
    name: 'Michelangelo',
    acceptable_names: ['michelangelo', 'michelangelo buonarroti'],
    birth_lat: 43.6567, birth_lon: 11.9847, birth_year: 1475,
    death_lat: 41.8967, death_lon: 12.4822, death_year: 1564,
    hints: [
      'This figure was a sculptor, painter, and architect.',
      'He spent four years painting the ceiling of the Sistine Chapel and his marble sculptures are considered among the greatest works of art ever created.',
      'This Italian Renaissance master carved David and the Pieta, designed the dome of St. Peter\'s Basilica, and lived to the remarkable age of 88.'
    ]
  },
  {
    name: 'Nicolaus Copernicus',
    acceptable_names: ['nicolaus copernicus', 'copernicus', 'mikolaj kopernik'],
    birth_lat: 53.0138, birth_lon: 18.5981, birth_year: 1473,
    death_lat: 54.3520, death_lon: 20.6143, death_year: 1543,
    hints: [
      'This figure was an astronomer and mathematician.',
      'He proposed the heliocentric model of the solar system, placing the Sun rather than the Earth at its centre — a revolutionary idea he developed while working as a church canon.',
      'This 15th–16th century Polish scholar\'s landmark astronomical manuscript was published in the year of his death, launching the scientific revolution.'
    ]
  },
  {
    name: 'Galileo Galilei',
    acceptable_names: ['galileo galilei', 'galileo'],
    birth_lat: 43.7228, birth_lon: 10.4017, birth_year: 1564,
    death_lat: 43.7606, death_lon: 11.2558, death_year: 1642,
    hints: [
      'This figure was an astronomer, physicist, and mathematician.',
      'He improved the telescope and used it to make observations — moons orbiting Jupiter, phases of Venus — that confirmed the heliocentric model of the solar system.',
      'This Italian scientist was forced by the Inquisition to recant his findings and spent his final years under house arrest near Florence, dying blind in 1642.'
    ]
  },
  {
    name: 'Raphael',
    acceptable_names: ['raphael', 'raffaello sanzio', 'raffaello'],
    birth_lat: 43.7270, birth_lon: 12.6362, birth_year: 1483,
    death_lat: 41.8967, death_lon: 12.4822, death_year: 1520,
    hints: [
      'This figure was a painter and architect.',
      'He is celebrated for the grace and clarity of his Madonnas and for the Vatican fresco The School of Athens, painted for Pope Julius II.',
      'This Italian High Renaissance master died on his 37th birthday and was buried in the Pantheon in Rome — a rare honour for an artist of his era.'
    ]
  },
  {
    name: 'Erasmus of Rotterdam',
    acceptable_names: ['erasmus', 'erasmus of rotterdam', 'desiderius erasmus'],
    birth_lat: 51.9225, birth_lon: 4.4792, birth_year: 1469,
    death_lat: 47.5596, death_lon: 7.5886, death_year: 1536,
    hints: [
      'This figure was a humanist scholar and theologian.',
      'The greatest intellectual of the Northern Renaissance, he was a sharp critic of Church corruption who nevertheless refused to break with Rome during the Reformation.',
      'This Dutch scholar\'s satirical work In Praise of Folly became the Renaissance\'s bestselling book; he spent his life wandering between England, France, Italy, and Switzerland.'
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
