export function getLocalizedText(value, language = "en") {
  if (typeof value === "string") {
    return value;
  }

  if (!value || typeof value !== "object") {
    return "";
  }

  return value[language] || value.en || Object.values(value).find(Boolean) || "";
}

export function getSearchableText(value) {
  if (typeof value === "string") {
    return value;
  }

  if (!value || typeof value !== "object") {
    return "";
  }

  return Object.values(value).join(" ");
}
