MAKEFLAGS := -j 4

SHELL := /bin/bash

USER := byuadmin

uppercase = $(shell tr '[a-z]' '[A-Z]' <<< $1)

HTML_SRC := $(filter-out target/%,$(wildcard */*.html))
HTML_SRC_DIR := $(dir $(HTML_SRC))

.PHONY: all
all: contest problems

.PHONY: contest
contest: target/BYU2015F.html

.PHONY: problems
problems: $(HTML_SRC_DIR:%/=target/%.html)

.PHONY: clean
clean:
	rm -fr target

target/BYU2015F.html: footer.html
	@mkdir -p $(@D)
	./spoj.py --user=$(USER) --password=$(PASSWORD) contest --footer-file=$< BYU2015F
	@> $@

.SECONDEXPANSION:

target/%.html: $$*/$**.html
	@mkdir -p $(@D)
	./spoj.py --user=$(USER) --password=$(PASSWORD) problem --body-file=$< $(call uppercase,$*)
	@> $@
