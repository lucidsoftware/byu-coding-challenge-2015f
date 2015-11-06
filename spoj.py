#!/usr/bin/env python2

import argparse
import mechanize
import requests
import sys

class AuthenticationError(Exception):
    def __init__(self):
        Exception.__init__(self)

class SPOJ:
    def __init__(self):
        self.base_url = 'http://www.spoj.com'
        self.browser = mechanize.Browser()

    def navigate(self, url):
        print 'Navigating to {}'.format(url)
        self.browser.open(url)

    def authenticate(self, username, password):
        self.navigate(self.base_url)
        login_form = self.browser.select_form(predicate=lambda form: form.attrs.get('id') == 'login-form')
        self.browser['login_user'] = username
        self.browser['password'] = password

        print 'Authenticating'
        self.browser.submit()
        cookies = self.browser._ua_handlers['_cookies'].cookiejar
        if not any(c.name == 'SPOJ' for c in cookies):
            print 'Authentication failed'
            raise AuthenticationError()
        print 'Authenticated'

    def edit_problem(self, problem_code, body_path=None):
        self.navigate('{}/problems/{}/edit'.format(self.base_url, problem_code))
        self.browser.select_form('editform')
        if body_path is not None:
            print 'Changing problem description to {}'.format(body_path)
            with open(body_path, 'r') as body_file:
                self.browser['body'] = body_file.read()

        print 'Editing {}'.format(problem_code)
        self.browser.submit()
        print 'Edited {}'.format(problem_code)

def problem_main(args):
    spoj = SPOJ()
    try:
        spoj.authenticate(args.user, args.password)
    except AuthenticationError:
        sys.exit(1)
    spoj.edit_problem(args.problem_code, body_path=args.body_file)

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
