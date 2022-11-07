#!/bin/bash


#   --blocks-pruning <COUNT>
#            Specify the number of finalized blocks to keep in the database.
#./substrate-contracts-node
#--base-path /home/subs/data --name subs_node1 --ws-external

#--name node_alice \
#--telemetry-url "wss://telemetry.polkadot.io/submit/ 0" \


/home/subs/substrate-contracts-node \
--base-path /home/subs/data \
--chain local \
--alice \
--rpc-methods Unsafe \
--port 30333 \
--rpc-cors=all \
--rpc-external \
--unsafe-ws-external \
--ws-port 9944 \
--rpc-port 9933 \
--validator
