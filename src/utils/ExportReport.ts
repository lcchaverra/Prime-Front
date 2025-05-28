import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

export const ExportReports = (data:any, fileName='Reporte') => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(workbook, {
        bookType: 'xlsx',
        type: 'array'
        });
        saveAsExcelFile(excelBuffer, fileName);
}
const saveAsExcelFile = (buffer:any, fileName:string) => {
    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const data = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, `${fileName}_${new Date().getTime()}.xlsx`);
};
