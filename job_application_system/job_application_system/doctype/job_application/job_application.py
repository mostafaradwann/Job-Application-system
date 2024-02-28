# Copyright (c) 2024, mostafa essam and contributors
# For license information, please see license.txt

import frappe
from frappe.website.website_generator import WebsiteGenerator
import re

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


