// Copyright (c) 2024, mostafa essam and contributors
// For license information, please see license.txt

frappe.ui.form.on("Job Application", {
    refresh(frm){
        frm.add_custom_button(__("Get All Jobs"), function(){
            frm.trigger("get_all_jobs")
        })
    },
    before_save(frm){
        frm.set_value("status", "Submitted")
        frm.set_value("date", today())
        // frappe.msgprint(__("Current Status is {0}", [frm.doc.status]))
    },
    first_name(frm){
        if(frm.doc.first_name && frm.doc.last_name){
            frm.trigger("validate_names")
        }
    },
    last_name(frm){
        frm.trigger("validate_names")
    },
    validate_names(frm){
        if(frm.doc.first_name && frm.doc.last_name){
            frm.set_value("full_name", frm.doc.first_name + " " + frm.doc.last_name)
        }
    },
    job(frm){
        frappe.call({
            method: "frappe.client.get",
            args:{
                doctype: "Job",
                name: frm.doc.job,
            },
            callback: (r)=>{
                if (r){
                    frappe.msgprint(__("Job Title {0}", [r.message.job_title]))
                    frappe.msgprint(__("Job Location {0}", [r.message.job_location]))
                    frappe.msgprint(__("Job Experiece Level {0}", [r.message.experience_level]))
                }
            }
        })
    },
    
    get_all_jobs(frm){
        frm.call({
            method: 'get_all_jobs',
            doc: frm.doc,
            args: {
                doctype: "Job",
            },
            callback: (r)=>{
                frappe.msgprint(__("succefully got"))
            }
        })
    },
    
});


