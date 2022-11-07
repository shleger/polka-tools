#!/usr/bin/env sh

#    --telemetry-url "wss://telemetry.polkadot.io/submit/ 0" \


/home/subs/substrate-contracts-node \
    --base-path /home/subs/data \
    --chain local \
    --bob \
    --port 30334 \
    --ws-port 9955 \
    --rpc-port 9966 \
    --unsafe-ws-external \
    --validator \
    --bootnodes /ip4/172.31.45.104/tcp/30333/p2p/12D3KooWBfTy2C5cUqsD1mypwQNm6uq4vyCxR5hSkyT5TaNjmbXj
