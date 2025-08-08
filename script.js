// Setup Select All checkbox for a group
function setupSelectAll(selectAllId, groupSelector) {
  const selectAllCheckbox = document.getElementById(selectAllId);
  const checkboxes = document.querySelectorAll(`${groupSelector} input[type='checkbox']`);

  selectAllCheckbox.addEventListener("change", function () {
    checkboxes.forEach(cb => cb.checked = this.checked);
  });

  // Optional: Update Select All checkbox if any individual checkbox is toggled
  checkboxes.forEach(cb => {
    cb.addEventListener("change", function () {
      const allChecked = Array.from(checkboxes).every(box => box.checked);
      selectAllCheckbox.checked = allChecked;
    });
  });
}

// Initialize all Select All checkboxes
setupSelectAll("selectAllProcedures", ".procedures");
setupSelectAll("selectAllTreatment", ".treatment");
setupSelectAll("selectAllNextVisit", ".nextvisit");

// Mark all procedure codes as "Completed Today"
document.getElementById("completeAllCodes").addEventListener("click", function () {
  const codes = ["D0100", "D0150", "D0151", "D0152", "D0003A", "D0603"];
  codes.forEach(code => {
    const select = document.getElementById(code);
    if (select) select.value = "Completed Today";
  });
});

function saveNote() {
  const codes = ["D0100", "D0150", "D0151", "D0152", "D0003A", "D0603"];
  let codeStatuses = codes.map(code => {
    const select = document.getElementById(code);
    const status = select ? select.value : "";
    return status ? `${code}: ${status}` : `${code}: Not Selected`;
  }).join("\n");

  const vitals = document.getElementById("vitals").value.trim();

  // Procedures completed checkboxes
  const proceduresChecked = Array.from(document.querySelectorAll(".procedures input[type='checkbox']:checked"))
    .map(cb => cb.value)
    .filter(val => val) // filter out empty values (like the "Select All" if any)
    .join(", ");

  // Treatment options checkboxes
  const treatmentChecked = Array.from(document.querySelectorAll(".treatment input[type='checkbox']:checked"))
    .map(cb => cb.value)
    .filter(val => val)
    .join(", ");

  // Next visit checkboxes
  const nextVisitChecked = Array.from(document.querySelectorAll(".nextvisit input[type='checkbox']:checked"))
    .map(cb => cb.value)
    .filter(val => val)
    .join(", ");

  const signedPlan = document.getElementById("signedPlan").checked ? "Yes" : "No";

  const content =
`------------------------------------------------------------OD PROGRESS NOTE-----------------------------------------------------------------------------

Procedure Codes & Status:
${codeStatuses}

Patient presented on time for first OD appointment.  
Vitals: ${vitals}  
Procedures Completed: ${proceduresChecked}  
Treatment Options Selected: ${treatmentChecked}
Patient signed treatment plan and diagnostic summary; dismissed in good condition: ${signedPlan}

Next Visit Recommendations: ${nextVisitChecked}
`;

  const blob = new Blob([content], { type: "text/plain" });
  const link = document.createElement("a");
  link.download = "OD_Progress_Note.txt";
  link.href = URL.createObjectURL(blob);
  link.click();
  URL.revokeObjectURL(link.href);
}
