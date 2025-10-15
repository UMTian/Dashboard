// Dashboard initialization
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all charts and functionality
    initializeDashboard();
});

function initializeDashboard() {
    // Tab switching functionality
    setupTabSwitching();
    
    // Initialize all charts
    initializeCharts();
    
    // Setup interactive elements
    setupInteractivity();
    
    // Load initial data
    loadOverviewData();
}

// Tab Switching
function setupTabSwitching() {
    const navItems = document.querySelectorAll('.nav-item');
    const tabContents = document.querySelectorAll('.tab-content');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Update active nav item
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Show target tab content
            tabContents.forEach(tab => {
                tab.classList.remove('active');
                if (tab.id === targetTab) {
                    tab.classList.add('active');
                    
                    // Load data for the active tab
                    loadTabData(targetTab);
                }
            });
        });
    });
}

// Load data for specific tabs
function loadTabData(tabId) {
    switch(tabId) {
        case 'overview':
            loadOverviewData();
            break;
        case 'historical':
            loadHistoricalData();
            break;
        case 'forecasting':
            loadForecastingData();
            break;
        case 'inventory':
            loadInventoryData();
            break;
        case 'warehouses':
            loadWarehouseData();
            break;
        case 'alerts':
            loadAlertsData();
            break;
        case 'scenario':
            loadScenarioData();
            break;
        case 'reports':
            loadReportsData();
            break;
    }
}

// Chart Initialization
function initializeCharts() {
    // All charts will be created when their respective tabs are loaded
}

// Interactive Elements
function setupInteractivity() {
    // Model selector buttons
    const modelButtons = document.querySelectorAll('.model-btn');
    modelButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            modelButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            updateForecastModel(this.getAttribute('data-model'));
        });
    });
    
    // Forecast horizon slider
    const horizonSlider = document.getElementById('forecastHorizon');
    const horizonValue = document.getElementById('horizonValue');
    if (horizonSlider) {
        horizonSlider.addEventListener('input', function() {
            horizonValue.textContent = this.value;
            updateForecastHorizon(parseInt(this.value));
        });
    }
    
    // Scenario sliders
    setupScenarioSliders();
    
    // Alert filters
    setupAlertFilters();
    
    // Report filters
    setupReportFilters();
    
    // Export buttons
    setupExportButtons();
}

// Data Loading Functions
function loadOverviewData() {
    createSalesDemandChart();
    createStockStatusChart();
    // Map visualization would be implemented here
}

function loadHistoricalData() {
    createDemandTrendChart();
    createSeasonalityChart();
    createVariabilityChart();
    createLeadTimeChart();
}

function loadForecastingData() {
    createForecastChart();
    createAccuracyChart();
}

function loadInventoryData() {
    createInventorySafetyChart();
    createStockHealthChart();
}

function loadWarehouseData() {
    createWarehouseHeatmap();
    createFlowChart();
    // Geographic map would be implemented here
}

function loadAlertsData() {
    createPOChart();
    createBreachChart();
    populateAlertTable();
}

function loadScenarioData() {
    createScenarioChart();
    createSensitivityChart();
}

function loadReportsData() {
    createPreviewCharts();
}

// Chart Creation Functions
function createSalesDemandChart() {
    const ctx = document.getElementById('salesDemandChart').getContext('2d');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // Generate sample data
    const salesData = Array.from({length: 12}, () => Math.floor(Math.random() * 1000) + 500);
    const demandData = Array.from({length: 12}, () => Math.floor(Math.random() * 1000) + 500);
    const forecastData = Array.from({length: 12}, () => Math.floor(Math.random() * 1000) + 500);
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [
                {
                    label: 'Sales',
                    data: salesData,
                    borderColor: '#1E88E5',
                    backgroundColor: 'rgba(30, 136, 229, 0.1)',
                    tension: 0.4,
                    fill: false
                },
                {
                    label: 'Demand',
                    data: demandData,
                    borderColor: '#4CAF50',
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    tension: 0.4,
                    fill: false
                },
                {
                    label: 'Forecast',
                    data: forecastData,
                    borderColor: '#FF9800',
                    backgroundColor: 'rgba(255, 152, 0, 0.1)',
                    borderDash: [5, 5],
                    tension: 0.4,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Units'
                    }
                }
            }
        }
    });
}

