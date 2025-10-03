// Dashboard switching functionality
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetTab = this.getAttribute('data-tab');
        
        // Update active state in sidebar
        document.querySelectorAll('.nav-links li').forEach(li => {
            li.classList.remove('active');
        });
        this.parentElement.classList.add('active');
        
        // Show/hide dashboards
        document.querySelectorAll('.dashboard-content, .technical-dashboard').forEach(dashboard => {
            dashboard.classList.remove('active');
        });
        
        if (targetTab === 'c-level') {
            document.getElementById('c-level').classList.add('active');
        } else if (targetTab === 'technical') {
            document.getElementById('technical').classList.add('active');
            // Initialize technical charts when dashboard is shown
            setTimeout(initializeTechnicalCharts, 100);
        }
    });
});

// Update date and time
function updateDateTime() {
    const now = new Date();
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('current-date').textContent = now.toLocaleDateString('en-US', dateOptions);
    
    // Set last updated to current time
    const timeOptions = { hour: '2-digit', minute: '2-digit' };
    document.getElementById('last-updated').textContent = now.toLocaleTimeString('en-US', timeOptions);
}

updateDateTime();
setInterval(updateDateTime, 60000); // Update every minute

// Machine Health Index Chart
const healthCtx = document.getElementById('healthChart').getContext('2d');
const healthChart = new Chart(healthCtx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [{
            label: 'Machine Health Index',
            data: [88, 85, 87, 90, 89, 91, 92],
            borderColor: '#2ecc71',
            backgroundColor: 'rgba(46, 204, 113, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                min: 80,
                max: 100,
                ticks: {
                    callback: function(value) {
                        return value + '%';
                    }
                }
            }
        }
    }
});

// Downtime Impact Chart
const downtimeCtx = document.getElementById('downtimeChart').getContext('2d');
const downtimeChart = new Chart(downtimeCtx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Lost Production Hours',
                data: [24, 18, 22, 15, 20, 18.5],
                borderColor: '#e74c3c',
                backgroundColor: 'rgba(231, 76, 60, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            },
            {
                label: 'Predictive Savings',
                data: [8, 10, 12, 14, 16, 15],
                borderColor: '#2ecc71',
                backgroundColor: 'rgba(46, 204, 113, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Hours'
                }
            }
        }
    }
});

// Cost Impact Chart
const costCtx = document.getElementById('costChart').getContext('2d');
const costChart = new Chart(costCtx, {
    type: 'doughnut',
    data: {
        labels: ['Maintenance', 'Downtime', 'Repairs', 'Spare Parts', 'Energy Loss'],
        datasets: [{
            data: [45200, 52500, 18000, 32400, 17300],
            backgroundColor: [
                '#3498db',
                '#e74c3c',
                '#f39c12',
                '#9b59b6',
                '#1abc9c'
            ],
            borderWidth: 0
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom'
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const label = context.label || '';
                        const value = context.raw || 0;
                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                        const percentage = Math.round((value / total) * 100);
                        return `${label}: $${value.toLocaleString()} (${percentage}%)`;
                    }
                }
            }
        }
    }
});

// Add interactivity to heatmap items
document.querySelectorAll('.heatmap-item').forEach(item => {
    item.addEventListener('click', function() {
        const componentName = this.getAttribute('title');
        alert(`Component: ${componentName}\nCriticality: ${this.classList.contains('criticality-A') ? 'A - Immediate stop risk' : 
            this.classList.contains('criticality-B') ? 'B - Throughput/quality risk' : 'C - Efficiency risk'}`);
    });
});

// Simulate real-time updates
function simulateUpdates() {
    // Randomly update OEE value
    const oeeValue = document.querySelector('.stats-cards .card:first-child .card-value');
    const currentOEE = parseFloat(oeeValue.textContent);
    const newOEE = (currentOEE + (Math.random() * 0.4 - 0.2)).toFixed(1);
    oeeValue.textContent = newOEE + '%';
    
    // Update last updated time
    updateDateTime();
}

// Update every 30 seconds
setInterval(simulateUpdates, 30000);

// ===== TECHNICAL DASHBOARD CHARTS =====

let technicalCharts = {};

