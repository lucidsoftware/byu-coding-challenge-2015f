#!/usr/bin/env python2

import argparse
import mechanize
import requests
import sys

spoj_base_url = 'http://www.spoj.com'

def navigate(browser, url):
    print 'Navigating to {}'.format(url)
    browser.open(url)

def authenticate(browser, username, password):
    navigate(browser, spoj_base_url)
    login_form = browser.select_form(predicate=lambda form: form.attrs.get('id') == 'login-form')
    browser['login_user'] = username
    browser['password'] = password

    print 'Authenticating'
    browser.submit()
    cookies = browser._ua_handlers['_cookies'].cookiejar
    if any(c.name == 'SPOJ' for c in cookies):
        print 'Authenticated'
    else:
        print 'Authentication failed'
        sys.exit(1)

def edit_problem(browser, problem_code, body_path=None):
    navigate(browser, '{}/problems/{}/edit'.format(spoj_base_url, problem_code))
    browser.select_form('editform')
    if body_path is not None:
        print 'Changing problem description to {}'.format(body_path)
        with open(body_path, 'r') as body_file:
            browser['body'] = body_file.read()

    print 'Editing {}'.format(problem_code)
    browser.submit()
    print 'Edited {}'.format(problem_code)

def problem_main(args):
    browser = mechanize.Browser()
    authenticate(browser, args.user, args.password)

    edit_problem(browser, args.problem_code, body_path=args.body_file)

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--user')
    parser.add_argument('--password')
    subparsers = parser.add_subparsers()

    parser_problem = subparsers.add_parser('problem')
    parser_problem.add_argument('problem_code', help='Alphanumeric problem code')
    parser_problem.add_argument('--body-file', help='Problem description file')
    parser_problem.set_defaults(func=problem_main)

    args = parser.parse_args()
    args.func(args)
