import pandas as pd
import csv

csv_data = pd.read_csv('temperature_daily.csv')  
print("Done1")
mincontent = dict()
maxcontent = dict()
nowyr = None
nowmon = None
for index, row in csv_data.iterrows():
	year,mon,day = map(int,row["date"].split("-"))
	if year < 2017:
		continue
	tmin = int(row["min_temperature"])
	tmax = int(row["max_temperature"])
	key = str(year) +"-"+ str(mon)
	if key not in mincontent:
		mincontent.update({key:[tmin]})
		maxcontent.update({key:[tmax]})

	else:
		mincontent[key].append(tmin)
		maxcontent[key].append(tmax)
print(mincontent)

csvfile = open('preprocess2_min_data.csv', 'w',newline='')
writer = csv.writer(csvfile)
for k in mincontent:
	writer.writerow(map(str,mincontent[k]))
csvfile.close()

csvfile = open('preprocess2_max_data.csv', 'w',newline='')
writer = csv.writer(csvfile)
for k in maxcontent:
	writer.writerow(map(str,maxcontent[k]))
csvfile.close()