function createStockStatusChart() {
    const ctx = document.getElementById('stockStatusChart').getContext('2d');
    const categories = ['Electronics', 'Apparel', 'Home Goods', 'Automotive', 'Toys'];
    
    const overstockData = Array.from({length: 5}, () => Math.floor(Math.random() * 100));
    const understockData = Array.from({length: 5}, () => Math.floor(Math.random() * 50));
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: categories,
            datasets: [
                {
                    label: 'Overstock',
                    data: overstockData,
                    backgroundColor: 'rgba(255, 152, 0, 0.7)',
                },
                {
                    label: 'Understock',
                    data: understockData,
                    backgroundColor: 'rgba(244, 67, 54, 0.7)',
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Units'
                    }
                }
            }
        }
    });
}

function createDemandTrendChart() {
    const ctx = document.getElementById('demandTrendChart').getContext('2d');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const demandData = Array.from({length: 12}, () => Math.floor(Math.random() * 1000) + 500);
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [
                {
                    label: 'Monthly Demand',
                    data: demandData,
                    borderColor: '#1E88E5',
                    backgroundColor: 'rgba(30, 136, 229, 0.1)',
                    fill: true,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Units'
                    }
                }
            }
        }
    });
}

function createSeasonalityChart() {
    const ctx = document.getElementById('seasonalityChart').getContext('2d');
    const years = ['2020', '2021', '2022', '2023'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // Generate sample heatmap data
    const data = {
        labels: months,
        datasets: years.map((year, i) => ({
            label: year,
            data: Array.from({length: 12}, () => Math.floor(Math.random() * 1000) + 500),
            backgroundColor: `rgba(30, 136, 229, ${0.3 + i * 0.2})`
        }))
    };
    
    new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                x: {
                    stacked: true,
                },
                y: {
                    stacked: true,
                    title: {
                        display: true,
                        text: 'Units'
                    }
                }
            }
        }
    });
}

function createVariabilityChart() {
    const ctx = document.getElementById('variabilityChart').getContext('2d');
    const categories = ['Electronics', 'Apparel', 'Home Goods', 'Automotive', 'Toys'];
    
    // Generate sample boxplot data (simplified)
    const datasets = categories.map(category => {
        const values = Array.from({length: 20}, () => Math.floor(Math.random() * 100) + 50);
        return {
            label: category,
            data: values,
            backgroundColor: 'rgba(30, 136, 229, 0.5)',
            borderColor: '#1E88E5',
            borderWidth: 1
        };
    });
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: categories,
            datasets: [{
                label: 'Demand Variability',
                data: datasets.map(d => {
                    const values = d.data;
                    const avg = values.reduce((a, b) => a + b, 0) / values.length;
                    return avg;
                }),
                backgroundColor: 'rgba(30, 136, 229, 0.7)',
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Average Units'
                    }
                }
            }
        }
    });
}

function createLeadTimeChart() {
    const ctx = document.getElementById('leadTimeChart').getContext('2d');
    
    // Generate sample lead time data
    const leadTimes = Array.from({length: 100}, () => Math.floor(Math.random() * 30) + 5);
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Array.from({length: 10}, (_, i) => `${i*3}-${(i+1)*3} days`),
            datasets: [{
                label: 'Supplier Lead Time',
                data: calculateHistogram(leadTimes, 3, 35),
                backgroundColor: 'rgba(30, 136, 229, 0.7)',
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Frequency'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Lead Time (days)'
                    }
                }
            }
        }
    });
}

function createForecastChart() {
    const ctx = document.getElementById('forecastChart').getContext('2d');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // Generate sample data
    const actualData = Array.from({length: 12}, () => Math.floor(Math.random() * 1000) + 500);
    const forecastData = Array.from({length: 12}, () => Math.floor(Math.random() * 1000) + 500);
    
    // Calculate confidence interval (simplified)
    const upperConfidence = forecastData.map(val => val * 1.1);
    const lowerConfidence = forecastData.map(val => val * 0.9);
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [
                {
                    label: 'Actual Demand',
                    data: actualData,
                    borderColor: '#1E88E5',
                    backgroundColor: 'rgba(30, 136, 229, 0.1)',
                    tension: 0.4,
                    fill: false
                },
                {
                    label: 'Forecast',
                    data: forecastData,
                    borderColor: '#4CAF50',
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    tension: 0.4,
                    fill: false
                },
                {
                    label: 'Confidence Interval',
                    data: upperConfidence,
                    borderColor: 'rgba(76, 175, 80, 0.3)',
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    borderDash: [5, 5],
                    fill: '-1',
                    pointRadius: 0
                },
                {
                    label: 'Lower Bound',
                    data: lowerConfidence,
                    borderColor: 'rgba(76, 175, 80, 0.3)',
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    borderDash: [5, 5],
                    pointRadius: 0,
                    fill: '-1'
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Units'
                    }
                }
            }
        }
    });
}

