function get_datasource(_this) {
  //var _this = this;

  return {
    getRows: function (params) {
      const httpRequest = new XMLHttpRequest();
      let jsonRequest = JSON.stringify(params.request, null, 2);
      httpRequest.open(
        "POST",
        process.env.VUE_APP_SERVER_PREFIX + "/" + _this.table
      );
      httpRequest.setRequestHeader("Content-type", "application/json");
      httpRequest.send(jsonRequest);

      httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === 4 && httpRequest.status === 200) {
          let response = JSON.parse(httpRequest.responseText);
          params.successCallback(response.data, response.lastRow);
        }
      };
    },
  };
}

function update_data(_this){
    const updateData = data => {
        var datasource = get_datasource(_this);
        _this.gridOptions.api.setServerSideDatasource(datasource);
      };
      updateData();
}

export { update_data };
