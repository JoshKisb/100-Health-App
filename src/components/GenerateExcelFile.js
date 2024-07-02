import * as XLSX from 'xlsx';
import {useParams} from "react-router-dom";

const generateExcelFile = (facilityId, validationData, area) => {
    const facilityData = validationData[facilityId];
    console.log("download data", facilityData);

    if (!facilityData) {
        console.error('No data found for facility:', facilityId);
        return;
    }

    const { records, data_values } = facilityData;
    console.log("records", records);
    console.log("data_values", data_values);

    // Define the worksheet data based on the template
    const worksheetData = [
        ['Program Area', ':', area],
        ['Facility', ':', facilityId],
        ['Total Number of Validations', ':', records.length],
        ['Total Passed', ':', records.filter(record => record[1] === 'Pass').length],
        ['Total Failed', ':', records.filter(record => record[1] === 'Fail').length],
        ['Total Null', ':', records.filter(record => record[1] === null).length],
        [],
        ['Validation', 'Pass/Failed/Null', 'Description', 'DataElements,CategoryOptionCombo', 'ID', 'Name', 'ID', 'Name', 'ID']
    ];

    // Append the records data
    records.forEach(record => {
        worksheetData.push([
            record[0], // Validation
            record[1], // Pass/Failed/Null
            record[2]  // Description
        ]);
    });

    //append data values
    // data_values.forEach(value => {
    // worksheetData.push([
    //     value.dataElement,
    //     value.categoryOptionCombo,
    //     value.attributeOptionCombo,
    //     value.value,
    //     value.period,
    //     value.orgUnit
    // ])
    // });


    // Combine data values into a single cell
    // const dataValuesString = data_values.map(value => {
    //     return `${value.dataElement}, ${value.categoryOptionCombo}, ${value.attributeOptionCombo}, ${value.value}, ${value.period}, ${value.orgUnit}`;
    // }).join('\n'); // Join with newline character for better readability
    //
    // // Append the combined data values into the same cell
    // worksheetData.push([dataValuesString]);
    //
    // Create a new worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

    // Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Validation Data');

    // Write the workbook to a file
    XLSX.writeFile(workbook, `${facilityId}_validation_data.xlsx`);
};

export default generateExcelFile;
