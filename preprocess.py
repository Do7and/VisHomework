import pandas as pd
import csv

csv_data = pd.read_csv('temperature_daily.csv')  
print("Done1")
headrow = ["month"]
mindata = [["January"],["February"],["March"] ,["April"],["May"], ["June"],["July"],["August"],["September"],["October"],["November"],["December"]]
maxdata = [["January"],["February"],["March"] ,["April"],["May"], ["June"],["July"],["August"],["September"],["October"],["November"],["December"]]
nowyr = None
nowmon = None
for index, row in csv_data.iterrows():
	year,mon,day = map(int,row["date"].split("-"))
	tmin = int(row["min_temperature"])
	tmax = int(row["max_temperature"])
	if "Y"+str(year) != headrow[-1] and "Y"+str(year) not in headrow:
		headrow.append("Y"+str(year))
	if nowyr != year:
		nowmon = mon
		nowyr = year
		mindata[mon-1].append(tmin)
		maxdata[mon-1].append(tmax)
	else:
		if nowmon != mon:
			nowmon = mon
			mindata[mon-1].append(tmin)
			maxdata[mon-1].append(tmax)
		else:
			mindata[mon-1][-1] = min(mindata[mon-1][-1],tmin)
			maxdata[mon-1][-1] = max(mindata[mon-1][-1],tmax)
print(mindata)

csvfile = open('preprocess_min_data.csv', 'w',newline='')
writer = csv.writer(csvfile)
writer.writerow(headrow)
writer.writerows(mindata)
csvfile.close()

csvfile = open('preprocess_max_data.csv', 'w',newline='')
writer = csv.writer(csvfile)
writer.writerow(headrow)
writer.writerows(maxdata)
csvfile.close()