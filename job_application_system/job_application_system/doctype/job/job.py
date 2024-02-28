# Copyright (c) 2024, mostafa essam and contributors
# For license information, please see license.txt

import frappe
from frappe.website.website_generator import WebsiteGenerator
from datetime import datetime

class Job(WebsiteGenerator):
	def on_update(self):
		if self.creation == self.modified:
			creation_date = self.creation
			date_obj = datetime.strptime(creation_date, '%Y-%m-%d %H:%M:%S.%f')
			current_date = datetime.now()
			days_since_creation = (current_date - date_obj).days

			frappe.db.set_value(self.doctype, self.name, 'days_since_creation', days_since_creation)


