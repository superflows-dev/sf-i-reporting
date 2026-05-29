export function convertJsonToDocModel(json) {
    return {
        title: json.title,
        sections: json.sections.map((s) => ({
            title: s.title,
            rows: s.table.body.map((r) => ({
                label: r[0],
                value: r[1]
            }))
        }))
    };
}
//# sourceMappingURL=documentEngine.js.map