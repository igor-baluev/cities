'use strict';

const { assert } = require('./utils/index.js');
const { getPrintOutput, parseDataToTable } = require('./1-soc-opt-proc.js');

const testData = `city,population,area,density,country
  Shanghai,24256800,6340,3826,China
  Delhi,16787941,1484,11313,India
  Lagos,16060303,1171,13712,Nigeria
  Istanbul,14160467,5461,2593,Turkey
  Tokyo,13513734,2191,6168,Japan
  Sao Paulo,12038175,1521,7914,Brazil
  Mexico City,8874724,1486,5974,Mexico
  London,8673713,1572,5431,United Kingdom
  New York City,8537673,784,10892,United States
  Bangkok,8280925,1569,5279,Thailand`;

const testProc = () => {
  assert({
    testName: 'Data is parced from text',
    actual: () => {
      const config = {
        valueDelimiter: ',',
        rowDelimiter: '\n',
        sortKey: 'percentage',
        maxKey: 'density',
      };
      return parseDataToTable({ data: testData, config })[0].city;
    },
    expected: 'Shanghai',
  });

  assert({
    testName: 'Print output',
    actual: () => {
      const table = [
        {
          city: 'Kyiv',
          population: '3123000',
          area: 2356,
          density: 3089,
          country: 'Ukraine',
          percentage: 100,
        },
      ];
      const format = {
        city: { align: 'left', padding: 16 },
        population: { align: 'right', padding: 10 },
        area: { align: 'right', padding: 10 },
        density: { align: 'right', padding: 10 },
        country: { align: 'right', padding: 10 },
        percentage: { align: 'right', padding: 5 },
      };
      return getPrintOutput({ table, format });
    },
    expected: 'Kyiv               3123000      2356      3089   Ukraine  100',
  });
};

module.exports = testProc;
