import axios from "axios";
import { mock_inputs, mock_outputs } from "@/../tests/data/mock_features";

if ("true" == process.env.VUE_APP_MOCK) {
  var MockAdapter = require("axios-mock-adapter");
  let mock = new MockAdapter(axios);
  const mock_input_features = mock_inputs();
  const mock_output_features = mock_outputs();

  mock
    .onPost("http://localhost:9090/bogiedashboard/signals")
    .reply(200, mock_input_features);

  mock
    .onGet("http://localhost:9090/bogiedashboard/history")
    .reply(200, mock_output_features);
}

export { axios };
