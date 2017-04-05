from django.db import models

class Task(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    points = models.IntegerField()
    status = models.CharField(max_length=20)
    sprint = models.ForeignKey('Sprint')

    def __str__(self):
        return self.title

class Sprint(models.Model):
    name = models.CharField(max_length=255)
    date_start = models.DateField()
    date_end = models.DateField()

    def __str__(self):
        return self.name


