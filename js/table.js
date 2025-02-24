document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("rentalForm");
    const tableContainer = document.getElementById("tableContainer");
    const template = document.getElementById("table-row-template");
    const clearButton = createClearButton();
    const dailyRate = 75000;

    tableContainer.parentNode.insertBefore(clearButton, tableContainer.nextSibling);

    let tableData = loadFromLocalStorage();

    createTable(tableData);

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const newRow = createRow(form);
        tableData.push(newRow);

        saveToLocalStorage(tableData);
        createTable(tableData);
        form.reset();
    });

    clearButton.addEventListener("click", () => {
        clearTable();
    });

    function createClearButton() {
        const button = document.createElement("button");
        button.textContent = "Очистить таблицу";
        button.classList.add("clear-button");
        return button;
    }

    function loadFromLocalStorage() {
        const data = localStorage.getItem("rentalTableData");
        return data ? JSON.parse(data) : [];
    }

    function saveToLocalStorage(data) {
        localStorage.setItem("rentalTableData", JSON.stringify(data));
    }

    function createTable(tableData) {
        tableContainer.innerHTML = "";

        if (tableData.length === 0) {
            tableContainer.textContent = "Таблица пуста.";
            clearButton.style.display = "none";
            return;
        }

        clearButton.style.display = "block";

        const table = document.createElement("table");
        table.classList.add("rental-table");

        table.innerHTML = `
            <thead>
                <tr>
                    <th>Car</th>
                    <th>Duration (days)</th>
                    <th>Price (RUB)</th>
                </tr>
            </thead>
            <tbody id="table-body"></tbody>
        `;

        const tableBody = table.querySelector("#table-body");

        tableData.forEach((row) => {
            const clone = template.content.cloneNode(true);
            const cells = clone.querySelectorAll(".table__cell");

            cells[0].textContent = row.car;
            cells[1].textContent = row.duration;
            cells[2].textContent = `${row.price} руб.`;

            tableBody.appendChild(clone);
        });

        tableContainer.appendChild(table);
    }

    function createRow(form) {
        const car = form.elements["car"].value;
        const duration = parseInt(form.elements["duration"].value, 10);
        const price = duration * dailyRate;

        return {
            car,
            duration,
            price,
        };
    }

    function clearTable() {
        localStorage.removeItem("rentalTableData");
        tableData = [];
        createTable(tableData);
    }
});
