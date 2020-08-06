# Generated by Django 3.0.7 on 2020-08-06 12:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_category'),
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=40, unique=True)),
                ('description', models.TextField(blank=True)),
                ('price', models.CharField(max_length=20)),
                ('amount', models.IntegerField(default=0)),
                ('is_available', models.BooleanField(default=False)),
                ('brand', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='api.Brand')),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='api.Category')),
            ],
            options={
                'db_table': 'product',
            },
        ),
    ]