function initializeTechnicalCharts() {
    // FFT Spectrum Chart
    const fftCtx = document.getElementById('fftChart').getContext('2d');
    technicalCharts.fftChart = new Chart(fftCtx, {
        type: 'bar',
        data: {
            labels: ['10Hz', '25Hz', '50Hz', '100Hz', '200Hz', '500Hz', '1kHz', '2kHz'],
            datasets: [{
                label: 'Vibration Amplitude',
                data: [0.8, 1.2, 1.8, 2.1, 1.5, 0.9, 0.7, 0.5],
                backgroundColor: [
                    '#2ecc71', '#2ecc71', '#f39c12', '#e74c3c',
                    '#f39c12', '#2ecc71', '#2ecc71', '#2ecc71'
                ],
                borderColor: '#34495e',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Amplitude (g)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Frequency'
                    }
                }
            }
        }
    });

    // Time Domain Vibration Chart
    const timeDomainCtx = document.getElementById('timeDomainChart').getContext('2d');
    technicalCharts.timeDomainChart = new Chart(timeDomainCtx, {
        type: 'line',
        data: {
            labels: ['00:00', '00:01', '00:02', '00:03', '00:04', '00:05'],
            datasets: [{
                label: 'Acceleration',
                data: [1.1, 1.15, 1.21, 1.18, 1.25, 1.22],
                borderColor: '#e74c3c',
                backgroundColor: 'rgba(231, 76, 60, 0.1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Acceleration (g)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Time'
                    }
                }
            }
        }
    });

    // Temperature Chart
    const tempCtx = document.getElementById('temperatureChart').getContext('2d');
    technicalCharts.temperatureChart = new Chart(tempCtx, {
        type: 'line',
        data: {
            labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
            datasets: [{
                label: 'Current Temperature',
                data: [48, 49, 51, 53, 52, 50],
                borderColor: '#e67e22',
                backgroundColor: 'rgba(230, 126, 34, 0.1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true
            }, {
                label: 'Historical Baseline',
                data: [46, 47, 49, 50, 49, 48],
                borderColor: '#95a5a6',
                borderDash: [5, 5],
                borderWidth: 1,
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Temperature (°C)'
                    }
                }
            }
        }
    });

    // Current Gauge Chart
    const gaugeCtx = document.getElementById('currentGauge').getContext('2d');
    technicalCharts.currentGauge = new Chart(gaugeCtx, {
        type: 'doughnut',
        data: {
            labels: ['Load', 'Remaining'],
            datasets: [{
                data: [72, 28],
                backgroundColor: ['#3498db', '#ecf0f1'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false
                }
            }
        }
    });

    // Current Trend Chart
    const currentTrendCtx = document.getElementById('currentTrendChart').getContext('2d');
    technicalCharts.currentTrendChart = new Chart(currentTrendCtx, {
        type: 'line',
        data: {
            labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
            datasets: [{
                label: 'Current Load',
                data: [68, 70, 72, 75, 71, 69],
                borderColor: '#9b59b6',
                backgroundColor: 'rgba(155, 89, 182, 0.1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Current (%)'
                    }
                }
            }
        }
    });

    // Anomaly Scatter Chart
    const anomalyScatterCtx = document.getElementById('anomalyScatterChart').getContext('2d');
    technicalCharts.anomalyScatterChart = new Chart(anomalyScatterCtx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Normal',
                data: [
                    {x: 1.1, y: 45}, {x: 1.2, y: 48}, {x: 1.0, y: 46},
                    {x: 1.3, y: 50}, {x: 1.1, y: 47}, {x: 1.2, y: 49}
                ],
                backgroundColor: '#2ecc71',
                pointRadius: 6
            }, {
                label: 'Anomalies',
                data: [
                    {x: 2.1, y: 58}, {x: 1.8, y: 62}, {x: 3.5, y: 55}
                ],
                backgroundColor: '#e74c3c',
                pointRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Vibration (g)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Temperature (°C)'
                    }
                }
            }
        }
    });

    // Failure Probability Chart
    const failureProbCtx = document.getElementById('failureProbabilityChart').getContext('2d');
    technicalCharts.failureProbabilityChart = new Chart(failureProbCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Failure Probability',
                data: [5, 8, 12, 15, 18, 22, 25, 28, 32, 35, 38, 42],
                borderColor: '#e74c3c',
                backgroundColor: 'rgba(231, 76, 60, 0.1)',
                borderWidth: 3,
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Probability (%)'
                    }
                }
            }
        }
    });

    // Inventory Chart
    const inventoryCtx = document.getElementById('inventoryChart').getContext('2d');
    technicalCharts.inventoryChart = new Chart(inventoryCtx, {
        type: 'bar',
        data: {
            labels: ['Bearing', 'Belt', 'Seal', 'Coupling', 'Sensor'],
            datasets: [{
                label: 'Current Stock',
                data: [2, 3, 8, 5, 12],
                backgroundColor: [
                    '#e74c3c', '#f39c12', '#2ecc71', '#3498db', '#9b59b6'
                ],
                borderWidth: 0
            }, {
                label: 'Minimum Required',
                data: [5, 5, 5, 3, 8],
                backgroundColor: 'rgba(52, 73, 94, 0.3)',
                borderWidth: 0,
                type: 'bar'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Multi Trend Chart
    const multiTrendCtx = document.getElementById('multiTrendChart').getContext('2d');
    technicalCharts.multiTrendChart = new Chart(multiTrendCtx, {
        type: 'line',
        data: {
            labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
            datasets: [{
                label: 'Vibration',
                data: [1.1, 1.15, 1.21, 1.18, 1.25, 1.22],
                borderColor: '#e74c3c',
                backgroundColor: 'rgba(231, 76, 60, 0.1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true,
                yAxisID: 'y'
            }, {
                label: 'Temperature',
                data: [48, 49, 51, 53, 52, 50],
                borderColor: '#e67e22',
                backgroundColor: 'rgba(230, 126, 34, 0.1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true,
                yAxisID: 'y1'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Vibration (g)'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Temperature (°C)'
                    },
                    grid: {
                        drawOnChartArea: false
                    }
                }
            }
        }
    });

    // Correlation Heatmap
    const correlationHeatmapCtx = document.getElementById('correlationHeatmap').getContext('2d');
    technicalCharts.correlationHeatmap = new Chart(correlationHeatmapCtx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Operation Points',
                data: [
                    {x: 60, y: 1.0}, {x: 70, y: 1.1}, {x: 80, y: 1.3},
                    {x: 85, y: 1.8}, {x: 90, y: 2.2}, {x: 95, y: 2.8},
                    {x: 100, y: 3.5}
                ],
                backgroundColor: [
                    '#2ecc71', '#2ecc71', '#f39c12',
                    '#f39c12', '#e74c3c', '#e74c3c', '#c0392b'
                ],
                pointRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Machine Speed (%)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Vibration (g)'
                    }
                }
            }
        }
    });

    // Sensor Detail Chart
    const sensorDetailCtx = document.getElementById('sensorDetailChart').getContext('2d');
    technicalCharts.sensorDetailChart = new Chart(sensorDetailCtx, {
        type: 'line',
        data: {
            labels: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00'],
            datasets: [{
                label: 'Sensor Signal',
                data: [1.1, 1.15, 1.21, 1.18, 1.25, 1.22],
                borderColor: '#3498db',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Signal Value'
                    }
                }
            }
        }
    });

    console.log('All technical charts initialized!');
}

