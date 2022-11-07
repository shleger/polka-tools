#!/bin/bash

#   --blocks-pruning <COUNT>
#            Specify the number of finalized blocks to keep in the database.
#./substrate-contracts-node --base-path /home/subs/data --name subs_node1 --ws-external

./substrate-contracts-node \
purge-chain \
--base-path /home/subs/data \
--chain local \
-y
