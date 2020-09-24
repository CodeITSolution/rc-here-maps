export default (appId, appCode, useHTTPS = true) => {
  return {
    appId,
    appCode,
    useHTTPS,
    getPlatform: () => {
      return new H.service.Platform({
        app_id: appId,
        app_code: appCode,
        useHTTPS: useHTTPS,
      });
    },
    getHereMap: (container, mapType, options) => {
      return new H.Map(container, mapType, options);
    },
  };
};
