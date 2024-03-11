let allTab = document.getElementById("all-apps")
let reviewedTab = document.querySelector("#reviewed-st")
let selectedTab = document.querySelector("#selected-st")
let interviewedTab = document.querySelector("#interviewed-st")
let acceptedTab = document.querySelector("#accepted-st")
let rejectedTab = document.querySelector("#rejected-st")
let allLinks = document.querySelectorAll(".app-status")
const jobId = document.querySelector("#jobid").getAttribute("name")
const pageContent = document.getElementById("pageContent");
let jobStatus = ""
frappe.ready(function(){
    allTab.click()
})
allTab.addEventListener("click", function (event) {
    event.preventDefault()
    removeAllActiveClasses();
    allTab.classList.add("active")
    get_all_applicants()
})
reviewedTab.addEventListener("click", function (event) {
    jobStatus = "Reviewed"
    event.preventDefault()
    removeAllActiveClasses();
    reviewedTab.classList.add("active")
    get_applicants_by_status(jobStatus)
})
selectedTab.addEventListener("click", function (event) {
    jobStatus = "Selected"
    event.preventDefault()
    removeAllActiveClasses();
    selectedTab.classList.add("active")
    get_applicants_by_status(jobStatus)
})
interviewedTab.addEventListener("click", function (event) {
    jobStatus = "Interviewed"
    event.preventDefault()
    removeAllActiveClasses();
    interviewedTab.classList.add("active")
    get_applicants_by_status(jobStatus)
})
acceptedTab.addEventListener("click", function (event) {
    jobStatus = "Accepted"
    event.preventDefault()
    removeAllActiveClasses();
    acceptedTab.classList.add("active")
    get_applicants_by_status(jobStatus)
})
rejectedTab.addEventListener("click", function (event) {
    jobStatus = "Rejected"
    event.preventDefault()
    removeAllActiveClasses();
    rejectedTab.classList.add("active")
    get_applicants_by_status(jobStatus)
})
function removeAllActiveClasses() {
    allLinks.forEach(function (link) {
        link.classList.remove("active");
    });
}

function get_all_applicants(status) {
    frappe.call({
        method: "job_application_system.www.job_applications.get_all_applicants",
        args: {
            "doctype": "Job Application",
            "jobid" : jobId,
        },
        callback: (response) => {
            pageContent.innerHTML = response.message
            update_status_on()
        }

    })
}
function get_applicants_by_status(status) {
    frappe.call({
        method: "job_application_system.www.job_applications.get_applicants_by_status",
        args: {
            "doctype": "Job Application",
            "jobid" : jobId,
            "status" : status,
        },
        callback: (response) => {
            pageContent.innerHTML = response.message
            update_status_on()
        }

    })
}

function update_status_on(){
    const reviewlinks = document.querySelectorAll(".review-link")
    const statusButton = document.querySelectorAll(".status-button")
    let docName = ""
    reviewlinks.forEach(function(review){
        docName = review.getAttribute('name');
        review.addEventListener("click", function (event) {
            frappe.call({
                method: "job_application_system.www.alljobs.update_status",
                args: {
                    doctype: "Job Application",
                    name: docName,
                },
                callback: (response) => {
                    frappe.msgprint(__(response.message))
                }

            });
        })
    })
    statusButton.forEach(function(button){
        button.addEventListener("click", function(event){
            change_status(docName)
        })
    })
}

function change_status(docName){
    const statusLinks = document.querySelectorAll(".update-status")
    statusLinks.forEach(function(status){
        let jobStatus = status.getAttribute("name")
        status.addEventListener("click",function(event){
            frappe.call({
                method: "job_application_system.www.job_applications.update_status_by_status",
                args: {
                    doctype: "Job Application",
                    name: docName,
                    status: jobStatus,
                },
                callback: (response) => {
                    frappe.msgprint(__(response.message))
                }

            });
        })
    })
}

