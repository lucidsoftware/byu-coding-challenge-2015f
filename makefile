MAKEFLAGS := -j 4

SHELL := /bin/bash

USER := byuadmin

uppercase = $(shell tr '[a-z]' '[A-Z]' <<< $1)

HTML_SRC := $(filter-out target/%,$(wildcard */*.html))
HTML_SRC_DIR := $(dir $(HTML_SRC))

all: $(HTML_SRC_DIR:%/=target/%.html)

clean:
	rm -fr target

.SECONDEXPANSION:

target/%.html: $$*/$**.html
	@mkdir -p $(@D)
	./spoj.py --user=$(USER) --password=$(PASSWORD) problem --body-file=$< $(call uppercase,$*)
	@> $@
