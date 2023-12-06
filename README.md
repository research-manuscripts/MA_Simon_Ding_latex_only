### The thesis

Build the paper using your favorite latex compiler. The starting point is `thesis.tex`.

### Demo website

The demo website is located in `demo-website`. It is a React app bootstrapped with `create-react-app`.
For more information on how to run it, see the [README.md](demo-website/README.md) in the demo-website folder.

### LLM tester

The LLM tester is located in `WebtestingWithLLM`. It is a fork of a similar project and the git submodule needs to be initialized with `git submodule update --init`. Once that is done, the tester can be run with `python run_ui_test.py` from within the `WebtestingWithLLM` folder. For more information on how to run it, see the [README.md](WebtestingWithLLM/README.md) in the WebtestingWithLLM folder.

### Quickstart

Make sure you have `npm` and `python` installed.

```bash

git submodule update --init
cd demo-website
npm install
npm run build:instrument
npm run serve &
cd ../WebtestingWithLLM
pip install -r requirements.txt
python run_ui_test.py

```