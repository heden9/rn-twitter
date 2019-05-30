import React from "react";
import { create, DvaInstance, DvaOption, Model } from "dva-core";
import { Provider, connect } from "react-redux";

export { connect };
declare const global: any;
export default function(options: DvaOption & {
  models: Model[],
}) {
  const { models, ...restOpts } = options;
  const app = create(restOpts);
  // HMR workaround
  if (!global.registered) {
    models.forEach(model => app.model(model));
  }
  global.registered = true;

  app.start();
  // eslint-disable-next-line no-underscore-dangle
  const store = app._store;

  app.start = container => () => <Provider store={store}>{container}</Provider>;
  app.getStore = () => store;

  return app;
}
