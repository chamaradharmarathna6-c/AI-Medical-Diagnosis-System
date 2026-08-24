# Local ML artifacts

Run `python -m AI.train_models` to build the four complete scikit-learn pipelines. Each pipeline includes feature preprocessing and its selected classifier. Results are written to `reports/model_results/model_results.json`; confusion matrices are stored under `reports/graphs/`.

The API only loads the saved `.pkl` artifacts and never retrains on requests.
