>D 48

ver=109
date=""
time=""
wfc=""
hh=0
mm=0
ss=0
wfp=0
cnt=0
m:ipwrm=0 60
m:epwrm=0 60
ipwr=0
epwr=0
strm="cnt0"
fheap=0
;

>BS

tper=25
smlj=0

=>SerialLog 0
+>WifiConfig
+>WifiPower

=>Sensor53 r

>E

wfc=WifiConfig#?
wfp=WifiPower

>T

ipwr=?#Soil_A1
epwr=?#Soil_A0

>S

time=st(tstamp T 2)
date=st(tstamp T 1)
fheap=heap/1024

hh=st(time : 1)
mm=st(time : 2)
ss=st(time : 3)

if cnt==30
then
smlj=1
tper=10
;=>UfsRun discovery.txt
=>SetOption19 0
endif

if cnt<99
then
cnt+=1
endif

if chg[mm]>0
and cnt>30
then
strm="cnt"+s(mm)
ipwrm=ipwr
print Array: ipwrm %0ipwrm[-1]%
epwrm=epwr
print Array: epwrm %0ipwrm[-1]%
endif

>W

@<b>NTP </b> %date% %time% <b> Heap </b> %1fheap% kB
@<b>Init </b> %0cnt% %% <b> TelePeriod </b> %0tper% <b> Version </b> %0ver%
@<b>Wifi </b> %wfc% <b> Power </b> %0wfp% dBm <b> Topic </b> %topic%
@<br>

$<div id="chart1" style="width:100%%;height:250px;padding:0px;"></div><br><br>
$gc(lt ipwrm epwrm "wr" "Temp" "Hum" strm)
$var options = {
$chartArea:{left:50,width:'80%%'},
$width:'100%%',legend:'none',
$title:'Temp & Hum 1h [W]',
$};
$gc(e)

; soil sensor 
; ESP32 S3

>M 1

+1,17,mN1,1,4800,Soil,15(16),10,r010400000003,r010407D00002

; 0x0000

1,010406UUuu@i0:10,A0 Humidity,%%,Soil_A0,1
1,010406xxxxSSss@i0:10,A1 Temperature,°C,Soil_A1,1
1,010406xxxxxxxxUUuu@i0:10,A2 Test,,Soil_A2,2

1,010404UUuu@i1:1,Device ID,,,0
1,010404xxxxUUuu@i1:1,Baud Rate,,,0

#
; EOF
