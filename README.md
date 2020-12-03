# A dashboard implemented in Vue

**Live-Demo: https://master.dnxjgyvd4x82t.amplifyapp.com/#/**

![Alt Text](preview.gif)

##### Tech-Stack:
- Vue.js (composition-api, typescript, javascript)
- Vuetify
- Apache-Echarts
- AG-Grid

##### Prerequisities
~~~
> npm install vue
> npm install -g @vue/cli
~~~

##### Configuring:
- .env file: holding the configuration for local test-deployment. It is also used to run the unit tests.
- .env.production: productive configuration for the AWS-environments

##### Testing
- the build pipeline runs the unit tests (npm test:unit)
- local tests are run by: npm run test:unit. Assure *VUE_APP_MOCK=true* for the unit tests to run successfully.
- the frontend can be started (npm run serve) standalone with dummy data if *VUE_APP_MOCK=true*
- the frontend can be run against a locally backend (which is against the Presto cluster) by setting *VUE_APP_MOCK=false*

##### Spin up locally
~~~
> npm install
> npm run serve
> npm test:unit
~~~

##### Container
~~~
> docker build -t frontend .
> docker run --rm -it -p 8080:8080 frontend
~~~

##### Vue-Specific
Vue-3 was released in Q3/2020. The source code is migrated as far as possible and includes the new composition-api (https://composition-api.vuejs.org). It's not fully migrated to Vue-3 because as of Dec 2020 *vuetify* is still depending on Vue-2.

