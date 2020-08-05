class Utils:
    @staticmethod
    def get_pagination_offset(page):
        return int(page) * 20 - 20 if int(page) is not 1 else 0
