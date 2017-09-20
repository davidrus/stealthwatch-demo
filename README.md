## Install

```bash
# clone our repo
# --depth 1 removes all but one .git commit history
git clone --depth=1 https://github.com/davidrus/stealthwatch-demo.git <your-project-name>

# change directory to our repo
cd <your-project-name>

# install all dependencies
npm install
```

## Start

```bash
# start the server, webpack ( which runs Typescript compilation and linting with TSlint and Codelyzer )
npm start

open http://localhost:9000
```
