function saveForm() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const age = document.getElementById("age").value.trim();
  const color = document.getElementById("color").value.trim();
  const comments = document.getElementById("comments").value.trim();

  const content = 
    `Name: ${name}
    Email: ${email}
    Age: ${age}
    Favorite Color: ${color}
    Comments:
    ${comments}
    `;

    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");

    link.download = "form-output.txt";
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);
}
