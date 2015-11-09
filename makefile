MAKEFLAGS := -j 4

SHELL := /bin/bash

USER := byuadmin

uppercase = $(shell tr '[a-z]' '[A-Z]' <<< $1)

PROBLEMS := $(wildcard problems/*)
TEST_DIRS := $(wildcard problems/*/test/data)
UPLOADS_SRC := $(wildcard contest/uploads/*)

.PHONY: all
all: contest problems solutions uploads

.PHONY: contest
contest: target/BYU2015F.html

.PHONY: solutions
solutions: $(SOLUTION_DIRS:%=target/%.zip.upload)

.PHONY: problems
problems: $(PROBLEMS:%=target/%.upload)

.PHONY: uploads
uploads: $(UPLOADS_SRC:%=target/%)

.PHONY: clean
clean:
	rm -fr target

target/contest.upload: contest/footer.html
	@mkdir -p $(@D)
	./spoj.py --user=$(USER) --password=$(PASSWORD) contest --footer-file=$< BYU2015F
	@> $@

target/contest/uploads/%: uploads/%
	@mkdir -p $(@D)
	./spoj.py --user=$(USER) --password=$(PASSWORD) upload --file=$< BYU2015F $(*:%.html=%)
	@> $@

target/problems/%/test/data.zip: 
	@mkdir -p $(@D)
	@if [ -z "$^" ]; then > $@; else zip --filesync -j $@ $^; fi

target/problems/%/test/data.zip.upload: problems/%/test/data.zip
	./spoj.py --user=$(USER) --password=$(PASSWORD) tests --zip-file=$< $(call uppercase,$*)
	@> $@

target/problems/%.upload: problems/%/description.html
	@mkdir -p $(@D)
	./spoj.py --user=$(USER) --password=$(PASSWORD) problem --body-file=$< $(call uppercase,$*)
	@> $@