// ===== INTERACTIVITY =====

// Machine Tabs
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('machine-tab')) {
        const tabs = document.querySelectorAll('.machine-tab');
        tabs.forEach(tab => tab.classList.remove('active'));
        e.target.classList.add('active');
        
        // Update charts based on selected machine
        updateMachineCharts(e.target.dataset.machine);
    }
});

function updateMachineCharts(machine) {
    // This would update charts based on selected machine
    console.log('Switching to machine:', machine);
}

// Vibration Sensor Selector
document.getElementById('vibrationSensorSelect').addEventListener('change', function(e) {
    updateVibrationChart(e.target.value);
});

function updateVibrationChart(sensor) {
    if (!technicalCharts.timeDomainChart) return;
    
    // Simulate different sensor data
    const data = sensor === 'yankee_r' 
        ? [1.1, 1.15, 1.21, 1.18, 1.25, 1.22]
        : [1.3, 1.35, 1.41, 1.38, 1.45, 1.42];
    
    technicalCharts.timeDomainChart.data.datasets[0].data = data;
    technicalCharts.timeDomainChart.update();
}

// Temperature Time Range
document.getElementById('tempTimeRange').addEventListener('change', function(e) {
    // This would update temperature chart time range
    console.log('Time range changed to:', e.target.value);
});

// Component Select for RUL
document.getElementById('componentSelect').addEventListener('change', function(e) {
    updateRULChart(e.target.value);
});

