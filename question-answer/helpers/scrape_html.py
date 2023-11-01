import html2text

def get_html2text_handler():
    h = html2text.HTML2Text()
    h.ignore_emphasis = True
    h.ignore_links = True
    h.ignore_tables = False
    h.ignore_images = True
    h.tag_stack = False
    h.drop_white_space = True
    return h