import html2text
from unidecode import unidecode
import re


def get_html2text_handler():
    h = html2text.HTML2Text()
    h.ignore_emphasis = True
    h.ignore_links = True
    h.ignore_tables = False
    h.ignore_images = True
    h.tag_stack = False
    h.drop_white_space = True
    return h


def clean_text(page):
    page = unidecode(page)
    page = re.sub(r'\s+', ' ', page)

    return page