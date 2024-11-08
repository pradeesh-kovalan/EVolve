const evModels = [
    {
        id: 'pro',
        name: 'EV S1 PRO',
        image: 'https://cdn.olaelectric.com/sites/evdp/pages/home_ipo/home_ipo_ola_s1_pro_web_271123.webp',
        range: '195km Range',
        acceleration: '0-40 km/h in 2.6 sec',
        warranty: '8-year Battery Warranty',
        monthlyPrice: '₹3,299/month',
        totalPrice: '₹1,14,999'
    },
    {
        id: 'air',
        name: 'EV S1 Air',
        image: 'https://cdn.olaelectric.com/sites/evdp/pages/home_ipo/home_ipo_ola_s1_air_web_271123.webp',
        range: '151km Range',
        acceleration: '0-40 km/h in 3.3 sec',
        warranty: '8-year Battery Warranty',
        monthlyPrice: '₹2,699/month',
        totalPrice: '₹1,00,999'
    },
    {
        id: 'x',
        name: 'EV S1X',
        image: 'https://cdn.olaelectric.com/sites/evdp/pages/home_ipo/home_ipo_ola_s1_x_web_271123.webp',
        range: '193km Range',
        acceleration: '0-40 km/h in 3.3 sec',
        warranty: '8-year Battery Warranty',
        monthlyPrice: '₹1,899/month',
        totalPrice: '₹74,999'
    },
    {
        id: 'x-1',
        name: 'EV S1X',
        image: 'https://cdn.olaelectric.com/sites/evdp/pages/home_ipo/home_ipo_ola_s1_x_web_271123.webp',
        range: '193km Range',
        acceleration: '0-40 km/h in 3.3 sec',
        warranty: '8-year Battery Warranty',
        monthlyPrice: '₹1,899/month',
        totalPrice: '₹74,999'
    },
    {
        id: 'x-2',
        name: 'EV S1X',
        image: 'https://cdn.olaelectric.com/sites/evdp/pages/home_ipo/home_ipo_ola_s1_x_web_271123.webp',
        range: '193km Range',
        acceleration: '0-40 km/h in 3.3 sec',
        warranty: '8-year Battery Warranty',
        monthlyPrice: '₹1,899/month',
        totalPrice: '₹74,999'
    },
    {
        id: 'x-3',
        name: 'EV S1X',
        image: 'https://cdn.olaelectric.com/sites/evdp/pages/home_ipo/home_ipo_ola_s1_x_web_271123.webp',
        range: '193km Range',
        acceleration: '0-40 km/h in 3.3 sec',
        warranty: '8-year Battery Warranty',
        monthlyPrice: '₹1,899/month',
        totalPrice: '₹74,999'
    }
];

class EVComparison {
    constructor() {
        this.selectedModels = [];
        this.init();
    }

    init() {
        this.renderCards();
        this.setupEventListeners();
    }

    renderCards() {
        const cardsContainer = document.getElementById('evCards');
        cardsContainer.innerHTML = evModels.map(model => this.createCardHTML(model)).join('');
    }

    createCardHTML(model) {
        return `
            <div class="s-1" data-id="${model.id}">
                <img src="${model.image}" alt="${model.name}" class="img-1">
                <div class="content-1">
                    <h1 class="headings-1">${model.name}</h1>
                    <p class="range">${model.range} | ${model.acceleration}</p>
                    <p class="warranty">${model.warranty}</p>
                    <div class="line"></div>
                    <p class="starts">Starting at</p>
                    <h3 class="price">${model.monthlyPrice}</h3>
                    <p class="price-1">OR ${model.totalPrice}</p>
                    <button class="compare-button" data-id="${model.id}">Select to Compare</button>
                    <button class="video-button">Video Brochure</button>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('compare-button')) {
                this.handleModelSelect(e.target.dataset.id);
            }
            if (e.target.classList.contains('remove-model')) {
                this.handleModelSelect(e.target.dataset.id);
            }
        });

        document.getElementById('compareBtn').addEventListener('click', () => {
            if (this.selectedModels.length === 2) {
                this.showComparison();
            }
        });

        document.getElementById('closeModal').addEventListener('click', () => {
            this.hideComparison();
        });

        document.getElementById('comparisonModal').addEventListener('click', (e) => {
            if (e.target === document.getElementById('comparisonModal')) {
                this.hideComparison();
            }
        });
    }

    handleModelSelect(modelId) {
        const index = this.selectedModels.indexOf(modelId);
        if (index > -1) {
            this.selectedModels.splice(index, 1);
        } else if (this.selectedModels.length < 2) {
            this.selectedModels.push(modelId);
        }

        this.updateUI();
    }

    updateUI() {
        // Update card states
        document.querySelectorAll('.s-1').forEach(card => {
            const id = card.dataset.id;
            const button = card.querySelector('.compare-button');
            if (this.selectedModels.includes(id)) {
                card.classList.add('selected');
                button.classList.add('selected');
                button.textContent = 'Selected for Comparison';
            } else {
                card.classList.remove('selected');
                button.classList.remove('selected');
                button.textContent = 'Select to Compare';
            }
        });

        // Update comparison bar
        const comparisonBar = document.getElementById('comparisonBar');
        const compareBtn = document.getElementById('compareBtn');
        const comparisonText = document.getElementById('comparisonText');
        const selectedModelsContainer = document.getElementById('selectedModels');
        
        
        if (this.selectedModels.length > 0) {
            comparisonBar.classList.add('visible');
            comparisonText.textContent = this.selectedModels.length === 1 
                ? 'Select 1 more model to compare'
                : 'Ready to compare!';
        
        selectedModelsContainer.innerHTML = this.selectedModels
            .map(id => {
                const model = evModels.find(m => m.id === id);
                return `
                    <div class="selected-model-tag">
                        <span>${model.name}</span>
                        <span class="remove-model" data-id="${id}">×</span>
                    </div>
                `;
            })
            .join('');
        
        compareBtn.disabled = this.selectedModels.length !== 2;
    } else {
        comparisonBar.classList.remove('visible');
    }
}

showComparison() {
    const modal = document.getElementById('comparisonModal');
    const grid = document.getElementById('comparisonGrid');
    const selectedModelsData = this.selectedModels.map(id => 
        evModels.find(model => model.id === id)
    );

    // Create comparison grid content
    let gridHTML = `
        <div></div>
        ${selectedModelsData.map(model => `
            <div class="text-center">
                <img src="${model.image}" alt="${model.name}">
                <div class="model-name">${model.name}</div>
            </div>
        `).join('')}
    `;

    // Add comparison rows
    const comparisonFields = [
        { label: 'Range', key: 'range' },
        { label: 'Acceleration', key: 'acceleration' },
        { label: 'Warranty', key: 'warranty' },
        { label: 'Monthly Price', key: 'monthlyPrice' },
        { label: 'Total Price', key: 'totalPrice' }
    ];

    comparisonFields.forEach(({ label, key }) => {
        gridHTML += `
            <div class="comparison-row">
                <div class="comparison-label">${label}</div>
                ${selectedModelsData.map(model => `
                    <div class="comparison-value">${model[key]}</div>
                `).join('')}
            </div>
        `;
    });

    grid.innerHTML = gridHTML;
    modal.classList.add('visible');
}

hideComparison() {
    document.getElementById('comparisonModal').classList.remove('visible');
}
}

// Initialize the comparison functionality
document.addEventListener('DOMContentLoaded', () => {
new EVComparison();
});