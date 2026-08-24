# Methodology

Raw files in `Datasets/` are not changed. Training generates copies in `datasets/processed/`. Diabetes negative age/insulin entries are converted to missing values and median-imputed by the pipeline. Heart `id` is excluded. Liver exact duplicate rows are removed and its missing `alkphos` values are imputed.

All splits are stratified with random state 42. The persisted artifact contains preprocessing and classifier together, preventing training/API preprocessing drift. The heart random forest trains on an explicitly sampled 100,000-row stratified training subset for resource control; its held-out evaluation remains on the full test partition.

The liver column/value ranges look atypical for their headers. No invented remapping was performed; this limitation is retained in the data and documentation.
