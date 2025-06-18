/**
 * Converts an array of objects to a CSV string
 * @param data Array of objects to convert
 * @param headers Array of header names
 * @param fieldExtractors Object mapping header keys to field extractor functions
 * @returns CSV string
 */
export function objectsToCSV<T>(
    data: T[],
    headers: string[],
    fieldExtractors: Record<string, (item: T, index: number) => string | number>,
  ): string {
    // Escape CSV values to handle commas and quotes properly
    const escapeCSV = (value: string | number) => {
      const stringValue = String(value)
      if (stringValue.includes(",") || stringValue.includes('"') || stringValue.includes("\n")) {
        return `"${stringValue.replace(/"/g, '""')}"`
      }
      return stringValue
    }
  
    // Create header row
    const headerRow = headers.join(",")
  
    // Create data rows
    const rows = data.map((item, index) => {
      return Object.keys(fieldExtractors)
        .map((key) => escapeCSV(fieldExtractors[key](item, index)))
        .join(",")
    })
  
    // Combine header and data rows
    return [headerRow, ...rows].join("\n")
  }
  
  /**
   * Downloads a CSV file
   * @param csvContent CSV content as string
   * @param filename Filename for the downloaded file
   */
  export function downloadCSV(csvContent: string, filename: string): void {
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", filename)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
  