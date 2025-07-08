// Filter functionality for hotel listings
document.addEventListener('DOMContentLoaded', function() {
    const filters = document.querySelectorAll('.filter');
    const listingCards = document.querySelectorAll('.listing-card');
    
    // Store original listings for reset functionality
    const originalListings = Array.from(listingCards);
    
    // Add click event listeners to all filters
    filters.forEach(filter => {
        filter.addEventListener('click', function() {
            const filterType = this.querySelector('p').textContent.toLowerCase();
            
            // Remove active class from all filters
            filters.forEach(f => f.classList.remove('active'));
            
            // Add active class to clicked filter
            this.classList.add('active');
            
            // Apply filter
            applyFilter(filterType);
        });
    });
    
    // Filter function
    function applyFilter(filterType) {
        listingCards.forEach(card => {
            const listingTitle = card.querySelector('.card-text b').textContent.toLowerCase();
            const listingPrice = parseInt(card.querySelector('.card-text').textContent.match(/\d+/)[0]);
            
            let shouldShow = false;
            
            switch(filterType) {
                case 'trending':
                    // Show listings with high ratings or recent activity
                    shouldShow = Math.random() > 0.3; // Simulate trending
                    break;
                    
                case 'rooms':
                    // Show hotel rooms (exclude camping, farms, etc.)
                    const roomKeywords = ['hotel', 'room', 'suite', 'resort', 'inn'];
                    shouldShow = roomKeywords.some(keyword => listingTitle.includes(keyword));
                    break;
                    
                case 'iconic cities':
                    // Show listings in major cities
                    const cityKeywords = ['mumbai', 'delhi', 'bangalore', 'chennai', 'kolkata', 'hyderabad', 'pune'];
                    shouldShow = cityKeywords.some(keyword => listingTitle.includes(keyword));
                    break;
                    
                case 'mountain':
                    // Show mountain/hill stations
                    const mountainKeywords = ['mountain', 'hill', 'shimla', 'manali', 'darjeeling', 'ooty'];
                    shouldShow = mountainKeywords.some(keyword => listingTitle.includes(keyword));
                    break;
                    
                case 'castles':
                    // Show castle/palace themed
                    const castleKeywords = ['castle', 'palace', 'fort', 'heritage'];
                    shouldShow = castleKeywords.some(keyword => listingTitle.includes(keyword));
                    break;
                    
                case 'amazing pools':
                    // Show properties with pools
                    const poolKeywords = ['pool', 'resort', 'spa', 'luxury'];
                    shouldShow = poolKeywords.some(keyword => listingTitle.includes(keyword));
                    break;
                    
                case 'camping':
                    // Show camping/outdoor stays
                    const campingKeywords = ['camp', 'tent', 'outdoor', 'adventure'];
                    shouldShow = campingKeywords.some(keyword => listingTitle.includes(keyword));
                    break;
                    
                case 'farms':
                    // Show farm stays
                    const farmKeywords = ['farm', 'agriculture', 'rural', 'village'];
                    shouldShow = farmKeywords.some(keyword => listingTitle.includes(keyword));
                    break;
                    
                case 'arctic':
                    // Show cold weather destinations
                    const arcticKeywords = ['snow', 'winter', 'cold', 'ice'];
                    shouldShow = arcticKeywords.some(keyword => listingTitle.includes(keyword));
                    break;
                    
                case 'luxury hotels':
                    // Show luxury accommodations
                    const luxuryKeywords = ['luxury', 'premium', '5-star', 'boutique', 'exclusive'];
                    shouldShow = luxuryKeywords.some(keyword => listingTitle.includes(keyword)) || listingPrice > 5000;
                    break;
                    
                case 'beachfront':
                    // Show beach properties
                    const beachKeywords = ['beach', 'coastal', 'seaside', 'ocean'];
                    shouldShow = beachKeywords.some(keyword => listingTitle.includes(keyword));
                    break;
                    
                case 'wellness':
                    // Show wellness/spa properties
                    const wellnessKeywords = ['spa', 'wellness', 'yoga', 'meditation', 'retreat'];
                    shouldShow = wellnessKeywords.some(keyword => listingTitle.includes(keyword));
                    break;
                    
                case 'fine dining':
                    // Show properties with restaurants
                    const diningKeywords = ['restaurant', 'dining', 'culinary', 'gourmet'];
                    shouldShow = diningKeywords.some(keyword => listingTitle.includes(keyword));
                    break;
                    
                case 'business':
                    // Show business-friendly hotels
                    const businessKeywords = ['business', 'conference', 'meeting', 'corporate'];
                    shouldShow = businessKeywords.some(keyword => listingTitle.includes(keyword));
                    break;
                    
                case 'forest':
                    // Show forest/nature stays
                    const forestKeywords = ['forest', 'jungle', 'nature', 'eco'];
                    shouldShow = forestKeywords.some(keyword => listingTitle.includes(keyword));
                    break;
                    
                case 'lake view':
                    // Show lake view properties
                    const lakeKeywords = ['lake', 'waterfront', 'river', 'pond'];
                    shouldShow = lakeKeywords.some(keyword => listingTitle.includes(keyword));
                    break;
                    
                case 'parking':
                    // Show properties with parking
                    const parkingKeywords = ['parking', 'garage', 'car'];
                    shouldShow = parkingKeywords.some(keyword => listingTitle.includes(keyword));
                    break;
                    
                case 'gym':
                    // Show properties with fitness facilities
                    const gymKeywords = ['gym', 'fitness', 'workout', 'exercise'];
                    shouldShow = gymKeywords.some(keyword => listingTitle.includes(keyword));
                    break;
                    
                case 'family':
                    // Show family-friendly properties
                    const familyKeywords = ['family', 'kids', 'child', 'playground'];
                    shouldShow = familyKeywords.some(keyword => listingTitle.includes(keyword));
                    break;
                    
                case 'romantic':
                    // Show romantic getaways
                    const romanticKeywords = ['romantic', 'couple', 'honeymoon', 'intimate'];
                    shouldShow = romanticKeywords.some(keyword => listingTitle.includes(keyword));
                    break;
                    
                case 'airport':
                    // Show properties near airports
                    const airportKeywords = ['airport', 'terminal', 'transit'];
                    shouldShow = airportKeywords.some(keyword => listingTitle.includes(keyword));
                    break;
                    
                case 'adventure':
                    // Show adventure properties
                    const adventureKeywords = ['adventure', 'trek', 'hiking', 'outdoor'];
                    shouldShow = adventureKeywords.some(keyword => listingTitle.includes(keyword));
                    break;
                    
                case 'photography':
                    // Show scenic properties
                    const photoKeywords = ['scenic', 'view', 'panoramic', 'landscape'];
                    shouldShow = photoKeywords.some(keyword => listingTitle.includes(keyword));
                    break;
                    
                case 'premium':
                    // Show premium/high-end properties
                    const premiumKeywords = ['premium', 'luxury', 'exclusive', 'boutique'];
                    shouldShow = premiumKeywords.some(keyword => listingTitle.includes(keyword)) || listingPrice > 8000;
                    break;
                    
                default:
                    shouldShow = true;
            }
            
            // Show/hide card with animation
            const col = card.closest('.col');
            if (col) col.style.display = shouldShow ? '' : 'none';
        });
        
        // Show results count
        showResultsCount();
    }
    
    // Function to show results count
    function showResultsCount() {
        // Only count .listing-col elements that are visible (not display: none)
        const visibleCols = Array.from(document.querySelectorAll('.listing-col')).filter(
            col => col.style.display !== 'none'
        );
        const resultsContainer = document.getElementById('results-count') || createResultsContainer();
        resultsContainer.textContent = `Showing ${visibleCols.length} of ${originalListings.length} listings`;
    }
    
    // Function to create results count container
    function createResultsContainer() {
        const container = document.createElement('div');
        container.id = 'results-count';
        container.style.cssText = `
            text-align: center;
            margin: 1rem 0;
            font-weight: 600;
            color: #666;
        `;
        
        const filtersContainer = document.getElementById('filters');
        filtersContainer.parentNode.insertBefore(container, filtersContainer.nextSibling);
        
        return container;
    }
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .filter.active {
            background: linear-gradient(135deg, #007bff 0%, #0056b3 100%) !important;
            color: white !important;
            opacity: 1 !important;
        }
        
        .filter.active p {
            color: white !important;
        }
    `;
    document.head.appendChild(style);
    

    
    // Initialize results count
    showResultsCount();
}); 