function updateRULChart(component) {
    if (!technicalCharts.failureProbabilityChart) return;
    
    // Simulate different failure probability data
    const data = {
        'dryer_bearing': [5, 8, 12, 15, 18, 22, 25, 28, 32, 35, 38, 42],
        'press_roll': [3, 5, 8, 12, 15, 18, 20, 23, 26, 29, 32, 35],
        'yankee_cylinder': [2, 3, 5, 7, 10, 13, 16, 19, 22, 25, 28, 31]
    };
    
    technicalCharts.failureProbabilityChart.data.datasets[0].data = data[component] || data['dryer_bearing'];
    technicalCharts.failureProbabilityChart.update();
    
    // Update RUL display
    const rulValues = {
        'dryer_bearing': 142,
        'press_roll': 87,
        'yankee_cylinder': 215
    };
    
    const healthIndex = {
        'dryer_bearing': 78,
        'press_roll': 65,
        'yankee_cylinder': 85
    };
    
    document.querySelector('.rul-value').textContent = rulValues[component] || 142;
    document.querySelector('.index-value').textContent = healthIndex[component] || 78;
}

// Correlation Type Selector
document.getElementById('correlationType').addEventListener('change', function(e) {
    updateCorrelationChart(e.target.value);
});

function updateCorrelationChart(type) {
    if (!technicalCharts.correlationHeatmap) return;
    
    const chart = technicalCharts.correlationHeatmap;
    
    switch(type) {
        case 'vibration-temp':
            chart.data.datasets[0].data = [
                {x: 45, y: 1.0}, {x: 48, y: 1.1}, {x: 50, y: 1.3},
                {x: 52, y: 1.5}, {x: 54, y: 1.7}, {x: 56, y: 1.9},
                {x: 58, y: 2.1}
            ];
            chart.options.scales.x.title.text = 'Temperature (°C)';
            chart.options.scales.y.title.text = 'Vibration (g)';
            break;
        case 'speed-failure':
            chart.data.datasets[0].data = [
                {x: 60, y: 5}, {x: 70, y: 8}, {x: 80, y: 15},
                {x: 85, y: 25}, {x: 90, y: 45}, {x: 95, y: 65},
                {x: 100, y: 85}
            ];
            chart.options.scales.x.title.text = 'Machine Speed (%)';
            chart.options.scales.y.title.text = 'Failure Probability (%)';
            break;
        case 'load-vibration':
            chart.data.datasets[0].data = [
                {x: 50, y: 0.8}, {x: 60, y: 1.0}, {x: 70, y: 1.2},
                {x: 80, y: 1.4}, {x: 90, y: 1.6}, {x: 95, y: 1.8},
                {x: 100, y: 2.0}
            ];
            chart.options.scales.x.title.text = 'Load (%)';
            chart.options.scales.y.title.text = 'Vibration (g)';
            break;
    }
    
    chart.update();
}

// FMECA Table Interactions
document.querySelectorAll('.fmeca-table tbody tr').forEach(row => {
    row.addEventListener('click', function() {
        const component = this.cells[0].textContent;
        const failureMode = this.cells[1].textContent;
        const effect = this.cells[2].textContent;
        const rpn = this.cells[3].textContent;
        
        const detailsContent = `
            <h4>${component}</h4>
            <p><strong>Failure Mode:</strong> ${failureMode}</p>
            <p><strong>Effect:</strong> ${effect}</p>
            <p><strong>Risk Priority Number:</strong> ${rpn}</p>
            <div class="historical-incidents">
                <h5>Historical Incidents</h5>
                <ul>
                    <li>2024-01-15: Bearing replacement due to wear</li>
                    <li>2024-03-22: Vibration spike detected</li>
                </ul>
            </div>
        `;
        
        document.querySelector('.details-content').innerHTML = detailsContent;
    });
});

// Root Cause Explorer
let currentLevel = 'machine';
const explorerTree = {
    'yankee': ['yankee_bearing', 'yankee_cylinder'],
    'refiners': ['refiner_motor', 'refiner_blades'],
    'press': ['press_roll', 'press_felt'],
    'yankee_bearing': ['vibration_sensor', 'temp_sensor'],
    'yankee_cylinder': ['surface_sensor', 'temp_sensor']
};

document.querySelectorAll('.tree-node').forEach(node => {
    node.addEventListener('click', function() {
        const target = this.dataset.target;
        
        // Update breadcrumb
        updateBreadcrumb(target);
        
        // Show appropriate level
        showTreeLevel(target);
        
        // Update sensor dashboard if at component level
        if (target.includes('sensor')) {
            showSensorDashboard(target);
        }
    });
});

