# Copyright (c) 2024, mostafa essam and contributors
# For license information, please see license.txt

import frappe
from frappe.website.website_generator import WebsiteGenerator
import re
from frappe.utils import nowdate



class JobApplication(WebsiteGenerator):
	def before_save(self):
		self.full_name = f'{self.first_name} {self.last_name or ""}'
		self.validate_phone()
		self.validate_work_exp()

	def validate_phone(self):
		phone = self.phone
		phone = phone.strip()
		valid = re.search("01(0|1|2|5)\d{8}$", phone)
		if not valid:
			frappe.throw("Please Enter A Valid Phone Number")
	
	def validate_work_exp(self):
		work_exp = self.work_experience
		min_char = 100
		count = len(work_exp)
		if len(work_exp) < min_char:
			frappe.throw(f"Minumum number of Charachters in Work Experience is {min_char}. you entered {count}")
	
	def status_update(self):
		status = self.status
		doc = frappe.get_doc("job_application", self.name)
		doc.db_set("status", status)
	
	def get_submitted_applications(self):  
		doc = frappe.db.get_list('Job Application',
				filters={
					'status' : 'submitted',
				},
				fields=["full_name", "status"]
			)
		for d in doc:
			frappe.msgprint(f"{d.full_name} Application is {d.status}")

	def validate_email(self):
		doc_count = frappe.db.count("Job Application", {"email" : self.email})
		frappe.msgprint(f"You have submitted {doc_count} Applications")

	def sql(self):
		data = frappe.db.sql(
			"""
				SELECT status
				FROM tabJob Application 
			"""
		)

	@frappe.whitelist()	
	def get_all_jobs(self, doctype):
		data = frappe.get_all(doctype, fields=["*"])

		
