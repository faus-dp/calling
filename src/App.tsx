import { useState, useEffect } from 'react'
import './App.css'
import gifExplanation from './assets/gif-explanation.gif'

function App() {
  const [isCallingDropdownOpen, setIsCallingDropdownOpen] = useState(false)
  const [isCallingWindowOpen, setIsCallingWindowOpen] = useState(false)
  const [isDropdownCallingEnabled, setIsDropdownCallingEnabled] = useState(false)
  const [isWindowCallingEnabled, setIsWindowCallingEnabled] = useState(false)
  const [isUISwapped, setIsUISwapped] = useState(false)
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [isPrototypeMenuOpen, setIsPrototypeMenuOpen] = useState(false)
  const [selectedApproach, setSelectedApproach] = useState('Current Experience')

  const handleOpenCallingWindow = () => {
    // Keep dropdown open when popup opens
    setIsCallingWindowOpen(true)
    // Position popup below navbar and next to sidebar
    setPopupPosition({ x: 90, y: 70 })
    // For Updated UX, enable calling immediately in both places
    if (selectedApproach === 'Updated UX') {
      setIsDropdownCallingEnabled(true)
      setIsWindowCallingEnabled(true)
    }
  }

  const handleCloseCallingWindow = () => {
    // Close the calling window and reset to initial state
    setIsCallingWindowOpen(false)
    setIsDropdownCallingEnabled(false)
    setIsWindowCallingEnabled(false)
    setIsUISwapped(false)
  }

  const handleSwapUI = () => {
    // Swap UI between dropdown and calling window (Updated UX only)
    setIsUISwapped(!isUISwapped)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragOffset({
      x: e.clientX - popupPosition.x,
      y: e.clientY - popupPosition.y
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPopupPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        })
      }
    }

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, dragOffset, popupPosition.x, popupPosition.y])

  // Render the appropriate approach
  const renderApproach = () => {
    if (selectedApproach === 'Updated UX') {
      // Updated UX - Duplicate of Current Experience (will be modified per user instructions)
      return renderApproach2()
    }
    // Default: Current Experience (Approach 1)
    return renderCurrentExperience()
  }

  const renderCurrentExperience = () => (
    <div className="wireframe-container">
      {/* Top Navbar - Approach 1 */}
      <nav className="navbar">
        <div className="navbar-left">
          {/* HubSpot Logo */}
          <div className="hubspot-logo">
            <img 
              src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/hubspot-icon.png" 
              alt="HubSpot" 
              width="32" 
              height="32"
            />
          </div>
          <div className="search-bar">
            <span className="search-placeholder">Search...</span>
          </div>
        </div>
        
        <div className="navbar-right">
          <div className="calling-button-wrapper">
            <button 
              className="nav-icon-btn" 
              title="Phone"
              onClick={() => setIsCallingDropdownOpen(!isCallingDropdownOpen)}
            >
              <div className="icon-circle">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                </svg>
                {isCallingWindowOpen ? (
                  <span className="phone-status-dot phone-status-active"></span>
                ) : (
                  <span className="phone-close-icon">✕</span>
                )}
              </div>
            </button>
            
            {isCallingDropdownOpen && (
              <div className="calling-dropdown">
                {!isCallingWindowOpen ? (
                  // Show closed state
                  <>
                    <div className="calling-dropdown-icon">
                      <div className="calling-icon-large">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="#6B8099">
                          <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                        </svg>
                        <span className="calling-x-large">✕</span>
                      </div>
                    </div>
                    <h3 className="calling-dropdown-title">Your calling window is closed.</h3>
                    <p className="calling-dropdown-text">
                      To make and receive calls, the calling window must be open. <a href="#" className="calling-learn-more">Learn more</a>
                    </p>
                    <button className="calling-open-btn" onClick={handleOpenCallingWindow}>Open calling window</button>
                  </>
                ) : !isDropdownCallingEnabled ? (
                  // Show disabled state when popup is open
                  <>
                    <div className="calling-dropdown-header">
                      <div className="calling-dropdown-branding">
                        <span className="dialpad-icon">🟨</span>
                        <span className="dialpad-name">Dialpad (Beta)</span>
                        <span className="dialpad-arrow">▼</span>
                      </div>
                      <button className="calling-minimize-btn" title="Minimize">−</button>
                    </div>
                    <h2 className="calling-disabled-title">Calling Disabled</h2>
                    <div className="calling-notice-disabled">
                      <p>Calling from this tab is currently disabled. Enabling calling in this tab will disable calling in other tabs.</p>
                    </div>
                    <button className="calling-enable-btn-dropdown" onClick={() => setIsDropdownCallingEnabled(true)}>ENABLE CALLING</button>
                  </>
                ) : (
                  // Show enabled calling interface with contact list
                  <>
                    <div className="calling-dropdown-header">
                      <div className="calling-dropdown-branding">
                        <img 
                          src="https://front.com/_next/image?url=https%3A%2F%2Ffront.com%2Fassets%2Fintegrations%2Fdialpad%2FDialpad-Icon-Circle-Gradient-2x.png&w=256&q=75" 
                          alt="Dialpad" 
                          className="dialpad-icon"
                        />
                        <span className="dialpad-name">Dialpad (Beta)</span>
                        <span className="dialpad-arrow">▼</span>
                      </div>
                      <button className="calling-minimize-btn" title="Minimize">−</button>
                    </div>

                    {/* Dark Control Bar */}
                    <div className="calling-control-bar">
                      <div className="control-bar-left">
                        <img 
                          src="https://front.com/_next/image?url=https%3A%2F%2Ffront.com%2Fassets%2Fintegrations%2Fdialpad%2FDialpad-Icon-Circle-Gradient-2x.png&w=256&q=75" 
                          alt="Dialpad" 
                          className="control-icon dialpad-square"
                        />
                        <span className="control-icon">🎧</span>
                        <span className="control-icon">◀</span>
                        <span className="control-icon">▶</span>
                        <span className="control-icon">🔍</span>
                      </div>
                      <div className="control-bar-right">
                        <div className="user-info">
                          <span className="user-name">Faustino Gaitan</span>
                          <span className="user-ext">Ext 00057</span>
                          <div className="user-avatar"></div>
                          <span className="user-dropdown">▼</span>
                        </div>
                      </div>
                    </div>

                    {/* Contact Centers Section */}
                    <div className="contact-centers-section">
                      <div className="section-header">
                        <span className="section-title">CONTACT CENTERS</span>
                        <div className="section-links">
                          <a href="#" className="section-link">LIVE DASHBOARD</a>
                          <a href="#" className="section-link">MANAGE</a>
                        </div>
                      </div>
                      <div className="off-duty-dropdown">
                        <span className="off-duty-icon">🔇</span>
                        <span className="off-duty-text">Off Duty</span>
                        <span className="off-duty-arrow">▼</span>
                      </div>
                    </div>

                    {/* Tabs */}
                    <div className="calling-tabs">
                      <div className="calling-tab active">RECENT</div>
                      <div className="calling-tab">FAVORITES</div>
                    </div>

                    {/* Contact List */}
                    <div className="contact-list">
                      <div className="contact-item">
                        <div className="contact-avatar hash-avatar">#</div>
                        <span className="contact-name">Faustino (GV) Gaitan</span>
                        <span className="contact-phone">(720) 835-5740</span>
                      </div>
                      <div className="contact-item">
                        <div className="contact-avatar"></div>
                        <span className="contact-name">Faustino Gaitan</span>
                        <span className="contact-phone">(415) 805-2481</span>
                      </div>
                      <div className="contact-item">
                        <div className="contact-avatar"></div>
                        <span className="contact-name">Fabian Gargaglione</span>
                        <span className="contact-phone">(202) 750-4572</span>
                      </div>
                      <div className="contact-item">
                        <div className="contact-avatar"></div>
                        <span className="contact-name">bianca artola</span>
                        <span className="contact-phone">(201) 351-8424</span>
                      </div>
                      <div className="contact-item">
                        <div className="contact-avatar"></div>
                        <span className="contact-name">Nav Kaur</span>
                        <span className="contact-phone">(669) 255-0019</span>
                      </div>
                      <div className="contact-item">
                        <div className="contact-avatar"></div>
                        <span className="contact-name">Joan Gil</span>
                        <span className="contact-phone">(213) 262-5762</span>
                      </div>
                      <div className="contact-item">
                        <div className="contact-avatar"></div>
                        <span className="contact-name">Hernan Gallo</span>
                        <span className="contact-phone">(216) 307-1585</span>
                      </div>
                      <div className="contact-item">
                        <div className="contact-avatar dialbot-avatar">Q</div>
                        <span className="contact-name">Dialbot</span>
                        <span className="contact-phone">(415) 938-9005</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
          <div className="icon-circle"></div>
          <div className="icon-circle"></div>
          <div className="icon-circle"></div>
          <div className="nav-link-rect"></div>
          <div className="nav-link-rect"></div>
        </div>
      </nav>

      <div className="main-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-item" title="Dashboard">●</div>
          <div className="sidebar-item" title="Contacts">●</div>
          <div className="sidebar-item" title="Calls">●</div>
          <div className="sidebar-item" title="Reports">●</div>
          <div className="sidebar-item" title="Settings">●</div>
        </aside>

        {/* Main Content Area */}
        <main className="content-area">

          {/* Wireframe Blocks Grid */}
          <div className="wireframe-grid">
            {/* Left Column - Large Block */}
            <div className="wireframe-block large-block">
            </div>

            {/* Middle Column */}
            <div className="middle-column">
              <div className="wireframe-block medium-block">
              </div>
              <div className="wireframe-block medium-block">
              </div>
            </div>

            {/* Right Column - Large Block */}
            <div className="wireframe-block large-block">
            </div>
          </div>

        </main>
      </div>

      {/* Calling Window Popup */}
      {isCallingWindowOpen && (
        <div className="calling-window-overlay">
          <div 
            className="calling-window-popup"
            style={{
              left: `${popupPosition.x}px`,
              top: `${popupPosition.y}px`,
              position: 'fixed'
            }}
          >
            {/* Chrome Window Header */}
            <div 
              className="chrome-window-header"
              onMouseDown={handleMouseDown}
              style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
            >
              <div className="chrome-traffic-lights">
                <span 
                  className="chrome-dot chrome-close"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleCloseCallingWindow()
                  }}
                  style={{ cursor: 'pointer' }}
                ></span>
                <span className="chrome-dot chrome-minimize"></span>
                <span className="chrome-dot chrome-maximize"></span>
              </div>
              <div className="chrome-window-title">Calling Window | HubSpot</div>
            </div>

            {/* URL Bar */}
            <div className="chrome-url-bar">
              <div className="chrome-url-content">
                <span className="chrome-lock-icon">🔒</span>
                <span className="chrome-url-text">app.hubspot.com/calling-integration-popup-ui/40001206</span>
              </div>
            </div>

            <div className="calling-window-header">
              <div className="calling-window-branding">
                <img 
                  src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/hubspot-icon.png" 
                  alt="HubSpot" 
                  width="24" 
                  height="24"
                />
                <img 
                  src="https://front.com/_next/image?url=https%3A%2F%2Ffront.com%2Fassets%2Fintegrations%2Fdialpad%2FDialpad-Icon-Circle-Gradient-2x.png&w=256&q=75" 
                  alt="Dialpad" 
                  width="24" 
                  height="24"
                  style={{ marginLeft: '8px' }}
                />
                <span className="calling-window-app-name">Dialpad (Beta)</span>
              </div>
            </div>

            <div className="calling-window-content">
              {!isWindowCallingEnabled ? (
                // Before calling is enabled
                <>
                  <h2 className="calling-disabled-heading">Calling Disabled</h2>

                  <div className="calling-notice">
                    <p>Calling from this tab is currently disabled. Enabling calling in this tab will disable calling in other tabs.</p>
                  </div>

                  <button className="calling-enable-btn" onClick={() => setIsWindowCallingEnabled(true)}>ENABLE CALLING</button>
                </>
              ) : (
                // After calling is enabled - show "You're all set" message
                <>
                  <div className="all-set-container">
                    <h1 className="all-set-title">You're all set</h1>
                    <p className="all-set-subtitle">Your main calling workspace is in HubSpot</p>
                    <p className="all-set-keep-open">Keep this window open in the background</p>
                    <a href="#" className="all-set-switch-link">Switch to this window if you prefer</a>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Prototype Options Button */}
      <div className="prototype-options-container">
        {isPrototypeMenuOpen && (
          <div className="prototype-menu">
            <div className="prototype-menu-header">Prototype Approaches</div>
            <div 
              className={`prototype-menu-item ${selectedApproach === 'Current Experience' ? 'active' : ''}`}
              onClick={() => setSelectedApproach('Current Experience')}
            >
              <span className="approach-number">1</span>
              <span className="approach-name">Current Experience</span>
              {selectedApproach === 'Current Experience' && <span className="approach-check">✓</span>}
            </div>
            <div 
              className={`prototype-menu-item ${selectedApproach === 'Updated UX' ? 'active' : ''}`}
              onClick={() => setSelectedApproach('Updated UX')}
            >
              <span className="approach-number">2</span>
              <span className="approach-name">Updated UX</span>
              {selectedApproach === 'Updated UX' && <span className="approach-check">✓</span>}
            </div>
            <div 
              className={`prototype-menu-item ${selectedApproach === 'Approach 3' ? 'active' : ''}`}
              onClick={() => setSelectedApproach('Approach 3')}
            >
              <span className="approach-number">3</span>
              <span className="approach-name">Approach 3</span>
              {selectedApproach === 'Approach 3' && <span className="approach-check">✓</span>}
            </div>
            <div 
              className={`prototype-menu-item ${selectedApproach === 'Approach 4' ? 'active' : ''}`}
              onClick={() => setSelectedApproach('Approach 4')}
            >
              <span className="approach-number">4</span>
              <span className="approach-name">Approach 4</span>
              {selectedApproach === 'Approach 4' && <span className="approach-check">✓</span>}
            </div>
          </div>
        )}
        <button 
          className="prototype-toggle-btn"
          onClick={() => setIsPrototypeMenuOpen(!isPrototypeMenuOpen)}
        >
          {isPrototypeMenuOpen ? '✕' : '⚙️'} Prototype
        </button>
      </div>
    </div>
  )

  const renderApproach2 = () => (
    <div className="wireframe-container">
      {/* Top Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          {/* HubSpot Logo */}
          <div className="hubspot-logo">
            <img 
              src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/hubspot-icon.png" 
              alt="HubSpot" 
              width="32" 
              height="32"
            />
          </div>
          <div className="search-bar">
            <span className="search-placeholder">Search...</span>
          </div>
        </div>
        
        <div className="navbar-right">
          <div className="calling-button-wrapper">
            <button 
              className="nav-icon-btn" 
              title="Phone"
              onClick={() => setIsCallingDropdownOpen(!isCallingDropdownOpen)}
            >
              <div className="icon-circle">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                </svg>
                {isCallingWindowOpen ? (
                  <span className="phone-status-dot phone-status-active"></span>
                ) : (
                  <span className="phone-close-icon">✕</span>
                )}
              </div>
            </button>
            
            {isCallingDropdownOpen && (
              <div className="calling-dropdown">
                {!isCallingWindowOpen ? (
                  // Show closed state
                  <>
                    <div className="calling-dropdown-icon">
                      <div className="calling-icon-large">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="#6B8099">
                          <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                        </svg>
                        <span className="calling-x-large">✕</span>
                      </div>
                    </div>
                    <h3 className="calling-dropdown-title">Your calling window is closed.</h3>
                    <p className="calling-dropdown-text">
                      To make and receive calls, the calling window must be open. <a href="#" className="calling-learn-more">Learn more</a>
                    </p>
                    <button className="calling-open-btn" onClick={handleOpenCallingWindow}>Open calling window</button>
                  </>
                ) : !isUISwapped ? (
                  // Show enabled calling interface with contact list (normal state)
                  <>
                    <div className="calling-dropdown-header">
                      <div className="calling-dropdown-branding">
                        <img 
                          src="https://front.com/_next/image?url=https%3A%2F%2Ffront.com%2Fassets%2Fintegrations%2Fdialpad%2FDialpad-Icon-Circle-Gradient-2x.png&w=256&q=75" 
                          alt="Dialpad" 
                          className="dialpad-icon"
                        />
                        <span className="dialpad-name">Dialpad (Beta)</span>
                        <span className="dialpad-arrow">▼</span>
                      </div>
                      <button className="calling-minimize-btn" title="Minimize">−</button>
                    </div>

                    {/* Dark Control Bar */}
                    <div className="calling-control-bar">
                      <div className="control-bar-left">
                        <img 
                          src="https://front.com/_next/image?url=https%3A%2F%2Ffront.com%2Fassets%2Fintegrations%2Fdialpad%2FDialpad-Icon-Circle-Gradient-2x.png&w=256&q=75" 
                          alt="Dialpad" 
                          className="control-icon dialpad-square"
                        />
                        <span className="control-icon">🎧</span>
                        <span className="control-icon">◀</span>
                        <span className="control-icon">▶</span>
                        <span className="control-icon">🔍</span>
                      </div>
                      <div className="control-bar-right">
                        <div className="user-info">
                          <span className="user-name">Faustino Gaitan</span>
                          <span className="user-ext">Ext 00057</span>
                          <div className="user-avatar"></div>
                          <span className="user-dropdown">▼</span>
                        </div>
                      </div>
                    </div>

                    {/* Contact Centers Section */}
                    <div className="contact-centers-section">
                      <div className="section-header">
                        <span className="section-title">CONTACT CENTERS</span>
                        <div className="section-links">
                          <a href="#" className="section-link">LIVE DASHBOARD</a>
                          <a href="#" className="section-link">MANAGE</a>
                        </div>
                      </div>
                      <div className="off-duty-dropdown">
                        <span className="off-duty-icon">🔇</span>
                        <span className="off-duty-text">Off Duty</span>
                        <span className="off-duty-arrow">▼</span>
                      </div>
                    </div>

                    {/* Tabs */}
                    <div className="calling-tabs">
                      <div className="calling-tab active">RECENT</div>
                      <div className="calling-tab">FAVORITES</div>
                    </div>

                    {/* Contact List */}
                    <div className="contact-list">
                      <div className="contact-item">
                        <div className="contact-avatar hash-avatar">#</div>
                        <span className="contact-name">Faustino (GV) Gaitan</span>
                        <span className="contact-phone">(720) 835-5740</span>
                      </div>
                      <div className="contact-item">
                        <div className="contact-avatar"></div>
                        <span className="contact-name">Faustino Gaitan</span>
                        <span className="contact-phone">(415) 805-2481</span>
                      </div>
                      <div className="contact-item">
                        <div className="contact-avatar"></div>
                        <span className="contact-name">Fabian Gargaglione</span>
                        <span className="contact-phone">(202) 750-4572</span>
                      </div>
                      <div className="contact-item">
                        <div className="contact-avatar"></div>
                        <span className="contact-name">bianca artola</span>
                        <span className="contact-phone">(201) 351-8424</span>
                      </div>
                      <div className="contact-item">
                        <div className="contact-avatar"></div>
                        <span className="contact-name">Nav Kaur</span>
                        <span className="contact-phone">(669) 255-0019</span>
                      </div>
                      <div className="contact-item">
                        <div className="contact-avatar"></div>
                        <span className="contact-name">Joan Gil</span>
                        <span className="contact-phone">(213) 262-5762</span>
                      </div>
                      <div className="contact-item">
                        <div className="contact-avatar"></div>
                        <span className="contact-name">Hernan Gallo</span>
                        <span className="contact-phone">(216) 307-1585</span>
                      </div>
                      <div className="contact-item">
                        <div className="contact-avatar dialbot-avatar">Q</div>
                        <span className="contact-name">Dialbot</span>
                        <span className="contact-phone">(415) 938-9005</span>
                      </div>
                    </div>
                  </>
                ) : (
                  // Show "You're all set" message when UI is swapped
                  <>
                    <div className="calling-dropdown-header">
                      <div className="calling-dropdown-branding">
                        <img 
                          src="https://front.com/_next/image?url=https%3A%2F%2Ffront.com%2Fassets%2Fintegrations%2Fdialpad%2FDialpad-Icon-Circle-Gradient-2x.png&w=256&q=75" 
                          alt="Dialpad" 
                          className="dialpad-icon"
                        />
                        <span className="dialpad-name">Dialpad (Beta)</span>
                        <span className="dialpad-arrow">▼</span>
                      </div>
                      <button className="calling-minimize-btn" title="Minimize">−</button>
                    </div>
                    <div className="swapped-all-set-container">
                      <h1 className="swapped-all-set-title">You're all set</h1>
                      <p className="swapped-all-set-subtitle">Your main calling workspace is in this window</p>
                      <p className="swapped-all-set-keep-open">Keep the calling window open in the background</p>
                      <button className="enable-calling-here-btn" onClick={handleSwapUI}>ENABLE CALLING HERE</button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
          <div className="icon-circle"></div>
          <div className="icon-circle"></div>
          <div className="icon-circle"></div>
          <div className="nav-link-rect"></div>
          <div className="nav-link-rect"></div>
        </div>
      </nav>

      <div className="main-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-item" title="Dashboard">●</div>
          <div className="sidebar-item" title="Contacts">●</div>
          <div className="sidebar-item" title="Calls">●</div>
          <div className="sidebar-item" title="Reports">●</div>
          <div className="sidebar-item" title="Settings">●</div>
        </aside>

        {/* Main Content Area */}
        <main className="content-area">

          {/* Wireframe Blocks Grid */}
          <div className="wireframe-grid">
            {/* Left Column - Large Block */}
            <div className="wireframe-block large-block">
            </div>

            {/* Middle Column */}
            <div className="middle-column">
              <div className="wireframe-block medium-block">
              </div>
              <div className="wireframe-block medium-block">
              </div>
            </div>

            {/* Right Column - Large Block */}
            <div className="wireframe-block large-block">
            </div>
          </div>

        </main>
      </div>

      {/* Calling Window Popup */}
      {isCallingWindowOpen && (
        <div className="calling-window-overlay">
          <div 
            className="calling-window-popup"
            style={{
              left: `${popupPosition.x}px`,
              top: `${popupPosition.y}px`,
              position: 'fixed',
              width: isUISwapped ? '400px' : '350px'
            }}
          >
            {/* Chrome Window Header */}
            <div 
              className="chrome-window-header"
              onMouseDown={handleMouseDown}
              style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
            >
              <div className="chrome-traffic-lights">
                <span 
                  className="chrome-dot chrome-close"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleCloseCallingWindow()
                  }}
                  style={{ cursor: 'pointer' }}
                ></span>
                <span className="chrome-dot chrome-minimize"></span>
                <span className="chrome-dot chrome-maximize"></span>
              </div>
              <div className="chrome-window-title">Calling Window | HubSpot</div>
            </div>

            {/* URL Bar */}
            <div className="chrome-url-bar">
              <div className="chrome-url-content">
                <span className="chrome-lock-icon">🔒</span>
                <span className="chrome-url-text">app.hubspot.com/calling-integration-popup-ui/40001206</span>
              </div>
            </div>

            <div className="calling-window-header">
              <div className="calling-window-branding">
                <img 
                  src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/hubspot-icon.png" 
                  alt="HubSpot" 
                  width="24" 
                  height="24"
                />
                <img 
                  src="https://front.com/_next/image?url=https%3A%2F%2Ffront.com%2Fassets%2Fintegrations%2Fdialpad%2FDialpad-Icon-Circle-Gradient-2x.png&w=256&q=75" 
                  alt="Dialpad" 
                  width="24" 
                  height="24"
                  style={{ marginLeft: '8px' }}
                />
                <span className="calling-window-app-name">Dialpad (Beta)</span>
              </div>
            </div>

            <div className="calling-window-content">
              {!isUISwapped ? (
                // Show "You're all set" content when not swapped
                <div className="approach2-all-set">
                  <h1 className="approach2-title">You're all set</h1>
                  <p className="approach2-subtitle">Your main calling workspace is in HubSpot</p>
                  <img src={gifExplanation} alt="Where to go" className="explanation-gif" />
                  <p className="approach2-keep-open">Keep this window open in the background</p>
                  <a href="#" className="approach2-switch-link" onClick={(e) => { e.preventDefault(); handleSwapUI(); }}>Switch to this window if you prefer</a>
                </div>
              ) : (
                // Show dialpad UI when swapped
                <div className="popup-dialpad-container">
                  {/* Dark Control Bar */}
                  <div className="calling-control-bar popup-control-bar">
                    <div className="control-bar-left">
                      <img 
                        src="https://front.com/_next/image?url=https%3A%2F%2Ffront.com%2Fassets%2Fintegrations%2Fdialpad%2FDialpad-Icon-Circle-Gradient-2x.png&w=256&q=75" 
                        alt="Dialpad" 
                        className="control-icon dialpad-square"
                      />
                      <span className="control-icon">🎧</span>
                      <span className="control-icon">◀</span>
                      <span className="control-icon">▶</span>
                      <span className="control-icon">🔍</span>
                    </div>
                    <div className="control-bar-right">
                      <div className="user-info">
                        <span className="user-name">Faustino Gaitan</span>
                        <span className="user-ext">Ext 00057</span>
                        <div className="user-avatar"></div>
                        <span className="user-dropdown">▼</span>
                      </div>
                    </div>
                  </div>

                  <div className="popup-cti-content">
                    {/* Contact Centers Section */}
                    <div className="contact-centers-section">
                      <div className="section-header">
                        <span className="section-title">CONTACT CENTERS</span>
                        <div className="section-links">
                          <a href="#" className="section-link">LIVE DASHBOARD</a>
                          <a href="#" className="section-link">MANAGE</a>
                        </div>
                      </div>
                      <div className="off-duty-dropdown">
                        <span className="off-duty-icon">🔇</span>
                        <span className="off-duty-text">Off Duty</span>
                        <span className="off-duty-arrow">▼</span>
                      </div>
                    </div>

                    {/* Tabs */}
                    <div className="calling-tabs">
                      <div className="calling-tab active">RECENT</div>
                      <div className="calling-tab">FAVORITES</div>
                    </div>

                    {/* Contact List */}
                    <div className="contact-list popup-contact-list">
                      <div className="contact-item">
                        <div className="contact-avatar hash-avatar">#</div>
                        <span className="contact-name">Faustino (GV) Gaitan</span>
                        <span className="contact-phone">(720) 835-5740</span>
                      </div>
                      <div className="contact-item">
                        <div className="contact-avatar"></div>
                        <span className="contact-name">Faustino Gaitan</span>
                        <span className="contact-phone">(415) 805-2481</span>
                      </div>
                      <div className="contact-item">
                        <div className="contact-avatar"></div>
                        <span className="contact-name">Fabian Gargaglione</span>
                        <span className="contact-phone">(202) 750-4572</span>
                      </div>
                      <div className="contact-item">
                        <div className="contact-avatar"></div>
                        <span className="contact-name">bianca artola</span>
                        <span className="contact-phone">(201) 351-8424</span>
                      </div>
                      <div className="contact-item">
                        <div className="contact-avatar"></div>
                        <span className="contact-name">Nav Kaur</span>
                        <span className="contact-phone">(669) 255-0019</span>
                      </div>
                      <div className="contact-item">
                        <div className="contact-avatar"></div>
                        <span className="contact-name">Joan Gil</span>
                        <span className="contact-phone">(213) 262-5762</span>
                      </div>
                      <div className="contact-item">
                        <div className="contact-avatar"></div>
                        <span className="contact-name">Hernan Gallo</span>
                        <span className="contact-phone">(216) 307-1585</span>
                      </div>
                      <div className="contact-item">
                        <div className="contact-avatar dialbot-avatar">Q</div>
                        <span className="contact-name">Dialbot</span>
                        <span className="contact-phone">(415) 938-9005</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Prototype Options Button */}
      <div className="prototype-options-container">
        {isPrototypeMenuOpen && (
          <div className="prototype-menu">
            <div className="prototype-menu-header">Prototype Approaches</div>
            <div 
              className={`prototype-menu-item ${selectedApproach === 'Current Experience' ? 'active' : ''}`}
              onClick={() => setSelectedApproach('Current Experience')}
            >
              <span className="approach-number">1</span>
              <span className="approach-name">Current Experience</span>
              {selectedApproach === 'Current Experience' && <span className="approach-check">✓</span>}
            </div>
            <div 
              className={`prototype-menu-item ${selectedApproach === 'Updated UX' ? 'active' : ''}`}
              onClick={() => setSelectedApproach('Updated UX')}
            >
              <span className="approach-number">2</span>
              <span className="approach-name">Updated UX</span>
              {selectedApproach === 'Updated UX' && <span className="approach-check">✓</span>}
            </div>
            <div 
              className={`prototype-menu-item ${selectedApproach === 'Approach 3' ? 'active' : ''}`}
              onClick={() => setSelectedApproach('Approach 3')}
            >
              <span className="approach-number">3</span>
              <span className="approach-name">Approach 3</span>
              {selectedApproach === 'Approach 3' && <span className="approach-check">✓</span>}
            </div>
            <div 
              className={`prototype-menu-item ${selectedApproach === 'Approach 4' ? 'active' : ''}`}
              onClick={() => setSelectedApproach('Approach 4')}
            >
              <span className="approach-number">4</span>
              <span className="approach-name">Approach 4</span>
              {selectedApproach === 'Approach 4' && <span className="approach-check">✓</span>}
            </div>
          </div>
        )}
        <button 
          className="prototype-toggle-btn"
          onClick={() => setIsPrototypeMenuOpen(!isPrototypeMenuOpen)}
        >
          {isPrototypeMenuOpen ? '✕' : '⚙️'} Prototype
        </button>
      </div>
    </div>
  )

  return (
    <>
      {renderApproach()}
    </>
  )
}

export default App
