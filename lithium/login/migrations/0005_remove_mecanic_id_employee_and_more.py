# Generated by Django 4.2.1 on 2023-06-18 16:29

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('login', '0004_remove_customer_email_remove_customer_last_name_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='mecanic',
            name='id_employee',
        ),
        migrations.RemoveField(
            model_name='saleman',
            name='id_employee',
        ),
        migrations.AddField(
            model_name='employee',
            name='role',
            field=models.CharField(choices=[('Man', 'Manager'), ('Sel', 'Seller'), ('Mec', 'Mecanic')], default="now", max_length=3),
            preserve_default=False,
        ),
        migrations.DeleteModel(
            name='Manager',
        ),
        migrations.DeleteModel(
            name='Mecanic',
        ),
        migrations.DeleteModel(
            name='Saleman',
        ),
    ]
