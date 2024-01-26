let addbtn = document.querySelector("#addbtn") as HTMLButtonElement;
let form = document.querySelector("#form") as HTMLFormElement;

let projectname = document.querySelector("#projectname") as HTMLInputElement;
let employeename = document.querySelector("#employeename") as HTMLInputElement;
let email = document.querySelector("#email") as HTMLInputElement;
let phonenumber = document.querySelector("#phonenumber") as HTMLInputElement;
let projectbudget = document.querySelector("#projectbudget") as HTMLInputElement;
let projectresources = document.querySelector("#projectresources") as HTMLInputElement;
let startdate = document.querySelector("#startdate") as HTMLInputElement;
let enddate = document.querySelector("#enddate") as HTMLInputElement;

let general = document.querySelector("#general") as HTMLDivElement;

let currentIndex: number;

addbtn.addEventListener("click", (() => {
    if (form.style.display == "none") {
        form.style.display = "flex";
    } else {
        form.style.display = "none";
    }
}));

interface Project {
    id: number;
    projectname: string;
    employeename: string;
    email: string;
    phonenumber: string;
    projectbudget: string;
    projectresources: string;
    startdate: string;
    enddate: string;
}

let projects: Project[] = [];

form.addEventListener("submit", ((e) => {
    e.preventDefault();

    let task = projectname.value.trim() !== "" && employeename.value.trim() !== "" && email.value.trim() !== ""
        && phonenumber.value.trim() !== "" && projectbudget.value.trim() !== "" && projectresources.value.trim() !== ""
        && startdate.value.trim() !== "" && enddate.value.trim() !== "";

    if (task) {
        let newProject: Project = {
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
        } else {
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
    let allProjects = document.querySelectorAll('.projects .project') as NodeListOf<HTMLDivElement>;

    allProjects.forEach(el => {
        el.remove();
    });

    projects.forEach((project: Project, index: number) => {

        let projectElement = document.createElement('div') as HTMLDivElement;
        projectElement.className = "project";

        let projectTitle = document.createElement('h2') as HTMLHeadingElement;
        projectTitle.textContent = project.projectname;

        let employeeName = document.createElement('p') as HTMLParagraphElement;
        employeeName.textContent = `Employee: ${project.employeename}`;

        let projectDetails = document.createElement('p') as HTMLParagraphElement;
        projectDetails.textContent = `Budget: ${project.projectbudget}, Resources: ${project.projectresources}, Start Date: ${project.startdate}, End Date: ${project.enddate}`;

        let deleteBtn = document.createElement('button') as HTMLButtonElement;
        deleteBtn.textContent = "Delete";
        deleteBtn.style.backgroundColor = 'red';
        deleteBtn.addEventListener('click', () => {
            deleteProject(index);
        });

        let updateBtn = document.createElement('button') as HTMLButtonElement;
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

function deleteProject(index: number) {
    projects.splice(index, 1);
    updateDisplay();
}

function updateProject(index: number) {
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
