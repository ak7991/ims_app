# Generated by Django 3.2.4 on 2023-04-28 09:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_auto_20230428_0945'),
    ]

    operations = [
        migrations.AlterField(
            model_name='incident',
            name='date_created',
            field=models.DateTimeField(auto_created=True, auto_now_add=True),
        ),
    ]
