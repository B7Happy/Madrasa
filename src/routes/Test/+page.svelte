<script lang="ts">
// @ts-nocheck
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import FileSaver  from 'file-saver';
import {classeDocData, classeDocSumData} from '$lib/Method/comptage';
import moment from 'moment';
import docxConverter from 'docx-pdf';
export let data;

console.log(data.classeDataJson);
const dataDocRaw = classeDocData(data.classeDataJson);
const dataDocSum = classeDocSumData(data.classeDataJson);
const now = moment();

const dataDoc = {
    "date": "2023/2024",
    "classes": dataDocRaw,
    "sum": dataDocSum,
    "datetime": now.format('DD/MM/YYYY HH:mm:ss')
}

//console.log(dataDoc);
const zip = new PizZip(data.content);
const template = new Docxtemplater(zip);
console.log(template);
template.setData(dataDoc);
template.render();
const out = template.getZip().generate({
    type: 'blob',
});
const fileName: string = 'example.pdf';
// const blob = new Blob([out], { type: 'application/pdf' });
FileSaver.saveAs(out, "example.docx");
// var buffer = template.getZip().generate({ type: "nodebuffer" });
// docxConverter(buffer,'./output.pdf',function(err,result){
//     if(err){
//       console.log(err);
//     }
//     console.log('result'+result);
//   });



// const buffer = template.getZip().generate({ type: "nodebuffer" });

// const reader = new FileReader();
// reader.onload = async (e) => {
//     const docxAsHtml = convertToHtml(e.target.result);
//     await html2pdf().from(docxAsHtml).toPdf().save('converted.pdf');
// };
// const buf = await out.arrayBuffer();
// const url = URL.createObjectURL(out);
// console.log(url);
// // Save PDF to disk or display to the user
// const blob = new Blob([buffer], { type: "application/pdf" });
// const url = URL.createObjectURL(blob);
// console.log(url);
</script>