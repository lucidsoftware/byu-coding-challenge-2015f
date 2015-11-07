MAKEFLAGS := -j 4

SHELL := /bin/bash

USER := byuadmin

uppercase = $(shell tr '[a-z]' '[A-Z]' <<< $1)

HTML_SRC := $(filter-out target/%,$(filter-out uploads/%,$(wildcard */*.html)))
HTML_SRC_DIR := $(dir $(HTML_SRC))

UPLOADS_SRC := $(wildcard uploads/*)

.PHONY: all
all: contest problems uploads

.PHONY: contest
contest: target/BYU2015F.html

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

.SECONDEXPANSION:

target/%.html: $$*/$**.html
	@mkdir -p $(@D)
	./spoj.py --user=$(USER) --password=$(PASSWORD) problem --body-file=$< $(call uppercase,$*)
	@> $@
