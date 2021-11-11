# Setting up IPFS

- Install the CLI IPFS node from [here](https://docs.ipfs.io/install/command-line/#official-distributions) and follow the steps

- To get the installed IPFS node running follow the following [steps](https://docs.ipfs.io/how-to/command-line-quick-start/#prerequisites)

- If you encounter some error like 8080 is already in use, either you can kill whatever is running at 8080 using:

```
netstat -a | grep 8080
kill process_id
```

or you can change the port address in .ipfs/config to some free port

- Now the IPFS node is running with our machine as the node thus our node-ipfs-http-client can connect to it. 