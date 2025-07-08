// Search functionality for hotel listings based on location
document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.querySelector('form[role="search"]');
    const searchInput = document.querySelector('.search-inp');
    const listingCards = document.querySelectorAll('.listing-card');
    
    // Store original listings for reset functionality
    const originalListings = Array.from(listingCards);
    
    // Add event listener to search form
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchTerm = searchInput.value.trim().toLowerCase();
            
            if (searchTerm === '') {
                // If search is empty, show all listings
                showAllListings();
                return;
            }
            
            // Perform search
            performSearch(searchTerm);
        });
    }
    
    // Add real-time search as user types (optional)
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.trim().toLowerCase();
            
            if (searchTerm === '') {
                showAllListings();
                return;
            }
            
            // Debounce the search to avoid too many searches while typing
            clearTimeout(this.searchTimeout);
            this.searchTimeout = setTimeout(() => {
                performSearch(searchTerm);
            }, 300);
        });
    }
    
    // Search function
    function performSearch(searchTerm) {
        let foundResults = 0;
        
        listingCards.forEach(card => {
            const listingTitle = card.querySelector('.card-text b').textContent.toLowerCase();
            const listingLocation = getListingLocation(card);
            const listingCountry = getListingCountry(card);
            
            // Search in title, location, and country
            const matchesTitle = listingTitle.includes(searchTerm);
            const matchesLocation = listingLocation && listingLocation.toLowerCase().includes(searchTerm);
            const matchesCountry = listingCountry && listingCountry.toLowerCase().includes(searchTerm);
            
            const shouldShow = matchesTitle || matchesLocation || matchesCountry;
            
            // Show/hide card
            const col = card.closest('.listing-col');
            if (col) {
                col.style.display = shouldShow ? '' : 'none';
                if (shouldShow) {
                    foundResults++;
                    col.style.animation = 'fadeIn 0.5s ease-in';
                }
            }
        });
        
        // Update results count
        updateSearchResults(foundResults, originalListings.length);
        
        // Show search feedback
        showSearchFeedback(searchTerm, foundResults);
    }
    
    // Function to get listing location from card
    function getListingLocation(card) {
        // Since location data might not be directly visible in the card,
        // we'll search through the entire card text for location-related keywords
        const cardText = card.querySelector('.card-text');
        if (cardText) {
            return cardText.textContent;
        }
        return null;
    }
    
    // Function to get listing country from card
    function getListingCountry(card) {
        // Similar to location, extract country if available
        const cardText = card.querySelector('.card-text');
        if (cardText) {
            return cardText.textContent;
        }
        return null;
    }
    
    // Function to show all listings
    function showAllListings() {
        listingCards.forEach(card => {
            const col = card.closest('.listing-col');
            if (col) {
                col.style.display = '';
                col.style.animation = 'fadeIn 0.5s ease-in';
            }
        });
        
        // Clear search feedback
        clearSearchFeedback();
        
        // Update results count
        updateSearchResults(originalListings.length, originalListings.length);
    }
    
    // Function to update search results count
    function updateSearchResults(found, total) {
        let resultsContainer = document.getElementById('search-results-count');
        
        if (!resultsContainer) {
            resultsContainer = document.createElement('div');
            resultsContainer.id = 'search-results-count';
            resultsContainer.style.cssText = `
                text-align: center;
                margin: 1rem 0;
                font-weight: 600;
                color: #666;
                padding: 0.5rem;
                background: #f8f9fa;
                border-radius: 0.5rem;
            `;
            
            // Insert after the filters section
            const filtersSection = document.getElementById('filters');
            if (filtersSection && filtersSection.parentNode) {
                filtersSection.parentNode.insertBefore(resultsContainer, filtersSection.nextSibling);
            }
        }
        
        resultsContainer.textContent = `Found ${found} of ${total} listings`;
    }
    
    // Function to show search feedback
    function showSearchFeedback(searchTerm, foundResults) {
        let feedbackContainer = document.getElementById('search-feedback');
        
        if (!feedbackContainer) {
            feedbackContainer = document.createElement('div');
            feedbackContainer.id = 'search-feedback';
            feedbackContainer.style.cssText = `
                text-align: center;
                margin: 0.5rem 0;
                padding: 0.5rem;
                border-radius: 0.5rem;
                font-size: 0.9rem;
            `;
            
            // Insert after the results count
            const resultsContainer = document.getElementById('search-results-count');
            if (resultsContainer) {
                resultsContainer.parentNode.insertBefore(feedbackContainer, resultsContainer.nextSibling);
            }
        }
        
        if (foundResults === 0) {
            feedbackContainer.style.background = '#fff3cd';
            feedbackContainer.style.color = '#856404';
            feedbackContainer.style.border = '1px solid #ffeaa7';
            feedbackContainer.innerHTML = `
                <i class="fa-solid fa-search"></i> 
                No results found for "<strong>${searchTerm}</strong>". 
                Try different keywords or check your spelling.
            `;
        } else {
            feedbackContainer.style.background = '#d1edff';
            feedbackContainer.style.color = '#0c5460';
            feedbackContainer.style.border = '1px solid #bee5eb';
            feedbackContainer.innerHTML = `
                <i class="fa-solid fa-check-circle"></i> 
                Found ${foundResults} result${foundResults > 1 ? 's' : ''} for "<strong>${searchTerm}</strong>"
            `;
        }
    }
    
    // Function to clear search feedback
    function clearSearchFeedback() {
        const feedbackContainer = document.getElementById('search-feedback');
        if (feedbackContainer) {
            feedbackContainer.remove();
        }
        
        const resultsContainer = document.getElementById('search-results-count');
        if (resultsContainer) {
            resultsContainer.remove();
        }
    }
    

    

}); n