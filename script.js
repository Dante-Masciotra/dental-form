// Select All Procedures
document.getElementById("selectAllProcedures").addEventListener("change", function () {
  const allBoxes = document.querySelectorAll(".checkbox-group input[type='checkbox']:not(#selectAllProcedures)");
  allBoxes.forEach(cb => cb.checked = this.checked);
});

// Mark all codes as "Completed Today"
document.getElementById("completeAllCodes").addEventListener("click", function () {
  const codes = ["D0100", "D0150", "D0151", "D0152", "D0003A", "D0603"];
  codes.forEach(code => {
    document.getElementById(code).value = "Completed Today";
  });
});

function saveNote() {
  const codes = ["D0100", "D0150", "D0151", "D0152", "D0003A", "D0603"];
  let codeStatuses = codes.map(code => {
    const status = document.getElementById(code).value;
    return status ? `${code}: ${status}` : `${code}: Not Selected`;
  }).join("\n");

  const vitals = document.getElementById("vitals").value.trim();

  const checkedProcedures = Array.from(document.querySelectorAll(".checkbox-group input:checked"))
    .filter(cb => cb.id !== "selectAllProcedures")
    .map(cb => cb.value)
    .join(", ");

  const treatmentExplained = document.getElementById("treatmentExplained").checked ? "Yes" : "No";
  const signedPlan = document.getElementById("signedPlan").checked ? "Yes" : "No";
  const nextVisit = document.getElementById("nextVisit").value.trim();

  const content =
`------------------------------------------------------------OD PROGRESS NOTE-----------------------------------------------------------------------------

Procedure Codes & Status:
${codeStatuses}

Patient presented on time for first OD appointment.  
Vitals: ${vitals}  
Procedures Completed: ${checkedProcedures}  
Treatment options explained to patient: ${treatmentExplained}  
Patient signed treatment plan and diagnostic summary; dismissed in good condition: ${signedPlan}

NV: ${nextVisit}
`;

  const blob = new Blob([content], { type: "text/plain" });
  const link = document.createElement("a");
  link.download = "OD_Progress_Note.txt";
  link.href = URL.createObjectURL(blob);
  link.click();
  URL.revokeObjectURL(link.href);
}
