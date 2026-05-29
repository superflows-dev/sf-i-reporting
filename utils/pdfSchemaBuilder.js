export function buildPdfTemplate(doc) {
    const schemas = [];
    const inputs = {};
    let y = 20;
    // document title
    schemas.push({
        name: "title",
        type: "text",
        position: { x: 20, y },
        width: 500,
        height: 20,
        fontSize: 20
    });
    inputs.title = doc.title;
    y += 40;
    doc.sections.forEach((section, si) => {
        const sectionKey = `section_${si}`;
        schemas.push({
            name: sectionKey,
            type: "text",
            position: { x: 20, y },
            width: 500,
            height: 20,
            fontSize: 14
        });
        inputs[sectionKey] = section.title;
        y += 25;
        section.rows.forEach((row, ri) => {
            const labelKey = `label_${si}_${ri}`;
            const valueKey = `value_${si}_${ri}`;
            schemas.push({
                name: labelKey,
                type: "text",
                position: { x: 20, y },
                width: 150,
                height: 20,
                fontSize: 10
            });
            schemas.push({
                name: valueKey,
                type: "text",
                position: { x: 180, y },
                width: 380,
                height: 20,
                fontSize: 10
            });
            inputs[labelKey] = row.label;
            inputs[valueKey] = row.value;
            y += 18;
        });
        y += 20;
    });
    const A4_WIDTH = 595;
    const A4_HEIGHT = 842;
    const PAGE_PADDING = [20, 20, 20, 20];
    return {
        template: {
            basePdf: {
                width: A4_WIDTH,
                height: A4_HEIGHT,
                padding: PAGE_PADDING
            },
            schemas: [schemas]
        },
        inputs: [inputs]
    };
}
//# sourceMappingURL=pdfSchemaBuilder.js.map