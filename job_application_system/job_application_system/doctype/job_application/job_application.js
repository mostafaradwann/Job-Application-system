// Copyright (c) 2024, mostafa essam and contributors
// For license information, please see license.txt

// frappe.ui.form.on("Job Application", {
// 	refresh(frm) {

// 	},
// });
function fetchJobApplication(jobId) {
    // Make an AJAX request to the server-side function
    frappe.call({
        method: 'job_application_system.job_application_system.job_application.get_job_application',
        args: { job_id: jobId },
        callback: function(response) {
            // Handle the response from the server
            var jobApplicationHtml = response.message;
            // Insert the HTML content into the DOM or perform other actions
            document.getElementById('job-application-container').innerHTML = jobApplicationHtml;
        }
    });
}
fetchJobApplication('your_job_id');
