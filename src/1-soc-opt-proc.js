'use strict';

const getPrintOutput = ({ table, format }) => {
  let output = '';
  table.forEach((row) => {
    let tableRowSring = '';
    for (const key in row) {
      const { align, padding } = format[key];
      const padFn = align === 'left' ? 'padEnd' : 'padStart';
      tableRowSring += row[key].toString()[padFn](padding);
    }
    output += `${tableRowSring}\n`;
  });

  return output.trim();
};

const parseDataRow = ({ dataRow, keys, valueDelimiter }) => {
  const row = {};
  keys.forEach((key, index) => {
    row[key] = dataRow.split(valueDelimiter)[index].trim();
  });
  return row;
};

const addPercentageColumn = ({ table, maxKey }) => {
  const maxValue = Math.max(table.map((row) => parseInt(row[maxKey])));
  table.forEach((row) => {
    row.percentage = Math.round((row[maxKey] * 100) / maxValue);
  });
};

const parseDataToTable = ({ data, config }) => {
  const { sortKey, maxKey, rowDelimiter, valueDelimiter } = config;
  const dataSet = data.split(rowDelimiter);
  const keys = dataSet.shift().split(valueDelimiter);
  const table = dataSet.map((dataRow) =>
    parseDataRow({ dataRow, keys, valueDelimiter }),
  );
  addPercentageColumn({ table, maxKey });
  table.sort((a, b) => parseInt(b[sortKey]) - parseInt(a[sortKey]));
  return table;
};

const printData = ({ data, config, format }) => {
  const table = parseDataToTable({ data, config });
  console.log(getPrintOutput({ table, format }));
};

module.exports = {
  getPrintOutput,
  parseDataToTable,
  printData,
};
