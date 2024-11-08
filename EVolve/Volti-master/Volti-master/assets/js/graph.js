document.addEventListener('DOMContentLoaded', () => {
        const distanceSlider = document.getElementById('distanceSlider');
        const distanceValue = document.getElementById('distanceValue');
        const petrolCost = document.getElementById('petrolCost');
        const evCost = document.getElementById('evCost');
        const savings = document.getElementById('savings');
    
        function calculateCosts(distance) {
            // Petrol: ₹100/liter, 10km/liter
            const petrolCostValue = distance * 0.1 * 100;
            // EV: ₹8/unit, 10km/unit
            const evCostValue = distance * 0.1 * 8;
            const savingsValue = petrolCostValue - evCostValue;
    
            return {
                petrol: petrolCostValue,
                ev: evCostValue,
                savings: savingsValue
            };
        }
    
        function formatCurrency(value) {
            return '₹' + value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
    
        function updateSliderBackground() {
            const min = distanceSlider.min;
            const max = distanceSlider.max;
            const value = distanceSlider.value;
            const percentage = ((value - min) / (max - min)) * 100;
            distanceSlider.style.background = `linear-gradient(to right, #3b82f6 ${percentage}%, #e2e8f0 ${percentage}%)`;
        }
    
        function updateValues() {
            const distance = parseInt(distanceSlider.value);
            const costs = calculateCosts(distance);
    
            distanceValue.textContent = `${distance.toLocaleString()} km`;
            petrolCost.textContent = formatCurrency(costs.petrol);
            evCost.textContent = formatCurrency(costs.ev);
            savings.textContent = formatCurrency(costs.savings);
    
            updateSliderBackground();
        }
    
        distanceSlider.addEventListener('input', updateValues);
        updateValues(); // Initial calculation
    });







document.addEventListener('DOMContentLoaded', () => {
    const citySelect = document.getElementById('city-select');
    const mapFrame = document.getElementById('map-frame');

    // Map URLs for each city
    const cityMaps = {
        coimbatore: "https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d88976.94571762024!2d76.94144532376725!3d11.040247261520433!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sev%20charging%20station%2Ccoimbatore!5e0!3m2!1sen!2sin!4v1729881409146!5m2!1sen!2sin",
        erode: "https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d260040.666561789!2d77.58718015382519!3d11.305592558677796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sev%20charging%20stations%20erode!5e0!3m2!1sen!2sin!4v1729884517326!5m2!1sen!2sin",
        tiruppur: "https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d62509.02641316894!2d77.31002377646485!3d11.108159700000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sev%20charging%20station%20tiruppur!5e0!3m2!1sen!2sin!4v1709881531024!5m2!1sen!2sin",
        salem: "https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d62464.90052310114!2d78.09002377646485!3d11.651159700000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sev%20charging%20station%20salem!5e0!3m2!1sen!2sin!4v1709881531024!5m2!1sen!2sin",
        trichy: "https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d62703.44746635566!2d78.6640314094669!3d10.813954670139752!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sev%20charging%20stations%20trichy!5e0!3m2!1sen!2sin!4v1729885097122!5m2!1sen!2sin",
        madurai: "https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d62764.90052310114!2d78.09002377646485!3d9.921159700000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sev%20charging%20station%20madurai!5e0!3m2!1sen!2sin!4v1709881531024!5m2!1sen!2sin"
    };

    function updateMap(city) {
        // Update iframe source
        const iframe = mapFrame.querySelector('iframe');
        iframe.src = cityMaps[city];
    }

    // Add change event listener to select
    citySelect.addEventListener('change', (event) => {
        const selectedCity = event.target.value;
        updateMap(selectedCity);
    });
});