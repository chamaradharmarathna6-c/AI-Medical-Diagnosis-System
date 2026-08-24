# Dataset layout

`raw/` contains unmodified copies of the supplied disease files. `supporting/` contains unmodified copies of the supplied doctors, symptoms, and recommendations workbooks. `processed/` is generated only by `python -m AI.train_models`.

The source copies in `Datasets/` are the files directly used by the training script; do not edit either raw location.
