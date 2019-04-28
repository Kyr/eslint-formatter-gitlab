# eslint-formatter-gitlab
Variation for `eslint-formatter-junit`, especially for usage in Gitlab CI

## Usage
Install from [npm](https://www.npmjs.com/package/@kfed/eslint-formatter-gitlab), as same as other npm package:
```bash
npm install --save-dev @kdef/eslit-formatter-gitlab
```

Add to `.gitlab-ci.yml`
```yml
test:lint:
  stage: test
  script:
    - time npm install --prefer-offline --no-optional --silent
    - npm run lint --silent -- --no-color --quiet --format @kfed/gitlab --output-file ./lint.junit.xml
  artifacts:
    reports:
      junit: ./lint.junit.xml
```

## Approaches
### Very first
Approach for [1 version](/tags/v1.0.2): minor imrove basic eslint junit reporter
![image](https://user-images.githubusercontent.com/426462/56635505-837db480-666e-11e9-9190-4277288dd638.png)

### Second
Approach for [second version](/tags/v2.0.0): show report "per file" insetad "per issue"

Short report:
![image](https://user-images.githubusercontent.com/426462/56865302-3e8eb080-69d5-11e9-8465-5f7c51392fa5.png)

Expanded report:
![image](https://user-images.githubusercontent.com/426462/56865318-6716aa80-69d5-11e9-8f71-5089941e3d8e.png)

