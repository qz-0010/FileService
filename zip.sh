#!/bin/bash
d=$(date +%y%m%d)
cd "src"
zip -r "../builds/$d-build" "*" -x "node_modules/**\*" "client/node_modules/**\*" "public/files/**\*"
# echo "date $d"
exit 0