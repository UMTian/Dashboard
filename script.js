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

// Technical Dashboard Charts and Functionality

// Failure Probability Timeline Chart
const failureTimelineCtx = document.getElementById('failureTimeline').getContext('2d');
const failureTimelineChart = new Chart(failureTimelineCtx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        datasets: [{
            label: 'Failure Probability',
            data: [12, 19, 15, 25, 22, 30, 28, 35, 42, 38],
            borderColor: '#e74c3c',
            backgroundColor: 'rgba(231, 76, 60, 0.1)',
            tension: 0.4,
            fill: true
        }, {
            label: 'Maintenance Threshold',
            data: [25, 25, 25, 25, 25, 25, 25, 25, 25, 25],
            borderColor: '#3498db',
            borderDash: [5, 5],
            fill: false
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                max: 50,
                title: {
                    display: true,
                    text: 'Probability (%)'
                }
            }
        }
    }
});

// Trend Analysis Chart
const trendAnalysisCtx = document.getElementById('trendAnalysis').getContext('2d');
const trendAnalysisChart = new Chart(trendAnalysisCtx, {
    type: 'bar',
    data: {
        labels: ['Vibration', 'Temperature', 'Pressure', 'Current', 'Voltage', 'Humidity'],
        datasets: [{
            label: 'Current Values',
            data: [4.2, 72, 3.8, 24.5, 415, 45],
            backgroundColor: [
                'rgba(52, 152, 219, 0.7)',
                'rgba(231, 76, 60, 0.7)',
                'rgba(243, 156, 18, 0.7)',
                'rgba(46, 204, 113, 0.7)',
                'rgba(155, 89, 182, 0.7)',
                'rgba(52, 73, 94, 0.7)'
            ],
            borderColor: [
                'rgb(52, 152, 219)',
                'rgb(231, 76, 60)',
                'rgb(243, 156, 18)',
                'rgb(46, 204, 113)',
                'rgb(155, 89, 182)',
                'rgb(52, 73, 94)'
            ],
            borderWidth: 1
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

// Modal Charts
const oeePerformanceCtx = document.getElementById('oeePerformanceChart').getContext('2d');
const oeePerformanceChart = new Chart(oeePerformanceCtx, {
    type: 'bar',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        datasets: [{
            label: 'Performance Rate',
            data: [85, 82, 88, 84, 87, 89, 86, 85, 87, 87.5],
            backgroundColor: 'rgba(52, 152, 219, 0.7)',
            borderColor: 'rgb(52, 152, 219)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                title: {
                    display: true,
                    text: 'Performance (%)'
                }
            }
        }
    }
});

const oeeQualityCtx = document.getElementById('oeeQualityChart').getContext('2d');
const oeeQualityChart = new Chart(oeeQualityCtx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        datasets: [{
            label: 'Quality Rate',
            data: [95, 96, 94, 97, 96, 98, 95, 96, 97, 96.8],
            borderColor: '#2ecc71',
            backgroundColor: 'rgba(46, 204, 113, 0.1)',
            tension: 0.4,
            fill: true
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                title: {
                    display: true,
                    text: 'Quality (%)'
                }
            }
        }
    }
});

const machineHealthCtx = document.getElementById('machineHealthChart').getContext('2d');
const machineHealthChart = new Chart(machineHealthCtx, {
    type: 'doughnut',
    data: {
        labels: ['Excellent', 'Good', 'Fair', 'Poor', 'Critical'],
        datasets: [{
            data: [35, 40, 15, 7, 3],
            backgroundColor: [
                '#2ecc71',
                '#3498db',
                '#f1c40f',
                '#e67e22',
                '#e74c3c'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom'
            }
        }
    }
});

const performanceTrendCtx = document.getElementById('performanceTrendChart').getContext('2d');
const performanceTrendChart = new Chart(performanceTrendCtx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        datasets: [{
            label: 'Performance Trend',
            data: [82, 84, 83, 85, 87, 86, 88, 87, 88, 88.7],
            borderColor: '#3498db',
            backgroundColor: 'rgba(52, 152, 219, 0.1)',
            tension: 0.4,
            fill: true
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                title: {
                    display: true,
                    text: 'Performance (%)'
                }
            }
        }
    }
});

// Sensor Charts
let accelerationChart, temperatureChart, frequencyChart, displacementChart;

function initializeSensorCharts() {
    const accelerationCtx = document.getElementById('accelerationChart').getContext('2d');
    accelerationChart = new Chart(accelerationCtx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Acceleration X',
                data: [],
                borderColor: '#e74c3c',
                backgroundColor: 'rgba(231, 76, 60, 0.1)',
                tension: 0.4,
                fill: true
            }, {
                label: 'Acceleration Y',
                data: [],
                borderColor: '#3498db',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                tension: 0.4,
                fill: true
            }, {
                label: 'Acceleration Z',
                data: [],
                borderColor: '#2ecc71',
                backgroundColor: 'rgba(46, 204, 113, 0.1)',
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
                }
            }
        }
    });
    
    const temperatureCtx = document.getElementById('temperatureChart').getContext('2d');
    temperatureChart = new Chart(temperatureCtx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Temperature',
                data: [],
                borderColor: '#e67e22',
                backgroundColor: 'rgba(230, 126, 34, 0.1)',
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
                        text: 'Temperature (°C)'
                    }
                }
            }
        }
    });
    
    const frequencyCtx = document.getElementById('frequencyChart').getContext('2d');
    frequencyChart = new Chart(frequencyCtx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Frequency',
                data: [],
                borderColor: '#9b59b6',
                backgroundColor: 'rgba(155, 89, 182, 0.1)',
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
                        text: 'Frequency (Hz)'
                    }
                }
            }
        }
    });
    
    const displacementCtx = document.getElementById('displacementChart').getContext('2d');
    displacementChart = new Chart(displacementCtx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Displacement X',
                data: [],
                borderColor: '#34495e',
                backgroundColor: 'rgba(52, 73, 94, 0.1)',
                tension: 0.4,
                fill: true
            }, {
                label: 'Displacement Y',
                data: [],
                borderColor: '#f1c40f',
                backgroundColor: 'rgba(241, 196, 15, 0.1)',
                tension: 0.4,
                fill: true
            }, {
                label: 'Displacement Z',
                data: [],
                borderColor: '#16a085',
                backgroundColor: 'rgba(22, 160, 133, 0.1)',
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
                        text: 'Displacement'
                    }
                }
            }
        }
    });
    
    // Initialize with YANKI_R data
    updateSensorCharts('YANKI_R');
}