function createAccuracyChart() {
    const ctx = document.getElementById('accuracyChart').getContext('2d');
    const models = ['Moving Avg', 'ARIMA', 'Exponential', 'Neural Net'];
    
    const maeData = Array.from({length: 4}, () => Math.random() * 20 + 5);
    const rmseData = Array.from({length: 4}, () => Math.random() * 25 + 10);
    const mapeData = Array.from({length: 4}, () => Math.random() * 15 + 5);
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: models,
            datasets: [
                {
                    label: 'MAE',
                    data: maeData,
                    backgroundColor: 'rgba(30, 136, 229, 0.7)',
                },
                {
                    label: 'RMSE',
                    data: rmseData,
                    backgroundColor: 'rgba(76, 175, 80, 0.7)',
                },
                {
                    label: 'MAPE',
                    data: mapeData,
                    backgroundColor: 'rgba(255, 152, 0, 0.7)',
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Error Value'
                    }
                }
            }
        }
    });
}

function createInventorySafetyChart() {
    const ctx = document.getElementById('inventorySafetyChart').getContext('2d');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const inventoryData = Array.from({length: 12}, () => Math.floor(Math.random() * 1000) + 500);
    const safetyData = Array.from({length: 12}, () => Math.floor(Math.random() * 500) + 200);
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [
                {
                    label: 'Inventory',
                    data: inventoryData,
                    borderColor: '#1E88E5',
                    backgroundColor: 'rgba(30, 136, 229, 0.1)',
                    tension: 0.4,
                    fill: false
                },
                {
                    label: 'Safety Stock',
                    data: safetyData,
                    borderColor: '#4CAF50',
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    tension: 0.4,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Units'
                    }
                }
            }
        }
    });
}

function createStockHealthChart() {
    const ctx = document.getElementById('stockHealthChart').getContext('2d');
    const categories = ['Electronics', 'Apparel', 'Home Goods', 'Automotive', 'Toys'];
    
    const optimalData = Array.from({length: 5}, () => Math.floor(Math.random() * 100) + 50);
    const overstockData = Array.from({length: 5}, () => Math.floor(Math.random() * 50));
    const understockData = Array.from({length: 5}, () => Math.floor(Math.random() * 30));
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: categories,
            datasets: [
                {
                    label: 'Optimal',
                    data: optimalData,
                    backgroundColor: 'rgba(76, 175, 80, 0.7)',
                },
                {
                    label: 'Overstock',
                    data: overstockData,
                    backgroundColor: 'rgba(255, 152, 0, 0.7)',
                },
                {
                    label: 'Understock',
                    data: understockData,
                    backgroundColor: 'rgba(244, 67, 54, 0.7)',
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    stacked: true,
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Units'
                    }
                },
                x: {
                    stacked: true
                }
            }
        }
    });
}

function createWarehouseHeatmap() {
    const ctx = document.getElementById('warehouseHeatmap').getContext('2d');
    const warehouses = ['North', 'South', 'East', 'West', 'Central'];
    const products = ['Electronics', 'Apparel', 'Home Goods', 'Automotive', 'Toys'];
    
    // Generate sample heatmap data
    const data = {
        labels: products,
        datasets: warehouses.map((warehouse, i) => ({
            label: warehouse,
            data: Array.from({length: 5}, () => Math.floor(Math.random() * 1000) + 100),
            backgroundColor: `rgba(30, 136, 229, ${0.3 + i * 0.15})`
        }))
    };
    
    new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                x: {
                    stacked: true,
                },
                y: {
                    stacked: true,
                    title: {
                        display: true,
                        text: 'Units'
                    }
                }
            }
        }
    });
}

