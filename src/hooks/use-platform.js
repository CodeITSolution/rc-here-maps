import React from 'react';

export function usePlatform(
  platformOptions,
  scriptsLoaded = true,
) {
  const [platform, setPlatform] = React.useState(undefined);

  React.useEffect(() => {
    if (!platform && scriptsLoaded) {
      setPlatform(new H.service.Platform(platformOptions));
    }
  }, [platform, platformOptions, scriptsLoaded]);

  return platform;
}
