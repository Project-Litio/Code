# Generated by Django 4.2.1 on 2023-07-05 03:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0007_car_autonomia_car_battery_car_doors_car_motor_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='car',
            old_name='autonomia',
            new_name='autonomy',
        ),
        migrations.AddField(
            model_name='car',
            name='rpm',
            field=models.CharField(max_length=20, null=True),
        ),
    ]
