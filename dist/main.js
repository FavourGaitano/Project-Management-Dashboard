"use strict";
let addbtn = document.querySelector("#addbtn");
let form = document.querySelector("#form");
let projectname = document.querySelector("#projectname");
let employeename = document.querySelector("#employeename");
let email = document.querySelector("#email");
let phonenumber = document.querySelector("#phonenumber");
let projectbudget = document.querySelector("#projectbudget");
let projectresources = document.querySelector("#projectresources");
let startdate = document.querySelector("#startdate");
let enddate = document.querySelector("#enddate");
let general = document.querySelector("#general");
let currentIndex;
addbtn.addEventListener("click", (() => {
    if (form.style.display == "none") {
        form.style.display = "flex";
    }
    else {
        form.style.display = "none";
    }
}));
let projects = [];
form.addEventListener("submit", ((e) => {
    e.preventDefault();
    let task = projectname.value.trim() !== "" && employeename.value.trim() !== "" && email.value.trim() !== ""
        && phonenumber.value.trim() !== "" && projectbudget.value.trim() !== "" && projectresources.value.trim() !== ""
        && startdate.value.trim() !== "" && enddate.value.trim() !== "";
    if (task) {
        let newProject = {
            id: projects.length + 1,
            projectname: projectname.value.trim(),
            employeename: employeename.value.trim(),
            email: email.value.trim(),
            phonenumber: phonenumber.value.trim(),
            projectbudget: projectbudget.value.trim(),
            projectresources: projectresources.value.trim(),
            startdate: startdate.value.trim(),
            enddate: enddate.value.trim()
        };
        if (currentIndex !== undefined) {
            projects.splice(currentIndex, 1, newProject);
        }
        else {
            projects.push(newProject);
        }
        updateDisplay();
        // Clear the form fields
        projectname.value = "";
        employeename.value = "";
        email.value = "";
        phonenumber.value = "";
        projectbudget.value = "";
        projectresources.value = "";
        startdate.value = "";
        enddate.value = "";
        form.style.display = "none";
    }
}));
function updateDisplay() {
    let allProjects = document.querySelectorAll('.projects .project');
    allProjects.forEach(el => {
        el.remove();
    });
    projects.forEach((project, index) => {
        let projectElement = document.createElement('div');
        projectElement.className = "project";
        let projectTitle = document.createElement('h2');
        projectTitle.textContent = project.projectname;
        let employeeName = document.createElement('p');
        employeeName.textContent = `Employee: ${project.employeename}`;
        let projectDetails = document.createElement('p');
        projectDetails.textContent = `Budget: ${project.projectbudget}, Resources: ${project.projectresources}, Start Date: ${project.startdate}, End Date: ${project.enddate}`;
        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = "Delete";
        deleteBtn.style.backgroundColor = 'red';
        deleteBtn.addEventListener('click', () => {
            deleteProject(index);
        });
        let updateBtn = document.createElement('button');
        updateBtn.textContent = "Update";
        updateBtn.style.backgroundColor = 'skyblue';
        updateBtn.addEventListener('click', () => {
            updateProject(index);
        });
        projectElement.appendChild(projectTitle);
        projectElement.appendChild(employeeName);
        projectElement.appendChild(projectDetails);
        projectElement.appendChild(deleteBtn);
        projectElement.appendChild(updateBtn);
        general.appendChild(projectElement);
    });
}
function deleteProject(index) {
    projects.splice(index, 1);
    updateDisplay();
}
function updateProject(index) {
    currentIndex = index;
    form.style.display = 'flex';
    let project = projects[index];
    projectname.value = project.projectname;
    employeename.value = project.employeename;
    email.value = project.email;
    phonenumber.value = project.phonenumber;
    projectbudget.value = project.projectbudget;
    projectresources.value = project.projectresources;
    startdate.value = project.startdate;
    enddate.value = project.enddate;
}
// Call display function initially
updateDisplay();