function updateBreadcrumb(target) {
    const breadcrumb = document.getElementById('explorerBreadcrumb');
    let breadcrumbHTML = '<span class="breadcrumb-item" data-level="machine">Machine Level</span>';
    
    if (target.includes('_')) {
        breadcrumbHTML += ' <i class="fas fa-chevron-right"></i> <span class="breadcrumb-item" data-level="subsystem">Subsystem</span>';
    }
    
    if (target.includes('sensor')) {
        breadcrumbHTML += ' <i class="fas fa-chevron-right"></i> <span class="breadcrumb-item active" data-level="component">Component</span>';
    } else {
        breadcrumbHTML += ' <span class="breadcrumb-item active">' + getDisplayName(target) + '</span>';
    }
    
    breadcrumb.innerHTML = breadcrumbHTML;
    
    // Add click events to breadcrumb items
    breadcrumb.querySelectorAll('.breadcrumb-item').forEach(item => {
        item.addEventListener('click', function() {
            const level = this.dataset.level;
            if (level) {
                showTreeLevel(level);
                updateBreadcrumb(level);
            }
        });
    });
}

function showTreeLevel(target) {
    // Hide all levels
    document.querySelectorAll('.tree-level').forEach(level => {
        level.classList.add('hidden');
    });
    
    // Show appropriate level
    if (target === 'machine' || !target.includes('_')) {
        document.querySelector('.machine-level').classList.remove('hidden');
        currentLevel = 'machine';
    } else if (target.includes('sensor')) {
        document.querySelector('.component-level').classList.remove('hidden');
        currentLevel = 'component';
    } else {
        document.querySelector('.subsystem-level').classList.remove('hidden');
        currentLevel = 'subsystem';
    }
}

function showSensorDashboard(sensor) {
    document.querySelector('.dashboard-placeholder').classList.add('hidden');
    document.querySelector('.sensor-dashboard').classList.remove('hidden');
    
    const sensorTitle = document.getElementById('sensorTitle');
    const sensorId = document.querySelector('.sensor-id');
    
    sensorTitle.textContent = getDisplayName(sensor) + ' Analysis';
    sensorId.textContent = 'ID: ' + sensor.toUpperCase();
    
    // Update sensor chart data
    if (technicalCharts.sensorDetailChart) {
        // Simulate different sensor data
        const data = sensor === 'vibration_sensor' 
            ? [1.1, 1.15, 1.21, 1.18, 1.25, 1.22]
            : [48, 49, 51, 53, 52, 50];
        
        technicalCharts.sensorDetailChart.data.datasets[0].data = data;
        technicalCharts.sensorDetailChart.data.datasets[0].label = getDisplayName(sensor);
        technicalCharts.sensorDetailChart.update();
    }
}

function getDisplayName(key) {
    const names = {
        'yankee': 'Yankee Dryer',
        'refiners': 'Refiners',
        'press': 'Press Section',
        'yankee_bearing': 'Bearing Assembly',
        'yankee_cylinder': 'Cylinder Surface',
        'vibration_sensor': 'Vibration Sensor',
        'temp_sensor': 'Temperature Sensor',
        'surface_sensor': 'Surface Sensor'
    };
    
    return names[key] || key;
}

// Schedule Maintenance Buttons
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('schedule-btn') || e.target.closest('.schedule-btn')) {
        const button = e.target.classList.contains('schedule-btn') ? e.target : e.target.closest('.schedule-btn');
        const taskTitle = button.closest('.task-item').querySelector('.task-title').textContent;
        alert(`Scheduling maintenance: ${taskTitle}\n\nThis would open a scheduling dialog in a real application.`);
    }
});

// Drill Down Buttons
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('drill-down') || e.target.closest('.drill-down')) {
        const button = e.target.classList.contains('drill-down') ? e.target : e.target.closest('.drill-down');
        const anomalyTitle = button.closest('.anomaly-item').querySelector('.anomaly-title').textContent;
        alert(`Drilling down into: ${anomalyTitle}\n\nThis would show detailed analysis for this specific anomaly.`);
    }
});

// Export FMECA
document.getElementById('exportFmeca').addEventListener('click', function() {
    alert('Exporting FMECA Analysis...\n\nReport would be generated and downloaded in PDF format.');
});

// Initialize technical charts if technical dashboard is active on page load
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('technical').classList.contains('active')) {
        setTimeout(initializeTechnicalCharts, 100);
    }
    
    // Initialize RUL for default component
    updateRULChart('dryer_bearing');
});

// Modal functionality (existing)
document.querySelectorAll('.technical-card').forEach(card => {
    card.addEventListener('click', () => {
        const modalId = card.getAttribute('data-modal');
        if (modalId) {
            document.getElementById(modalId).style.display = 'block';
        }
    });
});

// Close modal functionality
document.querySelectorAll('.close-modal').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        closeBtn.closest('.modal').style.display = 'none';
    });
});

// Close modal when clicking outside content
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
    }
});
