function escapeHtmlString(htmlContent: string): string {
  return htmlContent
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
    .replace(/\//g, "\\/");
}

function toJsonString(htmlContent: string): string {
  const escapedHtml = escapeHtmlString(htmlContent);
  return JSON.stringify({ htmlContent: escapedHtml });
}



export default toJsonString
