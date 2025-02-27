/**
 *  Configurables
 */
const maxDataPoints = 100;   // Maximum data points to store & display
const monteCarloSampleSize = 25; // Size of the sample that the simulator should use



// Global data
const connectionData = []; // Raw data from the server
const successData = []; // Data to be passed to the chart
const failureData = []; // Data to be passed to the chart


import { runMonteCarloSimulation } from './monteCarloExample.mjs';
import { runMonteCarloSimulation2 } from './monteCarlo2.mjs';
import { runMonteCarloSimulation3 } from './monteCarlo3.mjs';
import { updateChartData } from './chart.mjs';


/**
 * Set up the socket & have it update the simulator and charts
 */ 
const socket = io('http://localhost:3000');
socket.on('connectionCounts', (data) => {
  connectionData.push(data);
  successData.push(data.successfulConnections);
  failureData.push(data.failedConnections);

  // Trim data thats beyond the limit
  if (successData.length > maxDataPoints) {
    connectionData.shift();
    successData.shift();
    failureData.shift();
  }


  const sliced10 = connectionData.slice(-10)
  updateChartData(successData, failureData);
  runMonteCarloSimulation(connectionData, monteCarloSampleSize);
  runMonteCarloSimulation2(sliced10, 5);
  runMonteCarloSimulation2(sliced10, 5);
});
