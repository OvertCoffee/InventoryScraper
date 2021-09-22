'''
webscraper

Purpose: Screen scrape the walmart.com purchases

Author: David Norwood
'''

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import time
import csv


#Use Chrome profile
#Needs to update user name in path
options = webdriver.ChromeOptions()
options.add_argument("user-data-dir=C:\\Users\\dnorw\\AppData\\Local\\Google\\Chrome\\User Data")


driver = webdriver.Chrome(".\chromedriver.exe",chrome_options=options)
driver.get('https://www.walmart.com/orders')
