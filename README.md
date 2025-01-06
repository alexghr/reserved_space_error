# reserved_space_error

This is a repo to reproduce an error seen in lmdb-js.

To run:

```
yarn
node test.mjs
```

Example output:

```
Inserting 1000 items
Deleting 0 items
Deleting 221 items
Deleting 266 items
Deleting 277 items
Deleting 236 items
Inserting 1000 items
Deleting 63 items
Deleting 294 items
Deleting 300 items
Deleting 289 items
Deleting 54 items
Inserting 1000 items
Deleting 251 items
Deleting 316 items
Deleting 310 items
Deleting 123 items
Inserting 1000 items
Deleting 203 items
Deleting 313 items
Deleting 319 items
reserved_space larger than allocated entry 2 82 507 0 2 2Deleting 165 items
Inserting 1000 items
Deleting 148 items
Deleting 324 items
Deleting 316 items
Deleting 212 items
Inserting 1000 items
Deleting 99 items
Deleting 339 items
Deleting 328 items
Deleting 234 items
Inserting 1000 items
Deleting 82 items
Deleting 319 items
Deleting 316 items
Deleting 283 items
Inserting 1000 items
Deleting 34 items
Deleting 332 items
Deleting 294 items
Deleting 316 items
reserved_space larger than allocated entry 2 64 507 0 2 2Deleting 24 items
Inserting 1000 items
Deleting 301 items
Deleting 313 items
Deleting 323 items
Deleting 63 items
Inserting 1000 items
Deleting 265 items
Deleting 235 items
Inserting 1000 items
Deleting 81 items
Deleting 169 items
Inserting 1000 items
Deleting 125 items
Inserting 1000 items
Deleting 27 items
Deleting 36 items
Inserting 1000 items
Deleting 31 items
Inserting 1000 items
Deleting 16 items
Inserting 1000 items
Deleting 8 items
Inserting 1000 items
Deleting 4 items
Inserting 1000 items
Deleting 2 items
Inserting 1000 items
Deleting 1 items
```

The `reserved_space larger than allocated entry` log lines are unexpected and eventually lead to a crash.
