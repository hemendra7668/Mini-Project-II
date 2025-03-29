import React, { useState, useEffect } from 'react';
import Header from "./components/Header.jsx";
import './App.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTheme, setActiveTheme] = useState('Discover');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTermOrigin, setSearchTermOrigin] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [filteredNames, setFilteredNames] = useState([]);
  const [genderFilter, setGenderFilter] = useState('all');
  const [selectedName, setSelectedName] = useState(null);
  // Add a state to track if Discover is populated
  const [isDiscoverPopulated, setIsDiscoverPopulated] = useState(false);
  
  // Extended list of baby names organized by themes with gender added
  const [allNames, setAllNames] = useState({
    Celestial: [
      {
        name: "Aurora",
        pronunciation: "uh-ROAR-uh",
        meaning: "Dawn, Goddess of the Morning",
        origin: "Latin",
        gender: "female",
        popularity: "Rising in popularity since 2010",
        personalities: "Creative, imaginative, and free-spirited",
        variants: "Aurore (French), Aarushi (Hindi)"
      },
      {
        name: "Stella",
        pronunciation: "STELL-ah",
        meaning: "Star",
        origin: "Latin",
        gender: "female",
        popularity: "Classic name with steady popularity",
        personalities: "Bright, ambitious, and determined",
        variants: "Estelle (French), Estrella (Spanish)"
      },
      {
        name: "Luna",
        pronunciation: "LOO-nah",
        meaning: "Moon",
        origin: "Latin",
        gender: "female",
        popularity: "Very popular in recent years",
        personalities: "Intuitive, mysterious, and thoughtful",
        variants: "Selene (Greek), Chandra (Sanskrit)"
      },
      {
        name: "Sitara",
        pronunciation: "si-TAA-ra",
        meaning: "Star",
        origin: "Hindi/Persian",
        gender: "female",
        popularity: "Uncommon in Western countries",
        personalities: "Bright, optimistic, and cheerful",
        variants: "Tara, Starla"
      },
      {
        name: "Aakash",
        pronunciation: "AA-kaash",
        meaning: "Sky",
        origin: "Sanskrit",
        gender: "male",
        popularity: "Common in India, less common elsewhere",
        personalities: "Expansive thinking, visionary, and open-minded",
        variants: "Akash, Akasha"
      },
      {
        name: "Tara",
        pronunciation: "TAA-ra",
        meaning: "Star",
        origin: "Sanskrit",
        gender: "female",
        popularity: "Classic name with steady popularity",
        personalities: "Bright, guiding, and steadfast",
        variants: "Thara, Sitara"
      },
      {
        name: "Phoenix",
        pronunciation: "FEE-niks",
        meaning: "Mythical bird reborn from ashes",
        origin: "Greek",
        gender: "unisex",
        popularity: "Increasingly popular as a unisex name",
        personalities: "Resilient, transformative, and powerful",
        variants: "Fenix, Phenix"
      },
      {
        name: "Diya",
        pronunciation: "DEE-ya",
        meaning: "Light, lamp",
        origin: "Hindi",
        gender: "female",
        popularity: "Popular in South Asian communities",
        personalities: "Bright, illuminating, and warm",
        variants: "Deepa, Deepika"
      },
      {
        name: "Nakshatra",
        pronunciation: "nuk-SHA-tra",
        meaning: "Constellation",
        origin: "Sanskrit",
        gender: "female",
        popularity: "Rare outside of India",
        personalities: "Spiritual, complex, and multi-faceted",
        variants: "Tara, Naksha"
      },
    ],
    Royal: [
      {
        name: "Reign",
        pronunciation: "RAYN",
        meaning: "To rule, sovereign power",
        origin: "English",
        gender: "unisex",
        popularity: "Modern name gaining popularity",
        personalities: "Commanding, confident, and authoritative",
        variants: "Rain, Rayne"
      },
      {
        name: "Raj",
        pronunciation: "RAAJ",
        meaning: "King, ruler",
        origin: "Hindi/Sanskrit",
        gender: "male",
        popularity: "Common in India, recognized globally",
        personalities: "Leadership qualities, dignified, and responsible",
        variants: "Raja, Rajesh"
      },
      {
        name: "Duke",
        pronunciation: "DOOK",
        meaning: "Leader, commander",
        origin: "Latin",
        gender: "male",
        popularity: "Uncommon as a first name",
        personalities: "Noble, distinguished, and confident",
        variants: "Dux, Duc"
      },
      {
        name: "Victoria",
        pronunciation: "vik-TOR-ee-ah",
        meaning: "Victory, conqueror",
        origin: "Latin",
        gender: "female",
        popularity: "Classic name with steady popularity",
        personalities: "Victorious, dignified, and determined",
        variants: "Vittoria (Italian), Viktoria (German)"
      },
      {
        name: "Rajiv",
        pronunciation: "RAA-jeev",
        meaning: "Striped, lotus",
        origin: "Sanskrit",
        gender: "male",
        popularity: "Common in India, less common elsewhere",
        personalities: "Gentle, intelligent, and adaptable",
        variants: "Rajeev, Rajieve"
      },
      {
        name: "Prince",
        pronunciation: "PRINS",
        meaning: "Royal son, sovereign",
        origin: "Latin",
        gender: "male",
        popularity: "Uncommon but recognized",
        personalities: "Charismatic, confident, and distinguished",
        variants: "Princeton, Prinz (German)"
      },
      {
        name: "Elizabeth",
        pronunciation: "ee-LIZ-uh-beth",
        meaning: "Pledged to God",
        origin: "Hebrew",
        gender: "female",
        popularity: "Classic name with enduring popularity",
        personalities: "Dignified, reliable, and intelligent",
        variants: "Eliza, Beth, Lizzie, Isabella"
      },
      {
        name: "Pradeep",
        pronunciation: "pruh-DEEP",
        meaning: "Light, lamp",
        origin: "Hindi",
        gender: "male",
        popularity: "Common in India, less common elsewhere",
        personalities: "Bright, guiding, and insightful",
        variants: "Pradip, Pradeesh"
      },
      {
        name: "Hemendra",
        pronunciation: "hem-EN-dra",
        meaning: "Lord of gold",
        origin: "Hindi/Sanskrit",
        gender: "male",
        popularity: "Uncommon outside of India",
        personalities: "Valuable, prosperous, and dignified",
        variants: "Heminder, Hemendra"
      },
    ],
    Mythical: [
      {
        name: "Athena",
        pronunciation: "uh-THEE-nuh",
        meaning: "Goddess of wisdom and war",
        origin: "Greek",
        gender: "female",
        popularity: "Increasing in popularity",
        personalities: "Wise, strategic, and courageous",
        variants: "Athene, Minerva (Roman equivalent)"
      },
      {
        name: "Thor",
        pronunciation: "THOR",
        meaning: "God of thunder",
        origin: "Norse",
        gender: "male",
        popularity: "Gained popularity due to Marvel character",
        personalities: "Strong, protective, and powerful",
        variants: "Tor, Thorin"
      },
      {
        name: "Persephone",
        pronunciation: "per-SEF-uh-nee",
        meaning: "Bringer of destruction",
        origin: "Greek",
        gender: "female",
        popularity: "Uncommon but recognizable",
        personalities: "Mysterious, transformative, and resilient",
        variants: "Persie, Seph, Sephy"
      },
      {
        name: "Apollo",
        pronunciation: "uh-POL-oh",
        meaning: "God of light, music, and healing",
        origin: "Greek",
        gender: "male",
        popularity: "Uncommon but increasing",
        personalities: "Creative, healing, and bright",
        variants: "Apolo, Apollon"
      },
      {
        name: "Freya",
        pronunciation: "FRAY-uh",
        meaning: "Goddess of love and beauty",
        origin: "Norse",
        gender: "female",
        popularity: "Popular in Scandinavian countries, rising elsewhere",
        personalities: "Loving, beautiful, and passionate",
        variants: "Freyja, Freja, Freia"
      },
      {
        name: "Odin",
        pronunciation: "OH-din",
        meaning: "God of wisdom, poetry, and war",
        origin: "Norse",
        gender: "male",
        popularity: "Uncommon but recognizable",
        personalities: "Wise, poetic, and strategic",
        variants: "Wodan, Woden"
      },
      {
        name: "Artemis",
        pronunciation: "AR-tuh-miss",
        meaning: "Goddess of the hunt and moon",
        origin: "Greek",
        gender: "female",
        popularity: "Uncommon but rising",
        personalities: "Independent, strong, and protective",
        variants: "Diana (Roman equivalent)"
      },
    ],
    Hindi: [
      {
        name: "Nisha",
        pronunciation: "NEE-sha",
        meaning: "Night",
        origin: "Hindi/Sanskrit",
        gender: "female",
        popularity: "Common in India, recognizable elsewhere",
        personalities: "Mysterious, calm, and thoughtful",
        variants: "Nishita, Nishi"
      },
      {
        name: "Mehak",
        pronunciation: "meh-HUCK",
        meaning: "Fragrance",
        origin: "Hindi/Urdu",
        gender: "female",
        popularity: "Common in South Asia, uncommon elsewhere",
        personalities: "Sweet, pleasant, and memorable",
        variants: "Mahak, Mehek"
      },
      {
        name: "Hemendra",
        pronunciation: "hem-EN-dra",
        meaning: "Lord of gold",
        origin: "Hindi/Sanskrit",
        gender: "male",
        popularity: "Uncommon outside of India",
        personalities: "Valuable, prosperous, and dignified",
        variants: "Heminder, Hemchandra"
      },
      {
        name: "Pradeep",
        pronunciation: "pruh-DEEP",
        meaning: "Light, lamp",
        origin: "Hindi",
        gender: "male",
        popularity: "Common in India, less common elsewhere",
        personalities: "Bright, guiding, and insightful",
        variants: "Pradip, Pradeesh"
      },
      {
        name: "Priyanshu",
        pronunciation: "pree-YAN-shoo",
        meaning: "Ray of love",
        origin: "Hindi/Sanskrit",
        gender: "male",
        popularity: "Modern name popular in India",
        personalities: "Loving, warm, and affectionate",
        variants: "Priyansh, Priyanshu"
      },
      {
        name: "Harshit",
        pronunciation: "HUR-shih-t",
        meaning: "Filled with happiness, joy",
        origin: "Hindi/Sanskrit",
        gender: "male",
        popularity: "Common in India, uncommon elsewhere",
        personalities: "Joyful, happy, and positive",
        variants: "Harsha, Harsh"
      },
      {
        name: "Diya",
        pronunciation: "DEE-ya",
        meaning: "Light, lamp",
        origin: "Hindi",
        gender: "female",
        popularity: "Popular in South Asian communities",
        personalities: "Bright, illuminating, and warm",
        variants: "Deepa, Deepika"
      },
      {
        name: "Sitara",
        pronunciation: "si-TAA-ra",
        meaning: "Star",
        origin: "Hindi/Persian",
        gender: "female",
        popularity: "Uncommon in Western countries",
        personalities: "Bright, optimistic, and cheerful",
        variants: "Tara, Starla"
      },
      {
        name: "Tara",
        pronunciation: "TAA-ra",
        meaning: "Star",
        origin: "Sanskrit",
        gender: "female",
        popularity: "Classic name with steady popularity",
        personalities: "Bright, guiding, and steadfast",
        variants: "Thara, Sitara"
      },
    ],
    Discover: [] // This will be populated with names from all categories
  });
  
  // Filter names function - reference this in useEffect and when needed
  const filterNames = () => {
    try {
      if (!allNames[activeTheme] || allNames[activeTheme].length === 0) {
        console.log("No names found for theme:", activeTheme);
        setFilteredNames([]);
        return;
      }
      
      const term = searchTerm.toLowerCase().trim();
      const originTerm = searchTermOrigin.toLowerCase().trim();
      
      let filtered = allNames[activeTheme];
      
      // Filter by gender if not set to 'all'
      if (genderFilter !== 'all') {
        filtered = filtered.filter(nameObj => nameObj.gender === genderFilter);
      }
      
      // Filter by name search term
      if (term !== '') {
        filtered = filtered.filter(nameObj => {
          return (
            nameObj.name.toLowerCase().includes(term) ||
            (nameObj.meaning && nameObj.meaning.toLowerCase().includes(term))
          );
        });
      }
      
      // Filter by origin search term
      if (originTerm !== '') {
        filtered = filtered.filter(nameObj => {
          return (
            (nameObj.origin && nameObj.origin.toLowerCase().includes(originTerm)) ||
            (nameObj.pronunciation && nameObj.pronunciation.toLowerCase().includes(originTerm))
          );
        });
      }
      
      console.log(`Filtered names for ${activeTheme}: found ${filtered.length} results`);
      setFilteredNames(filtered);
    } catch (error) {
      console.error("Error filtering names:", error);
      setFilteredNames([]);
    }
  };
  
  // Populate the Discover category with all unique names - only once on component mount
  useEffect(() => {
    try {
      // Create a copy of the current state
      const namesCopy = {...allNames};
      
      // Create a Set to track unique names (avoids duplicates)
      const uniqueNames = new Set();
      const discoverNames = [];
      
      // Process all categories
      Object.keys(namesCopy).forEach(category => {
        if (category !== 'Discover') { // Skip the Discover category
          namesCopy[category].forEach(nameObj => {
            // Only add if not already in our set
            if (!uniqueNames.has(nameObj.name)) {
              uniqueNames.add(nameObj.name);
              discoverNames.push({...nameObj}); // Create a new object to avoid reference issues
            }
          });
        }
      });
      
      // Update the allNames object with the populated Discover array
      namesCopy.Discover = discoverNames;
      setAllNames(namesCopy);
      setIsDiscoverPopulated(true);
      
      // Initial filtering to show all names in the active category
      if (activeTheme === 'Discover') {
        setFilteredNames(discoverNames);
      } else {
        setFilteredNames(namesCopy[activeTheme] || []);
      }
    } catch (error) {
      console.error("Error initializing names:", error);
    }
  }, []); // Empty dependency array means this runs once on mount
  
  // Update filtered names whenever relevant state changes
  useEffect(() => {
    if (isDiscoverPopulated) {
      filterNames();
    }
  }, [searchTerm, searchTermOrigin, genderFilter, activeTheme, isDiscoverPopulated]);
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  
  const toggleFavorite = (name) => {
    if (favorites.includes(name)) {
      setFavorites(favorites.filter(fav => fav !== name));
    } else {
      setFavorites([...favorites, name]);
    }
  };
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const handleOriginSearchChange = (e) => {
    setSearchTermOrigin(e.target.value);
  };
  
  const handleThemeChange = (theme) => {
    setActiveTheme(theme);
    setSelectedName(null); // Clear selected name when changing themes
  };
  
  const handleGenderFilterChange = (gender) => {
    setGenderFilter(gender);
  };
  
  const handleNameClick = (nameObj) => {
    setSelectedName(nameObj);
  };
  
  const closeNameDetails = () => {
    setSelectedName(null);
  };
  
  // Debug - log the current state
  useEffect(() => {
    console.log("Current theme:", activeTheme);
    console.log("Filtered names count:", filteredNames.length);
    console.log("Is Discover populated:", isDiscoverPopulated);
    console.log("Discover category size:", allNames.Discover ? allNames.Discover.length : 0);
  }, [activeTheme, filteredNames, isDiscoverPopulated, allNames.Discover]);
  
  return (
    <div className={`app-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <main className="main-content">
        <Header 
          isDarkMode={isDarkMode} 
          toggleDarkMode={toggleDarkMode} 
          activeTheme={activeTheme} 
        />

        <div className="theme-selection">
          {['Discover', 'Celestial', 'Royal', 'Mythical', 'Hindi'].map((theme) => (
            <button 
              key={theme}
              className={`theme-button ${activeTheme === theme ? 'active' : ''}`}
              onClick={() => handleThemeChange(theme)}
              aria-pressed={activeTheme === theme}
            >
              {theme}
            </button>
          ))}
        </div>

        <div className="search-container">
          <div className="search-wrapper">
            <div className="search-main">
              <input 
                type="text" 
                className="search-input" 
                placeholder="Search by name or meaning..." 
                aria-label="Search names or meanings"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            
            <div className="search-secondary">
              <input 
                type="text" 
                className="search-input" 
                placeholder="Search by origin..." 
                aria-label="Search origins"
                value={searchTermOrigin}
                onChange={handleOriginSearchChange}
              />
            </div>
          </div>
          
          <div className="gender-filter">
            <span className="filter-label">Filter by: </span>
            <div className="filter-buttons">
              <button 
                className={`gender-button ${genderFilter === 'all' ? 'active' : ''}`}
                onClick={() => handleGenderFilterChange('all')}
                aria-pressed={genderFilter === 'all'}
              >
                All
              </button>
              <button 
                className={`gender-button ${genderFilter === 'female' ? 'active' : ''}`}
                onClick={() => handleGenderFilterChange('female')}
                aria-pressed={genderFilter === 'female'}
              >
                Girls
              </button>
              <button 
                className={`gender-button ${genderFilter === 'male' ? 'active' : ''}`}
                onClick={() => handleGenderFilterChange('male')}
                aria-pressed={genderFilter === 'male'}
              >
                Boys
              </button>
              <button 
                className={`gender-button ${genderFilter === 'unisex' ? 'active' : ''}`}
                onClick={() => handleGenderFilterChange('unisex')}
                aria-pressed={genderFilter === 'unisex'}
              >
                Unisex
              </button>
            </div>
          </div>
        </div>

        <div className="name-cards-container">
          {filteredNames.length > 0 ? (
            filteredNames.map((nameObj, index) => (
              <div 
                className={`name-card ${nameObj.gender}`} 
                key={index}
                onClick={() => handleNameClick(nameObj)}
              >
                <div className="name-header">
                  <h2 className="name-title">
                    {nameObj.name} <span className="star-icon">✨</span>
                  </h2>
                  <button 
                    className="favorite-button" 
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent card click
                      toggleFavorite(nameObj.name);
                    }}
                    aria-label={favorites.includes(nameObj.name) ? "Remove from favorites" : "Add to favorites"}
                    aria-pressed={favorites.includes(nameObj.name)}
                  >
                    {favorites.includes(nameObj.name) ? '♥' : '♡'}
                  </button>
                </div>

                <div className="name-details">
                  <div className="name-detail">
                    <span className="detail-icon" aria-hidden="true">🔊</span>
                    <span className="detail-text">{nameObj.pronunciation}</span>
                  </div>
                  <div className="name-detail">
                    <span className="detail-icon" aria-hidden="true">📚</span>
                    <span className="detail-text">{nameObj.meaning}</span>
                  </div>
                  <div className="name-detail">
                    <span className="detail-icon" aria-hidden="true">🌐</span>
                    <span className="detail-text">{nameObj.origin}</span>
                  </div>
                  <div className="name-detail gender-detail">
                    <span className="detail-icon" aria-hidden="true">
                      {nameObj.gender === 'female' ? '👧' : nameObj.gender === 'male' ? '👦' : '🧒'}
                    </span>
                    <span className="detail-text">
                      {nameObj.gender === 'female' ? 'Girl' : nameObj.gender === 'male' ? 'Boy' : 'Unisex'}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <p>No names found matching your search criteria. Try different search terms or filters.</p>
            </div>
          )}
        </div>
        
        {/* Modal for detailed name view */}
        {selectedName && (
          <div className="name-modal-overlay" onClick={closeNameDetails}>
            <div className="name-modal" onClick={(e) => e.stopPropagation()}>
              <button className="close-modal" onClick={closeNameDetails}>×</button>
              
              <div className="modal-header">
                <h2 className="modal-title">{selectedName.name}</h2>
                <span className={`gender-tag ${selectedName.gender}`}>
                  {selectedName.gender === 'female' ? 'Girl' : selectedName.gender === 'male' ? 'Boy' : 'Unisex'}
                </span>
              </div>
              
              <div className="modal-content">
                <div className="detail-section">
                  <h3>Pronunciation</h3>
                  <p><span className="detail-icon">🔊</span> {selectedName.pronunciation}</p>
                </div>
                
                <div className="detail-section">
                  <h3>Meaning</h3>
                  <p><span className="detail-icon">📚</span> {selectedName.meaning}</p>
                </div>
                
                <div className="detail-section">
                  <h3>Origin</h3>
                  <p><span className="detail-icon">🌐</span> {selectedName.origin}</p>
                </div>
                
                <div className="detail-section">
                  <h3>Popularity</h3>
                  <p><span className="detail-icon">📊</span> {selectedName.popularity}</p>
                </div>
                
                <div className="detail-section">
                  <h3>Personality Traits</h3>
                  <p><span className="detail-icon">✨</span> {selectedName.personalities}</p>
                </div>
                
                <div className="detail-section">
                  <h3>Variants</h3>
                  <p><span className="detail-icon">🔄</span> {selectedName.variants}</p>
                </div>
              </div>
              
              <div className="modal-footer">
                <button 
                  className={`favorite-button-large ${favorites.includes(selectedName.name) ? 'active' : ''}`}
                  onClick={() => toggleFavorite(selectedName.name)}
                >
                  {favorites.includes(selectedName.name) 
                    ? 'Remove from Favorites ♥' 
                    : 'Add to Favorites ♡'}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;