function createFlowChart() {
    const ctx = document.getElementById('flowChart').getContext('2d');
    const nodes = ['Supplier A', 'Supplier B', 'Warehouse N', 'Warehouse S', 'Retail E', 'Retail W'];
    
    // Generate sample flow data (simplified)
    const flowData = [
        [0, 0, 500, 300, 0, 0],
        [0, 0, 400, 200, 0, 0],
        [0, 0, 0, 100, 300, 200],
        [0, 0, 50, 0, 250, 150],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]
    ];
    
    // This is a simplified representation - a true Sankey diagram would require a specialized library
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: nodes,
            datasets: [{
                label: 'Inventory Flow',
                data: [900, 600, 650, 650, 550, 350],
                backgroundColor: 'rgba(30, 136, 229, 0.7)',
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Units'
                    }
                }
            }
        }
    });
}

function createPOChart() {
    const ctx = document.getElementById('poChart').getContext('2d');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const poData = Array.from({length: 12}, () => Math.floor(Math.random() * 50) + 10);
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: months,
            datasets: [{
                label: 'Purchase Orders',
                data: poData,
                backgroundColor: 'rgba(30, 136, 229, 0.7)',
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of POs'
                    }
                }
            }
        }
    });
}

function createBreachChart() {
    const ctx = document.getElementById('breachChart').getContext('2d');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const breachData = Array.from({length: 12}, () => Math.floor(Math.random() * 20) + 5);
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [{
                label: 'Threshold Breaches',
                data: breachData,
                borderColor: '#F44336',
                backgroundColor: 'rgba(244, 67, 54, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Breaches'
                    }
                }
            }
        }
    });
}

function createScenarioChart() {
    const ctx = document.getElementById('scenarioChart').getContext('2d');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const baselineData = Array.from({length: 12}, () => Math.floor(Math.random() * 1000) + 500);
    const scenarioData = baselineData.map(val => val * 1.1); // 10% increase
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [
                {
                    label: 'Baseline',
                    data: baselineData,
                    borderColor: '#1E88E5',
                    backgroundColor: 'rgba(30, 136, 229, 0.1)',
                    tension: 0.4,
                    fill: false
                },
                {
                    label: 'Scenario',
                    data: scenarioData,
                    borderColor: '#4CAF50',
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    tension: 0.4,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Units'
                    }
                }
            }
        }
    });
}

function createSensitivityChart() {
    const ctx = document.getElementById('sensitivityChart').getContext('2d');
    const factors = ['Demand', 'Lead Time', 'Carrying Cost', 'Stockout Cost', 'Supplier Reliability'];
    
    const sensitivityData = Array.from({length: 5}, () => Math.random() * 30 + 10);
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: factors,
            datasets: [{
                label: 'Sensitivity Impact',
                data: sensitivityData,
                backgroundColor: [
                    'rgba(30, 136, 229, 0.7)',
                    'rgba(76, 175, 80, 0.7)',
                    'rgba(255, 152, 0, 0.7)',
                    'rgba(244, 67, 54, 0.7)',
                    'rgba(156, 39, 176, 0.7)'
                ],
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Impact on Total Cost (%)'
                    }
                }
            }
        }
    });
}

