MAKEFLAGS := -j 4

SHELL := /bin/bash

USER := byuadmin

uppercase = $(shell tr '[a-z]' '[A-Z]' <<< $1)

HTML_SRC := $(filter-out target/%,$(filter-out uploads/%,$(wildcard */*.html)))
HTML_SRC_DIR := $(dir $(HTML_SRC))

UPLOADS_SRC := $(wildcard uploads/*)

.PHONY: all
all: contest problems solutions uploads

.PHONY: contest
contest: target/BYU2015F.html

.PHONY: solutions
solutions: $(HTML_SRC_DIR:%/=target/%.zip.upload)

.PHONY: problems
problems: $(HTML_SRC_DIR:%/=target/%.html)

.PHONY: uploads
uploads: $(UPLOADS_SRC:%=target/%)

.PHONY: clean
clean:
	rm -fr target

target/BYU2015F.html: footer.html
	@mkdir -p $(@D)
	./spoj.py --user=$(USER) --password=$(PASSWORD) contest --footer-file=$< BYU2015F
	@> $@

target/uploads/%: uploads/%
	@mkdir -p $(@D)
	./spoj.py --user=$(USER) --password=$(PASSWORD) upload --file=$< BYU2015F $(*:%.html=%)
	@> $@


target/%.zip.upload: target/%.zip
	./spoj.py --user=$(USER) --password=$(PASSWORD) tests --zip-file=$< $(call uppercase,$*)
	@> $@

.SECONDEXPANSION:

target/%.zip: $$(wildcard $$*/tests/*)
	@mkdir -p $(@D)
	@if [ -z "$^" ]; then > $@; else zip --filesync -j $@ $^; fi

target/%.html: $$*/$$*.html
	@mkdir -p $(@D)
	./spoj.py --user=$(USER) --password=$(PASSWORD) problem --body-file=$< $(call uppercase,$*)
	@> $@
