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


def clean_webpage(page):
    page = page.replace("*", " ")
    page = page.replace("###", " ")
    page = page.replace("##", " ")
    page = page.replace("“", "\"")
    page = page.replace("”", "\"")
    page = page.encode("ascii", "ignore").decode()

    cleaned_page = []
    for line in page.split("\n"):
        line_text = line.strip()

        if not line_text:
            continue

        cleaned_line = " ".join(line_text.split())
        cleaned_page.append(cleaned_line)
    return " ".join(cleaned_page)