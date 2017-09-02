load('api_http.js');
/**
 * InfluxDB.
 * @type {Object}
 */
let InfluxDB = {

    _PARAMS: {},

    /**
     * Create and setup an instance of INFLUXDB.
     * @param  {Object} influxDBParams JSON object with InfluxDB parameters.
     */
    setConfig: function(influxDBParams) {
        this._PARAMS = influxDBParams;
    }

    /**
     * Send request to InfluDB server.
     * @param  {String} dataTosend request body one or multi lines (separator '\n').
     * @param  {String} influxDBCmd write for POST and query for GET.
     * @return {String}
     */
    send: function(dataToSend, influxDBCmd) {

        var options = {
            host: this._PARAMS.Host,
            port: this._PARAMS.Port,
            path: '/' + influxDBCmd + '?db=' + this._PARAMS.Name + '&u=' + this._PARAMS.UserName + '&p=' + this._PARAMS.Password,
            headers: {
                "User-Agent": this._PARAMS.AgentName,
                "Accept": "*/*",
                "Content-Type": "application/x-www-form-urlencoded",
            }
        };

        HTTP.query({
            url: options.host + ':' + options.port + options.path,
            headers: options.headers,
            data: dataToSend, // Optional. If set, JSON-encoded and POST-ed
            success: function(body, full_http_msg) {
                print(full_http_msg);
                return body;
            },
            error: function(err) {
                print(err);
            }, // Optional
        });

    }

    /**
     * https://docs.influxdata.com/influxdb/v1.3/guides/writing_data/
     * Write data to influxDB.
     * @param  {String} data request body, one or multi lines (separator '\n').
     * @return {String}
     */
    write: function(data) {
        return this.send(data, 'write');
    }

    /**
     * https://docs.influxdata.com/influxdb/v1.3/guides/querying_data/
     * Send query to influxDB.
     * @param  {String} query influxDB request.
     * @return {String}
     */
    query: function(query) {
        return this.send(query, 'query');
    }

};
