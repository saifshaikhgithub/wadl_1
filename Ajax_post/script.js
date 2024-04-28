function fetchAndDisplayData() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://jsonplaceholder.typicode.com/users", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var responseData = JSON.parse(xhr.responseText);
            var userList = document.getElementById("userList");
            userList.innerHTML = '';
            responseData.forEach(function (user) {
                var li = document.createElement("li");
                li.textContent = `Name: ${user.name}, Email: ${user.email}, Phone: ${user.phone}`;
                userList.appendChild(li);
            });
        } else if (xhr.readyState === 4) {
            console.error("Failed to get data. Error:", xhr.status);
        }
    };
    xhr.send();
}

// Event listener for registration form submission
document.getElementById("registrationForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Get form data
    var formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value
    };

    // Send data to API
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://jsonplaceholder.typicode.com/users", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && (xhr.status === 201 || xhr.status === 200)) {
            // Display newly registered user
            fetchAndDisplayData(); // Refresh the list after registering new user
            // Reset form
            document.getElementById("registrationForm").reset();
        } else if (xhr.readyState === 4) {
            console.error("Failed to register user. Error:", xhr.status);
        }
    };
    xhr.send(JSON.stringify(formData));
});

// Event listener for button click to get registered users
document.getElementById("getDataBtn").addEventListener("click", function () {
    fetchAndDisplayData();
});
