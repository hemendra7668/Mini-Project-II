import React, { useState, useEffect } from 'react';
import Header from "./components/Header.jsx";
import './App.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTheme, setActiveTheme] = useState('Discover');
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [filteredNames, setFilteredNames] = useState([]);
  
  // Extended list of baby names organized by themes
  const allNames = {
    Celestial: [
      {
        name: "Aurora",
        pronunciation: "uh-ROAR-uh",
        meaning: "Dawn, Goddess of the Morning",
        origin: "Latin"
      },
      {
        name: "Stella",
        pronunciation: "STELL-ah",
        meaning: "Star",
        origin: "Latin"
      },
      {
        name: "Luna",
        pronunciation: "LOO-nah",
        meaning: "Moon",
        origin: "Latin"
      },
      {
        name: "Sitara",
        pronunciation: "si-TAA-ra",
        meaning: "Star",
        origin: "Hindi/Persian"
      },
      {
        name: "Aakash",
        pronunciation: "AA-kaash",
        meaning: "Sky",
        origin: "Sanskrit"
      },
      {
        name: "Tara",
        pronunciation: "TAA-ra",
        meaning: "Star",
        origin: "Sanskrit"
      },
      {
        name: "Phoenix",
        pronunciation: "FEE-niks",
        meaning: "Mythical bird reborn from ashes",
        origin: "Greek"
      },
      {
        name: "Diya",
        pronunciation: "DEE-ya",
        meaning: "Light, lamp",
        origin: "Hindi"
      },
      {
        name: "Nakshatra",
        pronunciation: "nuk-SHA-tra",
        meaning: "Constellation",
        origin: "Sanskrit"
      },
    ],
    Royal: [
      {
        name: "Reign",
        pronunciation: "RAYN",
        meaning: "To rule, sovereign power",
        origin: "English"
      },
      {
        name: "Raj",
        pronunciation: "RAAJ",
        meaning: "King, ruler",
        origin: "Hindi/Sanskrit"
      },
      {
        name: "Duke",
        pronunciation: "DOOK",
        meaning: "Leader, commander",
        origin: "Latin"
      },
      {
        name: "Victoria",
        pronunciation: "vik-TOR-ee-ah",
        meaning: "Victory, conqueror",
        origin: "Latin"
      },
      {
        name: "Rajiv",
        pronunciation: "RAA-jeev",
        meaning: "Striped, lotus",
        origin: "Sanskrit"
      },
      {
        name: "Prince",
        pronunciation: "PRINS",
        meaning: "Royal son, sovereign",
        origin: "Latin"
      },
      {
        name: "Elizabeth",
        pronunciation: "ee-LIZ-uh-beth",
        meaning: "Pledged to God",
        origin: "Hebrew"
      },
      {
        name: "Pradeep",
        pronunciation: "pruh-DEEP",
        meaning: "Light, lamp",
        origin: "Hindi"
      },
      {
        name: "Hemendra",
        pronunciation: "hem-EN-dra",
        meaning: "Lord of gold",
        origin: "Hindi/Sanskrit"
      },
    ],
    Mythical: [
      {
        name: "Athena",
        pronunciation: "uh-THEE-nuh",
        meaning: "Goddess of wisdom and war",
        origin: "Greek"
      },
      {
        name: "Thor",
        pronunciation: "THOR",
        meaning: "God of thunder",
        origin: "Norse"
      },
      {
        name: "Persephone",
        pronunciation: "per-SEF-uh-nee",
        meaning: "Bringer of destruction",
        origin: "Greek"
      },
      {
        name: "Apollo",
        pronunciation: "uh-POL-oh",
        meaning: "God of light, music, and healing",
        origin: "Greek"
      },
      {
        name: "Freya",
        pronunciation: "FRAY-uh",
        meaning: "Goddess of love and beauty",
        origin: "Norse"
      },
      {
        name: "Odin",
        pronunciation: "OH-din",
        meaning: "God of wisdom, poetry, and war",
        origin: "Norse"
      },
      {
        name: "Artemis",
        pronunciation: "AR-tuh-miss",
        meaning: "Goddess of the hunt and moon",
        origin: "Greek"
      },
    ],
    Hindi: [
      {
        name: "Nisha",
        pronunciation: "NEE-sha",
        meaning: "Night",
        origin: "Hindi/Sanskrit"
      },
      {
        name: "Mehak",
        pronunciation: "meh-HUCK",
        meaning: "Fragrance",
        origin: "Hindi/Urdu"
      },
      {
        name: "Hemendra",
        pronunciation: "hem-EN-dra",
        meaning: "Lord of gold",
        origin: "Hindi/Sanskrit"
      },
      {
        name: "Pradeep",
        pronunciation: "pruh-DEEP",
        meaning: "Light, lamp",
        origin: "Hindi"
      },
      {
        name: "Priyanshu",
        pronunciation: "pree-YAN-shoo",
        meaning: "Ray of love",
        origin: "Hindi/Sanskrit"
      },
      {
        name: "Harshit",
        pronunciation: "HUR-shih-t",
        meaning: "Filled with happiness, joy",
        origin: "Hindi/Sanskrit"
      },
      {
        name: "Diya",
        pronunciation: "DEE-ya",
        meaning: "Light, lamp",
        origin: "Hindi"
      },
      {
        name: "Sitara",
        pronunciation: "si-TAA-ra",
        meaning: "Star",
        origin: "Hindi/Persian"
      },
      {
        name: "Tara",
        pronunciation: "TAA-ra",
        meaning: "Star",
        origin: "Sanskrit"
      },
    ],
    Discover: [] // This will be populated with names from all categories
  };
  
  // Populate the Discover category with all unique names
  useEffect(() => {
    try {
      // Create a Set to track unique names (avoids duplicates)
      const uniqueNames = new Set();
      const discoverNames = [];
      
      // Process all categories
      ['Celestial', 'Royal', 'Mythical', 'Hindi'].forEach(category => {
        allNames[category].forEach(nameObj => {
          // Only add if not already in our set
          if (!uniqueNames.has(nameObj.name)) {
            uniqueNames.add(nameObj.name);
            discoverNames.push(nameObj);
          }
        });
      });
      
      allNames.Discover = discoverNames;
      
      // Initialize filtered names
      filterNames();
    } catch (error) {
      console.error("Error initializing names:", error);
    }
  }, []); // Empty dependency array means this runs once on mount
  
  // Update filtered names whenever search term or active theme changes
  useEffect(() => {
    filterNames();
  }, [searchTerm, activeTheme]);
  
  const filterNames = () => {
    try {
      if (!allNames[activeTheme]) {
        setFilteredNames([]);
        return;
      }
      
      const term = searchTerm.toLowerCase().trim();
      
      if (term === '') {
        setFilteredNames(allNames[activeTheme]);
      } else {
        const filtered = allNames[activeTheme].filter(nameObj => {
          return (
            nameObj.name.toLowerCase().includes(term) ||
            (nameObj.meaning && nameObj.meaning.toLowerCase().includes(term)) ||
            (nameObj.origin && nameObj.origin.toLowerCase().includes(term)) ||
            (nameObj.pronunciation && nameObj.pronunciation.toLowerCase().includes(term))
          );
        });
        setFilteredNames(filtered);
      }
    } catch (error) {
      console.error("Error filtering names:", error);
      setFilteredNames([]);
    }
  };
  
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
  
  const handleThemeChange = (theme) => {
    setActiveTheme(theme);
  };
  
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
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search names, meanings, or origins..." 
            aria-label="Search names"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <div className="name-cards-container">
          {filteredNames.length > 0 ? (
            filteredNames.map((nameObj, index) => (
              <div className="name-card" key={index}>
                <div className="name-header">
                  <h2 className="name-title">
                    {nameObj.name} <span className="star-icon">✨</span>
                  </h2>
                  <button 
                    className="favorite-button" 
                    onClick={() => toggleFavorite(nameObj.name)}
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
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <p>No names found matching "{searchTerm}". Try a different search term.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;