function updateSensorCharts(sensorId) {
    // Generate sample data based on sensor ID
    const timeLabels = generateTimeLabels(10);
    const accelXData = generateRandomData(1.0, 1.5, 10);
    const accelYData = generateRandomData(1.2, 1.7, 10);
    const accelZData = generateRandomData(1.1, 1.6, 10);
    const tempData = generateRandomData(50, 60, 10);
    const freqData = generateRandomData(200, 300, 10);
    const dispXData = generateRandomData(0, 2, 10);
    const dispYData = generateRandomData(0, 2, 10);
    const dispZData = generateRandomData(0, 2, 10);
    
    // Update acceleration chart
    accelerationChart.data.labels = timeLabels;
    accelerationChart.data.datasets[0].data = accelXData;
    accelerationChart.data.datasets[1].data = accelYData;
    accelerationChart.data.datasets[2].data = accelZData;
    accelerationChart.update();
    
    // Update temperature chart
    temperatureChart.data.labels = timeLabels;
    temperatureChart.data.datasets[0].data = tempData;
    temperatureChart.update();
    
    // Update frequency chart
    frequencyChart.data.labels = timeLabels;
    frequencyChart.data.datasets[0].data = freqData;
    frequencyChart.update();
    
    // Update displacement chart
    displacementChart.data.labels = timeLabels;
    displacementChart.data.datasets[0].data = dispXData;
    displacementChart.data.datasets[1].data = dispYData;
    displacementChart.data.datasets[2].data = dispZData;
    displacementChart.update();
    
    // Update modal title to show selected sensor
    document.querySelector('#sensors-modal .modal-title').innerHTML = 
        `<i class="fas fa-microchip"></i> Sensor Data Analysis - ${sensorId}`;
}

function generateTimeLabels(count) {
    const labels = [];
    const now = new Date();
    for (let i = count - 1; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 60000);
        labels.push(time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
    }
    return labels;
}

function generateRandomData(min, max, count) {
    const data = [];
    for (let i = 0; i < count; i++) {
        data.push(+(min + Math.random() * (max - min)).toFixed(2));
    }
    return data;
}

// Modal functionality
document.querySelectorAll('.technical-card').forEach(card => {
    card.addEventListener('click', () => {
        const modalId = card.getAttribute('data-modal');
        if (modalId) {
            document.getElementById(modalId).style.display = 'block';
            
            // If it's the sensors modal, initialize sensor charts
            if (modalId === 'sensors-modal') {
                initializeSensorCharts();
            }
        }
    });
});

// Sensor card functionality
document.querySelectorAll('.sensor-card').forEach(card => {
    card.addEventListener('click', () => {
        document.getElementById('sensors-modal').style.display = 'block';
        initializeSensorCharts();
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

// Sensor selection functionality
document.querySelectorAll('#sensors-modal .sensor-item').forEach(sensor => {
    sensor.addEventListener('click', () => {
        const sensorId = sensor.getAttribute('data-sensor');
        updateSensorCharts(sensorId);
    });
});

// Simulate real-time updates for sensor data
function updateSensorData() {
    const vibrationValue = (3.8 + Math.random() * 0.8).toFixed(1);
    const temperatureValue = Math.floor(70 + Math.random() * 5);
    const pressureValue = (3.5 + Math.random() * 0.6).toFixed(1);
    const currentValue = (23.5 + Math.random() * 2).toFixed(1);
    
    // Update sensor items in technical dashboard
    const sensorItems = document.querySelectorAll('.technical-dashboard .sensor-item');
    if (sensorItems.length > 0) {
        sensorItems[0].querySelector('.sensor-value').textContent = vibrationValue + ' mm/s';
        sensorItems[1].querySelector('.sensor-value').textContent = temperatureValue + '°C';
        sensorItems[2].querySelector('.sensor-value').textContent = pressureValue + ' Bar';
        sensorItems[4].querySelector('.sensor-value').textContent = currentValue + ' A';
    }
    
    // Update charts with new data
    const newData = failureTimelineChart.data.datasets[0].data;
    newData.push(Math.floor(30 + Math.random() * 20));
    newData.shift();
    failureTimelineChart.update();
    
    const trendData = trendAnalysisChart.data.datasets[0].data;
    trendData[0] = parseFloat(vibrationValue);
    trendData[1] = temperatureValue;
    trendData[2] = parseFloat(pressureValue);
    trendData[3] = parseFloat(currentValue);
    trendAnalysisChart.update();
}

// Update sensor data every 5 seconds
setInterval(updateSensorData, 5000);
