#!/bin/bash

deno fmt --check
deno lint
deno task test