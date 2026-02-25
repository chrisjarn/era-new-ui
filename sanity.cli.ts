/**
 * This configuration file lets you run `$ sanity [command]` in this folder
 * Go to https://www.sanity.io/docs/cli to learn more.
 **/
import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: { projectId: 'h6wntf2c', dataset: 'era' },
  deployment: {
    appId: 'bu51to4bs313axw4bzzs2h4y',
  },
})
