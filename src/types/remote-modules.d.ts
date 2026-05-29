declare module "https://esm.run/pizzip" {
  const PizZip: any;
  export default PizZip;
}

declare module "https://esm.run/docxtemplater" {
  const Docxtemplater: any;
  export default Docxtemplater;
}

declare module "https://esm.run/file-saver" {
  export function saveAs(data: Blob, filename: string): void;
}