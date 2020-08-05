from django.contrib import admin

from server.api.models import AuthUser


class AuthorAdmin(admin.ModelAdmin):
    pass


admin.register(AuthUser, AuthorAdmin)
