function saveNote() {
  // Procedure codes with statuses
  const codes = ["D0100", "D0150", "D0151", "D0152", "D0003A", "D0603"];
  let codeStatuses = codes.map(code => {
    const status = document.getElementById(code).value;
    return status ? `${code}: ${status}` : `${code}: Not Selected`;
  }).join("\n");

  // Vitals
  const vitals = document.getElementById("vitals").value.trim();

  // Procedures Completed checklist
  const checkedProcedures = Array.from(document.querySelectorAll(".checkbox-group input:checked"))
    .map(cb => cb.value)
    .join(", ");

  // Treatment options explained
  const treatmentExplained = document.getElementById("treatmentExplained").checked
    ? "Yes"
    : "No";

  // Next visit
  const nextVisit = document.getElementById("nextVisit").value.trim();

  // Build note
  const content =
`------------------------------------------------------------OD PROGRESS NOTE-----------------------------------------------------------------------------

Procedure Codes & Status:
${codeStatuses}

Patient presented on time for first OD appointment.  
Vitals: ${vitals}  
Procedures Completed: ${checkedProcedures}  
Treatment options explained to patient: ${treatmentExplained}  
Patient signed treatment plan and diagnostic summary. Pt was dismissed in good condition.

NV: ${nextVisit}
`;

  // Download as txt
  const blob = new Blob([content], { type: "text/plain" });
  const link = document.createElement("a");
  link.download = "OD_Progress_Note.txt";
  link.href = URL.createObjectURL(blob);
  link.click();
  URL.revokeObjectURL(link.href);
}
