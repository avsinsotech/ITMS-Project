import re

file_path = r'f:\ITMS-Project\frontend\src\components\screens\CategoryShift.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    original = f.read()

allowed_names = ['secType', 'prodCode', 'changeCategory', 'marketPrice', 'newValue', 'shiftAccNo', 'shiftRecSrNo']

def replace_input(match):
    tag = match.group(0)
    name_match = re.search(r'name="([a-zA-Z0-9_]+)"', tag)
    if name_match:
        name = name_match.group(1)
        if name not in allowed_names and 'disabled' not in tag:
            return tag.replace('/>', 'disabled />')
    return tag

def replace_select(match):
    tag = match.group(0)
    name_match = re.search(r'name="([a-zA-Z0-9_]+)"', tag)
    if name_match:
        name = name_match.group(1)
        if name not in allowed_names and 'disabled' not in tag.split('>')[0]:
            return tag.replace('name="' + name + '"', 'name="' + name + '" disabled')
    return tag

content = re.sub(r'<input[^>]+/>', replace_input, original)
content = re.sub(r'<select[^>]*>.*?</select>', replace_select, content, flags=re.DOTALL)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print('Done!')
