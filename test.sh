# /bin/bash

# for i in {1..100}; do
#     curl http://localhost:3400/statuscode?failwithex=true
# done

for i in {1..100}; do
    curl -v http://localhost:3400/statuscode
done

# for i in {1..50}; do
#     curl http://localhost:3400/statuscode?fail=true
# done