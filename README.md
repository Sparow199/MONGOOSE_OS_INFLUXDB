Mongoose OS library for InfluxDB
==================================
Simple [InfluxDB] wrapper for [Mongoose OS].

InfluxDB is an open-source time series database developed by InfluxData. It is written in Go and optimized for fast, high-availability storage and retrieval of time series data in fields such as operations monitoring, application metrics, Internet of Things sensor data, and real-time analytics. It also has support for processing data from Graphite.

Requirement
-----------
1- InfluxDB working server, see [installation] guide.

Usage
-----
1- Configuration
```javascript
 // InfluxDB configuration
 var influxDBParams = {
    DBHost: "http://localhost",   // Host IP address or URL without "http://".
    Port: 8086,                   // InfluxDB server port.
    DBName: "testDataBase",       // Database name (measurement).
    UserName: "toto",             // User name account (must have write permission).
    Password: "root",             // User password.
    AgentName: "MONGOOSE-OS"      // Device name in HTTP headers.
   };

// Import and setup InfluxDB API
load('api_influxdb');
InfluxDB.setConfig(influxDBParams);
```

2- [Write] (insert) data to InfluxDB database:
```javascript
//     Measurement name |tag key = name| field key = value| timestamp (optional)
let data = 'temperature ,device=ESP0001, value=20.000000000 14340555620000000\n';
InfluxDB.write(data);
```

3- [Read] (query) data from InfluxDB database:
```javascript
let query = 'q=SELECT \"value\" FROM \"measurement\" WHERE \"device\"='ESP0001'\n';
let data = InfluxDB.query(query);
print(data);
```
4- Send query to InfluxDB server (create new database):
```javascript
let query = 'q=CREATE DATABASE newDataBaseName\n';
InfluxDB.query(query);
print('Database created');
```

[Write]:<https://docs.influxdata.com/influxdb/v1.3/guides/writing_data/>
[Read]:<https://docs.influxdata.com/influxdb/v1.3/guides/querying_data/>
[installation]:<https://docs.influxdata.com/influxdb/v1.3/introduction/installation/>
[InfluxDB]:<https://www.influxdata.com/>
[Mongoose OS]: <https://mongoose-os.com/software.html>
