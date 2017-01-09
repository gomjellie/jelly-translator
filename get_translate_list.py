import requests
from bs4 import BeautifulSoup

#code to get google translate language lists
url = 'https://ctrlq.org/code/19899-google-translate-languages'
r = requests.get(url)
soup = BeautifulSoup(r.text, 'html.parser')
table = soup.find('tbody')

ret = ""
ret2= ""
for tr in table.find_all('tr'):
    td = tr.find_all('td')
    ret += "<option value=" + "\"" + td[1].text + "\">" + td[0].text + "</option>"+"\n"
    ret2 += "<option value=" + "\"" + td[3].text + "\">" + td[2].text + "</option>"+"\n"

res = ret + ret2
print(res)

/////////////////////////////////////////////


import requests
from bs4 import BeautifulSoup

#code to get google translate language lists
url = 'https://ctrlq.org/code/19899-google-translate-languages'
r = requests.get(url)
soup = BeautifulSoup(r.text, 'html.parser')
table = soup.find('tbody')

ret = ""
ret2= ""
for tr in table.find_all('tr'):
    td = tr.find_all('td')
    ret += "\'" + td[0].text + "\': '" + td[1].text + "',\n"
    ret2 += "\'" + td[2].text + "\': '" + td[3].text + "',\n"

res = ret + ret2
print(res)