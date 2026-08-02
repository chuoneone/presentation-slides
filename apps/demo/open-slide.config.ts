import type { OpenSlideConfig } from '@open-slide/core';

const openSlideConfig: OpenSlideConfig = {
  base: process.env.BASE_URL || '/',
};

export default openSlideConfig;
