import frappe

def get_context(context):
    context.job_applications = frappe.get_list("Job Application",fields=["*"])
    context.jobid = frappe.frappe.form_dict.jobid
    context.job = frappe.get_doc("Job", context.jobid)
    context.show_sidebar = 1
    context.website_sidebar = "Main"
    
@frappe.whitelist()
def get_all_applicants(doctype, jobid):
    applicants = frappe.get_list(doctype, filters={"job": jobid}, fields=["*"])
    rendered_template = frappe.render_template("job_application_system/templates/pages/all_applicants.html", {"applications": applicants})
    return rendered_template

@frappe.whitelist()
def get_applicants_by_status(doctype, jobid, status):
    applicants = frappe.get_list(doctype, filters={"job": jobid, "status": status}, fields=["*"])
    rendered_template = frappe.render_template("job_application_system/templates/pages/all_applicants.html", {"applications": applicants})
    return rendered_template

@frappe.whitelist()	
def update_status_by_status(doctype, name, status):
    doc = frappe.get_doc(doctype, name)
    doc.status = status
    doc.save()
    return {'status': doc.status}