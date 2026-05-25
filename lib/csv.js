export function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;
  const input = text.replace(/^\uFEFF/, "");

  for (let index = 0; index < input.length; index += 1) {
    const char = input[index];
    const next = input[index + 1];

    if (char === '"' && inQuotes && next === '"') {
      field += '"';
      index += 1;
      continue;
    }

    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === "," && !inQuotes) {
      row.push(field);
      field = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
      continue;
    }

    field += char;
  }

  if (field.length || row.length) {
    row.push(field);
    rows.push(row);
  }

  const normalizedRows = rows.filter((cells) => cells.some((cell) => cell.trim() !== ""));
  if (!normalizedRows.length) {
    return { headers: [], rows: [] };
  }

  const headers = normalizedRows[0].map((header) => header.trim());
  const dataRows = normalizedRows.slice(1).map((cells, rowIndex) => {
    if (cells.length !== headers.length) {
      throw new Error(`CSV row ${rowIndex + 2} has ${cells.length} cells; expected ${headers.length}.`);
    }

    return Object.fromEntries(headers.map((header, cellIndex) => [header, cells[cellIndex].trim()]));
  });

  return { headers, rows: dataRows };
}

export function stringifyCsv(rows, headers) {
  const escapeCell = (value) => {
    const text = String(value ?? "");
    if (/[",\n\r]/.test(text)) {
      return `"${text.replace(/"/g, '""')}"`;
    }
    return text;
  };

  return [
    headers.map(escapeCell).join(","),
    ...rows.map((row) => headers.map((header) => escapeCell(row[header])).join(","))
  ].join("\n");
}

export function requireColumns(headers, requiredColumns, label) {
  const missing = requiredColumns.filter((column) => !headers.includes(column));
  if (missing.length) {
    throw new Error(`${label} CSV missing required columns: ${missing.join(", ")}`);
  }
}
