// Tab functionality
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs and dashboards
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.dashboard').forEach(d => d.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding dashboard
        tab.classList.add('active');
        document.getElementById(tab.getAttribute('data-tab')).classList.add('active');
    });
});

// Modal functionality
document.querySelectorAll('.card').forEach(card => {
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

// Simulate real-time updates for sensor data
function updateSensorData() {
    const vibrationValue = (3.8 + Math.random() * 0.8).toFixed(1);
    const temperatureValue = Math.floor(70 + Math.random() * 5);
    const pressureValue = (3.5 + Math.random() * 0.6).toFixed(1);
    const currentValue = (23.5 + Math.random() * 2).toFixed(1);
    
    document.querySelectorAll('.sensor-item')[0].querySelector('.sensor-value').textContent = vibrationValue + ' mm/s';
    document.querySelectorAll('.sensor-item')[1].querySelector('.sensor-value').textContent = temperatureValue + '°C';
    document.querySelectorAll('.sensor-item')[2].querySelector('.sensor-value').textContent = pressureValue + ' Bar';
    document.querySelectorAll('.sensor-item')[4].querySelector('.sensor-value').textContent = currentValue + ' A';
    
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