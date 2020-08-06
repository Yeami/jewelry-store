# Generated by Django 3.0.7 on 2020-08-06 11:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_brand'),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=40, unique=True)),
                ('country', models.TextField(blank=True)),
            ],
            options={
                'db_table': 'category',
            },
        ),
    ]