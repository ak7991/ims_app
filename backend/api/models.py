from django.db import models
from django.contrib.auth.models import User

# Create your models here.
from datetime import datetime
import random

class Incident(models.Model):
    PRIORITY = (
        ('HIGH', 'HIGH'),
        ('MEDIUM', 'MEDIUM'),
        ('LOW', 'LOW')
    )

    # Create incident id according to spec
    def create_inc_id():
        prefix = "RMG"
        five_random_nums = str(random.randint(0, 99999)).ljust(5, "0")
        current_year = str(datetime.now().year)
        target = prefix + five_random_nums + current_year
        return target
    
    incident_id = models.CharField(max_length=12, unique=True, editable=False, 
                                   default=create_inc_id, null=False)
    date_created = models.DateTimeField(auto_now_add=True, null=False, blank=False, auto_created=True)
    description = models.TextField(max_length=128, null=True, blank=True)
    priority = models.CharField(max_length=20, null=False, choices=PRIORITY, default="LOW")
    user = models.ForeignKey(
        User, null=True, blank=True, on_delete=models.CASCADE)
    closed_status = models.BooleanField(null=False, default=True)

    def close_incident(self):
        if self.closed_status:
            non_editable_fields = ["date_created", "description", "priority", "user"]
            for field in non_editable_fields:
                self.__getattribute__(field).editable = False

    def __str__(self):
        return str(self.incident_id) + " - " + str(self.priority) + " - " + str(self.closed_status) + ' date: ' + datetime.strftime(self.date_created,"%d/%m/%Y, %H:%M:%S")