function createPreviewCharts() {
    // Create mini charts for report previews
    const previewCtx1 = document.getElementById('previewChart1').getContext('2d');
    const previewCtx2 = document.getElementById('previewChart2').getContext('2d');
    const previewCtx3 = document.getElementById('previewChart3').getContext('2d');
    const previewCtx4 = document.getElementById('previewChart4').getContext('2d');
    
    const labels = ['Q1', 'Q2', 'Q3', 'Q4'];
    
    // Chart 1: Inventory Summary
    new Chart(previewCtx1, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Inventory',
                data: [1200, 1100, 1300, 1000],
                backgroundColor: 'rgba(30, 136, 229, 0.7)',
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    
    // Chart 2: Demand Forecast
    new Chart(previewCtx2, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Demand',
                data: [900, 950, 1100, 1050],
                borderColor: '#4CAF50',
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    
    // Chart 3: Stock Health
    new Chart(previewCtx3, {
        type: 'doughnut',
        data: {
            labels: ['Optimal', 'Overstock', 'Understock'],
            datasets: [{
                data: [70, 20, 10],
                backgroundColor: [
                    'rgba(76, 175, 80, 0.7)',
                    'rgba(255, 152, 0, 0.7)',
                    'rgba(244, 67, 54, 0.7)'
                ],
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
    
    // Chart 4: Warehouse Performance
    new Chart(previewCtx4, {
        type: 'bar',
        data: {
            labels: ['North', 'South', 'East', 'West'],
            datasets: [{
                label: 'Efficiency',
                data: [85, 92, 78, 88],
                backgroundColor: 'rgba(30, 136, 229, 0.7)',
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

// Helper Functions
function calculateHistogram(data, binSize, maxValue) {
    const histogram = Array(Math.ceil(maxValue / binSize)).fill(0);
    data.forEach(value => {
        const binIndex = Math.floor(value / binSize);
        if (binIndex < histogram.length) {
            histogram[binIndex]++;
        }
    });
    return histogram;
}

function populateAlertTable() {
    const tableBody = document.getElementById('alertTableBody');
    
    // Sample alert data
    const alerts = [
        { date: '2023-10-15', type: 'Stockout', severity: 'high', description: 'SKU A-123 below safety stock', status: 'Active' },
        { date: '2023-10-14', type: 'Overstock', severity: 'medium', description: 'SKU B-456 exceeds maximum level', status: 'Resolved' },
        { date: '2023-10-13', type: 'Lead Time', severity: 'medium', description: 'Supplier C delayed by 7 days', status: 'Active' },
        { date: '2023-10-12', type: 'Quality', severity: 'low', description: 'Minor quality issue with batch D-789', status: 'Resolved' },
        { date: '2023-10-11', type: 'Stockout', severity: 'high', description: 'SKU E-012 critical low stock', status: 'Active' }
    ];
    
    // Clear existing rows
    tableBody.innerHTML = '';
    
    // Add alert rows
    alerts.forEach(alert => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${alert.date}</td>
            <td>${alert.type}</td>
            <td class="alert-${alert.severity}">${alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}</td>
            <td>${alert.description}</td>
            <td>${alert.status}</td>
        `;
        tableBody.appendChild(row);
    });
}

function setupScenarioSliders() {
    const demandSlider = document.getElementById('demandSurge');
    const demandValue = document.getElementById('demandValue');
    const delaySlider = document.getElementById('supplierDelay');
    const delayValue = document.getElementById('delayValue');
    const variabilitySlider = document.getElementById('leadTimeVar');
    const variabilityValue = document.getElementById('variabilityValue');
    
    if (demandSlider) {
        demandSlider.addEventListener('input', function() {
            demandValue.textContent = `${this.value}%`;
            updateScenarioAnalysis();
        });
    }
    
    if (delaySlider) {
        delaySlider.addEventListener('input', function() {
            delayValue.textContent = `${this.value} days`;
            updateScenarioAnalysis();
        });
    }
    
    if (variabilitySlider) {
        variabilitySlider.addEventListener('input', function() {
            variabilityValue.textContent = `${this.value}%`;
            updateScenarioAnalysis();
        });
    }
}

function setupAlertFilters() {
    const searchInput = document.getElementById('alertSearch');
    const severityFilter = document.getElementById('severityFilter');
    
    if (searchInput) {
        searchInput.addEventListener('input', filterAlerts);
    }
    
    if (severityFilter) {
        severityFilter.addEventListener('change', filterAlerts);
    }
}

function filterAlerts() {
    // In a real application, this would filter the alert table
    // For this demo, we'll just repopulate the table
    populateAlertTable();
}

function setupReportFilters() {
    const applyButton = document.getElementById('applyFilters');
    
    if (applyButton) {
        applyButton.addEventListener('click', function() {
            // In a real application, this would apply the filters and update the report previews
            alert('Filters applied! In a real application, this would update the report data.');
        });
    }
}

function setupExportButtons() {
    const exportPDF = document.getElementById('exportPDF');
    const exportCSV = document.getElementById('exportCSV');
    const exportImage = document.getElementById('exportImage');
    
    if (exportPDF) {
        exportPDF.addEventListener('click', function() {
            alert('PDF export functionality would be implemented here.');
        });
    }
    
    if (exportCSV) {
        exportCSV.addEventListener('click', function() {
            alert('CSV export functionality would be implemented here.');
        });
    }
    
    if (exportImage) {
        exportImage.addEventListener('click', function() {
            alert('Image export functionality would be implemented here.');
        });
    }
}

function updateForecastModel(model) {
    // In a real application, this would update the forecast charts based on the selected model
    console.log(`Forecast model updated to: ${model}`);
}

function updateForecastHorizon(months) {
    // In a real application, this would update the forecast charts based on the selected horizon
    console.log(`Forecast horizon updated to: ${months} months`);
}

function updateScenarioAnalysis() {
    // In a real application, this would update the scenario analysis based on slider values
    console.log('Scenario analysis updated based on new parameters');
}
