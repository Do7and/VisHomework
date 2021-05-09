import pandas as pd
import csv

csv_data = pd.read_csv('temperature_daily.csv')  
print("Done1")
headrow = ["yearmon","day","temperature"]
mincontent = []
maxcontent = []
nowyr = None
nowmon = None
for index, row in csv_data.iterrows():
	year,mon,day = map(int,row["date"].split("-"))
	if year <= 2007:
		continue
	tmin = int(row["min_temperature"])
	tmax = int(row["max_temperature"])
	key = str((year-2008)*12 + mon-1)
	
	mincontent.append([key,day,tmin])
	maxcontent.append([key,day,tmax])
print(mincontent)

csvfile = open('preprocess2_min_data.csv', 'w',newline='')
writer = csv.writer(csvfile)
writer.writerow(headrow)
writer.writerows(mincontent)
csvfile.close()

csvfile = open('preprocess2_max_data.csv', 'w',newline='')
writer = csv.writer(csvfile)
writer.writerow(headrow)
writer.writerows(maxcontent)
csvfile.close()
