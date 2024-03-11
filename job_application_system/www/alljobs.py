import frappe

def get_context(context):
    context.alljobs = frappe.get_list("Job", filters={'docstatus': 1},fields=["*"])
    context.show_sidebar = 1
    context.website_sidebar = "Main"

@frappe.whitelist()	
def update_status(doctype, name):
    doc = frappe.get_doc(doctype, name)
    if doc.status == 'Submitted':
        doc.status = 'Reviewed'
    doc.save()
    return {'status': doc.status}