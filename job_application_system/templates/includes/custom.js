
    let review = document.querySelector("#review-link")
    let newStatusDrop = document.querySelector(".update-status")
    let newStatus = newStatusDrop.getAttribute('name')
    let docName = review.getAttribute('name');
    
    review.addEventListener("click", function (event) {
        frappe.throw("testing")
        frappe.call({
            method: "job_application_system.www.alljobs.update_status",
            args: {
                doctype: "Job Application",
                name: docName,
            },
            callback: (response) => {
                if(!response){
                    frappe.throw("no actions")
                }
            }

        });
    })
