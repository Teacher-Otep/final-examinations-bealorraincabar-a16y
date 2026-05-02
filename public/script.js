// UX Design: Show/Hide sections
function showSection(sectionToShow) {
    const sections = ['home', 'create', 'read', 'update', 'delete'];
    sections.forEach(section => {
        const el = document.getElementById(section);
        if (el) el.style.display = 'none';
    });
    
    const activeSection = document.getElementById(sectionToShow);
    if (activeSection) activeSection.style.display = 'block';
    
    if (sectionToShow === 'read') {
        loadStudentsList();
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('home').style.display = 'block';
    document.getElementById('create').style.display = 'none';
    document.getElementById('read').style.display = 'none';
    document.getElementById('update').style.display = 'none';
    document.getElementById('delete').style.display = 'none';
    
    // Clear Fields button functionality
    const clearBtn = document.getElementById('clrbtn');
    if(clearBtn) {
        clearBtn.addEventListener('click', clearAllInputs);
    }
    
    const clearUpdateBtn = document.getElementById('clearUpdateBtn');
    if(clearUpdateBtn) {
        clearUpdateBtn.addEventListener('click', () => {
            const updateInputs = ['update_surname', 'update_name', 'update_middlename', 'update_address', 'update_contact'];
            updateInputs.forEach(id => {
                const inp = document.getElementById(id);
                if(inp) inp.value = '';
            });
        });
    }
    
    loadStudentsList();
    
    const fetchUpdateBtn = document.getElementById('fetchUpdateBtn');
    if(fetchUpdateBtn) {
        fetchUpdateBtn.addEventListener('click', fetchStudentForUpdate);
    }
    
    const updateForm = document.getElementById('updateFormAjax');
    if(updateForm) {
        updateForm.addEventListener('submit', submitUpdateStudent);
    }
    
    const fetchDeleteBtn = document.getElementById('fetchDeleteBtn');
    if(fetchDeleteBtn) {
        fetchDeleteBtn.addEventListener('click', fetchStudentForDelete);
    }
    
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    if(confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', confirmDeleteStudent);
    }
    
    const urlParams = new URLSearchParams(window.location.search);
    if(urlParams.get('status') === 'success') {
        showToast("Registration Successful!");
        const newUrl = window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);
    }
});

// Clear all text and number inputs
function clearAllInputs() {
    const allInputs = document.querySelectorAll('input[type="text"], input[type="number"], input[type="email"], input[type="tel"]');
    allInputs.forEach(input => {
        input.value = '';
    });
}

// Load students list - using view_all.php
async function loadStudentsList() {
    const container = document.getElementById('studentsListContainer');
    if(!container) return;
    container.innerHTML = 'Loading students...';
    try {
        const response = await fetch('../includes/view_all.php');
        const data = await response.json();
        if(data.success && data.students.length > 0) {
            let html = '<table class="student-table"><thead><tr><th>ID</th><th>Surname</th><th>Name</th><th>Middle</th><th>Address</th><th>Contact</th></tr></thead><tbody>';
            data.students.forEach(std => {
                html += `<tr>
                    <td>${escapeHtml(std.id)}</td>
                    <td>${escapeHtml(std.surname)}</td>
                    <td>${escapeHtml(std.name)}</td>
                    <td>${escapeHtml(std.middlename)}</td>
                    <td>${escapeHtml(std.address)}</td>
                    <td>${escapeHtml(std.contact_number)}</td>
                </tr>`;
            });
            html += '</tbody></table>';
            container.innerHTML = html;
        } else {
            container.innerHTML = '<p>No student records found.</p>';
        }
    } catch(err) {
        container.innerHTML = '<p>Error loading students.</p>';
        console.error(err);
    }
}

function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str).replace(/[&<>"']/g, function (m) {
        return {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        }[m];
    });
}

// Update functions - using search_one.php
async function fetchStudentForUpdate() {
    const studentId = document.getElementById('updateId').value;
    if(!studentId) {
        alert("Please enter Student ID");
        return;
    }
    try {
        const response = await fetch(`../includes/search_one.php?id=${studentId}`);
        const data = await response.json();
        if(data.success && data.student) {
            const s = data.student;
            document.getElementById('update_student_id').value = s.id;
            document.getElementById('update_surname').value = s.surname || '';
            document.getElementById('update_name').value = s.name || '';
            document.getElementById('update_middlename').value = s.middlename || '';
            document.getElementById('update_address').value = s.address || '';
            document.getElementById('update_contact').value = s.contact_number || '';
            document.getElementById('updateFormContainer').style.display = 'block';
        } else {
            alert("Student not found");
            document.getElementById('updateFormContainer').style.display = 'none';
        }
    } catch(err) {
        alert("Error fetching student details");
    }
}

// Submit update - using modify.php
async function submitUpdateStudent(e) {
    e.preventDefault();
    const id = document.getElementById('update_student_id').value;
    const payload = {
        id: id,
        surname: document.getElementById('update_surname').value,
        name: document.getElementById('update_name').value,
        middlename: document.getElementById('update_middlename').value,
        address: document.getElementById('update_address').value,
        contact_number: document.getElementById('update_contact').value
    };
    try {
        const response = await fetch('../includes/modify.php', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        });
        const result = await response.json();
        if(result.success) {
            alert("Student updated successfully!");
            document.getElementById('updateFormContainer').style.display = 'none';
            document.getElementById('updateId').value = '';
        } else {
            alert("Update failed: " + (result.message || "Unknown error"));
        }
    } catch(err) {
        alert("Error updating student");
    }
}

// Delete functions - using search_one.php for preview
async function fetchStudentForDelete() {
    const studentId = document.getElementById('deleteId').value;
    if(!studentId) {
        alert("Enter Student ID");
        return;
    }
    try {
        const response = await fetch(`../includes/search_one.php?id=${studentId}`);
        const data = await response.json();
        if(data.success && data.student) {
            const s = data.student;
            document.getElementById('preview_id').innerText = s.id;
            document.getElementById('preview_name').innerText = s.name;
            document.getElementById('preview_surname').innerText = s.surname;
            document.getElementById('preview_middlename').innerText = s.middlename || '';
            document.getElementById('preview_address').innerText = s.address || '';
            document.getElementById('preview_contact').innerText = s.contact_number || '';
            document.getElementById('deletePreview').style.display = 'block';
            document.getElementById('deletePreview').setAttribute('data-delete-id', s.id);
        } else {
            alert("Student not found");
            document.getElementById('deletePreview').style.display = 'none';
        }
    } catch(err) {
        alert("Error fetching student");
    }
}

// Confirm delete - using remove.php
async function confirmDeleteStudent() {
    const deleteId = document.getElementById('deletePreview').getAttribute('data-delete-id');
    if(!deleteId) return;
    if(confirm(`Are you sure you want to delete student ID ${deleteId}?`)) {
        try {
            const response = await fetch('../includes/remove.php', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({id: deleteId})
            });
            const result = await response.json();
            if(result.success) {
                alert("Student deleted successfully");
                document.getElementById('deletePreview').style.display = 'none';
                document.getElementById('deleteId').value = '';
                if(document.getElementById('read').style.display === 'block') loadStudentsList();
            } else {
                alert("Delete failed");
            }
        } catch(err) {
            alert("Error deleting student");
        }
    }
}

function showToast(msg) {
    const toast = document.getElementById('success-toast');
    if(toast) {
        toast.textContent = msg;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}