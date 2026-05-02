<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CRUD Operations</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <nav class="navbar">
        <img src="../images/northhub.svg" id="logo" alt="logo" onerror="this.style.display='none'">
        <button class="navbarbuttons" onclick="showSection('create')"> Create </button>
        <button class="navbarbuttons" onclick="showSection('read')"> Read </button>
        <button class="navbarbuttons" onclick="showSection('update')"> Update </button>
        <button class="navbarbuttons" onclick="showSection('delete')"> Delete </button>
    </nav>
    
    <section id="home" class="homecontent"> 
        <h1 class="splash">Welcome to Student Management System</h1>
        <h2 class="splash">A Project in Integrative Programming Technologies</h2>
    </section>
    
    <section id="create" class="content">
        <h1 class="contenttitle"> Insert New Student </h1>
        <form action="../includes/insert.php" method="POST" id="createForm">
            <label for="surname" class="label">Surname</label>
            <input type="text" name="surname" id="surname" class="field" required><br/>
            <label for="name" class="label">Name</label>
            <input type="text" name="name" id="name" class="field" required><br/>
            <label for="middlename" class="label">Middle name</label>
            <input type="text" name="middlename" id="middlename" class="field"><br/>
            <label for="address" class="label">Address</label>
            <input type="text" name="address" id="address" class="field"><br/>
            <label for="contact" class="label">Mobile Number</label>
            <input type="text" name="contact" id="contact" class="field"><br/>
            <div id="btncontainer">
                <button type="button" id="clrbtn" class="btns">Clear Fields</button><br/>
                <button type="submit" id="savebtn" class="btns">Save</button>
            </div>
            <div id="success-toast" class="toast-hidden">Registration Successful!</div>
        </form>   
    </section>

    <section id="read" class="content"> 
        <h1 class="contenttitle">View Students</h1>
        <div id="studentsListContainer">Loading students...</div>
    </section>

    <section id="update" class="content"> 
        <h1 class="contenttitle">Update Student Records</h1>
        <div class="search-card">
            <label class="label">Enter Student ID to update</label>
            <div class="inline-group">
                <input type="number" id="updateId" class="field" placeholder="Student ID">
                <button id="fetchUpdateBtn" class="action-btn primary">Fetch Details</button>
            </div>
        </div>
        <div id="updateFormContainer" style="display: none;">
            <form id="updateFormAjax">
                <input type="hidden" id="update_student_id">
                <label class="label">Surname</label>
                <input type="text" id="update_surname" class="field">
                <label class="label">Name</label>
                <input type="text" id="update_name" class="field">
                <label class="label">Middle name</label>
                <input type="text" id="update_middlename" class="field">
                <label class="label">Address</label>
                <input type="text" id="update_address" class="field">
                <label class="label">Mobile Number</label>
                <input type="text" id="update_contact" class="field">
                <div id="btncontainer">
                    <button type="button" id="clearUpdateBtn" class="btns">Clear Fields</button>
                    <button type="submit" class="btns" style="background:#1e3c72; color:white;">Update Record</button>
                </div>
            </form>
        </div>
    </section>

    <section id="delete" class="content"> 
        <h1 class="contenttitle">Remove Student Records</h1>
        <div class="search-card">
            <label class="label">Enter Student ID to delete</label>
            <div class="inline-group">
                <input type="number" id="deleteId" class="field" placeholder="Student ID">
                <button id="fetchDeleteBtn" class="action-btn primary">Fetch Details</button>
            </div>
        </div>
        <div id="deletePreview" style="display: none; margin-top: 1.5rem;">
            <div style="background:#fef2f2; padding:1rem; border-radius:24px;">
                <p><strong>ID:</strong> <span id="preview_id"></span></p>
                <p><strong>Name:</strong> <span id="preview_name"></span></p>
                <p><strong>Surname:</strong> <span id="preview_surname"></span></p>
                <p><strong>Middle:</strong> <span id="preview_middlename"></span></p>
                <p><strong>Address:</strong> <span id="preview_address"></span></p>
                <p><strong>Contact:</strong> <span id="preview_contact"></span></p>
                <div id="btncontainer" style="justify-content: flex-start;">
                    <button id="confirmDeleteBtn" class="action-btn danger">Confirm Delete</button>
                </div>
            </div>
        </div>
    </section>

    <script src="script.js"></script>
</body>
</html>