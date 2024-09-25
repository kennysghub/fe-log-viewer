export const formatJSON = (obj) => {
  const formatValue = (value, depth) => {
    if (Array.isArray(value)) {
      if (value.length === 0) return "[]";
      return `[\n${value
        .map((v) => `${"  ".repeat(depth + 1)}${formatValue(v, depth + 1)}`)
        .join(",\n")}\n${"  ".repeat(depth)}]`;
    }
    if (typeof value === "object" && value !== null) {
      if (Object.keys(value).length === 0) return "{}";
      return `{\n${Object.entries(value)
        .map(
          ([k, v]) =>
            `${"  ".repeat(depth + 1)}${k}: ${formatValue(v, depth + 1)}`
        )
        .join(",\n")}\n${"  ".repeat(depth)}}`;
    }
    return JSON.stringify(value);
  };

  return formatValue(obj, 0);
};
