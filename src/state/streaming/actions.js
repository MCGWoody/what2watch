import { SUCCESS } from "../constants";

import { UPDATE_STREAMING_SERVICES } from "./constants";

export const updateStreamingServicesAction = (streamingServices) => (
  dispatch
) => {
  dispatch({
    type: UPDATE_STREAMING_SERVICES,
    status: SUCCESS,
    payload: { streamingServices },
  });
};