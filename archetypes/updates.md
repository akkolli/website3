+++
# Use the title for the short announcement shown on the homepage.
title = '{{ replace (replace .File.ContentBaseName "-" " ") "_" " " | title }}'
date = '{{ .Date }}'
draft = true
+++
